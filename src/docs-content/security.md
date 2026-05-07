# Security

smart-i18n-auto includes production-grade security and cost protection defaults.

## API Key Protection

| Threat | Mitigation |
|--------|------------|
| Key in URL query string | Eliminated; all providers use HTTP header authentication |
| Key in logs | Masked; config `toString()` methods show `****` plus last four characters |
| Key in Spring Actuator | Use `management.endpoint.configprops.show-values=NEVER` in production |
| Key in environment dumps | Use Spring Vault, AWS Secrets Manager, or `SPRING_APPLICATION_JSON` |

## Cost Protection

| Threat | Mitigation |
|--------|------------|
| Huge DTO causing high API bills | `max-strings-per-request=200`; excess strings are skipped |
| Single giant text field | `max-text-length=5000`; long strings are skipped |
| Repeated varied-language traffic | Caffeine cache absorbs repeated translations; rate limit upstream if needed |
| Deeply nested DTO causing stack overflow | `max-traversal-depth=32`; traversal stops at the depth limit |
| Oversized provider response | `web-client-max-buffer-size-mb=2`; WebClient rejects oversized responses |

## Production-Recommended Configuration

```properties
smart.i18n.provider.timeout-ms=5000
smart.i18n.safeguard.max-strings-per-request=100
smart.i18n.safeguard.max-text-length=2000
smart.i18n.cache.ttl-minutes=1440
smart.i18n.cache.max-size=50000
```

## Operational Notes

- Keep provider API keys out of source control.
- Prefer environment variables, vaults, or deployment secrets for production keys.
- Monitor provider usage and set billing alerts.
- Keep request body translation disabled unless your API explicitly needs inbound normalization.
