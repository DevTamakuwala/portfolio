# Examples

Real-world usage patterns with DTOs, controllers, and request body translation.

---

## DTO with Nested Objects

```java
public class OrderDto {
    private String orderId;                    // auto-skipped (short/ID-like)
    private String status;                     // "PENDING" — auto-skipped (enum)
    private CustomerDto customer;              // recursively traversed
    private List<OrderItemDto> items;          // list elements traversed
    private Map<String, String> metadata;      // map values translated
}

public class CustomerDto {
    private String name;                       // "John Doe" → translated
    @SkipTranslation
    private String email;                      // "john@example.com" — skipped
}

public class OrderItemDto {
    private String productName;                // "Wireless Mouse" → translated
    private String description;                // "Great for gaming" → translated
    private double price;                      // 29.99 — auto-skipped
}
```

## Controller

```java
@RestController
@RequestMapping("/api/orders")
@AutoTranslate
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public OrderDto getOrder(@PathVariable String id) {
        return orderService.findById(id);
    }

    @GetMapping
    public List<OrderDto> getAllOrders() {
        return orderService.findAll();  // list of DTOs — all translated
    }
}
```

---

## Request Body Translation (Opt-In)

Normalize incoming request bodies to English before processing:

```properties
smart.i18n.translate-request-body=true
```

```java
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @PostMapping
    @AutoTranslate
    public FeedbackDto submitFeedback(@RequestBody FeedbackDto feedback) {
        // feedback.message is now in English (normalized from Accept-Language)
        return feedbackService.save(feedback);
    }
}
```

---

## Simple Map Response

```java
@RestController
@RequestMapping("/api/test")
@AutoTranslate
public class TestController {

    @GetMapping("/simple")
    public Map<String, String> simple() {
        return Map.of(
            "greeting", "Hello World",
            "farewell", "Goodbye and thanks for all the fish"
        );
    }
}
```

**Request:**

```bash
curl -s -H "Accept-Language: es" http://localhost:8080/api/test/simple | jq
```

**Response:**

```json
{
  "greeting": "Hola Mundo",
  "farewell": "Adiós y gracias por todos los peces"
}
```

---

## Nested DTO with @SkipTranslation

```java
@GetMapping("/product")
public ProductDto product() {
    CategoryDto category = new CategoryDto("Electronics", "Gadgets and devices");
    return new ProductDto("Wireless Mouse", "Great for gaming", 29.99, "SKU-001", category);
}
```

**With `Accept-Language: ja`:**

```json
{
  "name": "ワイヤレスマウス",
  "description": "ゲームに最適",
  "price": 29.99,
  "sku": "SKU-001",
  "category": {
    "title": "エレクトロニクス",
    "description": "ガジェットとデバイス"
  }
}
```

> Notice: `price` (number) and `sku` (`@SkipTranslation`) are untouched.

---

## Deduplication in Action

```java
@GetMapping("/duplicates")
@AutoTranslate
public Map<String, String> duplicates() {
    return Map.of(
        "field1", "Hello World",
        "field2", "Hello World",
        "field3", "Hello World",
        "field4", "Goodbye"
    );
}
```

Logs show: `Translating 2 unique uncached strings (out of 2 unique, 4 total refs)` — only 2 unique texts sent to the API, not 4.
