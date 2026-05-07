# Annotations

smart-i18n-auto is annotation-driven. Two annotations control the main translation behavior.

## @AutoTranslate

Apply `@AutoTranslate` to a controller class or method to enable automatic response translation.

### Class-Level Translation

```java
@RestController
@RequestMapping("/api/products")
@AutoTranslate
public class ProductController {

    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping
    public List<ProductDto> getAll() {
        return productService.findAll();
    }
}
```

All endpoints in the controller are translated.

### Method-Level Translation

```java
@RestController
public class MixedController {

    @GetMapping("/translated")
    @AutoTranslate
    public MessageDto getTranslated() {
        return new MessageDto("Hello World");
    }

    @GetMapping("/not-translated")
    public MessageDto getRaw() {
        return new MessageDto("Hello World");
    }
}
```

Only the annotated endpoint is translated.

### Override Source and Target Locales

```java
@AutoTranslate(sourceLocale = "fr", targetLocale = "de")
@GetMapping("/french-to-german")
public MessageDto frenchToGerman() {
    return new MessageDto("Bonjour le monde");
}
```

### Service-Layer AOP Support

`@AutoTranslate` also works on service-layer methods through AOP:

```java
@Service
public class NotificationService {

    @AutoTranslate
    public NotificationDto getWelcomeMessage() {
        return new NotificationDto("Welcome to our platform!");
    }
}
```

## @SkipTranslation

Apply `@SkipTranslation` to DTO fields that should never be translated.

```java
public class ProductDto {

    @SkipTranslation
    private String sku;            // "SKU-12345" is never translated

    @SkipTranslation
    private String productCode;    // "ELECTRONICS_MOUSE" is never translated

    private String name;           // translated
    private String description;    // translated
    private double price;          // auto-skipped because it is numeric
    private String id;             // auto-skipped when UUID-like
}
```

## Auto-Skipped Content

The following content is skipped automatically without `@SkipTranslation`:

| Type | Example | Reason |
|------|---------|--------|
| Numbers | `42`, `3.14`, `1.5e10` | Numeric pattern |
| UUIDs | `550e8400-e29b-41d4-a716-446655440000` | UUID pattern |
| URLs | `https://example.com` | URL pattern |
| Emails | `user@example.com` | Email pattern |
| Enums | `ORDER_STATUS`, `ACTIVE` | UPPER_SNAKE_CASE pattern |
| Dates | `2026-02-28T10:30:00` | ISO date pattern |
| Short tokens | `a`, `OK` | Below `min-length` |

## Custom Skip Patterns

```properties
smart.i18n.filter.skip-patterns[0]=^SKU-.*$
smart.i18n.filter.skip-patterns[1]=^REF\\d+$
```
