# Performance

smart-i18n-auto is designed for production workloads with caching, batching, deduplication, and skip filtering.

## Caching Strategy

| Layer | Mechanism |
|-------|-----------|
| L1: Caffeine Cache | In-memory O(1) lookup by composite key `sourceLang:targetLang:fullText` |
| Deduplication | Identical strings in a single DTO are sent to the provider only once |
| Batch API Calls | Uncached strings are grouped into provider calls |
| Skip Filtering | Numbers, UUIDs, URLs, emails, and similar tokens never reach the provider |
| Same-Language Short-Circuit | `en -> en` returns immediately without traversal or provider calls |

## Benchmarks

Approximate latency depends on provider, region, network, and payload size.

| Scenario | Latency |
|----------|---------|
| Cache hit, all strings cached | `< 1ms` |
| Small DTO, 3 fields, first call | `200-500ms` provider call |
| Large DTO, 50 fields, first call | `300-800ms` single batch call |
| Large DTO, 50 fields, cached | `< 2ms` |
| DTO with 50 duplicate strings | Same as translating 1 unique string |

## Tuning Tips

```properties
# Increase cache TTL for mostly static content.
smart.i18n.cache.ttl-minutes=1440

# Increase cache size for high-cardinality content.
smart.i18n.cache.max-size=100000

# Reduce batch size if a provider has per-request limits.
smart.i18n.batch.max-size=25

# Reduce timeout for faster failure.
smart.i18n.provider.timeout-ms=5000
```

## Validate Caching

```bash
# First call: watch for "Translating X unique uncached strings" in logs.
curl -s -H "Accept-Language: de" http://localhost:8080/api/test/simple | jq

# Second call: watch for "All X unique strings were cache hits" in logs.
curl -s -H "Accept-Language: de" http://localhost:8080/api/test/simple | jq
```

Enable debug logging:

```properties
logging.level.in.devtamakuwala.smarti18nauto=DEBUG
```

