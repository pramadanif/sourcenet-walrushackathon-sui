export default function ArchitecturePage() {
    return (
        <div>
            <h1>🏗️ System Architecture</h1>

            <p className="text-xl text-gray-300 mb-8">
                SourceNet follows a microservices-oriented architecture that combines frontend, backend, blockchain, and decentralized storage layers.
            </p>

            <h2>Architecture Overview</h2>

            <pre><code>{`┌─────────────┐         ┌──────────────┐         ┌───────────────┐
│   Frontend  │────────▶│    Backend   │────────▶│  SUI Blockchain│
│  (Next.js)  │         │  (Express)   │         │   (Move SC)    │
└─────────────┘         └──────────────┘         └───────────────┘
                              │    │
                              │    │
                         ┌────▼────▼────┐
                         │  PostgreSQL   │
                         │    + Redis    │
                         └───────────────┘
                              │
                         ┌────▼────┐
                         │ Walrus  │
                         │ Storage │
                         └─────────┘`}</code></pre>

            <h2>Key Components</h2>

            <h3>1. Frontend Layer (Next.js)</h3>
            <p>
                The user-facing application built with Next.js 14, featuring server-side rendering,
                client components for interactivity, and state management with Zustand.
            </p>

            <ul>
                <li><strong>Pages:</strong> Marketplace, Seller Dashboard, Buyer Dashboard, Authentication</li>
                <li><strong>Components:</strong> Reusable UI components with Tailwind CSS</li>
                <li><strong>Hooks:</strong> Custom hooks for zkLogin, API calls, and blockchain interactions</li>
                <li><strong>State Management:</strong> Zustand for global state (user, auth, purchases)</li>
            </ul>

            <h3>2. Backend API (Express.js)</h3>
            <p>
                RESTful API server handling authentication, data processing, and blockchain integration.
            </p>

            <ul>
                <li><strong>Controllers:</strong> Auth, Seller, Buyer, Review, AI</li>
                <li><strong>Services:</strong> Blockchain, Storage, Encryption, Cache, AI</li>
                <li><strong>Middleware:</strong> JWT authentication, rate limiting, validation</li>
                <li><strong>Job Queue:</strong> BullMQ for background processing (data encryption, fulfillment)</li>
            </ul>

            <h3>3. Database Layer (PostgreSQL)</h3>
            <p>
                Relational database for storing user data, DataPod metadata, purchases, and reviews.
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Table</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>users</td>
                        <td>User profiles, SUI addresses, zkLogin salts</td>
                    </tr>
                    <tr>
                        <td>datapods</td>
                        <td>Dataset metadata, pricing, Walrus blob IDs</td>
                    </tr>
                    <tr>
                        <td>purchases</td>
                        <td>Purchase records, transaction digests, status</td>
                    </tr>
                    <tr>
                        <td>reviews</td>
                        <td>Ratings and comments from buyers</td>
                    </tr>
                    <tr>
                        <td>escrow_transactions</td>
                        <td>Escrow records and payment tracking</td>
                    </tr>
                </tbody>
            </table>

            <h3>4. Cache Layer (Redis)</h3>
            <p>
                In-memory cache for session management, rate limiting, and temporary data storage.
            </p>

            <ul>
                <li><strong>Sessions:</strong> JWT tokens and user sessions</li>
                <li><strong>Rate Limiting:</strong> API request throttling per user/IP</li>
                <li><strong>Caching:</strong> Frequently accessed DataPod metadata</li>
                <li><strong>Download Tokens:</strong> Temporary signed URLs for data downloads</li>
            </ul>

            <h3>5. Blockchain Layer (SUI)</h3>
            <p>
                Smart contracts written in Move language handle on-chain logic and asset management.
            </p>

            <ul>
                <li><strong>DataPod Module:</strong> Create and manage DataPod objects</li>
                <li><strong>Purchase Module:</strong> Handle purchase requests and payments</li>
                <li><strong>Escrow Module:</strong> Lock and release funds securely</li>
                <li><strong>Events:</strong> Emit events for indexer synchronization</li>
            </ul>

            <h3>6. Storage Layer (Walrus Protocol)</h3>
            <p>
                Decentralized storage for encrypted data files using erasure coding and distributed nodes.
            </p>

            <ul>
                <li><strong>Publisher:</strong> Upload encrypted data and receive blob IDs</li>
                <li><strong>Gateway:</strong> Retrieve data from distributed storage nodes</li>
                <li><strong>Erasure Coding:</strong> Split data into redundant chunks</li>
                <li><strong>High Availability:</strong> Data accessible even if some nodes fail</li>
            </ul>

            <h3>7. Real-time Layer (WebSocket)</h3>
            <p>
                WebSocket server for live updates and notifications.
            </p>

            <ul>
                <li><strong>Purchase Notifications:</strong> Alert buyers when purchases complete</li>
                <li><strong>Marketplace Updates:</strong> Real-time DataPod listings</li>
                <li><strong>Seller Alerts:</strong> Notify sellers of new purchases</li>
            </ul>

            <h3>8. Indexer Service</h3>
            <p>
                Background service that synchronizes blockchain events with the database.
            </p>

            <ul>
                <li><strong>Event Polling:</strong> Query SUI blockchain every 5 seconds</li>
                <li><strong>Event Processing:</strong> Parse and store on-chain events</li>
                <li><strong>Checkpoint Tracking:</strong> Track last processed block</li>
                <li><strong>Database Sync:</strong> Update local database with blockchain state</li>
            </ul>

            <h2>Data Flow Diagram</h2>

            <div className="info-box">
                <p className="font-semibold text-blue-300 mb-2">📊 Complete Data Flow</p>
                <pre className="mb-0"><code>{`User Browser
    │
    │ (1) HTTP/HTTPS
    ▼
Next.js Frontend
    │
    │ (2) REST API + WebSocket
    ▼
Express.js Backend
    │
    ├─── (3) SQL ────▶ PostgreSQL
    │
    ├─── (4) Cache ──▶ Redis
    │
    ├─── (5) Upload ─▶ Walrus Storage
    │
    └─── (6) TX ─────▶ SUI Blockchain
                          │
                          │ (7) Events
                          ▼
                      Indexer Service
                          │
                          └──▶ PostgreSQL`}</code></pre>
            </div>

            <h2>Security Architecture</h2>

            <h3>Authentication Security</h3>
            <ul>
                <li><strong>zkLogin:</strong> Zero-knowledge proofs for privacy-preserving authentication</li>
                <li><strong>JWT Tokens:</strong> Signed tokens with 7-day expiration</li>
                <li><strong>Salt Storage:</strong> Unique salts per user stored securely</li>
            </ul>

            <h3>Data Security</h3>
            <ul>
                <li><strong>AES-256 Encryption:</strong> All data encrypted at rest</li>
                <li><strong>Per-Purchase Encryption:</strong> Unique encrypted copy per buyer</li>
                <li><strong>Key Management:</strong> Encryption keys stored separately from data</li>
            </ul>

            <h3>Network Security</h3>
            <ul>
                <li><strong>HTTPS Only:</strong> All communication encrypted in transit</li>
                <li><strong>Rate Limiting:</strong> 20 requests/min per user, 100/min per IP</li>
                <li><strong>Input Validation:</strong> Zod schemas for all API inputs</li>
            </ul>

            <h2>Scalability Considerations</h2>

            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Scaling Strategy</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Frontend</td>
                        <td>CDN distribution, static generation, edge caching</td>
                    </tr>
                    <tr>
                        <td>Backend API</td>
                        <td>Horizontal scaling with load balancer, stateless design</td>
                    </tr>
                    <tr>
                        <td>Database</td>
                        <td>Read replicas, connection pooling, query optimization</td>
                    </tr>
                    <tr>
                        <td>Cache</td>
                        <td>Redis cluster with sharding</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td>Walrus naturally distributed across nodes</td>
                    </tr>
                    <tr>
                        <td>Job Queue</td>
                        <td>Multiple workers, priority queues</td>
                    </tr>
                </tbody>
            </table>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">✨ Next Steps</p>
                <p className="mb-0">
                    Explore the <a href="/docs/tech-stack">Tech Stack</a> for detailed technology information,
                    or dive into <a href="/docs/authentication">Authentication</a> to understand the zkLogin flow.
                </p>
            </div>
        </div>
    );
}
