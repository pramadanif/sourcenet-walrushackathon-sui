export default function TechStackPage() {
    return (
        <div>
            <h1>💻 Tech Stack</h1>

            <p className="text-xl text-gray-300 mb-8">
                SourceNet is built with modern, cutting-edge technologies across frontend, backend, blockchain, and storage layers.
            </p>

            <h2>Frontend Technologies</h2>

            <h3>Next.js 14</h3>
            <p>
                React framework with App Router, server components, and advanced optimization features.
            </p>

            <ul>
                <li><strong>App Router:</strong> File-based routing with layouts and nested routes</li>
                <li><strong>Server Components:</strong> Optimized performance with RSC architecture</li>
                <li><strong>API Routes:</strong> Backend integration and data fetching</li>
                <li><strong>Image Optimization:</strong> Automatic image optimization with next/image</li>
            </ul>

            <h3>TypeScript</h3>
            <p>
                Strongly-typed JavaScript for enhanced developer experience and fewer runtime errors.
            </p>

            <ul>
                <li><strong>Type Safety:</strong> Catch errors at compile time</li>
                <li><strong>IntelliSense:</strong> Better IDE support and autocomplete</li>
                <li><strong>Refactoring:</strong> Safer code refactoring</li>
            </ul>

            <h3>Tailwind CSS</h3>
            <p>
                Utility-first CSS framework for rapid UI development.
            </p>

            <ul>
                <li><strong>Responsive Design:</strong> Mobile-first approach</li>
                <li><strong>Dark Mode:</strong> Built-in dark mode support</li>
                <li><strong>Custom Themes:</strong> Configurable design tokens</li>
            </ul>

            <h3>Zustand</h3>
            <p>
                Lightweight state management library for React.
            </p>

            <pre><code>{`import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));`}</code></pre>

            <h3>SUI TypeScript SDK</h3>
            <p>
                Official SDK for interacting with the SUI blockchain.
            </p>

            <ul>
                <li><strong>Transaction Building:</strong> Programmable Transaction Blocks (PTB)</li>
                <li><strong>zkLogin:</strong> Zero-knowledge authentication</li>
                <li><strong>Wallet Integration:</strong> Support for SUI wallets</li>
                <li><strong>Query API:</strong> Read blockchain state and events</li>
            </ul>

            <h3>Axios</h3>
            <p>
                HTTP client for API requests with interceptors and error handling.
            </p>

            <pre><code>{`const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`}</code></pre>

            <hr />

            <h2>Backend Technologies</h2>

            <h3>Node.js & Express.js</h3>
            <p>
                JavaScript runtime and web framework for building the REST API.
            </p>

            <ul>
                <li><strong>Middleware:</strong> Authentication, validation, error handling</li>
                <li><strong>Routing:</strong> Organized API endpoints</li>
                <li><strong>Performance:</strong> Async/await and non-blocking I/O</li>
            </ul>

            <h3>PostgreSQL</h3>
            <p>
                Advanced open-source relational database.
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Usage</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>JSONB</td>
                        <td>Store DataPod schema and metadata</td>
                    </tr>
                    <tr>
                        <td>Transactions</td>
                        <td>ACID compliance for purchase flows</td>
                    </tr>
                    <tr>
                        <td>Indexes</td>
                        <td>B-tree and GiST indexes for performance</td>
                    </tr>
                    <tr>
                        <td>Full-Text Search</td>
                        <td>Search DataPods by title/description</td>
                    </tr>
                </tbody>
            </table>

            <h3>Prisma ORM</h3>
            <p>
                Type-safe database client with schema migrations.
            </p>

            <pre><code>{`// Prisma schema
model User {
  id          String   @id @default(uuid())
  googleId    String   @unique
  email       String   @unique
  suiAddress  String   @unique
  salt        String
  datapods    DataPod[]
  purchases   Purchase[]
  createdAt   DateTime @default(now())
}`}</code></pre>

            <h3>Redis</h3>
            <p>
                In-memory data store for caching and session management.
            </p>

            <ul>
                <li><strong>Session Store:</strong> JWT token storage</li>
                <li><strong>Rate Limiting:</strong> Request throttling with sliding window</li>
                <li><strong>Cache:</strong> DataPod metadata caching (TTL: 5 minutes)</li>
                <li><strong>Download Tokens:</strong> Temporary file access tokens (TTL: 1 hour)</li>
            </ul>

            <h3>BullMQ</h3>
            <p>
                Job queue for background processing.
            </p>

            <pre><code>{`import { Queue, Worker } from 'bullmq';

const fulfillmentQueue = new Queue('purchase-fulfillment');

const worker = new Worker('purchase-fulfillment', async (job) => {
  const { purchaseId } = job.data;
  
  // 1. Fetch encrypted data
  // 2. Re-encrypt for buyer
  // 3. Upload to Walrus
  // 4. Update purchase record
});`}</code></pre>

            <h3>Socket.io</h3>
            <p>
                Real-time bidirectional communication for live updates.
            </p>

            <ul>
                <li><strong>Purchase Notifications:</strong> Notify buyers when ready to download</li>
                <li><strong>Marketplace Updates:</strong> New DataPods published</li>
                <li><strong>Analytics:</strong> Real-time dashboard updates</li>
            </ul>

            <hr />

            <h2>Blockchain Technologies</h2>

            <h3>SUI Blockchain</h3>
            <p>
                High-performance Layer 1 blockchain with parallel transaction execution.
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Benefit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Move Language</td>
                        <td>Safe, resource-oriented smart contracts</td>
                    </tr>
                    <tr>
                        <td>Object Model</td>
                        <td>First-class object ownership</td>
                    </tr>
                    <tr>
                        <td>Parallel Execution</td>
                        <td>High throughput (100k+ TPS)</td>
                    </tr>
                    <tr>
                        <td>Low Cost</td>
                        <td>Gas fees in MIST (fractions of SUI)</td>
                    </tr>
                </tbody>
            </table>

            <h3>Move Smart Contracts</h3>
            <p>
                Smart contract language designed for asset safety.
            </p>

            <pre><code>{`module sourcenet::datapod {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    
    struct DataPod has key, store {
        id: UID,
        seller: address,
        title: String,
        price_sui: u64,
        data_hash: String,
        blob_id: String,
    }
    
    public entry fun create_datapod(
        title: String,
        price_sui: u64,
        data_hash: String,
        blob_id: String,
        ctx: &mut TxContext
    ) {
        // Create DataPod object
    }
}`}</code></pre>

            <h3>zkLogin</h3>
            <p>
                Zero-knowledge proof-based authentication using OAuth providers.
            </p>

            <ul>
                <li><strong>Privacy:</strong> No private key exposure</li>
                <li><strong>User-Friendly:</strong> Login with Google, no wallet needed</li>
                <li><strong>Security:</strong> Cryptographic proofs (Groth16)</li>
                <li><strong>Non-Custodial:</strong> Users maintain full control</li>
            </ul>

            <div className="info-box">
                <p className="font-semibold text-blue-300 mb-2">🔐 zkLogin Flow</p>
                <p className="mb-0">
                    1. User authenticates with Google<br />
                    2. Generate ephemeral key pair<br />
                    3. Request salt from backend<br />
                    4. Get ZK proof from Mysten Labs<br />
                    5. Derive SUI address<br />
                    6. Sign transactions with zkProof
                </p>
            </div>

            <hr />

            <h2>Storage Technologies</h2>

            <h3>Walrus Protocol</h3>
            <p>
                Decentralized storage protocol built for the SUI ecosystem.
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Publisher</td>
                        <td>Upload endpoint for storing data</td>
                    </tr>
                    <tr>
                        <td>Gateway</td>
                        <td>Retrieve endpoint for fetching data</td>
                    </tr>
                    <tr>
                        <td>Storage Nodes</td>
                        <td>Distributed nodes storing data chunks</td>
                    </tr>
                    <tr>
                        <td>Erasure Coding</td>
                        <td>Redundancy for fault tolerance</td>
                    </tr>
                </tbody>
            </table>

            <pre><code>{`// Upload to Walrus
const formData = new FormData();
formData.append('file', encryptedBlob);

const response = await fetch(
  'https://publisher.walrus-testnet.walrus.space/v1/store',
  { method: 'PUT', body: formData }
);

const { blobId } = await response.json();

// Download from Walrus
const blob = await fetch(
  \`https://gateway.walrus.space/ipfs/\${blobId}\`
);`}</code></pre>

            <h3>Encryption</h3>
            <p>
                Industry-standard encryption for data at rest and in transit.
            </p>

            <ul>
                <li><strong>Algorithm:</strong> AES-256-CBC</li>
                <li><strong>Key Generation:</strong> Cryptographically secure random bytes</li>
                <li><strong>IV:</strong> Unique initialization vector per file</li>
                <li><strong>Key Storage:</strong> Encrypted with master key, stored separately</li>
            </ul>

            <hr />

            <h2>AI Technologies</h2>

            <h3>OpenAI via OpenRouter</h3>
            <p>
                AI-powered conversational assistance using GPT-4.
            </p>

            <ul>
                <li><strong>Model:</strong> deepseek/deepseek-chat (cost-effective, high quality)</li>
                <li><strong>Context:</strong> DataPod awareness, platform knowledge</li>
                <li><strong>Features:</strong> Multi-turn conversations, history persistence</li>
                <li><strong>Rate Limits:</strong> 20 requests/min per user</li>
            </ul>

            <hr />

            <h2>Development Tools</h2>

            <table>
                <thead>
                    <tr>
                        <th>Tool</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ESLint</td>
                        <td>Code linting and style enforcement</td>
                    </tr>
                    <tr>
                        <td>Prettier</td>
                        <td>Code formatting</td>
                    </tr>
                    <tr>
                        <td>Zod</td>
                        <td>Runtime type validation</td>
                    </tr>
                    <tr>
                        <td>Jest</td>
                        <td>Unit testing</td>
                    </tr>
                    <tr>
                        <td>Git</td>
                        <td>Version control</td>
                    </tr>
                </tbody>
            </table>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">🚀 Next Steps</p>
                <p className="mb-0">
                    Now that you understand the tech stack, explore the <a href="/docs/authentication">Authentication</a> flow
                    to see how zkLogin works, or check out the <a href="/docs/flows/seller">Seller Flow</a> to understand data upload.
                </p>
            </div>
        </div>
    );
}
