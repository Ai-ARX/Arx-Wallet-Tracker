/**
 * Protocol Integration Type Definitions
 * 
 * Comprehensive TypeScript interfaces for integrating with various
 * blockchain protocols, DeFi platforms, and financial services.
 * 
 * @module ProtocolIntegrationTypes
 * @version 3.2.0
 */

/**
 * Base interface for all protocol integrations
 */
export interface BaseProtocolIntegration {
  /** Unique protocol identifier */
  protocolId: string;
  
  /** Protocol name and version */
  name: string;
  version: string;
  
  /** Supported blockchain networks */
  supportedNetworks: BlockchainNetwork[];
  
  /** Protocol category and type */
  category: ProtocolCategory;
  type: ProtocolType;
  
  /** Integration configuration */
  config: ProtocolConfig;
  
  /** Connection status and health */
  status: ConnectionStatus;
  
  /** Rate limiting and throttling */
  rateLimits: RateLimit[];
  
  /** Last updated timestamp */
  lastUpdated: Date;
  
  /** Integration-specific metadata */
  metadata: ProtocolMetadata;
}

/**
 * Blockchain network definitions
 */
export interface BlockchainNetwork {
  /** Network identifier */
  networkId: string;
  
  /** Network name (e.g., "Ethereum", "Solana") */
  name: string;
  
  /** Chain ID for EVM-compatible chains */
  chainId?: number;
  
  /** Network type classification */
  type: 'mainnet' | 'testnet' | 'devnet' | 'private';
  
  /** RPC endpoint configurations */
  rpcEndpoints: RPCEndpoint[];
  
  /** Native token information */
  nativeToken: NativeTokenInfo;
  
  /** Block confirmation requirements */
  confirmations: {
    fast: number;      // 1-3 blocks
    standard: number;  // 6-12 blocks
    secure: number;    // 20+ blocks
  };
  
  /** Average block time in seconds */
  averageBlockTime: number;
  
  /** Fee estimation parameters */
  feeParameters: FeeParameters;
}

/**
 * Protocol categories and classifications
 */
export type ProtocolCategory = 
  | 'dex'           // Decentralized exchanges
  | 'lending'       // Lending/borrowing protocols
  | 'staking'       // Staking and liquid staking
  | 'yield-farming' // Yield farming protocols
  | 'bridge'        // Cross-chain bridges
  | 'derivatives'   // Derivatives and synthetics
  | 'insurance'     // DeFi insurance protocols
  | 'payments'      // Payment processors
  | 'identity'      // Identity and reputation
  | 'governance'    // Governance protocols
  | 'oracle'        // Price and data oracles
  | 'analytics'     // Analytics and indexing
  | 'custody'       // Custody and wallet services
  | 'compliance';   // Compliance and regulation

export type ProtocolType = 
  | 'amm'           // Automated Market Maker
  | 'orderbook'     // Order book based
  | 'p2p'           // Peer-to-peer
  | 'pool-based'    // Liquidity pool based
  | 'vault'         // Strategy vaults
  | 'synthetic'     // Synthetic assets
  | 'wrapper'       // Token wrappers
  | 'aggregator'    // Protocol aggregators
  | 'index'         // Index protocols
  | 'lottery'       // No-loss lottery
  | 'perpetual'     // Perpetual contracts
  | 'option'        // Options protocols
  | 'prediction';   // Prediction markets

/**
 * DeFi Protocol Integration Interfaces
 */

/**
 * Decentralized Exchange (DEX) integration
 */
export interface DEXIntegration extends BaseProtocolIntegration {
  category: 'dex';
  
  /** Trading pairs supported */
  supportedPairs: TradingPair[];
  
  /** Liquidity pool information */
  liquidityPools: LiquidityPool[];
  
  /** Fee structure */
  feeStructure: DEXFeeStructure;
  
  /** Swap routing capabilities */
  routingEngine: SwapRoutingEngine;
  
  /** Price impact calculations */
  priceImpactCalculator: PriceImpactCalculator;
  
  /** MEV protection features */
  mevProtection: MEVProtection;
}

/**
 * Lending Protocol Integration
 */
export interface LendingProtocolIntegration extends BaseProtocolIntegration {
  category: 'lending';
  
  /** Available lending markets */
  markets: LendingMarket[];
  
  /** Supported collateral types */
  collateralTypes: CollateralAsset[];
  
