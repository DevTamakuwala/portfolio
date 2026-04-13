# Annotations

smart-i18n-auto is annotation-driven. Two annotations control the entire translation behavior.

---

## @AutoTranslate

Apply to a **controller class** or **method** to enable automatic response translation.

### Class-Level (All Endpoints)

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
        return productService.findAll();  // all endpoints translated
    }
}
```

### Method-Level (Selective)

```java
@RestController
public class MixedController {

    @GetMapping("/translated")
    @AutoTranslate
    public MessageDto getTranslated() {
        return new MessageDto("Hello World");  // translated
    }

    @GetMapping("/not-translated")
    public MessageDto getRaw() {
        return new MessageDto("Hello World");  // stays English
    }
}
```

### Override Source/Target Locale

```java
@AutoTranslate(sourceLocale = "fr", targetLocale = "de")
@GetMapping("/french-to-german")
public MessageDto frenchToGerman() {
    return new MessageDto("Bonjour le monde");
}
```

### AOP Support (Service Layer)

`@AutoTranslate` also works on service-layer methods via AOP:

```java
@Service
public class NotificationService {

    @AutoTranslate
    public NotificationDto getWelcomeMessage() {
        return new NotificationDto("Welcome to our platform!");
    }
}
```

---

## @SkipTranslation

Apply to **DTO fields** that should never be translated.

```java
public class ProductDto {

    @SkipTranslation
    private String sku;            // "SKU-12345" — never translated

    @SkipTranslation
    private String productCode;    // "ELECTRONICS_MOUSE" — never translated

    private String name;           // "Wireless Mouse" → translated
    private String description;    // "Great for gaming" → translated
    private double price;          // 29.99 — auto-skipped (number)
    private String id;             // "550e8400-..." — auto-skipped (UUID)
}
```

---

## Auto-Skipped Content

The following content is automatically skipped without needing `@SkipTranslation`:

| Type | Example | Reason |
|------|---------|--------|
| Numbers | `42`, `3.14`, `1.5e10` | Numeric pattern |
| UUIDs | `550e8400-e29b-41d4-...` | UUID pattern |
| URLs | `https://example.com` | URL pattern |
| Emails | `user@example.com` | Email pattern |
| Enums | `ORDER_STATUS`, `ACTIVE` | UPPER_SNAKE_CASE pattern |
| Dates | `2026-02-28T10:30:00` | ISO date pattern |
| Short tokens | `a`, `OK` | Below `min-length` |

You can add custom skip patterns via configuration:

```properties
smart.i18n.filter.skip-patterns[0]=^SKU-.*$
smart.i18n.filter.skip-patterns[1]=^REF\\d+$
```
