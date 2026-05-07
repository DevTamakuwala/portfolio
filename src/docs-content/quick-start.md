# Quick Start

Get a translated endpoint running in a few minutes.

## 1. Add the Dependency

```xml
<dependency>
    <groupId>in.devtamakuwala</groupId>
    <artifactId>smart-i18n-auto</artifactId>
    <version>1.0.0</version>
</dependency>
```

## 2. Set an API Key

Pick any one provider in `application.properties`:

```properties
smart.i18n.gemini.api-key=YOUR_GEMINI_API_KEY
```

## 3. Annotate Your Controller

```java
@RestController
@AutoTranslate
public class ProductController {

    @GetMapping("/products/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return new ProductDto("Wireless Mouse", "Great for gaming", 29.99);
    }
}
```

## 4. Call with Accept-Language

```bash
curl -H "Accept-Language: fr" http://localhost:8080/products/1
```

## Example Response

```json
{
  "name": "Souris sans fil",
  "description": "Ideal pour le gaming",
  "price": 29.99
}
```

That's it. No message bundles. No `LocaleResolver`. No boilerplate.

`price` is a number, so it is automatically skipped. Only eligible string values are translated.
