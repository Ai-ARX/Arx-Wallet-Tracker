/**
 * AI Signal Processing Type Definitions
 * Machine learning models for wallet behavior analysis
 */

export interface AISignal {
  id: string;
  timestamp: Date;
  walletAddress: string;
  signalType: SignalType;
  confidence: number;
  severity: SignalSeverity;
  metadata: SignalMetadata;
  predictions: Prediction[];
}

export enum SignalType {
  WHALE_MOVEMENT = 'WHALE_MOVEMENT',
  UNUSUAL_ACTIVITY = 'UNUSUAL_ACTIVITY',
  PUMP_DETECTION = 'PUMP_DETECTION',
  DUMP_WARNING = 'DUMP_WARNING',
  SMART_MONEY_FLOW = 'SMART_MONEY_FLOW',
  RUG_PULL_RISK = 'RUG_PULL_RISK',
  ACCUMULATION_PATTERN = 'ACCUMULATION_PATTERN',
  DISTRIBUTION_PATTERN = 'DISTRIBUTION_PATTERN',
  WASH_TRADING = 'WASH_TRADING',
  BOT_ACTIVITY = 'BOT_ACTIVITY'
}

export enum SignalSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFO = 'INFO'
}

export interface SignalMetadata {
  modelVersion: string;
  processingTime: number;
  dataPoints: number;
  features: FeatureVector;
  anomalyScore: number;
  correlations: Correlation[];
}

export interface FeatureVector {
  volumeChange: number;
  frequencyChange: number;
  uniqueCounterparties: number;
  transactionVelocity: number;
  balanceVolatility: number;
  networkCentrality: number;
  temporalPatterns: TemporalPattern[];
  behavioralFingerprint: string;
}

export interface TemporalPattern {
  patternType: string;
  startTime: Date;
  endTime: Date;
  strength: number;
  periodicity?: number;
}

export interface Correlation {
  targetWallet: string;
  correlationCoefficient: number;
  lagTime: number;
  confidence: number;
}

export interface Prediction {
  type: PredictionType;
  value: number | string;
  probability: number;
  timeHorizon: number;
  confidenceInterval: ConfidenceInterval;
}

export enum PredictionType {
  PRICE_MOVEMENT = 'PRICE_MOVEMENT',
  VOLUME_FORECAST = 'VOLUME_FORECAST',
  RISK_ASSESSMENT = 'RISK_ASSESSMENT',
  BEHAVIOR_CLASSIFICATION = 'BEHAVIOR_CLASSIFICATION',
  NEXT_ACTION = 'NEXT_ACTION'
}

export interface ConfidenceInterval {
  lower: number;
  upper: number;
  confidence: number;
}

export interface MLModel {
  modelId: string;
  name: string;
  version: string;
  type: ModelType;
  architecture: ModelArchitecture;
  performance: ModelPerformance;
  lastTrained: Date;
  datasetSize: number;
}

export enum ModelType {
  CLASSIFICATION = 'CLASSIFICATION',
  REGRESSION = 'REGRESSION',
  CLUSTERING = 'CLUSTERING',
  ANOMALY_DETECTION = 'ANOMALY_DETECTION',
  TIME_SERIES = 'TIME_SERIES',
  NEURAL_NETWORK = 'NEURAL_NETWORK'
}

export interface ModelArchitecture {
  framework: string;
  layers: Layer[];
  parameters: number;
  optimizer: string;
  lossFunction: string;
  activations: string[];
}

export interface Layer {
  type: string;
  units?: number;
  activation?: string;
  dropout?: number;
  regularization?: string;
}

export interface ModelPerformance {
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  auc?: number;
  mse?: number;
  mae?: number;
  validationLoss: number;
  trainingLoss: number;
}

export interface TrainingConfig {
  epochs: number;
  batchSize: number;
  learningRate: number;
  validationSplit: number;
  earlyStopping: boolean;
  patience: number;
  shuffle: boolean;
  seed?: number;
}

export interface DataPreprocessing {
  normalization: NormalizationType;
  featureEngineering: FeatureEngineering[];
  outlierHandling: OutlierMethod;
  missingValueStrategy: MissingValueStrategy;
  windowSize: number;
  stepSize: number;
}

export enum NormalizationType {
  MIN_MAX = 'MIN_MAX',
  Z_SCORE = 'Z_SCORE',
  ROBUST = 'ROBUST',
  LOG = 'LOG',
  NONE = 'NONE'
}

export interface FeatureEngineering {
  name: string;
  type: string;
  parameters: Record<string, any>;
}

export enum OutlierMethod {
  REMOVE = 'REMOVE',
  CAP = 'CAP',
  TRANSFORM = 'TRANSFORM',
  KEEP = 'KEEP'
}

export enum MissingValueStrategy {
  DROP = 'DROP',
  MEAN = 'MEAN',
  MEDIAN = 'MEDIAN',
  MODE = 'MODE',
  FORWARD_FILL = 'FORWARD_FILL',
  INTERPOLATE = 'INTERPOLATE'
}

export interface SignalAggregator {
  signals: AISignal[];
  aggregatedScore: number;
  dominantSignal: SignalType;
  consensusLevel: number;
  recommendations: Recommendation[];
}

export interface Recommendation {
  action: string;
  confidence: number;
  reasoning: string;
  supportingSignals: string[];
  riskLevel: number;
  expectedOutcome: string;
}
