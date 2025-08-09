/**
 * WebSocket Communication Type Definitions
 * Real-time streaming protocol interfaces
 */

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectInterval: number;
  maxReconnectAttempts: number;
  heartbeatInterval: number;
  messageQueueSize: number;
  compression: boolean;
  binaryType: BinaryType;
  authentication?: WebSocketAuth;
}

export interface WebSocketAuth {
  type: AuthType;
  token?: string;
  apiKey?: string;
  credentials?: Credentials;
  customHeaders?: Record<string, string>;
}

export enum AuthType {
  BEARER = 'BEARER',
  API_KEY = 'API_KEY',
  BASIC = 'BASIC',
  CUSTOM = 'CUSTOM',
  NONE = 'NONE'
}

export interface Credentials {
  username: string;
  password: string;
}

export interface WebSocketMessage<T = any> {
  id: string;
  type: MessageType;
  timestamp: number;
  payload: T;
  metadata?: MessageMetadata;
}

export enum MessageType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  DATA = 'DATA',
  ERROR = 'ERROR',
  PING = 'PING',
  PONG = 'PONG',
  ACK = 'ACK',
  BROADCAST = 'BROADCAST',
  COMMAND = 'COMMAND',
  STATUS = 'STATUS'
}

export interface MessageMetadata {
  sequence: number;
  version: string;
  compression?: string;
  encoding?: string;
  signature?: string;
  priority?: MessagePriority;
}

export enum MessagePriority {
  CRITICAL = 0,
  HIGH = 1,
  NORMAL = 2,
  LOW = 3
}

export interface SubscriptionRequest {
  channel: string;
  params: SubscriptionParams;
  filters?: SubscriptionFilter[];
  options?: SubscriptionOptions;
}

export interface SubscriptionParams {
  addresses?: string[];
  programs?: string[];
  tokens?: string[];
  commitment?: CommitmentLevel;
  encoding?: string;
}

export enum CommitmentLevel {
  PROCESSED = 'processed',
  CONFIRMED = 'confirmed',
  FINALIZED = 'finalized'
}

export interface SubscriptionFilter {
  field: string;
  operator: FilterOperator;
  value: any;
}

export enum FilterOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  CONTAINS = 'CONTAINS',
  REGEX = 'REGEX'
}

export interface SubscriptionOptions {
  batchSize?: number;
  throttle?: number;
  includeHistory?: boolean;
  historyLimit?: number;
  autoReconnect?: boolean;
}

export interface StreamData {
  subscription: string;
  data: TransactionStream | AccountStream | BlockStream | LogStream;
}

export interface TransactionStream {
  signature: string;
  slot: number;
  timestamp?: number;
  transaction: EnhancedTransaction;
  meta?: TransactionMeta;
}

export interface EnhancedTransaction {
  signatures: string[];
  message: TransactionMessage;
  instructions: ParsedInstruction[];
  computeUnits?: number;
  fee?: number;
}

export interface TransactionMessage {
  accountKeys: AccountKey[];
  recentBlockhash: string;
  instructions: CompiledInstruction[];
  indexToProgramIds: Map<number, string>;
}

export interface AccountKey {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
  source?: string;
}

export interface CompiledInstruction {
  programIdIndex: number;
  accountKeyIndexes: number[];
  data: string;
}

export interface ParsedInstruction {
  program: string;
  programId: string;
  type?: string;
  data?: any;
  accounts?: InstructionAccount[];
  innerInstructions?: ParsedInstruction[];
}

export interface InstructionAccount {
  name: string;
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
}

export interface TransactionMeta {
  err: any | null;
  fee: number;
  preBalances: number[];
  postBalances: number[];
  preTokenBalances?: TokenBalance[];
  postTokenBalances?: TokenBalance[];
  logMessages?: string[];
  rewards?: Reward[];
  computeUnitsConsumed?: number;
}

export interface TokenBalance {
  accountIndex: number;
  mint: string;
  owner?: string;
  uiTokenAmount: UITokenAmount;
}

export interface UITokenAmount {
  amount: string;
  decimals: number;
  uiAmount: number | null;
  uiAmountString: string;
}

export interface Reward {
  pubkey: string;
  lamports: number;
  postBalance: number;
  rewardType: string;
  commission?: number;
}

export interface AccountStream {
  pubkey: string;
  slot: number;
  account: AccountInfo;
  timestamp?: number;
}

export interface AccountInfo {
  lamports: number;
  owner: string;
  data: any;
  executable: boolean;
  rentEpoch: number;
  space?: number;
}

export interface BlockStream {
  slot: number;
  blockhash: string;
  previousBlockhash: string;
  parentSlot: number;
  timestamp?: number;
  transactions: TransactionStream[];
  rewards?: Reward[];
  blockHeight?: number;
}

export interface LogStream {
  signature: string;
  logs: string[];
  err: any | null;
  timestamp?: number;
}

export interface WebSocketState {
  status: ConnectionStatus;
  connected: boolean;
  subscriptions: Map<string, SubscriptionState>;
  messageQueue: WebSocketMessage[];
  stats: ConnectionStats;
  lastError?: WebSocketError;
}

export enum ConnectionStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  RECONNECTING = 'RECONNECTING',
  ERROR = 'ERROR',
  CLOSED = 'CLOSED'
}

export interface SubscriptionState {
  id: string;
  channel: string;
  active: boolean;
  createdAt: Date;
  lastMessage?: Date;
  messageCount: number;
  errorCount: number;
}

export interface ConnectionStats {
  connectedAt?: Date;
  disconnectedAt?: Date;
  reconnectCount: number;
  messagesSent: number;
  messagesReceived: number;
  bytesReceived: number;
  bytesSent: number;
  latency: number;
  uptime: number;
}

export interface WebSocketError {
  code: number;
  message: string;
  timestamp: Date;
  details?: any;
  recoverable: boolean;
}
