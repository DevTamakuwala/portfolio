# Release Checklist

Before publishing a new version to Maven Central, verify the project metadata, tests, and release credentials.

## Metadata

- `pom.xml` has the correct `groupId`, `artifactId`, and `version`.
- License metadata is correct.
- SCM metadata points to the repository.
- Developer metadata is present and accurate.
- README dependency snippets match the `pom.xml` version.

## Local Verification

```bash
mvn clean verify
```

Run this before every release candidate.

## Local Install

```bash
mvn clean install -Dgpg.skip=true
```

Use this for local application testing before publishing.

## Release Credentials

- GPG signing works with the release profile.
- Sonatype Central credentials exist under server id `central` in `~/.m2/settings.xml`.
- The release profile is configured for signing and deployment.

## Deploy

```bash
mvn clean deploy -Prelease -DskipTests
```

Use `deploy` only when you are ready to publish. For day-to-day local testing, prefer `mvn clean install`.

