# Performance Monitoring Guide

## Overview

Comprehensive performance monitoring strategy for ARX Wallet Tracker, covering metrics collection, analysis, alerting, and optimization workflows.

## Key Performance Indicators (KPIs)

### System Level Metrics

| Metric | Target | Critical Threshold | Measurement Method |
|--------|--------|-------------------|-------------------|
| API Response Time (p50) | < 50ms | > 100ms | Prometheus histogram |
| API Response Time (p99) | < 200ms | > 500ms | Prometheus histogram |
| WebSocket Latency | < 10ms | > 50ms | Custom metric |
| CPU Utilization | < 70% | > 90% | Node exporter |
| Memory Usage | < 80% | > 95% | Node exporter |
| Disk I/O Wait | < 5% | > 20% | iostat |
| Network Throughput | - | > 80% capacity | Network monitor |

### Application Metrics

```typescript
interface ApplicationMetrics {
  transactions: {
    processed: number;
    failed: number;
    latency: LatencyMetrics;
    throughput: number;
  };
  connections: {
    active: number;
    established: number;
    dropped: number;
    errors: number;
  };
  cache: {
    hitRate: number;
    evictions: number;
    misses: number;
    latency: LatencyMetrics;
  };
  aiProcessing: {
    inferenceTime: number;
    modelAccuracy: number;
    signalsGenerated: number;
    falsePositives: number;
  };
}
```

## Monitoring Stack

### Metrics Collection

#### Prometheus Configuration
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'production'
    region: 'us-east-1'

scrape_configs:
  - job_name: 'arx-tracker'
    static_configs:
      - targets: ['localhost:9090']
    metrics_path: '/metrics'
    scrape_interval: 10s
    
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
      
  - job_name: 'redis-exporter'
    static_configs:
      - targets: ['localhost:9121']
```

#### Custom Metrics Implementation
```typescript
import { Registry, Counter, Histogram, Gauge } from 'prom-client';

class MetricsCollector {
  private registry: Registry;
  private counters: Map<string, Counter>;
  private histograms: Map<string, Histogram>;
  private gauges: Map<string, Gauge>;

  constructor() {
    this.registry = new Registry();
    this.initializeMetrics();
  }

  private initializeMetrics(): void {
    // Transaction metrics
    this.counters.set('transactions_total', new Counter({
      name: 'arx_transactions_total',
      help: 'Total number of transactions processed',
      labelNames: ['type', 'status'],
      registers: [this.registry]
    }));

    // Latency metrics
    this.histograms.set('api_latency', new Histogram({
      name: 'arx_api_latency_seconds',
      help: 'API endpoint latency',
      labelNames: ['method', 'endpoint', 'status'],
      buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5],
      registers: [this.registry]
    }));

    // Connection metrics
    this.gauges.set('websocket_connections', new Gauge({
      name: 'arx_websocket_connections',
      help: 'Number of active WebSocket connections',
      labelNames: ['type'],
      registers: [this.registry]
    }));
  }

  recordTransaction(type: string, status: string): void {
    this.counters.get('transactions_total')!.labels(type, status).inc();
  }

  recordLatency(method: string, endpoint: string, status: string, duration: number): void {
    this.histograms.get('api_latency')!.labels(method, endpoint, status).observe(duration);
  }

  setConnections(type: string, count: number): void {
    this.gauges.get('websocket_connections')!.labels(type).set(count);
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
```

### Distributed Tracing

#### Jaeger Integration
```typescript
import { initTracer } from 'jaeger-client';

const config = {
  serviceName: 'arx-wallet-tracker',
  reporter: {
    logSpans: true,
    agentHost: 'jaeger-agent',
    agentPort: 6832
  },
  sampler: {
    type: 'probabilistic',
    param: 0.1
  }
};

const tracer = initTracer(config);

// Trace wrapper
function traceAsync<T>(operationName: string, fn: () => Promise<T>): Promise<T> {
  const span = tracer.startSpan(operationName);
  
  return fn()
    .then(result => {
      span.finish();
      return result;
    })
    .catch(error => {
      span.setTag('error', true);
      span.log({ event: 'error', message: error.message });
      span.finish();
      throw error;
    });
}
```

### Log Aggregation

#### Structured Logging
```typescript
import winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'arx-tracker',
    environment: process.env.NODE_ENV
  },
  transports: [
    new ElasticsearchTransport({
      level: 'info',
      clientOpts: {
        node: 'http://elasticsearch:9200'
      },
      index: 'arx-logs',
      dataStream: true
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Performance logging middleware
function logPerformance(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info('Request processed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('user-agent'),
      ip: req.ip,
      correlationId: req.id
    });
  });
  
  next();
}
```

## Performance Analysis

### Query Optimization

#### Database Query Analysis
```sql
-- Slow query log analysis
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  max_time,
  stddev_time
FROM pg_stat_statements
WHERE mean_time > 100
ORDER BY mean_time DESC
LIMIT 20;

-- Index usage statistics
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Table bloat analysis
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
  n_live_tup,
  n_dead_tup,
  round(n_dead_tup::numeric / NULLIF(n_live_tup, 0), 2) AS dead_ratio
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY dead_ratio DESC;
```

### Memory Profiling

```typescript
import v8 from 'v8';
import { performance } from 'perf_hooks';

class MemoryProfiler {
  private snapshots: any[] = [];
  
