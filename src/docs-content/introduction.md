# smart-i18n-auto

**Plug-and-play automatic internationalization middleware for Spring Boot 4.**

Drop in one dependency, set one API key, and every `@AutoTranslate` endpoint instantly returns responses in the language requested by the client — no message bundles, no resource files, no manual wiring.

```text
Client: Accept-Language: fr
Server: { "greeting": "Bonjour le monde" }  ← was "Hello World" in code
```

---

## How It Works

```text
Client Request                          Your Controller
     │                                       │
     │  Accept-Language: hi                  │  return ProductDto("Wireless Mouse", ...)
     │                                       │
     ▼                                       ▼
┌─────────────────────────────────────────────────────┐
│                smart-i18n-auto                      │
│                                                     │
│  1. Detect target language from header (hi)         │
│  2. Traverse DTO → collect translatable strings     │
│  3. Deduplicate → check Caffeine cache              │
│  4. Batch-translate uncached via provider API       │
│  5. Cache results → write back to DTO               │
└─────────────────────────────────────────────────────┘
     │
     ▼
Client Response
  { "name": "वायरलेस माउस", "description": "गेमिंग के लिए बढ़िया" }
```

---

## Features

| Category                | Feature                                                                           |
| ----------------------- | --------------------------------------------------------------------------------- |
| **Zero Config**         | Auto-configured via `@AutoConfiguration` — just add the dependency and an API key |
| **Multi-Provider**      | Google Cloud Translation v2, Google Gemini, OpenAI Chat Completions               |
| **Auto-Detection**      | Provider auto-selected based on which API key is configured                       |
| **Fallback Chain**      | Optional hybrid mode — if one provider fails, the next is tried                   |
| **Aggressive Caching**  | Caffeine cache with configurable TTL and max size                                 |
| **Batch Translation**   | Collects all strings from a DTO and translates in a single API call               |
| **Deduplication**       | Identical strings sent to the API only once, results fanned out                   |
| **Smart Filtering**     | Auto-skips IDs, numbers, UUIDs, URLs, emails, enums, dates, short tokens          |
| **Annotation-Driven**   | `@AutoTranslate` on controllers/methods, `@SkipTranslation` on fields             |
| **Deep Traversal**      | Recursively walks String, List, Map, nested DTOs, arrays                          |
| **Circular Ref Safe**   | `IdentityHashMap`-based visited tracking prevents infinite loops                  |
| **Cost Protection**     | Configurable max strings/request, max text length, max traversal depth            |
| **AOP Support**         | `@AutoTranslate` works on service-layer methods too, not just controllers         |
| **Request Translation** | Optional inbound request body translation (normalize to English)                  |
| **Jakarta Compatible**  | Full Jakarta namespace — Spring Boot 4 / Spring Framework 7 ready                 |
| **API Key Security**    | Keys sent via HTTP headers (not URLs), masked in `toString()` / logs              |

---

## Why smart-i18n-auto?

| Traditional i18n                          | smart-i18n-auto                    |
| ----------------------------------------- | ---------------------------------- |
| Maintain `.properties` files per language | No files to maintain               |
| Manual `MessageSource` wiring             | Fully automatic                    |
| Only static messages                      | Translates dynamic content too     |
| Requires code changes per endpoint        | Just add `@AutoTranslate`          |
| Single translation provider               | Multi-provider with fallback chain |
