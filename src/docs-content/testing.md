# Testing Locally

Use this guide to test smart-i18n-auto on your machine.

## Prerequisites

- Java 21+
- Maven 3.9+
- At least one provider API key

## Step 1: Build and Install Locally

```bash
cd smart-i18n-auto
mvn clean install -Dgpg.skip=true
```

This installs `smart-i18n-auto-1.0.0.jar` into your local Maven repository.

## Step 2: Create a Test Application

Create a Spring Boot 4 project and add:

```xml
<dependency>
    <groupId>in.devtamakuwala</groupId>
    <artifactId>smart-i18n-auto</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Step 3: Configure a Provider

```properties
smart.i18n.gemini.api-key=YOUR_GEMINI_API_KEY
```

## Step 4: Create Test DTOs

```java
public class ProductDto {
    private String name;
    private String description;
    private double price;

    @SkipTranslation
    private String sku;

    private CategoryDto category;

    // constructors, getters, setters
}

public class CategoryDto {
    private String title;
    private String description;

    // constructors, getters, setters
}
```

## Step 5: Create a Test Controller

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

    @GetMapping("/product")
    public ProductDto product() {
        CategoryDto category = new CategoryDto("Electronics", "Gadgets and devices");
        return new ProductDto("Wireless Mouse", "Great for gaming", 29.99, "SKU-001", category);
    }

    @GetMapping("/list")
    public List<ProductDto> productList() {
        return List.of(
            new ProductDto("Keyboard", "Mechanical RGB", 79.99, "SKU-002", null),
            new ProductDto("Monitor", "4K Ultra HD Display", 399.99, "SKU-003", null)
        );
    }
}
```

## Step 6: Run and Test

```bash
mvn spring-boot:run
```

### Basic Translation

```bash
curl -s -H "Accept-Language: es" http://localhost:8080/api/test/simple | jq
```

Expected shape:

```json
{
  "greeting": "Hola Mundo",
  "farewell": "Adios y gracias por todos los peces"
}
```

### Nested DTO

```bash
curl -s -H "Accept-Language: ja" http://localhost:8080/api/test/product | jq
```

`price` and `sku` should stay unchanged while eligible string fields are translated.

### List of DTOs

```bash
curl -s -H "Accept-Language: fr" http://localhost:8080/api/test/list | jq
```

### Same Language

```bash
curl -s -H "Accept-Language: en" http://localhost:8080/api/test/simple | jq
```

The original English response is returned without a provider call.

### Validate Caching

```bash
curl -s -H "Accept-Language: de" http://localhost:8080/api/test/simple | jq
curl -s -H "Accept-Language: de" http://localhost:8080/api/test/simple | jq
```

Enable debug logging for full visibility:

```properties
logging.level.in.devtamakuwala.smarti18nauto=DEBUG
```

### Test Request Body Translation

```properties
smart.i18n.translate-request-body=true
```

```bash
curl -s -X POST http://localhost:8080/api/test/feedback \
  -H "Content-Type: application/json" \
  -H "Accept-Language: fr" \
  -d '{"message": "Bonjour le monde"}' | jq
```

The incoming `message` is translated to English before controller processing.

### Test Deduplication

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

```bash
curl -s -H "Accept-Language: fr" http://localhost:8080/api/test/duplicates | jq
```

Only two unique texts are sent to the provider.

