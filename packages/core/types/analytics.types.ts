/**
 * Advanced Analytics Type Definitions for ARX Wallet Tracker
 * 
 * This module defines comprehensive TypeScript interfaces for blockchain
 * analytics, risk assessment, and predictive modeling systems.
 * 
 * @module AnalyticsTypes
 * @version 1.0.0
 */

/**
 * Represents a comprehensive wallet analytics profile
 */
export interface WalletAnalyticsProfile {
  /** Unique wallet identifier */
  walletAddress: string;
  
  /** Behavioral analysis metrics */
  behaviorMetrics: BehaviorMetrics;
  
  /** Risk assessment scores */
  riskProfile: RiskProfile;
  
  /** Transaction pattern analysis */
  transactionPatterns: TransactionPatterns;
  
  /** Network connectivity analysis */
  networkAnalysis: NetworkAnalysis;
  
  /** Temporal activity patterns */
  temporalPatterns: TemporalPatterns;
  
  /** Profitability and performance metrics */
  performanceMetrics: PerformanceMetrics;
  
  /** Last updated timestamp */
  lastUpdated: Date;
  
  /** Confidence score for the analysis (0-1) */
  confidenceScore: number;
}

/**
 * Behavioral analysis metrics for wallet activities
 */
export interface BehaviorMetrics {
  /** Average transaction frequency per day */
  avgTransactionFrequency: number;
  
  /** Preferred transaction times (hours) */
  preferredTransactionHours: number[];
  
  /** Token holding duration patterns */
  holdingDurationPatterns: HoldingDurationPattern[];
  
  /** Trading behavior classification */
  tradingBehavior: TradingBehaviorType;
  
  /** Diversification index (0-1) */
  diversificationIndex: number;
  
  /** Liquidity preference score */
  liquidityPreference: number;
  
  /** Risk tolerance indicator */
  riskTolerance: RiskToleranceLevel;
  
  /** MEV (Maximal Extractable Value) activities */
  mevActivities: MEVActivityMetrics;
}

/**
 * Comprehensive risk assessment profile
 */
export interface RiskProfile {
  /** Overall risk score (0-100) */
  overallRiskScore: number;
  
  /** Counterparty risk assessment */
  counterpartyRisk: CounterpartyRisk;
  
  /** Liquidity risk indicators */
  liquidityRisk: LiquidityRisk;
  
  /** Smart contract interaction risks */
  smartContractRisk: SmartContractRisk;
  
  /** Market risk exposure */
  marketRisk: MarketRisk;
  
  /** Regulatory compliance risk */
  regulatoryRisk: RegulatoryRisk;
  
  /** Historical risk events */
  riskEvents: RiskEvent[];
}

/**
 * Transaction pattern analysis structures
 */
export interface TransactionPatterns {
  /** Frequency distribution analysis */
  frequencyDistribution: FrequencyDistribution;
  
  /** Value distribution patterns */
  valueDistribution: ValueDistribution;
  
  /** Gas usage patterns */
  gasPatterns: GasUsagePatterns;
  
  /** Interaction patterns with protocols */
  protocolInteractions: ProtocolInteractionPattern[];
  
  /** Cross-chain activity patterns */
  crossChainPatterns: CrossChainPattern[];
  
  /** Seasonal trading patterns */
  seasonalPatterns: SeasonalPattern[];
}

/**
 * Network connectivity and relationship analysis
 */
export interface NetworkAnalysis {
  /** Direct connections to other wallets */
  directConnections: NetworkConnection[];
  
  /** Cluster membership information */
  clusterMembership: ClusterInfo;
  
  /** Centrality measures in the network */
  centralityMetrics: CentralityMetrics;
  
  /** Bridge transactions to other networks */
  bridgeTransactions: BridgeTransaction[];
  
  /** Exchange interactions */
  exchangeInteractions: ExchangeInteraction[];
  
  /** DeFi protocol relationships */
  defiRelationships: DeFiRelationship[];
}

/**
 * Temporal activity pattern analysis
 */
export interface TemporalPatterns {
  /** Daily activity distribution */
  dailyActivity: DailyActivityPattern;
  
  /** Weekly activity patterns */
  weeklyActivity: WeeklyActivityPattern;
  
  /** Monthly trends */
  monthlyTrends: MonthlyTrendAnalysis;
  
