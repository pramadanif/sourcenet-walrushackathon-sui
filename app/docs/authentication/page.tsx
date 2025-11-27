export default function AuthenticationPage() {
    return (
        <div>
            <h1>🔐 Authentication Flow</h1>

            <p className="text-xl text-gray-300 mb-8">
                SourceNet uses zkLogin - a privacy-preserving authentication system that combines Zero-Knowledge proofs with OAuth 2.0, allowing users to authenticate without exposing private keys.
            </p>

            <h2>What is zkLogin?</h2>

            <p>
                zkLogin is a cryptographic authentication method developed by Mysten Labs that enables users to:
            </p>

            <ul>
                <li><strong>Login with familiar OAuth providers</strong> (Google, Facebook, etc.)</li>
                <li><strong>No wallet installation required</strong> - reduces friction for new users</li>
                <li><strong>Maintain privacy</strong> - identity provider doesn't know blockchain address</li>
                <li><strong>Full control</strong> - users maintain complete control over their assets</li>
                <li><strong>Sign transactions</strong> - execute blockchain transactions securely</li>
            </ul>

            <div className="info-box">
                <p className="font-semibold text-blue-300 mb-2">💡 Key Concept</p>
                <p className="mb-0">
                    zkLogin derives a deterministic SUI address from the user's OAuth identity (e.g., Google ID)
                    combined with a unique salt. This means the same Google account always maps to the same SUI address.
                </p>
            </div>

            <h2>Complete Authentication Flow</h2>

            <h3>Phase 1: OAuth Authentication</h3>

            <pre><code>{`┌─────────┐
│  User   │ Clicks "Login with Google"
└────┬────┘
     │
     ▼
┌──────────────┐
│  Frontend    │ Generate nonce & state
└──────┬───────┘
       │
       │ Redirect to Google OAuth
       ▼
┌──────────────┐
│   Google     │ Show consent screen
└──────┬───────┘
       │
       │ User approves
       ▼
┌──────────────┐
│  Frontend    │ Receive id_token (JWT)
└──────────────┘`}</code></pre>

            <h4>Step 1: Initiate OAuth Flow</h4>
            <pre><code>{`// Frontend: Initiate Google OAuth
const initiateLogin = () => {
  const nonce = generateRandomNonce();
  const state = generateRandomState();
  
  // Store nonce for later verification
  sessionStorage.setItem('zklogin_nonce', nonce);
  
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: \`\${window.location.origin}/callback\`,
    response_type: 'id_token',
    scope: 'openid email profile',
    nonce: nonce,
    state: state,
  });
  
  window.location.href = \`https://accounts.google.com/o/oauth2/v2/auth?\${params}\`;
};`}</code></pre>

            <h4>Step 2: Handle OAuth Callback</h4>
            <pre><code>{`// Frontend: Extract JWT from callback
const handleCallback = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const idToken = params.get('id_token');
  
  // Decode JWT to extract user info
  const decoded = jwt_decode(idToken);
  console.log(decoded);
  // {
  //   sub: "105628...", // Google user ID
  //   email: "user@gmail.com",
  //   aud: "your-client-id",
  //   iss: "https://accounts.google.com"
  // }
};`}</code></pre>

            <h3>Phase 2: zkLogin Setup</h3>

            <h4>Step 3: Generate Ephemeral Key Pair</h4>
            <pre><code>{`import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

// Generate ephemeral keypair (temporary, not stored)
const ephemeralKeyPair = new Ed25519Keypair();
const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();

console.log('Ephemeral Public Key:', ephemeralPublicKey.toBase64());`}</code></pre>

            <h4>Step 4: Request User Salt</h4>
            <pre><code>{`// Frontend: Request salt from backend
const getSalt = async (sub: string) => {
  const response = await fetch('/api/auth/salt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sub })
  });
  
  const { salt } = await response.json();
  return salt; // e.g., "129390938109283091283091283091"
};`}</code></pre>

            <pre><code>{`// Backend: Generate or retrieve salt
async function getUserSalt(sub: string): Promise<string> {
  let user = await User.findOne({ where: { google_id: sub } });
  
  if (!user) {
    // Generate new salt for new user
    const salt = generateRandomSalt(); // 256-bit random
    user = await User.create({
      google_id: sub,
      salt: salt
    });
  }
  
  return user.salt;
}`}</code></pre>

            <h4>Step 5: Request ZK Proof from Mysten Labs</h4>
            <pre><code>{`import { getZkLoginSignature } from '@mysten/zklogin';

// Request ZK proof
const getZKProof = async (jwt: string, salt: string, ephemeralKeyPair) => {
  const response = await fetch('https://prover-dev.mystenlabs.com/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jwt,
      extendedEphemeralPublicKey: ephemeralKeyPair.getPublicKey().toSuiBytes(),
      maxEpoch: getCurrentEpoch() + 10,
      jwtRandomness: salt,
      salt: salt,
      keyClaimName: 'sub'
    })
  });
  
  const { zkProof, maxEpoch } = await response.json();
  return { zkProof, maxEpoch };
};`}</code></pre>

            <div className="warning-box">
                <p className="font-semibold text-orange-300 mb-2">⚠️ Important</p>
                <p className="mb-0">
                    The ZK proof generation can take 5-10 seconds. Show a loading indicator to the user during this process.
                </p>
            </div>

            <h4>Step 6: Derive SUI Address</h4>
            <pre><code>{`import { jwtToAddress, genAddressSeed } from '@mysten/zklogin';

// Compute address seed
const addressSeed = genAddressSeed(
  BigInt(salt),
  'sub',
  jwtPayload.sub,
  jwtPayload.aud
);

// Derive SUI address
const suiAddress = jwtToAddress(jwt, salt);

console.log('SUI Address:', suiAddress);
// Output: "0x7b8a9c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b"`}</code></pre>

            <h3>Phase 3: Backend Authentication</h3>

            <h4>Step 7: Authenticate with Backend</h4>
            <pre><code>{`// Frontend: Send JWT and SUI address to backend
const authenticate = async (jwt: string, suiAddress: string) => {
  const response = await fetch('/api/auth/zklogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_token: jwt,
      sui_address: suiAddress
    })
  });
  
  const { token, user } = await response.json();
  
  // Store session token
  localStorage.setItem('token', token);
  
  return { token, user };
};`}</code></pre>

            <h4>Step 8: Backend Validation</h4>
            <pre><code>{`// Backend: Validate JWT and create session
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

async function zkloginAuth(req, res) {
  const { id_token, sui_address } = req.body;
  
  // 1. Verify JWT signature with Google's public key
  const client = jwksClient({
    jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
  });
  
  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  };
  
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(id_token, getKey, {
      algorithms: ['RS256'],
      audience: process.env.GOOGLE_CLIENT_ID,
      issuer: 'https://accounts.google.com'
    }, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
  
  // 2. Find or create user
  const user = await User.findOrCreate({
    where: { google_id: decoded.sub },
    defaults: {
      email: decoded.email,
      name: decoded.name,
      sui_address: sui_address
    }
  });
  
  // 3. Generate session JWT
  const sessionToken = jwt.sign(
    {
      userId: user.id,
      suiAddress: user.sui_address,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({
    token: sessionToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      suiAddress: user.sui_address
    }
  });
}`}</code></pre>

            <h2>Transaction Signing with zkLogin</h2>

            <p>
                Once authenticated, users can sign blockchain transactions using their zkLogin credentials.
            </p>

            <h3>Building a Transaction</h3>
            <pre><code>{`import { TransactionBlock } from '@mysten/sui.js/transactions';

// Create transaction block
const tx = new TransactionBlock();

// Example: Transfer SUI
const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]); // 1 SUI
tx.transferObjects([coin], tx.pure(recipientAddress));

// Set sender
tx.setSender(userSuiAddress);`}</code></pre>

            <h3>Signing with zkLogin</h3>
            <pre><code>{`import { getZkLoginSignature } from '@mysten/zklogin';

// Sign transaction with ephemeral key
const signature = await tx.sign({
  client: suiClient,
  signer: ephemeralKeyPair
});

// Create zkLogin signature
const zkLoginSignature = getZkLoginSignature({
  inputs: {
    ...zkProof,
    addressSeed: addressSeed.toString()
  },
  maxEpoch,
  userSignature: signature
});

// Execute transaction
const result = await suiClient.executeTransactionBlock({
  transactionBlock: tx,
  signature: zkLoginSignature,
  options: {
    showEffects: true,
    showObjectChanges: true
  }
});

console.log('Transaction digest:', result.digest);`}</code></pre>

            <h2>Security Considerations</h2>

            <table>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Security Measure</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Salt Storage</td>
                        <td>Salts stored in database, never exposed to client</td>
                    </tr>
                    <tr>
                        <td>JWT Validation</td>
                        <td>Signature verified with Google's public keys</td>
                    </tr>
                    <tr>
                        <td>Ephemeral Keys</td>
                        <td>Generated per-session, never persisted</td>
                    </tr>
                    <tr>
                        <td>Session Expiry</td>
                        <td>7-day JWT expiration, refresh required</td>
                    </tr>
                    <tr>
                        <td>Nonce Validation</td>
                        <td>Prevents replay attacks</td>
                    </tr>
                </tbody>
            </table>

            <h2>Session Management</h2>

            <h3>Storing Session</h3>
            <pre><code>{`// Store in localStorage
localStorage.setItem('token', sessionToken);
localStorage.setItem('suiAddress', suiAddress);

// Store ephemeral keypair (encrypted)
const encryptedKey = encrypt(ephemeralKeyPair.export(), password);
sessionStorage.setItem('ephemeral_key', encryptedKey);`}</code></pre>

            <h3>Refreshing Session</h3>
            <pre><code>{`// Check token expiry
const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  
  const decoded = jwt_decode(token);
  return decoded.exp < Date.now() / 1000;
};

// Re-authenticate if expired
if (isTokenExpired()) {
  // Redirect to login
  window.location.href = '/login';
}`}</code></pre>

            <div className="success-box mt-8">
                <p className="font-semibold text-green-300 mb-2">✅ Authentication Complete</p>
                <p className="mb-0">
                    Once authenticated, users can interact with the marketplace. Learn about the
                    <a href="/docs/flows/buyer"> Buyer Flow</a> to see how purchases work with zkLogin.
                </p>
            </div>
        </div>
    );
}
