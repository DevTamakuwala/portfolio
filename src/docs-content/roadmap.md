# Roadmap

Planned improvements for future smart-i18n-auto versions.

## v1.1.0

- Reactive WebFlux support through `ServerResponse` advice.
- Rate limiter support with Resilience4j or Bucket4j for per-minute API budgets.
- Metrics export with Micrometer, including cache hit ratio, API latency, and translation count.
- Redis or Hazelcast distributed cache adapter.

## v1.2.0

- Source language detection from request body content.
- Glossary or terminology override map for domain-specific terms.
- Async/non-blocking translation through `Mono` and `Flux`.
- DeepL provider.
- Azure Cognitive Services Translator provider.

## Future

- Admin endpoint for cache stats, provider health, and live config reload.
- `@TranslateField` annotation for selective per-field provider override.
- Spring Boot Actuator health indicator.
- GraalVM native image compatibility.
- Persistent cache backed by JDBC or MongoDB.
- Translation memory with quality scoring.

