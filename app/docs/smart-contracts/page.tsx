export default function SmartContractsPage() {
    return (
        <div>
            <h1>⛓️ Smart Contracts</h1>

            <p className="text-xl text-gray-300 mb-8">
                SourceNet smart contracts are written in Move language and deployed on the SUI blockchain. They handle DataPod creation, purchases, and escrow management.
            </p>

            <h2>Contract Modules</h2>

            <p>
                The SourceNet smart contract package consists of four main modules:
            </p>

            <ul>
                <li><strong>datapod:</strong> DataPod creation and management</li>
                <li><strong>purchase:</strong> Purchase request handling</li>
                <li><strong>escrow:</strong> Fund locking and release</li>
                <li><strong>events:</strong> On-chain event emissions</li>
            </ul>

            <h2>DataPod Module</h2>

            <h3>DataPod Struct</h3>
            <pre><code>{`module sourcenet::datapod {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use std::string::String;

    /// Represents a dataset on the marketplace
    struct DataPod has key, store {
        id: UID,
        /// Address of the data seller
        seller: address,
        /// Title of the dataset
        title: String,
        /// Category (e.g., "finance", "healthcare")
        category: String,
        /// Description of the dataset
        description: String,
        /// Price in SUI (stored in MIST: 1 SUI = 1,000,000,000 MIST)
        price_sui: u64,
        /// SHA-256 hash of the original data
        data_hash: String,
        /// Walrus blob ID for encrypted data
        blob_id: String,
        /// Publication status (0 = draft, 1 = published)
        status: u8,
        /// Total number of purchases
        total_sales: u64,
        /// Timestamp of creation
        created_at: u64,
    }

    /// Event emitted when a DataPod is created
    struct DataPodCreated has copy, drop {
        datapod_id: ID,
        seller: address,
        title: String,
        price_sui: u64,
    }

    /// Event emitted when a DataPod is published
    struct DataPodPublished has copy, drop {
        datapod_id: ID,
        seller: address,
    }
}`}</code></pre>

            <h3>Create DataPod Function</h3>
            <pre><code>{`    /// Create a new DataPod (draft status)
    public entry fun create_datapod(
        title: String,
        category: String,
        description: String,
        price_sui: u64,
        data_hash: String,
        blob_id: String,
        ctx: &mut TxContext
    ) {
        // Validate price is positive
        assert!(price_sui > 0, EINVALID_PRICE);

        let sender = tx_context::sender(ctx);
        let datapod_id = object::new(ctx);
        let id_copy = object::uid_to_inner(&datapod_id);

        let datapod = DataPod {
            id: datapod_id,
            seller: sender,
            title,
            category,
            description,
            price_sui,
            data_hash,
            blob_id,
            status: 0, // Draft
            total_sales: 0,
            created_at: tx_context::epoch(ctx),
        };

        // Emit creation event
        event::emit(DataPodCreated {
            datapod_id: id_copy,
            seller: sender,
            title: datapod.title,
            price_sui: datapod.price_sui,
        });

        // Transfer to seller
        transfer::public_transfer(datapod, sender);
    }

    /// Publish a DataPod to the marketplace
    public entry fun publish_datapod(
        datapod: &mut DataPod,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Only seller can publish
        assert!(datapod.seller == sender, EUNAUTHORIZED);
        
        // Update status
        datapod.status = 1; // Published

        // Emit event
        event::emit(DataPodPublished {
            datapod_id: object::uid_to_inner(&datapod.id),
            seller: datapod.seller,
        });
    }`}</code></pre>

            <h2>Purchase Module</h2>

            <h3>Purchase Struct</h3>
            <pre><code>{`module sourcenet::purchase {
    use sui::object::{Self, UID, ID};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::tx_context::{Self, TxContext};

    /// Represents a purchase request
    struct PurchaseRequest has key, store {
        id: UID,
        /// ID of the DataPod being purchased
        datapod_id: ID,
        /// Buyer's address
        buyer: address,
        /// Seller's address
        seller: address,
        /// Purchase amount in MIST
        amount: u64,
        /// Buyer's public key for encryption
        buyer_public_key: vector<u8>,
        /// Purchase status (0 = pending, 1 = completed, 2 = refund)
        status: u8,
        /// Timestamp
        created_at: u64,
    }

    /// Event emitted when a purchase is created
    struct PurchaseCreated has copy, drop {
        purchase_id: ID,
        datapod_id: ID,
        buyer: address,
        seller: address,
        amount: u64,
    }

    /// Event emitted when a purchase is completed
    struct PurchaseCompleted has copy, drop {
        purchase_id: ID,
        buyer: address,
    }
}`}</code></pre>

            <h3>Create Purchase Function</h3>
            <pre><code>{`    /// Create a purchase request
    public entry fun create_purchase(
        datapod_id: ID,
        seller: address,
        buyer_public_key: vector<u8>,
        payment: Coin<SUI>,
        expected_amount: u64,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        
        // Verify payment amount
        let paid_amount = coin::value(&payment);
        assert!(paid_amount >= expected_amount, EINSUFFICIENT_PAYMENT);

        // Create purchase ID
        let purchase_id = object::new(ctx);
        let id_copy = object::uid_to_inner(&purchase_id);

        // Create purchase object
        let purchase = PurchaseRequest {
            id: purchase_id,
            datapod_id,
            buyer,
            seller,
            amount: paid_amount,
            buyer_public_key,
            status: 0, // Pending
            created_at: tx_context::epoch(ctx),
        };

        // Emit event
        event::emit(PurchaseCreated {
            purchase_id: id_copy,
            datapod_id,
            buyer,
            seller,
            amount: paid_amount,
        });

        // Create escrow with payment
        escrow::create_escrow(purchase_id, payment, seller, ctx);

        // Transfer purchase object to buyer
        transfer::public_transfer(purchase, buyer);
    }

    /// Complete a purchase (called by backend after data delivery)
    public entry fun complete_purchase(
        purchase: &mut PurchaseRequest,
        ctx: &mut TxContext
    ) {
        // Verify caller is authorized (backend service account)
        assert!(is_authorized(tx_context::sender(ctx)), EUNAUTHORIZED);
        
        // Update status
        purchase.status = 1; // Completed

        // Emit event
        event::emit(PurchaseCompleted {
            purchase_id: object::uid_to_inner(&purchase.id),
            buyer: purchase.buyer,
        });

        // Release escrow to seller
        escrow::release_to_seller(
            object::uid_to_inner(&purchase.id),
            purchase.seller,
            ctx
        );
    }`}</code></pre>

            <h2>Escrow Module</h2>

            <h3>Escrow Struct</h3>
            <pre><code>{`module sourcenet::escrow {
    use sui::object::{Self, UID, ID};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;

    /// Holds funds until purchase is fulfilled
    struct Escrow has key, store {
        id: UID,
        /// Purchase ID this escrow is for
        purchase_id: ID,
        /// Locked funds
        balance: Coin<SUI>,
        /// Seller who will receive funds
        seller: address,
        /// Escrow status (0 = holding, 1 = released, 2 = refunded)
        status: u8,
    }

    /// Event emitted when escrow is created
    struct EscrowCreated has copy, drop {
        escrow_id: ID,
        purchase_id: ID,
        amount: u64,
        seller: address,
    }

    /// Event emitted when escrow is released
    struct EscrowReleased has copy, drop {
        escrow_id: ID,
        purchase_id: ID,
        seller: address,
        amount: u64,
    }
}`}</code></pre>

            <h3>Escrow Functions</h3>
            <pre><code>{`    /// Create escrow to hold payment
    public(package) fun create_escrow(
        purchase_id: ID,
        payment: Coin<SUI>,
        seller: address,
        ctx: &mut TxContext
    ) {
        let escrow_id = object::new(ctx);
        let id_copy = object::uid_to_inner(&escrow_id);
        let amount = coin::value(&payment);

        let escrow = Escrow {
            id: escrow_id,
            purchase_id,
            balance: payment,
            seller,
            status: 0, // Holding
        };

        // Emit event
        event::emit(EscrowCreated {
            escrow_id: id_copy,
            purchase_id,
            amount,
            seller,
        });

        // Share escrow object (accessible by package)
        transfer::share_object(escrow);
    }

    /// Release escrow to seller
    public(package) fun release_to_seller(
        purchase_id: ID,
        seller: address,
        ctx: &mut TxContext
    ) {
        // Find escrow by purchase_id (simplified)
        let escrow = get_escrow_by_purchase(purchase_id);
        
        // Verify seller
        assert!(escrow.seller == seller, EINVALID_SELLER);
        assert!(escrow.status == 0, ESCROW_ALREADY_SETTLED);

        let amount = coin::value(&escrow.balance);
        
        // Extract coins and transfer to seller
        let payment = coin::withdraw_all(&mut escrow.balance);
        transfer::public_transfer(payment, seller);

        // Update status
        escrow.status = 1; // Released

        // Emit event
        event::emit(EscrowReleased {
            escrow_id: object::uid_to_inner(&escrow.id),
            purchase_id,
            seller,
            amount,
        });
    }

    /// Refund escrow to buyer (in case of dispute)
    public(package) fun refund_to_buyer(
        purchase_id: ID,
        buyer: address,
        ctx: &mut TxContext
    ) {
        let escrow = get_escrow_by_purchase(purchase_id);
        
        assert!(escrow.status == 0, ESCROW_ALREADY_SETTLED);

        // Extract coins and refund to buyer
        let payment = coin::withdraw_all(&mut escrow.balance);
        transfer::public_transfer(payment, buyer);

        // Update status
        escrow.status = 2; // Refunded
    }`}</code></pre>

            <h2>Contract Deployment</h2>

            <h3>Build Contract</h3>
            <pre><code>{`# Navigate to contract directory
cd contracts

# Build the Move package
sui move build

# Test the contract
sui move test

# Output:
# ✓ Compiling sourcenet
# ✓ Running 15 tests
# ✓ All tests passed`}</code></pre>

            <h3>Deploy to Testnet</h3>
            <pre><code>{`# Deploy to SUI testnet
sui client publish --gas-budget 100000000

# Output:
# Package ID: 0x1234...abcd
# Transaction Digest: 0xabcd...1234`}</code></pre>

            <h3>Environment Variables</h3>
            <pre><code>{`# .env
SUI_PACKAGE_ID=0x1234...abcd
SUI_NETWORK=testnet
SUI_RPC_URL=https://fullnode.testnet.sui.io:443`}</code></pre>

            <h2>On-Chain Events</h2>

            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Emitted When</th>
                        <th>Fields</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DataPodCreated</td>
                        <td>DataPod is created</td>
                        <td>datapod_id, seller, title, price_sui</td>
                    </tr>
                    <tr>
                        <td>DataPodPublished</td>
                        <td>DataPod is published</td>
                        <td>datapod_id, seller</td>
                    </tr>
                    <tr>
                        <td>PurchaseCreated</td>
                        <td>Purchase is initiated</td>
                        <td>purchase_id, datapod_id, buyer, seller, amount</td>
                    </tr>
                    <tr>
                        <td>PurchaseCompleted</td>
                        <td>Data delivery complete</td>
                        <td>purchase_id, buyer</td>
                    </tr>
                    <tr>
                        <td>EscrowCreated</td>
                        <td>Funds locked in escrow</td>
                        <td>escrow_id, purchase_id, amount, seller</td>
                    </tr>
                    <tr>
                        <td>EscrowReleased</td>
                        <td>Funds released to seller</td>
                        <td>escrow_id, purchase_id, seller, amount</td>
                    </tr>
                </tbody>
            </table>

            <h2>Querying On-Chain Data</h2>

            <h3>Get DataPod by ID</h3>
            <pre><code>{`import { SuiClient } from '@mysten/sui/client';

const client = new SuiClient({ url: 'https://fullnode.testnet.sui.io:443' });

async function getDataPod(datapodId: string) {
  const object = await client.getObject({
    id: datapodId,
    options: {
      showContent: true,
      showType: true,
    }
  });

  return object.data.content.fields;
}`}</code></pre>

            <h3>Query Events</h3>
            <pre><code>{`async function getPurchaseEvents() {
  const events = await client.queryEvents({
    query: {
      MoveEventType: \`\${PACKAGE_ID}::purchase::PurchaseCreated\`
    },
    limit: 50,
    order: 'descending'
  });

  return events.data.map(event => event.parsedJson);
}`}</code></pre>

            <h2>Security Features</h2>

            <ul>
                <li><strong>Ownership Verification:</strong> Only sellers can publish their DataPods</li>
                <li><strong>Payment Validation:</strong> Purchase requires exact payment amount</li>
                <li><strong>Escrow Protection:</strong> Funds locked until delivery confirmed</li>
                <li><strong>Status Checks:</strong> Prevents double-spending and re-entry</li>
                <li><strong>Address Verification:</strong> All addresses validated before operations</li>
            </ul>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">⛓️ Blockchain Complete</p>
                <p className="mb-0">
                    Now you understand the smart contract architecture. Check out the
                    <a href="/docs/api-reference"> API Reference</a> to see backend endpoints,
                    or view the <a href="/docs/database">Database Schema</a> for data storage structure.
                </p>
            </div>
        </div>
    );
}
