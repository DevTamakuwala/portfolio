# smart-i18n-auto

**Plug-and-play automatic internationalization middleware for Spring Boot 4.**

Drop in one dependency, set one API key, and every `@AutoTranslate` endpoint can return responses in the language requested by the client. There are no message bundles, resource files, or manual `LocaleResolver` wiring required.

```text
Client: Accept-Language: fr
Server: { "greeting": "Bonjour le monde" }  <- was "Hello World" in code
```

## Overview

`smart-i18n-auto` is a zero-configuration Spring Boot starter that intercepts HTTP responses, and optionally request bodies, then translates string content based on language information from the request.

It is designed for teams who:

- Want instant multi-language support without maintaining `.properties` files per locale.
- Need runtime translation powered by modern LLMs or translation APIs.
- Require a drop-in library that works with existing controllers and DTOs.
- Value production safeguards such as caching, cost limits, depth limits, and API key security.

## How It Works

```text
Client Request
  Accept-Language: hi
        |
        v
Your Controller
  return ProductDto("Wireless Mouse", "Great for gaming")
        |
        v
smart-i18n-auto
  1. Detect target language from the request.
  2. Traverse the response DTO and collect translatable strings.
  3. Deduplicate repeated text and check the Caffeine cache.
  4. Batch-translate uncached values through the selected provider.
  5. Cache results and write translated values back to the response object.
        |
        v
Client Response
  { "name": "Wireless Mouse translated to Hindi", "description": "..." }
```

## Features

| Category | Feature |
|----------|---------|
| Zero Config | Auto-configured via `@AutoConfiguration`; add the dependency and an API key |
| Multi-Provider | Google Cloud Translation v2, Google Gemini, OpenAI Chat Completions |
| Auto-Detection | Provider is selected based on configured API keys |
| Fallback Chain | Optional hybrid mode tries the next provider if the primary provider fails |
| Aggressive Caching | Caffeine cache with configurable TTL and max size |
| Batch Translation | Collects all strings from a DTO and translates them in a single API call |
| Deduplication | Identical strings are sent to the API only once and fanned out afterward |
| Smart Filtering | Skips IDs, numbers, UUIDs, URLs, emails, enums, dates, and short tokens |
| Annotation-Driven | `@AutoTranslate` on controllers/methods, `@SkipTranslation` on fields |
| Deep Traversal | Recursively walks strings, lists, maps, nested DTOs, and arrays |
| Circular Reference Safe | `IdentityHashMap` visited tracking prevents infinite loops |
| Cost Protection | Configurable max strings per request, max text length, and traversal depth |
| Response Buffer Limit | WebClient memory cap prevents oversized API responses from causing OOM |
| AOP Support | `@AutoTranslate` works on service-layer methods too |
| Request Translation | Optional inbound request body translation to normalize to English |
| Jakarta Compatible | Spring Boot 4 / Spring Framework 7 ready |
| API Key Security | Keys use HTTP headers, not URLs, and are masked in logs |
| Pure Library JAR | No main class and no embedded server |

## Why smart-i18n-auto?

| Traditional i18n | smart-i18n-auto |
|------------------|-----------------|
| Maintain `.properties` files per language | No files to maintain |
| Manual `MessageSource` wiring | Fully automatic |
| Mostly static messages | Translates dynamic content too |
| Code changes per endpoint | Add `@AutoTranslate` |
| Single provider | Multi-provider with fallback chain |

