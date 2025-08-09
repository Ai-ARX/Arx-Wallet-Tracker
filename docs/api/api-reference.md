# ARX Wallet Tracker API Reference

## Table of Contents
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [WebSocket Endpoints](#websocket-endpoints)
- [REST Endpoints](#rest-endpoints)
- [Error Handling](#error-handling)
- [Data Types](#data-types)

## Authentication

### API Key Authentication
```typescript
interface AuthConfig {
  apiKey: string;
  apiSecret?: string;
  region?: 'us' | 'eu' | 'asia';
  tier?: 'free' | 'pro' | 'enterprise';
}
```

### Bearer Token Authentication
```typescript
interface BearerAuth {
  token: string;
  refreshToken?: string;
  expiresIn: number;
  scope: string[];
}
```

## Rate Limiting

### Rate Limit Headers
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when limit resets
- `X-RateLimit-Retry-After`: Seconds until retry allowed

### Rate Limit Tiers
| Tier | Requests/Min | WebSocket Connections | Burst Limit |
|------|-------------|----------------------|-------------|
| Free | 60 | 1 | 10 |
| Pro | 600 | 10 | 100 |
| Enterprise | 6000 | 100 | 1000 |

## WebSocket Endpoints

### Connection URL
```
wss://api.arx-tracker.io/v1/stream
```

### Subscription Messages

#### Subscribe to Wallet
```json
{
  "id": "unique-message-id",
  "type": "SUBSCRIBE",
  "channel": "wallet",
  "params": {
    "addresses": ["wallet-address-1", "wallet-address-2"],
    "commitment": "confirmed",
    "encoding": "jsonParsed"
  }
}
```

#### Subscribe to Token
```json
{
  "id": "unique-message-id",
  "type": "SUBSCRIBE",
  "channel": "token",
  "params": {
    "tokens": ["token-mint-address"],
    "includeTransfers": true,
    "includePriceUpdates": true
  }
}
```

#### Subscribe to AI Signals
```json
{
  "id": "unique-message-id",
  "type": "SUBSCRIBE",
  "channel": "ai-signals",
  "params": {
    "wallets": ["wallet-address"],
    "signalTypes": ["WHALE_MOVEMENT", "UNUSUAL_ACTIVITY"],
    "minConfidence": 0.75
  }
}
```

### Stream Messages

#### Transaction Stream
```json
{
  "type": "DATA",
  "channel": "wallet",
  "data": {
    "signature": "transaction-signature",
    "slot": 123456789,
    "timestamp": 1234567890,
    "transaction": {
      "type": "TRANSFER",
      "from": "sender-address",
      "to": "recipient-address",
      "amount": 1000000000,
      "token": "SOL",
      "fee": 5000
    }
  }
}
```

#### AI Signal Stream
```json
{
  "type": "DATA",
  "channel": "ai-signals",
  "data": {
    "id": "signal-id",
    "signalType": "WHALE_MOVEMENT",
    "confidence": 0.92,
    "severity": "HIGH",
    "wallet": "whale-wallet-address",
    "prediction": {
      "action": "LARGE_SELL",
      "probability": 0.85,
      "timeframe": "1h"
    }
  }
}
```

## REST Endpoints

### Base URL
```
https://api.arx-tracker.io/v1
```

### Wallet Endpoints

#### GET /wallets/{address}
Retrieve wallet information

**Parameters:**
- `address` (path): Wallet address
- `include` (query): Comma-separated fields (balance,transactions,tokens)

**Response:**
```json
{
  "address": "wallet-address",
  "balance": {
    "native": 1000000000,
    "tokens": [
      {
        "mint": "token-mint",
        "amount": 1000000,
        "valueUSD": 100.50
      }
    ]
  },
  "metadata": {
    "firstSeen": "2024-01-01T00:00:00Z",
    "lastActivity": "2024-12-01T00:00:00Z",
    "transactionCount": 1500
  }
}
```

#### POST /wallets/track
Start tracking a wallet

**Request Body:**
```json
{
  "address": "wallet-address",
  "label": "Whale Wallet #1",
  "priority": "HIGH",
  "notifications": {
    "enabled": true,
    "threshold": 1000000,
    "channels": ["webhook", "email"]
  }
}
```

#### GET /wallets/{address}/transactions
Get wallet transaction history

**Parameters:**
- `address` (path): Wallet address
- `limit` (query): Number of transactions (default: 100, max: 1000)
- `before` (query): Cursor for pagination
- `after` (query): Cursor for pagination
- `type` (query): Filter by transaction type

**Response:**
```json
{
  "transactions": [
    {
      "signature": "tx-signature",
      "timestamp": "2024-12-01T00:00:00Z",
      "type": "SWAP",
      "status": "SUCCESS",
      "details": {
        "tokenIn": "token-mint-1",
        "tokenOut": "token-mint-2",
        "amountIn": 1000000,
        "amountOut": 950000,
        "program": "swap-program-id"
      }
    }
  ],
  "pagination": {
    "hasMore": true,
    "cursor": "next-cursor"
  }
}
```

### AI Analysis Endpoints

#### POST /analyze/wallet
Analyze wallet behavior using AI

**Request Body:**
```json
{
  "address": "wallet-address",
  "timeframe": "7d",
  "models": ["behavior", "risk", "prediction"],
  "includeCorrelations": true
}
```

**Response:**
```json
{
  "analysis": {
    "behaviorProfile": "SMART_MONEY",
    "riskScore": 0.35,
    "predictions": [
      {
        "type": "NEXT_ACTION",
        "value": "BUY",
        "confidence": 0.78,
        "timeHorizon": "24h"
      }
    ],
    "correlations": [
      {
        "wallet": "correlated-wallet",
        "coefficient": 0.82,
        "lag": 3600
      }
    ]
  }
}
```

#### GET /signals/recent
Get recent AI signals

**Parameters:**
- `limit` (query): Number of signals (default: 50)
- `severity` (query): Minimum severity level
- `confidence` (query): Minimum confidence score

**Response:**
```json
{
  "signals": [
    {
      "id": "signal-id",
      "timestamp": "2024-12-01T00:00:00Z",
      "type": "ACCUMULATION_PATTERN",
      "confidence": 0.88,
      "severity": "MEDIUM",
      "wallets": ["wallet-1", "wallet-2"],
      "metadata": {
        "pattern": "ascending_triangle",
        "duration": "72h",
        "strength": 0.75
      }
    }
  ]
}
```

### Token Endpoints

#### GET /tokens/{mint}
Get token information

**Parameters:**
- `mint` (path): Token mint address
- `include` (query): Additional data (price,volume,holders)

**Response:**
```json
{
  "mint": "token-mint",
  "symbol": "TOKEN",
  "name": "Token Name",
  "decimals": 9,
  "supply": "1000000000000000000",
  "price": {
    "usd": 0.001234,
    "change24h": 5.67,
    "volume24h": 1234567.89
  },
  "holders": 10000,
  "metadata": {
    "image": "https://token-image.url",
    "description": "Token description",
    "website": "https://token-website.url"
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "specific-field",
      "reason": "validation-error"
    },
    "timestamp": "2024-12-01T00:00:00Z",
    "requestId": "request-id-for-tracking"
  }
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|------------|-------------|
| INVALID_REQUEST | 400 | Malformed request |
| UNAUTHORIZED | 401 | Missing or invalid authentication |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| RATE_LIMITED | 429 | Rate limit exceeded |
| INTERNAL_ERROR | 500 | Server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |

## Data Types

### Timestamp Format
All timestamps use ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`

### Number Precision
- Amounts: String representation for arbitrary precision
- Prices: Decimal with up to 18 decimal places
- Percentages: Decimal between 0 and 100

### Address Format
- Solana addresses: Base58 encoded public keys
- Token mints: Base58 encoded mint addresses
- Transaction signatures: Base58 encoded signatures

### Pagination
```typescript
interface PaginationParams {
  limit?: number;
  cursor?: string;
  direction?: 'forward' | 'backward';
}

interface PaginationResponse {
  hasMore: boolean;
  cursor?: string;
  total?: number;
}
```
