export default function DatabasePage() {
    return (
        <div>
            <h1>💾 Database Schema</h1>

            <p className="text-xl text-gray-300 mb-8">
                SourceNet uses PostgreSQL for data persistence, storing user information, DataPod metadata, purchases, reviews, and more.
            </p>

            <h2>Database Overview</h2>

            <p>
                The database consists of the following main tables:
            </p>

            <ul>
                <li><strong>users:</strong> User accounts and authentication data</li>
                <li><strong>datapods:</strong> Dataset metadata and Walrus references</li>
                <li><strong>purchases:</strong> Purchase records and transaction tracking</li>
                <li><strong>reviews:</strong> Ratings and comments from buyers</li>
                <li><strong>escrow_transactions:</strong> Escrow state tracking</li>
                <li><strong>ai_conversations:</strong> AI chat history</li>
                <li><strong>download_logs:</strong> Download tracking for analytics</li>
            </ul>

            <h2>Entity Relationship Diagram</h2>

            <pre><code>{`┌─────────────┐       ┌─────────────┐
│    users    │───┐   │  datapods   │
└─────────────┘   │   └─────────────┘
       │          │          │
       │          └──────────┤
       │                     │
       │          ┌──────────┴────────┐
       │          │                   │
       ▼          ▼                   ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  purchases  │  │   reviews    │  │   escrow    │
└─────────────┘  └─────────────┘  └─────────────┘
       │
       ▼
┌─────────────┐
│download_logs│
└─────────────┘`}</code></pre>

            <h2>Core Tables</h2>

            <h3>users</h3>
            <p>Stores user account information, SUI addresses, and zkLogin salts.</p>

            <pre><code>{`CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    profile_image VARCHAR(500),
    sui_address VARCHAR(66) UNIQUE NOT NULL,
    salt VARCHAR(64) NOT NULL,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_purchases INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_sui_address ON users(sui_address);`}</code></pre>

            <table>
                <thead>
                    <tr>
                        <th>Column</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>UUID</td>
                        <td>Primary key</td>
                    </tr>
                    <tr>
                        <td>google_id</td>
                        <td>VARCHAR(255)</td>
                        <td>Google OAuth user ID (unique)</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>VARCHAR(255)</td>
                        <td>User email address</td>
                    </tr>
                    <tr>
                        <td>sui_address</td>
                        <td>VARCHAR(66)</td>
                        <td>Derived SUI blockchain address</td>
                    </tr>
                    <tr>
                        <td>salt</td>
                        <td>VARCHAR(64)</td>
                        <td>zkLogin salt (256-bit hex)</td>
                    </tr>
                    <tr>
                        <td>average_rating</td>
                        <td>DECIMAL(3,2)</td>
                        <td>Seller rating (calculated from reviews)</td>
                    </tr>
                </tbody>
            </table>

            <h3>datapods</h3>
            <p>Stores DataPod metadata, Walrus blob references, and encryption information.</p>

            <pre><code>{`CREATE TABLE datapods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price_sui DECIMAL(20, 9) NOT NULL,
    walrus_blob_id VARCHAR(255) UNIQUE NOT NULL,
    walrus_storage_size BIGINT,
    encryption_key_hash VARCHAR(64) NOT NULL,
    encryption_iv VARCHAR(32) NOT NULL,
    file_type VARCHAR(100),
    file_size BIGINT,
    data_hash VARCHAR(64),
    schema JSONB,
    sample_data JSONB,
    published BOOLEAN DEFAULT false,
    purchase_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_datapods_seller ON datapods(seller_id);
CREATE INDEX idx_datapods_category ON datapods(category);
CREATE INDEX idx_datapods_published ON datapods(published);
CREATE INDEX idx_datapods_price ON datapods(price_sui);
CREATE INDEX idx_datapods_rating ON datapods(average_rating);

-- Full-text search index
CREATE INDEX idx_datapods_search ON datapods 
    USING gin(to_tsvector('english', title || ' ' || description));`}</code></pre>

            <table>
                <thead>
                    <tr>
                        <th>Column</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>walrus_blob_id</td>
                        <td>VARCHAR(255)</td>
                        <td>Walrus storage blob identifier</td>
                    </tr>
                    <tr>
                        <td>encryption_key_hash</td>
                        <td>VARCHAR(64)</td>
                        <td>SHA-256 hash of encryption key</td>
                    </tr>
                    <tr>
                        <td>encryption_iv</td>
                        <td>VARCHAR(32)</td>
                        <td>Initialization vector (hex)</td>
                    </tr>
                    <tr>
                        <td>schema</td>
                        <td>JSONB</td>
                        <td>Dataset schema (columns, types, counts)</td>
                    </tr>
                    <tr>
                        <td>sample_data</td>
                        <td>JSONB</td>
                        <td>First 10 rows for preview</td>
                    </tr>
                    <tr>
                        <td>published</td>
                        <td>BOOLEAN</td>
                        <td>Marketplace visibility</td>
                    </tr>
                </tbody>
            </table>

            <h3>purchases</h3>
            <p>Records all purchases with blockchain transaction references.</p>

            <pre><code>{`CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    datapod_id UUID REFERENCES datapods(id) ON DELETE CASCADE,
    payment_tx_digest VARCHAR(100) UNIQUE NOT NULL,
    amount_sui DECIMAL(20, 9) NOT NULL,
    encrypted_blob_id VARCHAR(255),
    decryption_key TEXT,
    decryption_iv VARCHAR(32),
    status VARCHAR(20) DEFAULT 'pending_payment',
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT unique_buyer_datapod UNIQUE(buyer_id, datapod_id)
);

-- Indexes
CREATE INDEX idx_purchases_buyer ON purchases(buyer_id);
CREATE INDEX idx_purchases_datapod ON purchases(datapod_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_tx_digest ON purchases(payment_tx_digest);

-- Enum-like constraint
ALTER TABLE purchases ADD CONSTRAINT check_status 
    CHECK (status IN ('pending_payment', 'processing', 'completed', 'refunded'));`}</code></pre>

            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>pending_payment</td>
                        <td>Awaiting blockchain transaction</td>
                    </tr>
                    <tr>
                        <td>processing</td>
                        <td>Payment verified, data being re-encrypted</td>
                    </tr>
                    <tr>
                        <td>completed</td>
                        <td>Ready for download</td>
                    </tr>
                    <tr>
                        <td>refunded</td>
                        <td>Purchase refunded</td>
                    </tr>
                </tbody>
            </table>

            <h3>reviews</h3>
            <p>Buyer ratings and comments for purchased DataPods.</p>

            <pre><code>{`CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchases(id) UNIQUE ON DELETE CASCADE,
    buyer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    datapod_id UUID REFERENCES datapods(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reviews_datapod ON reviews(datapod_id);
CREATE INDEX idx_reviews_buyer ON reviews(buyer_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);`}</code></pre>

            <h3>escrow_transactions</h3>
            <p>Tracks escrow state for each purchase.</p>

            <pre><code>{`CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES users(id),
    amount_sui DECIMAL(20, 9) NOT NULL,
    escrow_object_id VARCHAR(66),
    status VARCHAR(20) DEFAULT 'holding',
    created_at TIMESTAMP DEFAULT NOW(),
    released_at TIMESTAMP,
    
    CONSTRAINT check_escrow_status 
        CHECK (status IN ('holding', 'released', 'refunded'))
);

-- Indexes
CREATE INDEX idx_escrow_purchase ON escrow_transactions(purchase_id);
CREATE INDEX idx_escrow_status ON escrow_transactions(status);`}</code></pre>

            <h2>AI & Analytics Tables</h2>

            <h3>ai_conversations</h3>
            <pre><code>{`CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    total_tokens INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
    content TEXT NOT NULL,
    tokens INTEGER,
    context JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_conversations_user ON ai_conversations(user_id);
CREATE INDEX idx_messages_conversation ON ai_messages(conversation_id);`}</code></pre>

            <h3>download_logs</h3>
            <pre><code>{`CREATE TABLE download_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES users(id),
    datapod_id UUID REFERENCES datapods(id),
    downloaded_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_downloads_purchase ON download_logs(purchase_id);
CREATE INDEX idx_downloads_datapod ON download_logs(datapod_id);
CREATE INDEX idx_downloads_date ON download_logs(downloaded_at);`}</code></pre>

            <h2>Database Functions & Triggers</h2>

            <h3>Update Average Rating</h3>
            <pre><code>{`-- Trigger to update DataPod average rating after review
CREATE OR REPLACE FUNCTION update_datapod_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE datapods
    SET average_rating = (
        SELECT AVG(rating)
        FROM reviews
        WHERE datapod_id = NEW.datapod_id
    )
    WHERE id = NEW.datapod_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_datapod_rating
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_datapod_rating();`}</code></pre>

            <h3>Update Seller Rating</h3>
            <pre><code>{`-- Trigger to update seller average rating
CREATE OR REPLACE FUNCTION update_seller_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET average_rating = (
        SELECT AVG(d.average_rating)
        FROM datapods d
        WHERE d.seller_id = (
            SELECT seller_id FROM datapods WHERE id = NEW.datapod_id
        )
        AND d.average_rating > 0
    )
    WHERE id = (SELECT seller_id FROM datapods WHERE id = NEW.datapod_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_seller_rating
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_seller_rating();`}</code></pre>

            <h3>Update Purchase Counts</h3>
            <pre><code>{`-- Trigger to increment purchase counts
CREATE OR REPLACE FUNCTION increment_purchase_counts()
RETURNS TRIGGER AS $$
BEGIN
    -- Update DataPod purchase count
    UPDATE datapods
    SET purchase_count = purchase_count + 1
    WHERE id = NEW.datapod_id;
    
    -- Update buyer total purchases
    UPDATE users
    SET total_purchases = total_purchases + 1
    WHERE id = NEW.buyer_id;
    
    -- Update seller total sales
    UPDATE users
    SET total_sales = total_sales + 1
    WHERE id = (SELECT seller_id FROM datapods WHERE id = NEW.datapod_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_purchase_counts
    AFTER INSERT ON purchases
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE FUNCTION increment_purchase_counts();`}</code></pre>

            <h2>Database Queries</h2>

            <h3>Search DataPods</h3>
            <pre><code>{`SELECT 
    d.*,
    u.name as seller_name,
    u.average_rating as seller_rating,
    COUNT(p.id) as total_purchases,
    AVG(r.rating) as avg_rating
FROM datapods d
JOIN users u ON d.seller_id = u.id
LEFT JOIN purchases p ON d.id = p.datapod_id
LEFT JOIN reviews r ON d.id = r.datapod_id
WHERE 
    d.published = true
    AND d.category = $1
    AND d.price_sui BETWEEN $2 AND $3
    AND to_tsvector('english', d.title || ' ' || d.description) 
        @@ plainto_tsquery('english', $4)
GROUP BY d.id, u.name, u.average_rating
ORDER BY d.created_at DESC
LIMIT $5 OFFSET $6;`}</code></pre>

            <h3>Get Seller Analytics</h3>
            <pre><code>{`SELECT 
    COUNT(d.id) as total_datapods,
    COUNT(d.id) FILTER (WHERE d.published = true) as published_datapods,
    SUM(d.purchase_count) as total_sales,
    SUM(d.purchase_count * d.price_sui) as total_revenue,
    AVG(d.average_rating) as average_rating
FROM datapods d
WHERE d.seller_id = $1;`}</code></pre>

            <h3>Get Buyer Purchase History</h3>
            <pre><code>{`SELECT 
    p.*,
    d.title as datapod_title,
    d.category,
    u.name as seller_name,
    r.rating,
    r.comment
FROM purchases p
JOIN datapods d ON p.datapod_id = d.id
JOIN users u ON d.seller_id = u.id
LEFT JOIN reviews r ON p.id = r.purchase_id
WHERE p.buyer_id = $1
ORDER BY p.created_at DESC;`}</code></pre>

            <h2>Performance Optimization</h2>

            <h3>Connection Pooling</h3>
            <pre><code>{`// Backend configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});`}</code></pre>

            <h3>Query Optimization</h3>
            <ul>
                <li><strong>Indexes:</strong> B-tree indexes on foreign keys, unique constraints, and frequently queried fields</li>
                <li><strong>JSONB Indexes:</strong> GIN indexes on JSONB columns for efficient querying</li>
                <li><strong>Full-text Search:</strong> GiST indexes for text search on titles and descriptions</li>
                <li><strong>Partial Indexes:</strong> Indexes on frequently filtered subsets (e.g., published=true)</li>
            </ul>

            <h2>Backup & Recovery</h2>

            <h3>Automated Backups</h3>
            <pre><code>{`# Daily backup script
pg_dump -U postgres -d sourcenet -F c -f backup_\`date +%Y%m%d\`.dump

# Restore from backup
pg_restore -U postgres -d sourcenet -c backup_20241127.dump`}</code></pre>

            <h3>Point-in-Time Recovery</h3>
            <pre><code>{`# Enable WAL archiving in postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/archive/%f'`}</code></pre>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">🎉 Documentation Complete!</p>
                <p className="mb-0">
                    You've now explored the complete SourceNet documentation. Return to the
                    <a href="/docs"> Introduction</a> for an overview, or dive deeper into any section using the sidebar.
                </p>
            </div>
        </div>
    );
}
