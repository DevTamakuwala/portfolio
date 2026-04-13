# Architecture

The internal package structure and design of smart-i18n-auto.

## Package Structure

```text
in.devtamakuwala.smarti18nauto
├── annotation
│   ├── AutoTranslate.java              # Method/class annotation to enable translation
│   └── SkipTranslation.java            # Field annotation to exclude from translation
├── aop
│   └── TranslationAspect.java          # @Around aspect for service-layer methods
├── cache
│   └── TranslationCache.java           # Caffeine wrapper with composite cache keys
├── config
│   ├── SmartI18nAutoConfiguration.java  # @AutoConfiguration — all bean wiring
│   └── SmartI18nProperties.java         # @ConfigurationProperties with nested configs
├── engine
│   ├── TranslationEngine.java           # Core engine interface
│   └── DefaultTranslationEngine.java    # Orchestrates traverse → cache → batch → writeback
├── filter
│   └── ContentFilter.java              # Regex-based skip logic
├── interceptor
│   ├── TranslationResponseBodyAdvice.java  # Intercepts outgoing responses
│   └── TranslationRequestBodyAdvice.java   # Intercepts incoming requests (opt-in)
├── provider
│   ├── TranslationProvider.java             # Strategy interface
│   ├── GoogleCloudTranslationProvider.java  # Google Cloud Translation v2
│   ├── GoogleGeminiTranslationProvider.java # Google Gemini generateContent
│   ├── OpenAiTranslationProvider.java       # OpenAI Chat Completions
│   └── TranslationProviderFactory.java      # Auto-detection + fallback chain
├── traversal
│   ├── ObjectTraverser.java            # Recursive object graph walker
│   └── StringReference.java            # Pointer for batch writeback
└── util
    ├── LanguageDetectionUtil.java      # Header / query param / Accept-Language resolver
    └── TranslationMarker.java          # Request-scoped double-translation prevention
```

---

## Design Patterns

| Pattern | Usage |
|---------|-------|
| **Strategy** | `TranslationProvider` interface with 3 implementations |
| **Factory** | `TranslationProviderFactory` — auto-detection, explicit selection, fallback |
| **Template Method** | `DefaultTranslationEngine` — fixed pipeline with pluggable provider |
| **Visitor** | `ObjectTraverser` — walks object graph, collects `StringReference`s |
| **Decorator** | `ResponseBodyAdvice` wraps Spring MVC serialization |
| **Proxy** | AOP `@Around` aspect proxies service method returns |

---

## Translation Pipeline

```text
Request arrives with Accept-Language: es
            │
            ▼
   ┌─────────────────────┐
   │  Language Detection  │  ← custom header → query param → Accept-Language → default
   └──────────┬──────────┘
              │  targetLang = "es"
              ▼
   ┌─────────────────────┐
   │  Object Traverser    │  ← recursive walk: String, List, Map, DTO fields
   │  (depth-limited)     │  ← skips: @SkipTranslation, static, transient
   └──────────┬──────────┘
              │  List<StringReference>
              ▼
   ┌─────────────────────┐
   │  Content Filter      │  ← skips: numbers, UUIDs, URLs, emails, enums, dates
   └──────────┬──────────┘
              │  filtered references
              ▼
   ┌─────────────────────┐
   │  Safeguard Limits    │  ← max strings/request, max text length
   └──────────┬──────────┘
              │  truncated + length-checked
              ▼
   ┌─────────────────────┐
   │  Deduplication       │  ← "Hello" appearing 5 times → sent once
   └──────────┬──────────┘
              │  unique texts
              ▼
   ┌─────────────────────┐
   │  Caffeine Cache      │  ← composite key: sourceLang:targetLang:fullText
   └──────────┬──────────┘
              │  cache misses only
              ▼
   ┌─────────────────────┐
   │  Provider Factory    │  ← primary → fallback chain
   │  (batch API call)    │  ← chunked by batch.max-size
   └──────────┬──────────┘
              │  translated texts
              ▼
   ┌─────────────────────┐
   │  Cache Store         │  ← store for next time
   │  + Writeback         │  ← fan out to all references (including deduped)
   └─────────────────────┘
              │
              ▼
   Translated response body
```
