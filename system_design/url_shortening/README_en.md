# Design a URL shortening service

Let's design a URL shortening service like bit.ly. This service will provide short aliases redirecting to long URLs.

ULR shortening is used to create shorter and sometimes more memorable aliases for long URLs. Users are redirected to the original URL when they hit short urls.

## Requirements:

Our URL shortening system should meet the following requirements:

**Functional Requirements**:

1. Given a URL, our service should generate a shorter and unique URL.
2. When users access a shortened URL, our service should redirect it to the original long URL.
3. A premium user should be able to pick a custom alias for their URL.
4. A shortened URL will expire after a standard default timespan. A premium user should be able to specify the expiration time.

**Non-Functional Requirements**:

1. Our service should be available at all times.
2. The URL redirect should happen as fast as possible.
3. Our service can be used by millions of users.
