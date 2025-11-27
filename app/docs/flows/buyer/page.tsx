export default function BuyerFlowPage() {
    return (
        <div>
            <h1>🛒 Buyer Flow</h1>

            <p className="text-xl text-gray-300 mb-8">
                Learn how buyers discover, purchase, and download datasets using zkLogin authentication and blockchain payments.
            </p>

            <h2>Overview</h2>

            <p>
                The buyer journey consists of four main phases:
            </p>

            <ul>
                <li><strong>Browse:</strong> Discover datasets on the marketplace</li>
                <li><strong>Purchase:</strong> Buy dataset with zkLogin transaction</li>
                <li><strong>Download:</strong> Access encrypted data securely</li>
                <li><strong>Review:</strong> Rate and review the dataset</li>
            </ul>

            <h2>Complete Purchase Flow</h2>

            <pre><code>{`┌─────────┐
│ Buyer   │
└────┬────┘
     │ 1. Browse marketplace
     │ 2. Click "Purchase"
     ▼
┌──────────────────┐
│  zkLogin Hook    │
└────┬─────────────┘
     │ 3. Build transaction (PTB)
     │ 4. Sign with zkProof
     │ 5. Execute on SUI
     ▼
┌──────────────────┐
│  SUI Blockchain  │
└────┬─────────────┘
     │ 6. Purchase created on-chain
     │ 7. Escrow locks funds
     │ 8. Returns tx_digest
     ▼
┌──────────────────┐
│  Backend API     │
└────┬─────────────┘
     │ 9. Verify transaction
     │ 10. Record purchase
     │ 11. Queue fulfillment job
     ▼
┌──────────────────┐
│  Job Worker      │
└────┬─────────────┘
     │ 12. Download from Walrus
     │ 13. Decrypt data
     │ 14. Re-encrypt for buyer
     │ 15. Upload to Walrus
     ▼
┌──────────────────┐
│  WebSocket       │
└────┬─────────────┘
     │ 16. Notify buyer "Ready to download"
     ▼
┌─────────┐
│ Buyer   │ Downloads decrypted file
└─────────┘`}</code></pre>

            <h2>Phase 1: Browse Marketplace</h2>

            <h3>Marketplace Page</h3>
            <pre><code>{`'use client';

import { useState, useEffect } from 'react';
import { DataPodCard } from '@/components/DataPodCard';

export default function MarketplacePage() {
  const [datapods, setDatapods] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    search: ''
  });

  useEffect(() => {
    fetchDatapods();
  }, [filters]);

  const fetchDatapods = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(\`/api/marketplace/datapods?\${query}\`);
    const data = await response.json();
    setDatapods(data.datapods);
  };

  return (
    <div>
      <h1>Marketplace</h1>
      
      {/* Filters */}
      <div>
        <input 
          placeholder="Search datasets..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        
        <select 
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">All Categories</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="ecommerce">E-commerce</option>
        </select>
      </div>

      {/* DataPod Grid */}
      <div className="grid grid-cols-3 gap-6">
        {datapods.map(datapod => (
          <DataPodCard key={datapod.id} datapod={datapod} />
        ))}
      </div>
    </div>
  );
}`}</code></pre>

            <h3>DataPod Detail Page</h3>
            <pre><code>{`export default function DataPodPage({ params }: { params: { id: string } }) {
  const [datapod, setDatapod] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch DataPod details
    fetch(\`/api/marketplace/datapods/\${params.id}\`)
      .then(res => res.json())
      .then(data => setDatapod(data));

    // Fetch reviews
    fetch(\`/api/review/datapod/\${params.id}\`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews));
  }, [params.id]);

  if (!datapod) return <div>Loading...</div>;

  return (
    <div>
      <h1>{datapod.title}</h1>
      <p>{datapod.description}</p>

      {/* Metadata */}
      <div>
        <p>Price: {datapod.price_sui} SUI</p>
        <p>Category: {datapod.category}</p>
        <p>Size: {formatBytes(datapod.file_size)}</p>
        <p>Seller: {datapod.seller.name}</p>
        <p>Rating: {datapod.average_rating || 'No ratings yet'}</p>
      </div>

      {/* Sample Data */}
      <div>
        <h2>Sample Data</h2>
        <table>
          {/* Render sample_data */}
        </table>
      </div>

      {/* Purchase Button */}
      <PurchaseModal datapod={datapod} />

      {/* Reviews */}
      <div>
        <h2>Reviews ({reviews.length})</h2>
        {reviews.map(review => (
          <div key={review.id}>
            <p>★ {review.rating}/5</p>
            <p>{review.comment}</p>
            <p>By {review.buyer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}</code></pre>

            <h2>Phase 2: Purchase with zkLogin</h2>

            <h3>Purchase Modal Component</h3>
            <pre><code>{`'use client';

import { useState } from 'react';
import { useZKLogin } from '@/hooks/useZKLogin';

export function PurchaseModal({ datapod }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { executePurchaseTransaction } = useZKLogin();

  const handlePurchase = async () => {
    setIsPurchasing(true);

    try {
      // 1. Execute blockchain transaction
      const txResult = await executePurchaseTransaction({
        datapodId: datapod.id,
        priceSui: datapod.price_sui,
        sellerAddress: datapod.seller.sui_address
      });

      console.log('Transaction digest:', txResult.digest);

      // 2. Verify and record purchase on backend
      const response = await fetch('/api/buyer/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: \`Bearer \${localStorage.getItem('token')}\`
        },
        body: JSON.stringify({
          datapod_id: datapod.id,
          payment_tx_digest: txResult.digest
        })
      });

      const { purchase } = await response.json();

      // 3. Navigate to buyer dashboard
      router.push('/buyer');
      
      toast.success('Purchase successful! Processing your data...');
    } catch (error) {
      console.error('Purchase failed:', error);
      toast.error('Purchase failed: ' + error.message);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Purchase for {datapod.price_sui} SUI
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Confirm Purchase</h2>
        <p>Dataset: {datapod.title}</p>
        <p>Price: {datapod.price_sui} SUI</p>
        
        <button onClick={handlePurchase} disabled={isPurchasing}>
          {isPurchasing ? 'Processing...' : 'Confirm Purchase'}
        </button>
      </Modal>
    </>
  );
}`}</code></pre>

            <h3>zkLogin Hook (useZKLogin)</h3>
            <pre><code>{`import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/client';

export function useZKLogin() {
  const executePurchaseTransaction = async ({
    datapodId,
    priceSui,
    sellerAddress
  }) => {
    // 1. Get ephemeral keypair and zkProof
    const ephemeralKeyPair = getStoredEphemeralKey();
    const zkProof = getStoredZKProof();
    
    if (!ephemeralKeyPair || !zkProof) {
      throw new Error('Not authenticated. Please login again.');
    }

    // 2. Create transaction block
    const tx = new Transaction();
    
    // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
    const priceInMist = Math.floor(priceSui * 1_000_000_000);
    
    // 3. Split coins for payment
    const [paymentCoin] = tx.splitCoins(tx.gas, [
      tx.pure.u64(priceInMist)
    ]);
    
    // 4. Call purchase contract
    tx.moveCall({
      target: \`\${PACKAGE_ID}::purchase::create_purchase\`,
      arguments: [
        tx.pure.address(datapodId),
        tx.pure.address(sellerAddress),
        paymentCoin,
        tx.pure.u64(priceInMist)
      ]
    });
    
    // 5. Create escrow
    tx.moveCall({
      target: \`\${PACKAGE_ID}::escrow::create_escrow\`,
      arguments: [
        tx.object(PURCHASE_REGISTRY),
        paymentCoin,
        tx.pure.address(sellerAddress)
      ]
    });
    
    // 6. Set sender
    const userAddress = getUserSuiAddress();
    tx.setSender(userAddress);
    
    // 7. Sign with zkLogin
    const suiClient = new SuiClient({ url: SUI_RPC_URL });
    
    const { bytes, signature: userSignature } = await tx.sign({
      client: suiClient,
      signer: ephemeralKeyPair
    });
    
    // 8. Create zkLogin signature
    const zkLoginSignature = getZkLoginSignature({
      inputs: zkProof,
      maxEpoch: zkProof.maxEpoch,
      userSignature
    });
    
    // 9. Execute transaction
    const result = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature: zkLoginSignature,
      options: {
        showEffects: true,
        showObjectChanges: true
      }
    });
    
    if (result.effects.status.status !== 'success') {
      throw new Error('Transaction failed on-chain');
    }
    
    return result;
  };

  return { executePurchaseTransaction };
}`}</code></pre>

            <h3>Backend: Verify Purchase</h3>
            <pre><code>{`async function createPurchase(req, res) {
  const { datapod_id, payment_tx_digest } = req.body;
  const buyerId = req.user.id;

  // 1. Validate DataPod exists
  const datapod = await DataPod.findByPk(datapod_id);
  if (!datapod || !datapod.published) {
    return res.status(404).json({ error: 'DataPod not found' });
  }

  // 2. Verify transaction on-chain
  const txData = await BlockchainService.getTransaction(payment_tx_digest);
  
  if (!txData) {
    return res.status(400).json({ error: 'Transaction not found' });
  }

  if (txData.effects.status.status !== 'success') {
    return res.status(400).json({ error: 'Transaction failed' });
  }

  // 3. Verify payment amount
  const paidAmount = extractPaymentAmount(txData);
  const expectedAmount = datapod.price_sui * 1e9; // Convert to MIST
  
  if (paidAmount < expectedAmount) {
    return res.status(400).json({ error: 'Insufficient payment' });
  }

  // 4. Verify sender
  if (txData.sender !== req.user.sui_address) {
    return res.status(403).json({ error: 'Address mismatch' });
  }

  // 5. Check for duplicate
  let purchase = await Purchase.findOne({
    where: { payment_tx_digest }
  });

  if (purchase) {
    return res.json({ purchase }); // Idempotent
  }

  // 6. Create purchase record
  purchase = await Purchase.create({
    buyer_id: buyerId,
    datapod_id,
    payment_tx_digest,
    amount_sui: datapod.price_sui,
    status: 'processing'
  });

  // 7. Update DataPod purchase count
  await datapod.increment('purchase_count');

  // 8. Queue fulfillment job
  await fulfillmentQueue.add('fulfill-purchase', {
    purchaseId: purchase.id
  });

  res.json({ purchase });
}`}</code></pre>

            <h2>Phase 3: Data Fulfillment (Background)</h2>

            <h3>Fulfillment Job Worker</h3>
            <pre><code>{`import { Worker } from 'bullmq';
import { WalrusService } from '../services/walrus.service';
import crypto from 'crypto';

const worker = new Worker('fulfill-purchase', async (job) => {
  const { purchaseId } = job.data;

  // 1. Get purchase and datapod
  const purchase = await Purchase.findByPk(purchaseId, {
    include: [{ model: DataPod }]
  });

  const datapod = purchase.datapod;

  // 2. Download encrypted file from Walrus
  const encryptedBlob = await WalrusService.downloadFromWalrus(
    datapod.walrus_blob_id
  );

  // 3. Get original encryption key
  const encryptionKey = await EncryptionKeyStore.get(datapod.id);
  const iv = Buffer.from(datapod.encryption_iv, 'hex');

  // 4. Decrypt data
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  const decryptedData = Buffer.concat([
    decipher.update(encryptedBlob),
    decipher.final()
  ]);

  // 5. Generate new encryption key for buyer
  const buyerKey = crypto.randomBytes(32);
  const buyerIv = crypto.randomBytes(16);

  // 6. Re-encrypt for buyer
  const cipher = crypto.createCipheriv('aes-256-cbc', buyerKey, buyerIv);
  const reencryptedData = Buffer.concat([
    cipher.update(decryptedData),
    cipher.final()
  ]);

  // 7. Upload to Walrus
  const walrusResult = await WalrusService.uploadToWalrus(
    reencryptedData,
    'purchases'
  );

  // 8. Store encrypted key for buyer (encrypt with buyer's public key if available)
  const encryptedKey = buyerKey.toString('base64');

  // 9. Update purchase record
  await purchase.update({
    encrypted_blob_id: walrusResult.cid,
    decryption_key: encryptedKey,
    decryption_iv: buyerIv.toString('hex'),
    status: 'completed',
    completed_at: new Date()
  });

  // 10. Notify buyer via WebSocket
  io.to(\`user:\${purchase.buyer_id}\`).emit('purchase.completed', {
    purchaseId: purchase.id,
    datapodTitle: datapod.title
  });
});`}</code></pre>

            <h2>Phase 4: Download Data</h2>

            <h3>Download Button</h3>
            <pre><code>{`function DownloadButton({ purchase }) {
  const handleDownload = async () => {
    try {
      // 1. Request download URL
      const response = await fetch(\`/api/buyer/download/\${purchase.id}\`, {
        headers: {
          Authorization: \`Bearer \${localStorage.getItem('token')}\`
        }
      });

      const { downloadUrl, filename } = await response.json();

      // 2. Download file
      const fileResponse = await fetch(downloadUrl);
      const blob = await fileResponse.blob();

      // 3. Trigger browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed');
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={purchase.status !== 'completed'}
    >
      {purchase.status === 'completed' ? 'Download' : 'Processing...'}
    </button>
  );
}`}</code></pre>

            <h3>Backend: Generate Download URL</h3>
            <pre><code>{`async function getDownloadUrl(req, res) {
  const { purchaseId } = req.params;
  const userId = req.user.id;

  // 1. Verify ownership
  const purchase = await Purchase.findOne({
    where: { id: purchaseId, buyer_id: userId },
    include: [{ model: DataPod }]
  });

  if (!purchase) {
    return res.status(404).json({ error: 'Purchase not found' });
  }

  if (purchase.status !== 'completed') {
    return res.status(400).json({ error: 'Purchase not ready' });
  }

  // 2. Generate signed download token
  const downloadToken = jwt.sign(
    { purchaseId, userId },
    process.env.DOWNLOAD_SECRET,
    { expiresIn: '1h' }
  );

  // 3. Create download URL
  const downloadUrl = \`\${process.env.API_URL}/download/\${downloadToken}\`;

  res.json({
    downloadUrl,
    filename: \`\${purchase.datapod.title}.csv\`,
    expiresIn: 3600
  });
}

async function downloadFile(req, res) {
  const { token } = req.params;

  // 1. Verify token
  const decoded = jwt.verify(token, process.env.DOWNLOAD_SECRET);
  
  // 2. Get purchase
  const purchase = await Purchase.findByPk(decoded.purchaseId, {
    include: [{ model: DataPod }]
  });

  // 3. Fetch from Walrus
  const encryptedBlob = await WalrusService.downloadFromWalrus(
    purchase.encrypted_blob_id
  );

  // 4. Decrypt
  const key = Buffer.from(purchase.decryption_key, 'base64');
  const iv = Buffer.from(purchase.decryption_iv, 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const data = Buffer.concat([
    decipher.update(encryptedBlob),
    decipher.final()
  ]);

  // 5. Stream to client
  res.setHeader('Content-Type', purchase.datapod.file_type);
  res.setHeader('Content-Disposition', \`attachment; filename="\${purchase.datapod.title}"\`);
  res.send(data);
}`}</code></pre>

            <h2>Phase 5: Submit Review</h2>

            <pre><code>{`async function submitReview(purchaseId, rating, comment) {
  const response = await fetch(\`/api/buyer/purchase/\${purchaseId}/review\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${localStorage.getItem('token')}\`
    },
    body: JSON.stringify({ rating, comment })
  });

  const { review } = await response.json();
  return review;
}`}</code></pre>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">🎉 Purchase Complete!</p>
                <p className="mb-0">
                    Now you understand the complete buyer flow. Check out the
                    <a href="/docs/smart-contracts"> Smart Contracts</a> to see how purchases are handled on-chain,
                    or explore the <a href="/docs/api-reference">API Reference</a> for all endpoints.
                </p>
            </div>
        </div>
    );
}
