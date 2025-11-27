export default function SellerFlowPage() {
    return (
        <div>
            <h1>📤 Seller Flow</h1>

            <p className="text-xl text-gray-300 mb-8">
                Learn how sellers upload, encrypt, and publish datasets on SourceNet marketplace using Walrus Protocol for decentralized storage.
            </p>

            <h2>Overview</h2>

            <p>
                The seller flow consists of three main phases:
            </p>

            <ul>
                <li><strong>Upload:</strong> Upload dataset file with encryption</li>
                <li><strong>Review:</strong> Preview and verify dataset information</li>
                <li><strong>Publish:</strong> Create on-chain DataPod and list on marketplace</li>
            </ul>

            <h2>Complete Flow Diagram</h2>

            <pre><code>{`┌─────────┐
│ Seller  │
└────┬────┘
     │
     │ 1. POST /api/seller/upload (file, metadata)
     ▼
┌──────────────────┐
│  Backend API     │
│ uploadController │
└────┬─────────────┘
     │
     │ 2. Validate file & metadata
     │ 3. Generate data hash (SHA-256)
     │ 4. Encrypt file with AES-256
     │
     ▼
┌──────────────────┐
│  Walrus Storage  │
└────┬─────────────┘
     │ 5. Upload encrypted file → Returns blob_id
     │
     ▼
┌──────────────────┐
│  PostgreSQL      │
│  DataPod         │
└────┬─────────────┘
     │ 6. Store DataPod:
     │    - sellerId
     │    - blobId (Walrus)
     │    - metadata
     │    - status: "draft"
     │
     ▼
   Return upload_id to Seller
     
     │ 7. Seller reviews and confirms
     │
     │ 8. POST /api/seller/publish
     ▼
┌──────────────────┐
│  Backend API     │
│ publishController│
└────┬─────────────┘
     │
     │ 9. Update status to "published"
     │
     ▼
┌──────────────────┐
│  WebSocket       │
└────┬─────────────┘
     │ 10. Broadcast to marketplace
     │
     ▼
  SUCCESS`}</code></pre>

            <h2>Phase 1: File Upload</h2>

            <h3>Frontend: Upload Form</h3>
            <pre><code>{`'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file!);
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch('/api/seller/upload', {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${localStorage.getItem('token')}\`
        },
        body: formData
      });

      const { uploadId } = await response.json();
      
      // Navigate to preview page
      router.push(\`/seller/preview/\${uploadId}\`);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input 
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept=".csv,.json,.parquet"
      />
      
      <input 
        placeholder="Title"
        value={metadata.title}
        onChange={(e) => setMetadata({...metadata, title: e.target.value})}
      />
      
      <textarea 
        placeholder="Description"
        value={metadata.description}
        onChange={(e) => setMetadata({...metadata, description: e.target.value})}
      />
      
      <select 
        value={metadata.category}
        onChange={(e) => setMetadata({...metadata, category: e.target.value})}
      >
        <option value="">Select category</option>
        <option value="finance">Finance</option>
        <option value="healthcare">Healthcare</option>
        <option value="ecommerce">E-commerce</option>
      </select>
      
      <input 
        type="number"
        placeholder="Price (SUI)"
        value={metadata.price}
        onChange={(e) => setMetadata({...metadata, price: e.target.value})}
      />
      
      <button type="submit" disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload Dataset'}
      </button>
    </form>
  );
}`}</code></pre>

            <h3>Backend: Upload Handler</h3>
            <pre><code>{`import multer from 'multer';
import crypto from 'crypto';
import { WalrusService } from '../services/walrus.service';
import { DataPod } from '../models';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});

export async function uploadDataset(req, res) {
  const file = req.file;
  const metadata = JSON.parse(req.body.metadata);
  const sellerId = req.user.id;

  // 1. Validate file
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // 2. Validate metadata
  const validated = uploadSchema.parse(metadata);

  // 3. Generate encryption key
  const encryptionKey = crypto.randomBytes(32); // 256-bit
  const iv = crypto.randomBytes(16);

  // 4. Encrypt file
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  const encryptedData = Buffer.concat([
    cipher.update(file.buffer),
    cipher.final()
  ]);

  // 5. Generate data hash
  const dataHash = crypto
    .createHash('sha256')
    .update(file.buffer)
    .digest('hex');

  // 6. Upload to Walrus
  const walrusResult = await WalrusService.uploadToWalrus(
    encryptedData, 
    'datapods'
  );

  // 7. Generate preview (first 100 rows)
  const preview = await generatePreview(file.buffer, file.mimetype);

  // 8. Hash encryption key
  const keyHash = crypto
    .createHash('sha256')
    .update(encryptionKey)
    .digest('hex');

  // 9. Store in database
  const datapod = await DataPod.create({
    seller_id: sellerId,
    title: validated.title,
    description: validated.description,
    category: validated.category,
    price_sui: validated.price,
    walrus_blob_id: walrusResult.cid,
    walrus_storage_size: walrusResult.size,
    encryption_key_hash: keyHash,
    encryption_iv: iv.toString('hex'),
    file_type: file.mimetype,
    file_size: file.size,
    data_hash: dataHash,
    schema: preview.schema,
    sample_data: preview.sample,
    published: false // Draft status
  });

  // 10. Store encryption key securely
  await EncryptionKeyStore.save(datapod.id, encryptionKey);

  res.json({ uploadId: datapod.id, preview });
}`}</code></pre>

            <h2>Phase 2: Preview & Review</h2>

            <h3>Preview Dataset</h3>
            <pre><code>{`export default function PreviewPage({ params }: { params: { id: string } }) {
  const [datapod, setDatapod] = useState(null);

  useEffect(() => {
    fetch(\`/api/seller/datapods/\${params.id}\`)
      .then(res => res.json())
      .then(data => setDatapod(data));
  }, [params.id]);

  if (!datapod) return <div>Loading...</div>;

  return (
    <div>
      <h1>{datapod.title}</h1>
      <p>{datapod.description}</p>
      
      <div>
        <h2>Dataset Info</h2>
        <p>Category: {datapod.category}</p>
        <p>Price: {datapod.price_sui} SUI</p>
        <p>Size: {formatBytes(datapod.file_size)}</p>
        <p>Type: {datapod.file_type}</p>
      </div>

      <div>
        <h2>Schema</h2>
        <pre>{JSON.stringify(datapod.schema, null, 2)}</pre>
      </div>

      <div>
        <h2>Sample Data (First 10 Rows)</h2>
        <table>
          <thead>
            <tr>
              {Object.keys(datapod.sample_data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datapod.sample_data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handlePublish}>
        Publish to Marketplace
      </button>
    </div>
  );
}`}</code></pre>

            <h2>Phase 3: Publish to Marketplace</h2>

            <h3>Publish Handler</h3>
            <pre><code>{`async function publishDatapod(req, res) {
  const { datapodId } = req.body;
  const sellerId = req.user.id;

  // 1. Verify ownership
  const datapod = await DataPod.findOne({
    where: { id: datapodId, seller_id: sellerId }
  });

  if (!datapod) {
    return res.status(404).json({ error: 'DataPod not found' });
  }

  if (datapod.published) {
    return res.status(400).json({ error: 'Already published' });
  }

  // 2. Update status
  await datapod.update({ published: true });

  // 3. Broadcast to WebSocket clients
  io.emit('datapod.published', {
    id: datapod.id,
    title: datapod.title,
    category: datapod.category,
    price: datapod.price_sui,
    seller: {
      id: req.user.id,
      name: req.user.name
    }
  });

  // 4. Invalidate cache
  await CacheService.delete(\`marketplace:datapods\`);

  res.json({ 
    success: true, 
    datapod: {
      id: datapod.id,
      published: true
    }
  });
}`}</code></pre>

            <h2>Data Encryption Details</h2>

            <h3>Encryption Algorithm</h3>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Algorithm</td>
                        <td>AES-256-CBC</td>
                    </tr>
                    <tr>
                        <td>Key Size</td>
                        <td>256 bits (32 bytes)</td>
                    </tr>
                    <tr>
                        <td>IV Size</td>
                        <td>128 bits (16 bytes)</td>
                    </tr>
                    <tr>
                        <td>Mode</td>
                        <td>Cipher Block Chaining (CBC)</td>
                    </tr>
                </tbody>
            </table>

            <h3>Key Management</h3>
            <ul>
                <li><strong>Generation:</strong> Cryptographically secure random bytes</li>
                <li><strong>Storage:</strong> Encrypted with master key, stored separately from data</li>
                <li><strong>Per-Purchase Re-encryption:</strong> New encrypted copy for each buyer</li>
                <li><strong>Never Exposed:</strong> Keys never sent to client or logged</li>
            </ul>

            <h2>Walrus Storage Integration</h2>

            <h3>Upload to Walrus</h3>
            <pre><code>{`class WalrusService {
  static async uploadToWalrus(data: Buffer, folder: string) {
    const response = await fetch(
      \`\${process.env.WALRUS_API_URL}/v1/store\`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        body: data
      }
    );

    if (!response.ok) {
      throw new Error('Walrus upload failed');
    }

    const result = await response.json();

    return {
      cid: result.newlyCreated?.blobObject?.blobId || result.alreadyCertified?.blobId,
      size: result.newlyCreated?.blobObject?.size || result.alreadyCertified?.size,
      url: \`\${process.env.WALRUS_BLOB_ENDPOINT}/\${result.blobId}\`
    };
  }
}`}</code></pre>

            <div className="info-box">
                <p className="font-semibold text-blue-300 mb-2">💡 Why Walrus?</p>
                <ul className="mb-0 mt-2">
                    <li>✅ Decentralized - no single point of failure</li>
                    <li>✅ Immutable - data cannot be altered</li>
                    <li>✅ High availability - erasure coding ensures uptime</li>
                    <li>✅ Cost-effective - lower than traditional cloud storage</li>
                </ul>
            </div>

            <h2>Seller Dashboard</h2>

            <h3>View Published DataPods</h3>
            <pre><code>{`async function getSellerDatapods(req, res) {
  const sellerId = req.user.id;
  const { page = 1, limit = 10, status } = req.query;

  const where = { seller_id: sellerId };
  if (status) {
    where.published = status === 'published';
  }

  const datapods = await DataPod.findAndCountAll({
    where,
    limit,
    offset: (page - 1) * limit,
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Purchase,
        attributes: [],
        required: false
      }
    ],
    attributes: {
      include: [
        [sequelize.fn('COUNT', sequelize.col('purchases.id')), 'purchase_count'],
        [sequelize.fn('SUM', sequelize.col('purchases.amount_sui')), 'total_revenue']
      ]
    },
    group: ['DataPod.id']
  });

  res.json({
    datapods: datapods.rows,
    total: datapods.count,
    page,
    pages: Math.ceil(datapods.count / limit)
  });
}`}</code></pre>

            <h2>Best Practices</h2>

            <ul>
                <li><strong>File Validation:</strong> Always validate file type, size, and format</li>
                <li><strong>Metadata Validation:</strong> Use Zod schemas for type-safe validation</li>
                <li><strong>Preview Generation:</strong> Show sample data to help buyers evaluate quality</li>
                <li><strong>Pricing Strategy:</strong> Consider dataset size, quality, and market demand</li>
                <li><strong>Categories:</strong> Choose appropriate categories for better discoverability</li>
                <li><strong>Descriptions:</strong> Write clear, detailed descriptions of dataset contents</li>
            </ul>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">✅ Next Steps</p>
                <p className="mb-0">
                    Learn about the <a href="/docs/flows/buyer">Buyer Flow</a> to understand how buyers purchase
                    and download datasets, or explore <a href="/docs/smart-contracts">Smart Contracts</a> for on-chain logic.
                </p>
            </div>
        </div>
    );
}