  /** Interest rate models */
  interestRateModels: InterestRateModel[];
  
  /** Liquidation parameters */
  liquidationParameters: LiquidationConfig;
  
  /** Risk assessment metrics */
  riskMetrics: LendingRiskMetrics;
}

/**
 * Staking Protocol Integration
 */
export interface StakingProtocolIntegration extends BaseProtocolIntegration {
  category: 'staking';
  
  /** Available staking pools */
  stakingPools: StakingPool[];
  
  /** Validator information */
  validators: ValidatorInfo[];
  
  /** Reward distribution mechanism */
  rewardDistribution: RewardDistribution;
  
  /** Slashing conditions and risks */
  slashingRisks: SlashingRisk[];
  
  /** Unbonding periods */
  unbondingPeriods: UnbondingPeriod[];
}

/**
 * Cross-chain Bridge Integration
 */
export interface BridgeIntegration extends BaseProtocolIntegration {
  category: 'bridge';
  
  /** Supported bridge routes */
  routes: BridgeRoute[];
  
  /** Security model */
  securityModel: BridgeSecurityModel;
  
  /** Transfer limits and fees */
  transferLimits: TransferLimit[];
  
  /** Verification requirements */
  verificationRequirements: VerificationRequirement[];
  
  /** Bridge transaction tracking */
  transactionTracker: BridgeTransactionTracker;
}

/**
 * Supporting Type Definitions
 */

export interface RPCEndpoint {
  url: string;
  priority: number;
  reliability: number;
  latency: number;
  rateLimit: RateLimit;
  authentication?: {
    type: 'api-key' | 'jwt' | 'basic';
    credentials: Record<string, string>;
  };
}

export interface NativeTokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  contractAddress?: string;
}

export interface FeeParameters {
  gasLimit: {
    transfer: number;
    contractInteraction: number;
    complexTransaction: number;
  };
  feeMultipliers: {
    slow: number;
    standard: number;
    fast: number;
  };
  maxFeePerGas?: number;
  maxPriorityFeePerGas?: number;
}

export interface ProtocolConfig {
  /** API endpoints and keys */
  endpoints: APIEndpoint[];
  
  /** Connection timeouts */
  timeouts: {
    connection: number;
    read: number;
    write: number;
  };
  
  /** Retry configuration */
  retryPolicy: RetryPolicy;
  
  /** Cache configuration */
  caching: CacheConfig;
  
  /** Feature flags */
  features: FeatureFlags;
  
  /** Environment-specific settings */
  environment: 'development' | 'staging' | 'production';
}

export interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: Date;
  latency: number;
  errorCount: number;
  healthScore: number;
  lastError?: Error;
}

export interface RateLimit {
  resource: string;
  limit: number;
  window: number; // seconds
  currentUsage: number;
  resetTime: Date;
}

export interface ProtocolMetadata {
  /** Protocol documentation URLs */
  documentation: string[];
  
  /** Official website */
  website: string;
  
  /** Social media links */
  socialMedia: SocialMediaLink[];
  
  /** Security audit reports */
  audits: SecurityAudit[];
  
  /** TVL and volume statistics */
  statistics: ProtocolStatistics;
  
  /** Protocol governance information */
  governance: GovernanceInfo;
}

export interface TradingPair {
  baseToken: TokenInfo;
  quoteToken: TokenInfo;
  contractAddress: string;
  isActive: boolean;
  minimumOrderSize: number;
  tickSize: number;
  fees: {
    maker: number;
    taker: number;
  };
}

export interface LiquidityPool {
  address: string;
  tokens: TokenInfo[];
  reserves: number[];
  totalSupply: number;
  fee: number;
  volume24h: number;
  apr: number;
  incentives: IncentiveProgram[];
}

export interface DEXFeeStructure {
  tradingFee: number;
  protocolFee: number;
  lpFee: number;
  feeDistribution: FeeDistribution;
  volumeDiscounts: VolumeDiscount[];
}

export interface SwapRoutingEngine {
  /** Maximum number of hops */
  maxHops: number;
  
  /** Supported routing algorithms */
  algorithms: ('dijkstra' | 'bellman-ford' | 'a-star')[];
  
  /** Price impact threshold for routing */
  priceImpactThreshold: number;
  
  /** Gas optimization features */
  gasOptimization: boolean;
  
  /** Multi-path routing support */
  multiPath: boolean;
}