  /** Seasonal behavior variations */
  seasonalVariations: SeasonalVariation[];
  
  /** Activity bursts and quiet periods */
  activityBursts: ActivityBurst[];
  
  /** Time zone inference */
  inferredTimeZone: TimeZoneInfo;
}

/**
 * Performance and profitability metrics
 */
export interface PerformanceMetrics {
  /** Total portfolio value history */
  portfolioValueHistory: PortfolioValuePoint[];
  
  /** Realized PnL over time */
  realizedPnL: PnLMetrics;
  
  /** Unrealized PnL current state */
  unrealizedPnL: PnLMetrics;
  
  /** ROI calculations */
  roiMetrics: ROIMetrics;
  
  /** Sharpe ratio analysis */
  sharpeRatio: number;
  
  /** Maximum drawdown */
  maxDrawdown: DrawdownAnalysis;
  
  /** Win/loss ratios */
  winLossRatio: WinLossAnalysis;
  
  /** Alpha and beta metrics */
  marketMetrics: MarketMetrics;
}

/**
 * Supporting type definitions
 */

export interface HoldingDurationPattern {
  tokenAddress: string;
  averageHoldingDays: number;
  shortestHold: number;
  longestHold: number;
  volatility: number;
}

export type TradingBehaviorType = 
  | 'hodler' 
  | 'day-trader' 
  | 'swing-trader' 
  | 'scalper' 
  | 'arbitrageur' 
  | 'yield-farmer' 
  | 'nft-collector'
  | 'mev-bot'
  | 'institutional'
  | 'unknown';

export type RiskToleranceLevel = 'conservative' | 'moderate' | 'aggressive' | 'extreme';

export interface MEVActivityMetrics {
  frontRunningDetected: boolean;
  backRunningDetected: boolean;
  sandwichAttacks: number;
  arbitrageTransactions: number;
  liquidationActivities: number;
  mevProfit: number;
}

export interface CounterpartyRisk {
  unknownCounterparties: number;
  blacklistedInteractions: number;
  sanctionedAddresses: number;
  riskScore: number;
}

export interface LiquidityRisk {
  illiquidTokens: number;
  concentrationRisk: number;
  marketDepthRisk: number;
  slippageRisk: number;
}

export interface SmartContractRisk {
  unverifiedContracts: number;
  recentContracts: number;
  highRiskContracts: number;
  bugBountyContracts: number;
  auditScore: number;
}

export interface MarketRisk {
  volatilityExposure: number;
  correlationRisk: number;
  leverageRisk: number;
  liquidityRisk: number;
}

export interface RegulatoryRisk {
  jurisdictionRisk: number;
  complianceScore: number;
  reportingRequirements: string[];
  sanctionRisk: number;
}

export interface RiskEvent {
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
  impact: number;
  resolved: boolean;
}

export interface FrequencyDistribution {
  daily: number[];
  weekly: number[];
  monthly: number[];
  hourly: number[];
}

export interface ValueDistribution {
  microTransactions: number;  // < $10
  smallTransactions: number;  // $10 - $1000
  mediumTransactions: number; // $1000 - $10000
  largeTransactions: number;  // $10000 - $100000
  whaleTransactions: number;  // > $100000
}

export interface GasUsagePatterns {
  averageGasPrice: number;
  gasOptimization: number;
  failedTransactions: number;
  gasWasted: number;
  preferredGasLimits: number[];
}

export interface ProtocolInteractionPattern {
  protocol: string;
  interactionCount: number;
  volumeUsd: number;
  functions: string[];
  frequency: number;
  lastInteraction: Date;
}

export interface CrossChainPattern {
  sourceChain: string;
  targetChain: string;
  bridgeUsed: string;
  frequency: number;
  volumeUsd: number;
}

export interface SeasonalPattern {
  period: 'spring' | 'summer' | 'autumn' | 'winter';
  activityMultiplier: number;
  preferredTokens: string[];
  behaviorChanges: string[];
}

export interface NetworkConnection {
  connectedAddress: string;
  connectionStrength: number;
  transactionCount: number;
  totalVolume: number;
  relationship: 'direct' | 'indirect' | 'cluster';
}

export interface ClusterInfo {
  clusterId: string;
  clusterSize: number;
  clusterType: string;
  membershipConfidence: number;
}

export interface CentralityMetrics {
  betweennessCentrality: number;
  closenessCentrality: number;
  eigenvectorCentrality: number;
  pageRank: number;
}

