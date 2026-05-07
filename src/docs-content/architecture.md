# Architecture

The internal package structure and design of smart-i18n-auto.

## Package Structure

```text
in.devtamakuwala.smarti18nauto
|-- annotation
|   |-- AutoTranslate.java              # Method/class annotation to enable translation
|   `-- SkipTranslation.java            # Field annotation to exclude from translation
|-- aop
|   `-- TranslationAspect.java          # @Around aspect for service-layer methods
|-- cache
|   `-- TranslationCache.java           # Caffeine wrapper with composite cache keys
|-- config
|   |-- SmartI18nAutoConfiguration.java # @AutoConfiguration bean wiring
|   `-- SmartI18nProperties.java        # @ConfigurationProperties with nested configs
|-- engine
|   |-- TranslationEngine.java          # Core engine interface
|   `-- DefaultTranslationEngine.java   # Traversal, cache, batch call, writeback
|-- filter
|   `-- ContentFilter.java              # Regex-based skip logic
|-- interceptor
|   |-- TranslationResponseBodyAdvice.java # Intercepts outgoing responses
|   `-- TranslationRequestBodyAdvice.java  # Intercepts incoming requests when enabled
|-- provider
|   |-- TranslationProvider.java
|   |-- GoogleCloudTranslationProvider.java
|   |-- GoogleGeminiTranslationProvider.java
|   |-- OpenAiTranslationProvider.java
|   `-- TranslationProviderFactory.java
|-- traversal
|   |-- ObjectTraverser.java
|   `-- StringReference.java
`-- util
    |-- LanguageDetectionUtil.java
    `-- TranslationMarker.java
```

## Design Patterns

| Pattern | Usage |
|---------|-------|
| Strategy | `TranslationProvider` interface with three implementations |
| Factory | `TranslationProviderFactory` handles auto-detection, explicit selection, and fallback |
| Template Method | `DefaultTranslationEngine` owns the fixed translation pipeline |
| Visitor | `ObjectTraverser` walks object graphs and collects `StringReference`s |
| Decorator | `ResponseBodyAdvice` wraps Spring MVC serialization |
| Proxy | AOP `@Around` advice proxies service method returns |

## Translation Pipeline

```text
Request arrives with Accept-Language: es
        |
        v
Language Detection
  custom header -> query param -> Accept-Language -> default
        |
        v
Object Traverser
  recursively walks strings, lists, maps, DTO fields, and arrays
        |
        v
Content Filter
  skips @SkipTranslation, numbers, UUIDs, URLs, emails, enums, dates
        |
        v
Safeguard Limits
  applies max strings per request, max text length, and max depth
        |
        v
Deduplication
  repeated text is translated once and reused for all references
        |
        v
Caffeine Cache
  lookup key: sourceLang:targetLang:fullText
        |
        v
Provider Factory
  calls primary provider and optional fallback providers in batches
        |
        v
Cache Store + Writeback
  stores translated text and writes it back into the response object
```

## Runtime Notes

- Same-language requests short-circuit and avoid provider calls.
- Circular reference protection uses visited-object tracking.
- API provider failures return the original response rather than breaking the endpoint.
- Request body translation is opt-in because it changes inbound data before controller handling.

