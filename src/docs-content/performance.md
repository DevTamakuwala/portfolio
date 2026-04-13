# Performance

smart-i18n-auto is designed for production workloads with multi-layered performance optimizations.

## Caching Strategy

| Layer | Mechanism |
|-------|-----------|
| **L1: Caffeine Cache** | In-memory, O(1) lookup by composite key `sourceLang:targetLang:fullText` |
| **Deduplication** | Identical strings in a single DTO sent to API only once |
| **Batch API Calls** | All uncached strings per request sent in one API call |
| **Skip Filtering** | Numbers, UUIDs, URLs, etc. never reach the API |
| **Same-Language Short-Circuit** | `en → en` returns immediately, no traversal |

## Benchmarks (Approximate)

| Scenario | Latency |
|----------|---------|
| Cache hit (all strings cached) | **< 1ms** |
| Small DTO (3 fields, first call) | **200–500ms** (API call) |
| Large DTO (50 fields, first call) | **300–800ms** (single batch call) |
| Large DTO (50 fields, cached) | **< 2ms** |
| DTO with 50 duplicate strings | Same as 1 unique string (deduplication) |

## Tuning Tips

```properties
# Increase cache TTL for mostly-static content
smart.i18n.cache.ttl-minutes=1440  # 24 hours

# Increase cache size for high-cardinality content
smart.i18n.cache.max-size=100000

# Reduce batch size if provider has per-request limits
smart.i18n.batch.max-size=25

# Reduce timeout for faster failure
smart.i18n.provider.timeout-ms=5000
```

## Validate Caching

```bash
# First call — watch for "Translating X unique uncached strings" in logs
curl -s -H "Accept-Language: de" http://localhost:8080/api/test/simple | jq

# Second call — watch for "All X unique strings were cache hits" in logs
curl -s -H "Accept-Language: de" http://localhost:8080/api/test/simple | jq
```

Enable debug logging for full visibility:

```properties
logging.level.in.devtamakuwala.smarti18nauto=DEBUG
```