export interface BridgeTransaction {
  bridgeProtocol: string;
  sourceChain: string;
  destinationChain: string;
  amount: number;
  timestamp: Date;
  fees: number;
}

export interface ExchangeInteraction {
  exchange: string;
  interactionType: 'deposit' | 'withdrawal' | 'trade';
  amount: number;
  timestamp: Date;
  fees: number;
}

export interface DeFiRelationship {
  protocol: string;
  relationshipType: 'lender' | 'borrower' | 'liquidity-provider' | 'staker' | 'voter';
  amount: number;
  duration: number;
  apy: number;
}

export interface DailyActivityPattern {
  hourlyDistribution: number[];
  peakHours: number[];
  quietHours: number[];
  averageTransactionsPerDay: number;
}

export interface WeeklyActivityPattern {
  dayOfWeekDistribution: number[];
  weekendActivity: number;
  weekdayActivity: number;
  preferredDays: number[];
}

export interface MonthlyTrendAnalysis {
  growthRate: number;
  activityTrend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  seasonalAdjustment: number;
  cyclicalPatterns: number[];
}

export interface SeasonalVariation {
  season: string;
  activityChange: number;
  volumeChange: number;
  behaviorShift: string[];
}

export interface ActivityBurst {
  startTime: Date;
  endTime: Date;
  intensity: number;
  transactionCount: number;
  trigger: string;
}

export interface TimeZoneInfo {
  inferredTimeZone: string;
  confidence: number;
  evidenceBasis: string[];
}

export interface PortfolioValuePoint {
  timestamp: Date;
  totalValue: number;
  tokenBreakdown: { [token: string]: number };
}

export interface PnLMetrics {
  total: number;
  percentage: number;
  byToken: { [token: string]: number };
  byPeriod: { [period: string]: number };
}

export interface ROIMetrics {
  totalROI: number;
  annualizedROI: number;
  monthlyROI: number;
  dailyROI: number;
  compoundedROI: number;
}

export interface DrawdownAnalysis {
  maxDrawdown: number;
  maxDrawdownPeriod: [Date, Date];
  currentDrawdown: number;
  recoveryTime: number;
}

export interface WinLossAnalysis {
  winRate: number;
  lossRate: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
}

export interface MarketMetrics {
  alpha: number;
  beta: number;
  correlation: number;
  trackingError: number;
  informationRatio: number;
}

/**
 * Machine learning model prediction interfaces
 */
export interface PredictionModel {
  modelType: 'neural-network' | 'random-forest' | 'svm' | 'xgboost' | 'lstm';
  modelVersion: string;
  accuracy: number;
  lastTrainingDate: Date;
  features: string[];
  predictions: ModelPrediction[];
}

export interface ModelPrediction {
  predictionType: 'price-movement' | 'transaction-timing' | 'risk-event' | 'token-selection';
  confidence: number;
  timeframe: string;
  value: any;
  probability: number;
}

/**
 * Real-time analytics event types
 */
export interface AnalyticsEvent {
  eventId: string;
  walletAddress: string;
  eventType: AnalyticsEventType;
  timestamp: Date;
  data: any;
  severity: 'info' | 'warning' | 'critical';
  processed: boolean;
}

export type AnalyticsEventType = 
  | 'unusual-transaction'
  | 'risk-threshold-exceeded' 
  | 'new-token-interaction'
  | 'large-movement'
  | 'pattern-deviation'
  | 'compliance-alert'
  | 'performance-milestone'
  | 'network-anomaly';

/**
 * Configuration interfaces for analytics engine
 */
export interface AnalyticsConfig {
  enableRealTimeProcessing: boolean;
  riskThresholds: RiskThresholds;
  updateIntervals: UpdateIntervals;
  modelConfigurations: ModelConfiguration[];
  alertingRules: AlertingRule[];
}

export interface RiskThresholds {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

export interface UpdateIntervals {
  behaviorMetrics: number;
  riskProfile: number;
  networkAnalysis: number;
  performanceMetrics: number;
}

export interface ModelConfiguration {
  modelName: string;
  enabled: boolean;
  parameters: { [key: string]: any };
  trainingSchedule: string;
}

export interface AlertingRule {
  ruleId: string;
  condition: string;
  action: 'log' | 'notify' | 'block' | 'flag';
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
}
