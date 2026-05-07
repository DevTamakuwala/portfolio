# Examples

Real-world usage patterns with DTOs, controllers, nested objects, request translation, and deduplication.

## DTO with Nested Objects

```java
public class OrderDto {
    private String orderId;                    // auto-skipped when ID-like
    private String status;                     // "PENDING" is auto-skipped as enum-like
    private CustomerDto customer;              // recursively traversed
    private List<OrderItemDto> items;          // list elements traversed
    private Map<String, String> metadata;      // map values translated
}

public class CustomerDto {
    private String name;                       // translated

    @SkipTranslation
    private String email;                      // skipped
}

public class OrderItemDto {
    private String productName;                // translated
    private String description;                // translated
    private double price;                      // auto-skipped
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
        return orderService.findAll();
    }
}
```

## Request Body Translation

Enable inbound request body translation:

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
        // feedback.message is normalized to English before this point.
        return feedbackService.save(feedback);
    }
}
```

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

```bash
curl -s -H "Accept-Language: es" http://localhost:8080/api/test/simple | jq
```

```json
{
  "greeting": "Hola Mundo",
  "farewell": "Adios y gracias por todos los peces"
}
```

## Nested DTO with @SkipTranslation

```java
@GetMapping("/product")
public ProductDto product() {
    CategoryDto category = new CategoryDto("Electronics", "Gadgets and devices");
    return new ProductDto("Wireless Mouse", "Great for gaming", 29.99, "SKU-001", category);
}
```

With `Accept-Language: ja`, string content is translated while `price` and `sku` remain untouched.

```json
{
  "name": "Wireless Mouse translated to Japanese",
  "description": "Great for gaming translated to Japanese",
  "price": 29.99,
  "sku": "SKU-001",
  "category": {
    "title": "Electronics translated to Japanese",
    "description": "Gadgets and devices translated to Japanese"
  }
}
```

## Deduplication

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

The provider receives only two unique texts, not four total field values. Logs show a message like:

```text
Translating 2 unique uncached strings (out of 2 unique, 4 total refs)
```
