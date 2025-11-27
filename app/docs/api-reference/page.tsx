export default function APIReferencePage() {
    return (
        <div>
            <h1>📡 API Reference</h1>

            <p className="text-xl text-gray-300 mb-8">
                Complete reference for all SourceNet backend API endpoints, including authentication, marketplace, seller, buyer, and review endpoints.
            </p>

            <div className="info-box">
                <p className="font-semibold text-blue-300 mb-2">🔑 Base URL</p>
                <code className="text-sm">https://api.sourcenet.example.com</code>
            </div>

            <h2>Authentication Endpoints</h2>

            <h3>POST /api/auth/salt</h3>
            <p>Get or create user salt for zkLogin authentication.</p>

            <table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}><strong>Request Body</strong></td>
                    </tr>
                    <tr>
                        <td>sub</td>
                        <td>string</td>
                        <td>Google user ID from JWT token</td>
                    </tr>
                    <tr>
                        <td colSpan={3}><strong>Response</strong></td>
                    </tr>
                    <tr>
                        <td>salt</td>
                        <td>string</td>
                        <td>256-bit random salt (hex encoded)</td>
                    </tr>
                </tbody>
            </table>

            <pre><code>{`// Request
POST /api/auth/salt
Content-Type: application/json

{
  "sub": "105628270296738955803"
}

// Response
{
  "success": true,
  "salt": "129390938109283091283091283091"
}`}</code></pre>

            <h3>POST /api/auth/zklogin</h3>
            <p>Authenticate user with Google JWT and zkLogin.</p>

            <pre><code>{`// Request
POST /api/auth/zklogin
Content-Type: application/json

{
  "id_token": "eyJhbGciOiJSUzI1NiIs...",
  "sui_address": "0x7b8a9c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b..."
}

// Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@gmail.com",
    "name": "John Doe",
    "suiAddress": "0x7b8a...",
    "createdAt": "2024-11-27T10:00:00Z"
  }
}`}</code></pre>

            <h3>GET /api/auth/me</h3>
            <p>Get current authenticated user information.</p>

            <pre><code>{`// Request
GET /api/auth/me
Authorization: Bearer <token>

// Response
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@gmail.com",
    "name": "John Doe",
    "suiAddress": "0x7b8a...",
    "averageRating": 4.5,
    "totalPurchases": 10,
    "totalSales": 5
  }
}`}</code></pre>

            <hr />

            <h2>Marketplace Endpoints</h2>

            <h3>GET /api/marketplace/datapods</h3>
            <p>List all published DataPods with filtering and pagination.</p>

            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>page</td>
                        <td>number</td>
                        <td>Page number (default: 1)</td>
                    </tr>
                    <tr>
                        <td>limit</td>
                        <td>number</td>
                        <td>Items per page (default: 20, max: 100)</td>
                    </tr>
                    <tr>
                        <td>category</td>
                        <td>string</td>
                        <td>Filter by category</td>
                    </tr>
                    <tr>
                        <td>minPrice</td>
                        <td>number</td>
                        <td>Minimum price in SUI</td>
                    </tr>
                    <tr>
                        <td>maxPrice</td>
                        <td>number</td>
                        <td>Maximum price in SUI</td>
                    </tr>
                    <tr>
                        <td>search</td>
                        <td>string</td>
                        <td>Search in title and description</td>
                    </tr>
                    <tr>
                        <td>sortBy</td>
                        <td>string</td>
                        <td>Sort field: price, rating, sales, date</td>
                    </tr>
                    <tr>
                        <td>order</td>
                        <td>string</td>
                        <td>asc or desc (default: desc)</td>
                    </tr>
                </tbody>
            </table>

            <pre><code>{`// Request
GET /api/marketplace/datapods?category=finance&minPrice=1&maxPrice=10&page=1&limit=20

// Response
{
  "success": true,
  "datapods": [
    {
      "id": "uuid",
      "title": "Stock Market Data 2024",
      "description": "Daily stock prices for S&P 500...",
      "category": "finance",
      "priceSui": 5.0,
      "fileSize": 52428800,
      "averageRating": 4.8,
      "totalSales": 156,
      "seller": {
        "id": "uuid",
        "name": "Data Corp",
        "averageRating": 4.7
      },
      "createdAt": "2024-11-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}`}</code></pre>

            <h3>GET /api/marketplace/datapods/:id</h3>
            <p>Get detailed information about a specific DataPod.</p>

            <pre><code>{`// Request
GET /api/marketplace/datapods/550e8400-e29b-41d4-a716-446655440000

// Response
{
  "success": true,
  "datapod": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Stock Market Data 2024",
    "description": "Daily stock prices for S&P 500 companies...",
    "category": "finance",
    "priceSui": 5.0,
    "fileSize": 52428800,
    "fileType": "text/csv",
    "schema": {
      "columns": ["date", "symbol", "open", "high", "low", "close", "volume"],
      "rowCount": 125000
    },
    "sampleData": [
      {
        "date": "2024-01-01",
        "symbol": "AAPL",
        "open": 182.15,
        "high": 185.33,
        "low": 181.50,
        "close": 184.40,
        "volume": 45678900
      }
    ],
    "averageRating": 4.8,
    "totalSales": 156,
    "seller": {
      "id": "uuid",
      "name": "Data Corp",
      "email": "contact@datacorp.com",
      "suiAddress": "0x...",
      "averageRating": 4.7
    },
    "createdAt": "2024-11-20T10:00:00Z",
    "updatedAt": "2024-11-25T15:30:00Z"
  }
}`}</code></pre>

            <hr />

            <h2>Seller Endpoints</h2>

            <h3>POST /api/seller/upload</h3>
            <p>Upload a new dataset file with metadata.</p>

            <pre><code>{`// Request
POST /api/seller/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary data>
metadata: {
  "title": "Stock Market Data 2024",
  "description": "Daily stock prices...",
  "category": "finance",
  "price": 5.0
}

// Response
{
  "success": true,
  "uploadId": "uuid",
  "preview": {
    "schema": {
      "columns": ["date", "symbol", "open", "high", "low", "close", "volume"],
      "rowCount": 125000
    },
    "sample": [...]
  }
}`}</code></pre>

            <h3>POST /api/seller/publish</h3>
            <p>Publish an uploaded DataPod to the marketplace.</p>

            <pre><code>{`// Request
POST /api/seller/publish
Authorization: Bearer <token>
Content-Type: application/json

{
  "datapodId": "uuid"
}

// Response
{
  "success": true,
  "datapod": {
    "id": "uuid",
    "published": true,
    "publishedAt": "2024-11-27T12:00:00Z"
  }
}`}</code></pre>

            <h3>GET /api/seller/datapods</h3>
            <p>List seller's own DataPods.</p>

            <pre><code>{`// Request
GET /api/seller/datapods?status=published&page=1&limit=10
Authorization: Bearer <token>

// Response
{
  "success": true,
  "datapods": [
    {
      "id": "uuid",
      "title": "Stock Market Data 2024",
      "published": true,
      "priceSui": 5.0,
      "totalSales": 156,
      "totalRevenue": 780.0,
      "averageRating": 4.8,
      "createdAt": "2024-11-20T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "pages": 1
  }
}`}</code></pre>

            <h3>GET /api/seller/stats</h3>
            <p>Get seller analytics and statistics.</p>

            <pre><code>{`// Request
GET /api/seller/stats
Authorization: Bearer <token>

// Response
{
  "success": true,
  "stats": {
    "totalDatapods": 5,
    "publishedDatapods": 4,
    "totalSales": 234,
    "totalRevenue": 1170.0,
    "averageRating": 4.7,
    "recentSales": [
      {
        "datapodTitle": "Stock Market Data 2024",
        "amount": 5.0,
        "buyer": "buyer@example.com",
        "purchasedAt": "2024-11-27T11:30:00Z"
      }
    ]
  }
}`}</code></pre>

            <hr />

            <h2>Buyer Endpoints</h2>

            <h3>POST /api/buyer/purchase</h3>
            <p>Record a purchase after on-chain transaction.</p>

            <pre><code>{`// Request
POST /api/buyer/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "datapod_id": "uuid",
  "payment_tx_digest": "0xabcd1234..."
}

// Response
{
  "success": true,
  "purchase": {
    "id": "uuid",
    "datapodId": "uuid",
    "buyerId": "uuid",
    "amountSui": 5.0,
    "paymentTxDigest": "0xabcd1234...",
    "status": "processing",
    "createdAt": "2024-11-27T12:00:00Z"
  }
}`}</code></pre>

            <h3>GET /api/buyer/purchases</h3>
            <p>List buyer's purchases.</p>

            <pre><code>{`// Request
GET /api/buyer/purchases?page=1&limit=10
Authorization: Bearer <token>

// Response
{
  "success": true,
  "purchases": [
    {
      "id": "uuid",
      "datapod": {
        "id": "uuid",
        "title": "Stock Market Data 2024",
        "seller": {
          "name": "Data Corp"
        }
      },
      "amountSui": 5.0,
      "status": "completed",
      "purchasedAt": "2024-11-27T12:00:00Z",
      "completedAt": "2024-11-27T12:05:00Z"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "pages": 1
  }
}`}</code></pre>

            <h3>GET /api/buyer/download/:purchaseId</h3>
            <p>Get download URL for a completed purchase.</p>

            <pre><code>{`// Request
GET /api/buyer/download/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <token>

// Response
{
  "success": true,
  "downloadUrl": "https://api.sourcenet.example.com/download/eyJhbG...",
  "filename": "Stock Market Data 2024.csv",
  "size": 52428800,
  "expiresIn": 3600
}`}</code></pre>

            <hr />

            <h2>Review Endpoints</h2>

            <h3>POST /api/buyer/purchase/:purchaseId/review</h3>
            <p>Submit a review for a purchase.</p>

            <pre><code>{`// Request
POST /api/buyer/purchase/550e8400-e29b-41d4-a716-446655440000/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent dataset! Very comprehensive and well-structured."
}

// Response
{
  "success": true,
  "review": {
    "id": "uuid",
    "purchaseId": "uuid",
    "datapodId": "uuid",
    "buyerId": "uuid",
    "rating": 5,
    "comment": "Excellent dataset!...",
    "createdAt": "2024-11-27T13:00:00Z"
  }
}`}</code></pre>

            <h3>GET /api/review/datapod/:datapodId</h3>
            <p>Get reviews for a specific DataPod.</p>

            <pre><code>{`// Request
GET /api/review/datapod/550e8400-e29b-41d4-a716-446655440000?page=1&limit=10

// Response
{
  "success": true,
  "reviews": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Excellent dataset!...",
      "buyer": {
        "name": "John Doe"
      },
      "createdAt": "2024-11-27T13:00:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3
  },
  "averageRating": 4.8
}`}</code></pre>

            <hr />

            <h2>AI Endpoints</h2>

            <h3>POST /api/ai/chat</h3>
            <p>Send a message to the AI assistant.</p>

            <pre><code>{`// Request
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "How do I create a DataPod?",
  "conversationId": "uuid", // optional
  "context": {
    "dataPodId": "uuid", // optional
    "page": "seller-dashboard"
  }
}

// Response
{
  "success": true,
  "data": {
    "conversationId": "uuid",
    "message": "To create a DataPod, navigate to the Seller Dashboard...",
    "timestamp": "2024-11-27T14:00:00Z",
    "tokens": {
      "prompt": 50,
      "completion": 100,
      "total": 150
    }
  }
}`}</code></pre>

            <hr />

            <h2>Error Responses</h2>

            <p>All error responses follow this format:</p>

            <pre><code>{`{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {} // optional
}`}</code></pre>

            <h3>Common Error Codes</h3>

            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>HTTP Status</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>UNAUTHORIZED</td>
                        <td>401</td>
                        <td>Invalid or missing authentication token</td>
                    </tr>
                    <tr>
                        <td>FORBIDDEN</td>
                        <td>403</td>
                        <td>User doesn't have permission for this action</td>
                    </tr>
                    <tr>
                        <td>NOT_FOUND</td>
                        <td>404</td>
                        <td>Resource not found</td>
                    </tr>
                    <tr>
                        <td>VALIDATION_ERROR</td>
                        <td>400</td>
                        <td>Invalid request parameters</td>
                    </tr>
                    <tr>
                        <td>RATE_LIMIT_EXCEEDED</td>
                        <td>429</td>
                        <td>Too many requests</td>
                    </tr>
                    <tr>
                        <td>INTERNAL_ERROR</td>
                        <td>500</td>
                        <td>Server error</td>
                    </tr>
                </tbody>
            </table>

            <h2>Rate Limiting</h2>

            <table>
                <thead>
                    <tr>
                        <th>Endpoint Group</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Authentication</td>
                        <td>5 requests/min per IP</td>
                    </tr>
                    <tr>
                        <td>Marketplace (public)</td>
                        <td>100 requests/min per IP</td>
                    </tr>
                    <tr>
                        <td>Authenticated endpoints</td>
                        <td>20 requests/min per user</td>
                    </tr>
                    <tr>
                        <td>AI endpoints</td>
                        <td>20 requests/min per user</td>
                    </tr>
                    <tr>
                        <td>File upload</td>
                        <td>5 uploads/hour per user</td>
                    </tr>
                </tbody>
            </table>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">📚 API Complete</p>
                <p className="mb-0">
                    You now have a complete API reference. Check out the
                    <a href="/docs/database"> Database Schema</a> to understand data storage,
                    or return to <a href="/docs">Introduction</a> for an overview.
                </p>
            </div>
        </div>
    );
}
