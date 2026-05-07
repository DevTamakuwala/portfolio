# FAQ

Frequently asked questions about smart-i18n-auto.

## General

### What does smart-i18n-auto do?

It intercepts HTTP responses, and optionally request bodies, then automatically translates eligible string content based on the requested language.

### Which translation providers are supported?

| Provider | Best For |
|----------|----------|
| Google Cloud Translation v2 | High-volume, cost-effective translation |
| Google Gemini | Nuanced contextual translation and free-tier-friendly use |
| OpenAI | GPT-powered translation quality |

### Does it modify my database?

No. Outgoing response translation is read-only. Optional request body translation modifies the in-memory request object before controller logic, but the library does not write to your database.

### Can I use it without an API key?

No. At least one provider API key is required for translation.

## Technical

### Which Spring Boot versions are supported?

Spring Boot 4.x with Java 21+ and Jakarta namespaces.

### Does it work with @ResponseBody and ResponseEntity?

Yes. It uses Spring's `ResponseBodyAdvice`, so standard Spring MVC response mechanisms are supported.

### Does it translate request bodies?

Optionally. Set:

```properties
smart.i18n.translate-request-body=true
```

### What happens if the translation API is unavailable?

The original response is returned. If fallback is enabled, smart-i18n-auto tries the next available provider before falling back to original text.

### Does it support XML responses?

Currently the documented behavior targets JSON responses. XML support can be added later.

### How does it handle multiple Accept-Language values?

For a header such as `Accept-Language: es-ES,es;q=0.9,en;q=0.8`, it extracts the highest-priority language.

### Can I use a custom header or query parameter?

Yes.

```properties
smart.i18n.header-name=X-Target-Language
smart.i18n.query-param=lang
```

## Performance

### Will it slow down my API?

Cached translations are typically under 1ms. The first request for a new text/language pair depends on provider latency, often around 200-500ms for small payloads.

### How does deduplication work?

If a DTO contains `"Hello World"` in five fields, that string is sent to the provider once and the result is reused for all five references.

### Can I use Redis instead of in-memory cache?

Not yet. The current version uses Caffeine. Redis or Hazelcast support is listed on the roadmap.

## Troubleshooting

### Translation is not working

1. Confirm `smart.i18n.enabled=true`.
2. Verify that your provider API key is valid.
3. Confirm `@AutoTranslate` is on the controller, method, or service method.
4. Confirm the request includes `Accept-Language`, your configured custom header, or your configured query parameter.
5. Enable debug logging with `logging.level.in.devtamakuwala.smarti18nauto=DEBUG`.

### Some fields are being translated that should not be

Add `@SkipTranslation` to those fields or configure custom skip patterns:

```properties
smart.i18n.filter.skip-patterns[0]=^SKU-.*$
```

### API costs are too high

1. Keep caching enabled.
2. Increase cache TTL with `smart.i18n.cache.ttl-minutes=1440`.
3. Reduce `smart.i18n.safeguard.max-strings-per-request`.
4. Add `@SkipTranslation` to fields that should not be translated.
5. Put lower-cost providers first when using fallback.
