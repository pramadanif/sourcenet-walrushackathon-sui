export default function DocsPage() {
    return (
        <div>
            <h1>📘 SourceNet Documentation</h1>

            <p className="text-xl text-gray-300 mb-8">
                Welcome to the comprehensive documentation for SourceNet - a decentralized data marketplace built on the SUI blockchain with Walrus Protocol for secure, decentralized data storage.
            </p>

            <div className="info-box">
                <p className="font-semibold text-blue-300 mb-2">🚀 Quick Start</p>
                <p>
                    This documentation covers the complete architecture, technical flows, and implementation details of the SourceNet platform.
                    Use the sidebar to navigate through different sections.
                </p>
            </div>

            <h2>What is SourceNet?</h2>
            <p>
                SourceNet is a decentralized data marketplace that enables data sellers to monetize their datasets and buyers to securely purchase and access data through blockchain-powered escrow and encryption. The platform leverages cutting-edge technologies to ensure security, privacy, and transparency.
            </p>

            <h2>Key Features</h2>

            <h3>🔐 zkLogin Authentication</h3>
            <p>
                Privacy-preserving authentication using Zero-Knowledge proofs and Google OAuth integration. Users can authenticate without revealing their private keys while maintaining full control over their blockchain identities.
            </p>

            <h3>🐋 Walrus Protocol Integration</h3>
            <p>
                Decentralized, immutable data storage built for the SUI ecosystem. Data is encrypted, split into erasure-coded chunks, and distributed across multiple nodes for high availability and security.
            </p>

            <h3>⛓️ SUI Blockchain</h3>
            <p>
                Smart contracts written in Move language handle escrow, purchases, and ownership verification on-chain. All transactions are transparent and verifiable on the blockchain.
            </p>

            <h3>💰 Secure Escrow System</h3>
            <p>
                Buyer funds are held in smart contract escrow until the seller fulfills the data delivery. This ensures trust and fairness in all transactions.
            </p>

            <h3>🔒 End-to-End Encryption</h3>
            <p>
                Data is encrypted at rest and in transit. Each purchase creates a unique encrypted copy for the buyer, ensuring data privacy and security.
            </p>

            <h2>Tech Stack Overview</h2>

            <table>
                <thead>
                    <tr>
                        <th>Layer</th>
                        <th>Technologies</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Frontend</td>
                        <td>Next.js 14, TypeScript, Zustand</td>
                        <td>User interface and state management</td>
                    </tr>
                    <tr>
                        <td>Backend</td>
                        <td>Express.js, PostgreSQL, Redis</td>
                        <td>API server, database, caching</td>
                    </tr>
                    <tr>
                        <td>Blockchain</td>
                        <td>SUI Move, zkLogin</td>
                        <td>Smart contracts and authentication</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td>Walrus Protocol</td>
                        <td>Decentralized file storage</td>
                    </tr>
                    <tr>
                        <td>AI</td>
                        <td>OpenAI (via OpenRouter)</td>
                        <td>Conversational assistance</td>
                    </tr>
                </tbody>
            </table>

            <h2>Quick Navigation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <a href="/docs/architecture" className="block p-6 bg-white rounded-lg hover:bg-gray-300 transition-colors border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 mt-0">🏗️ Architecture</h3>
                    <p className="text-gray-400 mb-0">Understand the system design and component interactions</p>
                </a>

                <a href="/docs/authentication" className="block p-6 bg-white rounded-lg hover:bg-gray-300 transition-colors border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 mt-0">🔐 Authentication</h3>
                    <p className="text-gray-400 mb-0">Learn about zkLogin and identity management</p>
                </a>

                <a href="/docs/flows/seller" className="block p-6 bg-white rounded-lg hover:bg-gray-300 transition-colors border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 mt-0">📤 Seller Flow</h3>
                    <p className="text-gray-400 mb-0">How to upload and publish datasets</p>
                </a>

                <a href="/docs/flows/buyer" className="block p-6 bg-white rounded-lg hover:bg-gray-300 transition-colors border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 mt-0">🛒 Buyer Flow</h3>
                    <p className="text-gray-400 mb-0">How to purchase and download data</p>
                </a>

                <a href="/docs/smart-contracts" className="block p-6 bg-white rounded-lg hover:bg-gray-300 transition-colors border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 mt-0">⛓️ Smart Contracts</h3>
                    <p className="text-gray-400 mb-0">Explore the Move contracts powering the marketplace</p>
                </a>

                <a href="/docs/api-reference" className="block p-6 bg-white rounded-lg hover:bg-gray-300 transition-colors border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 mt-0">📡 API Reference</h3>
                    <p className="text-gray-400 mb-0">Complete API endpoint documentation</p>
                </a>
            </div>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">💡 Getting Started</p>
                <p className="mb-0">
                    New to SourceNet? Start with the <a href="/docs/architecture">Architecture</a> section to understand the system design,
                    then explore the <a href="/docs/authentication">Authentication</a> flow to learn how zkLogin works.
                </p>
            </div>
        </div>
    );
}