export interface PriceImpactCalculator {
  /** Price impact calculation method */
  method: 'constant-product' | 'stable-swap' | 'weighted-pool';
  
  /** Slippage tolerance settings */
  slippageTolerance: {
    minimum: number;
    maximum: number;
    default: number;
  };
  
  /** Price impact warning thresholds */
  warningThresholds: {
    low: number;    // 1%
    medium: number; // 3%
    high: number;   // 10%
  };
}

export interface MEVProtection {
  /** MEV protection mechanisms */
  mechanisms: MEVProtectionMechanism[];
  
  /** Private mempool support */
  privateMempool: boolean;
  
  /** Batch auction support */
  batchAuction: boolean;
  
  /** Commit-reveal schemes */
  commitReveal: boolean;
  
  /** MEV protection fees */
  protectionFee: number;
}

export interface LendingMarket {
  asset: TokenInfo;
  supplyAPY: number;
  borrowAPY: number;
  totalSupply: number;
  totalBorrow: number;
  utilizationRate: number;
  collateralFactor: number;
  liquidationThreshold: number;
  reserveFactor: number;
}

export interface CollateralAsset {
  token: TokenInfo;
  collateralFactor: number;
  liquidationThreshold: number;
  liquidationPenalty: number;
  maxSupply: number;
  priceOracle: PriceOracle;
}

export interface InterestRateModel {
  modelType: 'linear' | 'kinked' | 'triple-slope' | 'dynamic';
  parameters: {
    baseRate: number;
    multiplier: number;
    kinkUtilization?: number;
    jumpMultiplier?: number;
  };
  optimalUtilization: number;
}

export interface LiquidationConfig {
  closeFactor: number;
  liquidationIncentive: number;
  gracePeriod: number; // seconds
  minCollateralRatio: number;
  healthFactorThreshold: number;
}

export interface StakingPool {
  poolId: string;
  validator: string;
  stakedAmount: number;
  apr: number;
  commission: number;
  minStake: number;
  lockupPeriod: number;
  slashingRisk: number;
}

export interface ValidatorInfo {
  validatorAddress: string;
  name: string;
  commission: number;
  selfStake: number;
  delegatedStake: number;
  uptime: number;
  slashingHistory: SlashingEvent[];
  reputation: number;
}

export interface RewardDistribution {
  frequency: 'block' | 'epoch' | 'daily' | 'weekly';
  mechanism: 'automatic' | 'claim-required';
  compoundingAvailable: boolean;
  taxImplications: TaxImplication[];
}

export interface BridgeRoute {
  sourceNetwork: string;
  destinationNetwork: string;
  supportedTokens: TokenInfo[];
  fee: BridgeFee;
  estimatedTime: number; // seconds
  securityLevel: 'high' | 'medium' | 'low';
  dailyLimit: number;
}

export interface BridgeSecurityModel {
  type: 'optimistic' | 'zk-proof' | 'multi-sig' | 'validator-set' | 'hash-lock';
  validators: number;
  requiredSignatures: number;
  challengePeriod?: number; // seconds
  fraudProofWindow?: number; // seconds
}

export interface TransferLimit {
  token: string;
  minAmount: number;
  maxAmount: number;
  dailyLimit: number;
  weeklyLimit: number;
  verificationTiers: VerificationTier[];
}

// Additional supporting interfaces...

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
  verified: boolean;
  tags: string[];
}

export interface APIEndpoint {
  url: string;
  type: 'rest' | 'graphql' | 'websocket' | 'rpc';
  version: string;
  authentication: AuthConfig;
  rateLimit: RateLimit;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffStrategy: 'exponential' | 'linear' | 'fixed';
  initialDelay: number;
  maxDelay: number;
  jitter: boolean;
}

export interface CacheConfig {
  enabled: boolean;
  ttl: number; // seconds
  maxSize: number;
  strategy: 'lru' | 'lfu' | 'fifo';
}

export interface FeatureFlags {
  [feature: string]: boolean;
}

export interface SocialMediaLink {
  platform: 'twitter' | 'discord' | 'telegram' | 'reddit' | 'medium';
  url: string;
  verified: boolean;
}

