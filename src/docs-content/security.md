# Security

smart-i18n-auto includes production-grade security and cost protection by default.

## API Key Protection

| Threat | Mitigation |
|--------|------------|
| Key in URL query string | **Eliminated.** All providers use HTTP header auth (`X-Goog-Api-Key`, `Authorization: Bearer`) |
| Key in logs | **Masked.** All config `toString()` methods show `****` + last 4 chars |
| Key in Spring Actuator | Use `management.endpoint.configprops.show-values=NEVER` in production |
| Key in environment dumps | Use Spring Vault, AWS Secrets Manager, or `SPRING_APPLICATION_JSON` |

## Cost Protection

| Threat | Mitigation |
|--------|------------|
| Huge DTO → massive API bill | `max-strings-per-request=200` — excess strings silently skipped |
| Single giant text field | `max-text-length=5000` — long strings silently skipped |
| DDoS with varied languages | Caffeine cache absorbs repeated translations; consider rate limiting upstream |
| Deeply nested DTO → stack overflow | `max-traversal-depth=32` — traversal stops at depth limit |
| Oversized API response → OOM | `web-client-max-buffer-size-mb=2` — WebClient rejects large responses |

## Production-Recommended Configuration

```properties
smart.i18n.provider.timeout-ms=5000
smart.i18n.safeguard.max-strings-per-request=100
smart.i18n.safeguard.max-text-length=2000
smart.i18n.cache.ttl-minutes=1440
smart.i18n.cache.max-size=50000
```
