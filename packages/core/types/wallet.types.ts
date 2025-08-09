/**
 * Core wallet tracking type definitions
 * Provides comprehensive type safety for wallet monitoring operations
 */

export interface WalletAddress {
  address: string;
  label?: string;
  addedAt: Date;
  lastActivity?: Date;
  isActive: boolean;
  priority: WalletPriority;
}

export enum WalletPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  WHALE = 'WHALE',
  VIP = 'VIP'
}

export interface WalletMetadata {
  totalTransactions: number;
  totalVolume: bigint;
  avgTransactionSize: number;
  lastChecked: Date;
  riskScore: number;
  tags: string[];
  customFields?: Record<string, any>;
}

export interface WalletBalance {
  native: bigint;
  tokens: TokenBalance[];
  nfts: NFTBalance[];
  totalValueUSD: number;
  lastUpdate: Date;
}

export interface TokenBalance {
  mint: string;
  amount: bigint;
  decimals: number;
  uiAmount: number;
  valueUSD?: number;
  symbol?: string;
  name?: string;
  logoURI?: string;
}

export interface NFTBalance {
  mint: string;
  collection?: string;
  name: string;
  imageUrl?: string;
  attributes?: Record<string, any>;
  floorPrice?: number;
}

export interface WalletActivity {
  walletAddress: string;
  signature: string;
  timestamp: Date;
  type: ActivityType;
  status: TransactionStatus;
  fee: bigint;
  details: ActivityDetails;
}

export enum ActivityType {
  TRANSFER = 'TRANSFER',
  SWAP = 'SWAP',
  MINT = 'MINT',
  BURN = 'BURN',
  STAKE = 'STAKE',
  UNSTAKE = 'UNSTAKE',
  VOTE = 'VOTE',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  CLOSE_ACCOUNT = 'CLOSE_ACCOUNT',
  UNKNOWN = 'UNKNOWN'
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface ActivityDetails {
  from?: string;
  to?: string;
  amount?: bigint;
  token?: string;
  program?: string;
  instructions?: InstructionDetails[];
  innerInstructions?: InnerInstruction[];
  logs?: string[];
}

export interface InstructionDetails {
  programId: string;
  accounts: string[];
  data: string;
  parsed?: ParsedInstruction;
}

export interface ParsedInstruction {
  type: string;
  info: Record<string, any>;
}

export interface InnerInstruction {
  index: number;
  instructions: InstructionDetails[];
}

export interface WalletSnapshot {
  walletAddress: string;
  timestamp: Date;
  balance: WalletBalance;
  metadata: WalletMetadata;
  recentActivity: WalletActivity[];
}

export interface WalletTrackerConfig {
  maxWallets: number;
  updateInterval: number;
  retryAttempts: number;
  retryDelay: number;
  enableNotifications: boolean;
  enableAnalytics: boolean;
  enableAI: boolean;
  cacheEnabled: boolean;
  cacheTTL: number;
}