  takeSnapshot(label: string): void {
    const snapshot = v8.getHeapSnapshot();
    const buffer: any[] = [];
    
    snapshot.on('data', (chunk) => buffer.push(chunk));
    snapshot.on('end', () => {
      this.snapshots.push({
        label,
        timestamp: Date.now(),
        data: Buffer.concat(buffer),
        stats: v8.getHeapStatistics()
      });
    });
  }
  
  analyzeGrowth(): MemoryGrowthAnalysis {
    if (this.snapshots.length < 2) {
      throw new Error('Need at least 2 snapshots');
    }
    
    const first = this.snapshots[0].stats;
    const last = this.snapshots[this.snapshots.length - 1].stats;
    
    return {
      heapGrowth: last.used_heap_size - first.used_heap_size,
      externalGrowth: last.external_memory - first.external_memory,
      growthRate: (last.used_heap_size - first.used_heap_size) / 
                  (this.snapshots[this.snapshots.length - 1].timestamp - this.snapshots[0].timestamp),
      possibleLeak: last.used_heap_size > first.used_heap_size * 1.5
    };
  }
}

interface MemoryGrowthAnalysis {
  heapGrowth: number;
  externalGrowth: number;
  growthRate: number;
  possibleLeak: boolean;
}
```

## Performance Optimization

### Caching Strategy

```typescript
class CacheOptimizer {
  private hitRates: Map<string, number> = new Map();
  private accessPatterns: Map<string, AccessPattern> = new Map();
  
  analyzeCacheEfficiency(): CacheAnalysis {
    const patterns = Array.from(this.accessPatterns.values());
    
    return {
      overallHitRate: this.calculateOverallHitRate(),
      hotKeys: this.identifyHotKeys(patterns),
      coldKeys: this.identifyColdKeys(patterns),
      recommendations: this.generateRecommendations(patterns)
    };
  }
  
  private identifyHotKeys(patterns: AccessPattern[]): string[] {
    return patterns
      .filter(p => p.accessCount > 1000)
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 100)
      .map(p => p.key);
  }
  
  private generateRecommendations(patterns: AccessPattern[]): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    // Check for cache misses on frequently accessed keys
    patterns.forEach(pattern => {
      if (pattern.missRate > 0.2 && pattern.accessCount > 100) {
        recommendations.push({
          type: 'INCREASE_TTL',
          key: pattern.key,
          reason: 'High miss rate on frequently accessed key',
          impact: 'HIGH'
        });
      }
    });
    
    return recommendations;
  }
}

interface AccessPattern {
  key: string;
  accessCount: number;
  hitRate: number;
  missRate: number;
  avgLatency: number;
}

interface CacheAnalysis {
  overallHitRate: number;
  hotKeys: string[];
  coldKeys: string[];
  recommendations: Recommendation[];
}

interface Recommendation {
  type: string;
  key: string;
  reason: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
}
```

### Connection Pool Optimization

```typescript
class ConnectionPoolManager {
  private pools: Map<string, ConnectionPool> = new Map();
  
  optimizePoolSize(poolName: string): PoolOptimization {
    const pool = this.pools.get(poolName);
    if (!pool) throw new Error('Pool not found');
    
    const stats = pool.getStats();
    const optimal = this.calculateOptimalSize(stats);
    
    return {
      current: stats.size,
      recommended: optimal,
      reasoning: this.generateReasoning(stats, optimal),
      estimatedImprovement: this.estimateImprovement(stats, optimal)
    };
  }
  
  private calculateOptimalSize(stats: PoolStats): number {
    const utilizationRate = stats.activeConnections / stats.size;
    const queueLength = stats.waitingRequests;
    
    if (utilizationRate > 0.8 && queueLength > 0) {
      return Math.min(stats.size * 1.5, stats.maxSize);
    } else if (utilizationRate < 0.3) {
      return Math.max(stats.size * 0.7, stats.minSize);
    }
    
    return stats.size;
  }
}

interface PoolStats {
  size: number;
  minSize: number;
  maxSize: number;
  activeConnections: number;
  idleConnections: number;
  waitingRequests: number;
  avgWaitTime: number;
}

interface PoolOptimization {
  current: number;
  recommended: number;
  reasoning: string;
  estimatedImprovement: number;
}
```

## Alerting Configuration

### Alert Rules

```yaml
groups:
  - name: performance
    interval: 30s
    rules:
      - alert: HighAPILatency
        expr: histogram_quantile(0.99, arx_api_latency_seconds) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High API latency detected"
          description: "99th percentile latency is {{ $value }}s"
          
      - alert: LowCacheHitRate
        expr: rate(cache_hits_total[5m]) / rate(cache_requests_total[5m]) < 0.7
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Cache hit rate below threshold"
          description: "Cache hit rate is {{ $value }}"
          
      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes / machine_memory_bytes > 0.9
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value }}%"
```

## Performance Testing

### Load Testing Configuration

```typescript
import { check } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'],
    errors: ['rate<0.1']
  }
};

export default function() {
  const response = http.get('https://api.arx-tracker.io/v1/wallets');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500
  }) || errorRate.add(1);
}
```

## Best Practices

### Performance Optimization Checklist

- [ ] Enable compression for all API responses
- [ ] Implement request/response caching
- [ ] Use connection pooling for database
- [ ] Optimize database queries with proper indexing
- [ ] Implement pagination for large datasets
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2 for better multiplexing
- [ ] Implement request throttling
- [ ] Use efficient serialization formats
- [ ] Monitor and optimize garbage collection
- [ ] Profile CPU and memory usage regularly
- [ ] Implement circuit breakers for external services
- [ ] Use async/await properly to avoid blocking
- [ ] Optimize bundle sizes for frontend
- [ ] Implement lazy loading where appropriate
