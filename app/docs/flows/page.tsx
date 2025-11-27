export default function FlowsPage() {
    return (
        <div>
            <h1>📋 Application Flows</h1>

            <p className="text-xl mb-8">
                Explore the complete workflows for sellers and buyers in the SourceNet marketplace.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {/* Seller Flow Card */}
                <a
                    href="/docs/flows/seller"
                    className="block p-8 bg-white rounded-xl border-2 border-gray-300 hover:border-black hover:shadow-2xl transition-all duration-300 group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            📤
                        </div>
                        <h2 className="text-3xl font-bold text-black mt-0">Seller Flow</h2>
                    </div>

                    <p className="text-gray-700 mb-6 text-lg">
                        Learn how to upload, encrypt, and publish datasets on the marketplace.
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-black mt-1">✓</span>
                            <span className="text-gray-700">Upload dataset with metadata</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-black mt-1">✓</span>
                            <span className="text-gray-700">Automatic encryption with AES-256</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-black mt-1">✓</span>
                            <span className="text-gray-700">Store on Walrus decentralized storage</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-black mt-1">✓</span>
                            <span className="text-gray-700">Preview and publish to marketplace</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-black font-semibold group-hover:gap-4 transition-all">
                        <span>Explore Seller Flow</span>
                        <span className="text-xl">→</span>
                    </div>
                </a>

                {/* Buyer Flow Card */}
                <a
                    href="/docs/flows/buyer"
                    className="block p-8 bg-white rounded-xl border-2 border-gray-300 hover:border-black hover:shadow-2xl transition-all duration-300 group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            🛒
                        </div>
                        <h2 className="text-3xl font-bold text-black mt-0">Buyer Flow</h2>
                    </div>

                    <p className="text-gray-700 mb-6 text-lg">
                        Discover how to browse, purchase, and securely download datasets with zkLogin.
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-gray-800 mt-1">✓</span>
                            <span className="text-gray-700">Browse marketplace and preview data</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-gray-800 mt-1">✓</span>
                            <span className="text-gray-700">Purchase with zkLogin authentication</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-gray-800 mt-1">✓</span>
                            <span className="text-gray-700">Secure payment via blockchain escrow</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-gray-800 mt-1">✓</span>
                            <span className="text-gray-700">Download encrypted data securely</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-gray-800 font-semibold group-hover:gap-4 transition-all">
                        <span>Explore Buyer Flow</span>
                        <span className="text-xl">→</span>
                    </div>
                </a>
            </div>

            <div className="info-box mt-12">
                <p className="font-semibold mb-2">💡 Understanding the Flows</p>
                <p className="mb-0">
                    Both flows are interconnected through the marketplace. Sellers create value by uploading quality datasets,
                    while buyers discover and purchase data using secure blockchain payments. The platform ensures trust through
                    encryption, escrow, and decentralized storage.
                </p>
            </div>

            <h2>Flow Comparison</h2>

            <table>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Seller Flow</th>
                        <th>Buyer Flow</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Main Action</td>
                        <td>Upload & Publish datasets</td>
                        <td>Browse & Purchase datasets</td>
                    </tr>
                    <tr>
                        <td>Authentication</td>
                        <td>zkLogin (Google OAuth)</td>
                        <td>zkLogin (Google OAuth)</td>
                    </tr>
                    <tr>
                        <td>Payment</td>
                        <td>Receives SUI from buyers</td>
                        <td>Pays SUI for datasets</td>
                    </tr>
                    <tr>
                        <td>Data Handling</td>
                        <td>Encrypts and uploads to Walrus</td>
                        <td>Downloads encrypted data from Walrus</td>
                    </tr>
                    <tr>
                        <td>Blockchain</td>
                        <td>Creates DataPod on-chain</td>
                        <td>Creates Purchase & Escrow on-chain</td>
                    </tr>
                    <tr>
                        <td>Key Benefit</td>
                        <td>Monetize data assets</td>
                        <td>Access quality datasets securely</td>
                    </tr>
                </tbody>
            </table>

            <div className="success-box mt-8">
                <p className="font-semibold mb-2">🎯 Ready to Dive Deeper?</p>
                <p className="mb-0">
                    Select either <a href="/docs/flows/seller">Seller Flow</a> or <a href="/docs/flows/buyer">Buyer Flow</a>
                    above to explore detailed step-by-step workflows with code examples and diagrams.
                </p>
            </div>
        </div>
    );
}
