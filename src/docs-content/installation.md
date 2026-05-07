# Installation

Add **smart-i18n-auto** to a Spring Boot 4 application.

## Maven

```xml
<dependency>
    <groupId>in.devtamakuwala</groupId>
    <artifactId>smart-i18n-auto</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Gradle

```groovy
implementation 'in.devtamakuwala:smart-i18n-auto:1.0.0'
```

Use the latest released version when a newer version is available on Maven Central.

## Maven Central Coordinates

```xml
<dependency>
    <groupId>in.devtamakuwala</groupId>
    <artifactId>smart-i18n-auto</artifactId>
    <version>1.0.0</version>
</dependency>
```

| Field | Value |
|-------|-------|
| GroupId | `in.devtamakuwala` |
| ArtifactId | `smart-i18n-auto` |
| Version | `1.0.0` |
| Repository | `https://github.com/DevTamakuwala/smart-i18n-auto` |

## Requirements

- Java 21+
- Spring Boot 4.x
- Maven or Gradle
- At least one supported translation provider API key

## Library Behavior

smart-i18n-auto is a pure library JAR. It does not ship a main class, does not start an embedded server by itself, and does not require `spring-boot-starter-web` inside the library artifact. It is auto-configured by Spring Boot when included in your application.