export interface SecurityAudit {
  auditor: string;
  date: Date;
  reportUrl: string;
  score: number;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface ProtocolStatistics {
  tvl: number;
  volume24h: number;
  volume7d: number;
  volume30d: number;
  fees24h: number;
  users24h: number;
  transactions24h: number;
  lastUpdated: Date;
}

export interface GovernanceInfo {
  governanceToken?: TokenInfo;
  votingMechanism: 'token-weighted' | 'quadratic' | 'reputation-based';
  proposalThreshold: number;
  quorumRequirement: number;
  votingPeriod: number; // seconds
  timelockPeriod: number; // seconds
}

export interface IncentiveProgram {
  type: 'liquidity-mining' | 'trading-rewards' | 'referral' | 'governance';
  rewardToken: TokenInfo;
  apr: number;
  duration: number; // seconds
  eligibilityRequirements: string[];
}

export interface FeeDistribution {
  lpProviders: number;
  protocol: number;
  buyback: number;
  treasury: number;
  governance: number;
}

export interface VolumeDiscount {
  tierName: string;
  minimumVolume: number; // 30-day volume
  discountPercentage: number;
}

export interface MEVProtectionMechanism {
  name: string;
  description: string;
  effectiveness: number; // 0-100
  gasOverhead: number;
  supported: boolean;
}

export interface PriceOracle {
  type: 'chainlink' | 'pyth' | 'band' | 'uniswap-twap' | 'custom';
  address: string;
  updateFrequency: number; // seconds
  priceDeviation: number;
  heartbeat: number; // seconds
}

export interface SlashingEvent {
  date: Date;
  reason: string;
  amountSlashed: number;
  penalty: number;
}

export interface TaxImplication {
  jurisdiction: string;
  taxEvent: 'staking-reward' | 'unstaking' | 'slash';
  taxTreatment: string;
  documentation: string[];
}

export interface BridgeFee {
  fixedFee: number;
  percentageFee: number;
  gasReimbursement: boolean;
  feeToken: TokenInfo;
}

export interface VerificationRequirement {
  tier: number;
  dailyLimit: number;
  requirements: string[];
  documentationNeeded: string[];
}

export interface VerificationTier {
  level: number;
  name: string;
  dailyLimit: number;
  monthlyLimit: number;
  requirements: string[];
}

export interface BridgeTransactionTracker {
  trackingUrl: string;
  supportedEvents: string[];
  webhookSupport: boolean;
  estimatedConfirmationTime: number;
}

export interface AuthConfig {
  type: 'none' | 'api-key' | 'jwt' | 'oauth2' | 'hmac';
  credentials?: Record<string, string>;
  refreshable: boolean;
  expirationTime?: number;
}

export interface LendingRiskMetrics {
  protocolRisk: number;
  liquidityRisk: number;
  smartContractRisk: number;
  oracleRisk: number;
  governanceRisk: number;
  overallRisk: number;
}

export interface SlashingRisk {
  condition: string;
  probability: number;
  maxSlashingAmount: number;
  historicalOccurrence: number;
}

export interface UnbondingPeriod {
  network: string;
  duration: number; // seconds
  earlyWithdrawalPenalty?: number;
  partialUnbonding: boolean;
}

/**
 * Integration factory and registry interfaces
 */
export interface ProtocolIntegrationType {
  create: (config: ProtocolConfig) => BaseProtocolIntegration;
  validate: (config: ProtocolConfig) => ValidationResult;
  healthCheck: (integration: BaseProtocolIntegration) => Promise<HealthCheckResult>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  uptime: number;
  lastChecked: Date;
  issues: HealthIssue[];
}

export interface HealthIssue {
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  affectedFeatures: string[];
}

/**
 * Protocol Registry for managing all integrations
 */
export interface ProtocolRegistry {
  register: (integration: BaseProtocolIntegration) => void;
  unregister: (protocolId: string) => void;
  get: (protocolId: string) => BaseProtocolIntegration | undefined;
  list: (category?: ProtocolCategory) => BaseProtocolIntegration[];
  search: (query: ProtocolSearchQuery) => BaseProtocolIntegration[];
  healthCheck: () => Promise<RegistryHealthReport>;
}

export interface ProtocolSearchQuery {
  category?: ProtocolCategory;
  type?: ProtocolType;
  network?: string;
  features?: string[];
  minTvl?: number;
  maxFee?: number;
}

export interface RegistryHealthReport {
  totalProtocols: number;
  healthyProtocols: number;
  degradedProtocols: number;
  unhealthyProtocols: number;
  lastUpdated: Date;
  criticalIssues: HealthIssue[];
}
