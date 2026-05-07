# cURL Examples

Practical command-line examples for testing smart-i18n-auto.

## Basic Translation

```bash
# French
curl -s -H "Accept-Language: fr" http://localhost:8080/api/products/1 | jq

# Hindi
curl -s -H "Accept-Language: hi" http://localhost:8080/api/products/1 | jq

# Japanese
curl -s -H "Accept-Language: ja" http://localhost:8080/api/products/1 | jq

# Spanish with quality values; the primary language is extracted
curl -s -H "Accept-Language: es-ES,es;q=0.9,en;q=0.8" http://localhost:8080/api/products/1 | jq
```

## Custom Header

```properties
smart.i18n.header-name=X-Target-Language
```

```bash
curl -s -H "X-Target-Language: de" http://localhost:8080/api/products/1 | jq
```

## Query Parameter

```properties
smart.i18n.query-param=lang
```

```bash
curl -s "http://localhost:8080/api/products/1?lang=ko" | jq
```

## Same Language

```bash
# Source is English and target is English, so no provider API call is made.
curl -s -H "Accept-Language: en" http://localhost:8080/api/products/1 | jq
```

## Test Caching

```bash
# First call hits the provider.
time curl -s -H "Accept-Language: fr" http://localhost:8080/api/products/1 > /dev/null

# Second call should be served from cache.
time curl -s -H "Accept-Language: fr" http://localhost:8080/api/products/1 > /dev/null
```

## Request Body Translation

```properties
smart.i18n.translate-request-body=true
```

```bash
curl -s -X POST http://localhost:8080/api/test/feedback \
  -H "Content-Type: application/json" \
  -H "Accept-Language: fr" \
  -d '{"message": "Bonjour le monde"}' | jq
```

The incoming `message` is translated to English before your controller processes it.

