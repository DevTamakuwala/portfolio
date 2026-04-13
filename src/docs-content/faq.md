# FAQ

Frequently asked questions about smart-i18n-auto.

## General

### What does smart-i18n-auto do?

It intercepts HTTP responses (and optionally requests) and automatically translates string content based on the `Accept-Language` header. Add one dependency, set one API key, annotate with `@AutoTranslate`, and your API speaks every language.

### Which translation providers are supported?

Three providers are supported out of the box:

| Provider                        | Best For                                             |
| ------------------------------- | ---------------------------------------------------- |
| **Google Cloud Translation v2** | High-volume, cost-effective translation              |
| **Google Gemini**               | Nuanced/contextual translations (free-tier friendly) |
| **OpenAI**                      | High quality, GPT-powered translation                |

### Does it modify my database?

No. smart-i18n-auto is **read-only**. It only translates outgoing responses (and optionally incoming requests). It never writes to your database.

### Can I use it without an API key?

No. At least one provider API key is required. Without a key, translations won't happen and responses will be returned in their original language.

---

## Technical

### Which Spring Boot versions are supported?

Spring Boot **4.0.x** with Java **21+** and the Jakarta Servlet namespace. It uses `@AutoConfiguration` which is the Spring Boot 4 standard.

### Does it work with `@ResponseBody` and `ResponseEntity`?

Yes. It works via Spring's `ResponseBodyAdvice` mechanism, which intercepts all standard response mechanisms.

### Does it translate request bodies?

Optionally. Set `smart.i18n.translate-request-body=true` to normalize incoming request bodies to English before your controller processes them.

### What happens if the translation API is unavailable?

The original (untranslated) response is returned. smart-i18n-auto fails gracefully — it never blocks or breaks your API. If fallback is enabled, it tries the next available provider.

### Does it support XML responses?

Currently, only JSON responses are supported. XML support may be added in a future release.

### How does it handle multiple `Accept-Language` values?

When the header contains `Accept-Language: es-ES,es;q=0.9,en;q=0.8`, smart-i18n-auto extracts the **highest priority** language.

### Can I use a custom header instead of `Accept-Language`?

Yes:

```properties
smart.i18n.header-name=X-Target-Language
```

Or use a query parameter:

```properties
smart.i18n.query-param=lang
```

---

## Performance

### Will it slow down my API?

With caching enabled, the impact is minimal (**< 1ms** for cached translations). The first request for a new text/language combination incurs API latency (~200-500ms), but subsequent requests are served from Caffeine cache.

### How does deduplication work?

If your DTO contains the same string 5 times (e.g., "Hello World" in 5 fields), the string is sent to the translation API only **once**. The result is fanned out to all references.

### Can I use Redis instead of in-memory cache?

Not yet. The current version uses Caffeine (in-memory LRU cache). Redis / Hazelcast support is on the roadmap for v0.1.0.

---

## Troubleshooting

### Translation isn't working

1. Check that `smart.i18n.enabled=true` (default)
2. Verify your API key is valid
3. Confirm `@AutoTranslate` is on your controller/method
4. Confirm the `Accept-Language` header is being sent
5. Enable debug logging: `logging.level.in.devtamakuwala.smarti18nauto=DEBUG`

### Some fields are being translated that shouldn't be

Add `@SkipTranslation` to those fields, or use custom skip patterns:

```properties
smart.i18n.filter.skip-patterns[0]=^SKU-.*$
```

### API costs are too high

1. Enable caching (on by default)
2. Increase cache TTL: `smart.i18n.cache.ttl-minutes=1440`
3. Reduce max strings: `smart.i18n.safeguard.max-strings-per-request=100`
4. Add more fields to `@SkipTranslation`
5. Enable provider fallback to use cheaper providers first
