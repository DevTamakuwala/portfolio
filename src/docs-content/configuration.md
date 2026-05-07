# Configuration

All properties are prefixed with `smart.i18n`.

## Core Properties

```properties
# Enable or disable the middleware (default: true)
smart.i18n.enabled=true

# Base language of your application content (default: en)
smart.i18n.source-locale=en

# Fallback target language when no header is detected (default: en)
smart.i18n.default-target-locale=en

# Optional custom header instead of Accept-Language
smart.i18n.header-name=X-Target-Language

# Optional query parameter for language
smart.i18n.query-param=lang

# Translate incoming request bodies to English (default: false)
smart.i18n.translate-request-body=false
```

## Google Cloud Translation API v2

```properties
smart.i18n.google-cloud.api-key=AIzaSy...YOUR_KEY
```

Uses `X-Goog-Api-Key` header authentication. It supports native batch translation through the `q` array parameter and is best for high-volume, cost-effective translation.

## Google Gemini API

```properties
smart.i18n.gemini.api-key=AIzaSy...YOUR_KEY
smart.i18n.gemini.model=gemini-2.0-flash
```

Uses `X-Goog-Api-Key` header authentication. It sends a structured prompt and expects a JSON array response. This provider is useful for nuanced or contextual translations. The default model is `gemini-2.0-flash`.

## OpenAI API

```properties
smart.i18n.openai.api-key=sk-proj-...YOUR_KEY
smart.i18n.openai.model=gpt-4o-mini
```

Uses `Authorization: Bearer` header authentication. It sends system and user prompts and expects a JSON array response. The translation temperature is `0.1` for consistency. The default model is `gpt-4o-mini`.

## Provider Selection

```properties
# Explicit provider selection (optional; auto-detected by default)
smart.i18n.provider.active=gemini

# Enable fallback chain: if primary fails, try the next available provider
smart.i18n.provider.fallback-enabled=true

# API call timeout in milliseconds (default: 10000)
smart.i18n.provider.timeout-ms=10000
```

## Auto-Detection Priority

When `smart.i18n.provider.active` is not set, providers are selected in this order:

| Priority | Provider | Condition |
|----------|----------|-----------|
| 1st | Google Cloud Translation | `google-cloud.api-key` is set |
| 2nd | Google Gemini | `gemini.api-key` is set |
| 3rd | OpenAI | `openai.api-key` is set |

## Cache Configuration

```properties
# Cache time-to-live in minutes (default: 60)
smart.i18n.cache.ttl-minutes=60

# Maximum cache entries (default: 10000)
smart.i18n.cache.max-size=10000
```

## Batch Translation

```properties
# Max texts per single API call (default: 50)
smart.i18n.batch.max-size=50
```

## Content Filtering

```properties
# Minimum string length to translate (default: 2)
smart.i18n.filter.min-length=2

# Additional regex patterns; matching strings are skipped
smart.i18n.filter.skip-patterns[0]=^SKU-.*$
smart.i18n.filter.skip-patterns[1]=^REF\\d+$
```

## Safety Guardrails

```properties
# Max translatable strings per request (default: 200)
smart.i18n.safeguard.max-strings-per-request=200

# Max character length per string (default: 5000)
smart.i18n.safeguard.max-text-length=5000

# Max recursive traversal depth (default: 32)
smart.i18n.safeguard.max-traversal-depth=32

# Max WebClient response buffer in MB (default: 2)
smart.i18n.safeguard.web-client-max-buffer-size-mb=2
```

