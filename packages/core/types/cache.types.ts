/**
 * Cache Management Type Definitions
 * Distributed caching layer interfaces
 */

export interface CacheConfig {
  provider: CacheProvider;
  ttl: number;
  maxSize: number;
  evictionPolicy: EvictionPolicy;
  compression: boolean;
  encryption: boolean;
  clustering: ClusterConfig;
  persistence: PersistenceConfig;
}

export enum CacheProvider {
  REDIS = 'REDIS',
  MEMCACHED = 'MEMCACHED',
  HAZELCAST = 'HAZELCAST',
  MEMORY = 'MEMORY',
  HYBRID = 'HYBRID'
}

export enum EvictionPolicy {
  LRU = 'LRU',
  LFU = 'LFU',
  FIFO = 'FIFO',
  RANDOM = 'RANDOM',
  TTL = 'TTL'
}

export interface ClusterConfig {
  enabled: boolean;
  nodes: ClusterNode[];
  replication: ReplicationConfig;
  sharding: ShardingConfig;
  failover: FailoverConfig;
}

export interface ClusterNode {
  id: string;
  host: string;
  port: number;
  role: NodeRole;
  status: NodeStatus;
  weight: number;
  zone: string;
}

export enum NodeRole {
  MASTER = 'MASTER',
  SLAVE = 'SLAVE',
  ARBITER = 'ARBITER'
}

export enum NodeStatus {
  ACTIVE = 'ACTIVE',
  STANDBY = 'STANDBY',
  FAILED = 'FAILED',
  RECOVERING = 'RECOVERING'
}

export interface ReplicationConfig {
  factor: number;
  async: boolean;
  delay: number;
  consistency: ConsistencyLevel;
}

export enum ConsistencyLevel {
  STRONG = 'STRONG',
  EVENTUAL = 'EVENTUAL',
  WEAK = 'WEAK',
  LINEARIZABLE = 'LINEARIZABLE'
}

export interface ShardingConfig {
  strategy: ShardingStrategy;
  shards: number;
  keyFunction: string;
  rebalancing: boolean;
}

export enum ShardingStrategy {
  HASH = 'HASH',
  RANGE = 'RANGE',
  GEO = 'GEO',
  CONSISTENT_HASH = 'CONSISTENT_HASH'
}

export interface FailoverConfig {
  automatic: boolean;
  timeout: number;
  retries: number;
  healthCheck: HealthCheckConfig;
}

export interface HealthCheckConfig {
  interval: number;
  timeout: number;
  unhealthyThreshold: number;
  healthyThreshold: number;
}

export interface PersistenceConfig {
  enabled: boolean;
  strategy: PersistenceStrategy;
  interval: number;
  location: string;
  compression: CompressionType;
}

export enum PersistenceStrategy {
  SNAPSHOT = 'SNAPSHOT',
  AOF = 'AOF',
  HYBRID = 'HYBRID',
  NONE = 'NONE'
}

export enum CompressionType {
  GZIP = 'GZIP',
  LZ4 = 'LZ4',
  SNAPPY = 'SNAPPY',
  ZSTD = 'ZSTD',
  NONE = 'NONE'
}

export interface CacheEntry<T = any> {
  key: string;
  value: T;
  metadata: CacheMetadata;
  tags?: string[];
  dependencies?: string[];
}

export interface CacheMetadata {
  created: Date;
  accessed: Date;
  modified: Date;
  expires?: Date;
  hits: number;
  size: number;
  compressed: boolean;
  encrypted: boolean;
  version: number;
}

export interface CacheOperation {
  type: OperationType;
  key: string;
  value?: any;
  options?: CacheOptions;
  timestamp: Date;
  duration: number;
  success: boolean;
  error?: string;
}

export enum OperationType {
  GET = 'GET',
  SET = 'SET',
  DELETE = 'DELETE',
  EXISTS = 'EXISTS',
  EXPIRE = 'EXPIRE',
  TOUCH = 'TOUCH',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  FLUSH = 'FLUSH'
}

export interface CacheOptions {
  ttl?: number;
  nx?: boolean;
  xx?: boolean;
  keepTTL?: boolean;
  sliding?: boolean;
  priority?: CachePriority;
  namespace?: string;
}

export enum CachePriority {
  CRITICAL = 0,
  HIGH = 1,
  NORMAL = 2,
  LOW = 3
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
  expirations: number;
  size: number;
  keys: number;
  memory: MemoryStats;
  operations: OperationStats;
  network: NetworkStats;
}

export interface MemoryStats {
  used: number;
  available: number;
  peak: number;
  fragmentation: number;
  overhead: number;
}

export interface OperationStats {
  total: number;
  reads: number;
  writes: number;
  deletes: number;
  avgLatency: number;
  p50Latency: number;
  p95Latency: number;
  p99Latency: number;
}

export interface NetworkStats {
  bytesIn: number;
  bytesOut: number;
  connections: number;
  commandsProcessed: number;
  instantaneousOps: number;
}

export interface CacheWarming {
  enabled: boolean;
  strategy: WarmingStrategy;
  sources: WarmingSource[];
  schedule: string;
  priority: CachePriority;
  batchSize: number;
  concurrency: number;
}

export enum WarmingStrategy {
  LAZY = 'LAZY',
  EAGER = 'EAGER',
  PREDICTIVE = 'PREDICTIVE',
  SCHEDULED = 'SCHEDULED'
}

export interface WarmingSource {
  type: SourceType;
  config: Record<string, any>;
  filter?: string;
  transform?: string;
}

export enum SourceType {
  DATABASE = 'DATABASE',
  API = 'API',
  FILE = 'FILE',
  CACHE = 'CACHE'
}

export interface CacheInvalidation {
  strategy: InvalidationStrategy;
  triggers: InvalidationTrigger[];
  cascade: boolean;
  delay?: number;
}

export enum InvalidationStrategy {
  IMMEDIATE = 'IMMEDIATE',
  DELAYED = 'DELAYED',
  LAZY = 'LAZY',
  SMART = 'SMART'
}

export interface InvalidationTrigger {
  type: TriggerType;
  pattern?: string;
  events?: string[];
  condition?: string;
}

export enum TriggerType {
  TIME = 'TIME',
  EVENT = 'EVENT',
  DEPENDENCY = 'DEPENDENCY',
  MANUAL = 'MANUAL'
}

export interface CacheTransaction {
  id: string;
  operations: CacheOperation[];
  status: TransactionStatus;
  startTime: Date;
  endTime?: Date;
  rollback?: () => Promise<void>;
  commit?: () => Promise<void>;
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMMITTED = 'COMMITTED',
  ROLLED_BACK = 'ROLLED_BACK',
  FAILED = 'FAILED'
}
