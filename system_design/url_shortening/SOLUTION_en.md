# Solution for designing URL shortening service

## requirements

**Functional Requirements**:

1. Given a URL, our service should generate a shorter and unique URL.
2. When users access a shortened URL, our service should redirect it to the original long URL.
3. A premium user should be able to pick a custom alias for their URL.
4. A shortened URL will expire after a standard default timespan. A premium user should be able to specify the expiration time.

**Non-Functional Requirements**:

1. Our service should be available at all times.
2. The URL redirect should happen as fast as possible.
3. Our service can be used by millions of users.


## Capacity Estimate and Constraints

**Traffic estimates**:

Let's assume that we have 100M new URLs shortened per month, with 100/1 read/write ratio (i.e. 1 shorten URL gets 100 visits). We can expect 10 billion redirects per month.

What would be Queries Per Second (QPS) for our system? New URLs shortenings per second:

```
100000000 / (30 days * 24 hours * 3600 seconds)  = ~ 38 URLs per second
```

Assuming 100/1 read/write ratio, URLs redirections per second:

```
100 * 38 = 3.8K per second
```

**Storage estimates**:

Let's assume that every shortened URL is stored for 3 years. Since we expect to have 100M URLs shortened per month, the total new number of objects we expect to store:

```
100 million * 3 years * 12 months = 3.6 billion
```

Let’s assume that each stored object will be approximately 500 bytes. We will need 1.8 terrabytes of total storage.

```
3.6 billion * 500 bytes = 1.8 TB
```

**Bandwidth estimates**:

For write requests, if we expect 100 new URLs every second, total incoming data for our service will be 50KB per second:

100 * 500 bytes = 50 KB/s

For read requests, since every second we expect ~10K URLs redirects, total outgoing data for our service would be 50MB per second:

10K * 500 bytes = ~10 MB/s


## System APIs

```
POST create_url
Params: api_key, original_url, custom_alias=None, expire_date=None
```

**Parameters:**

api_dev_key (string): The API key for authentication
original_url (string): Original URL to be shortened.
custom_alias (string): Optional custom alias for the URL.
expire_date (string): Optional expiration date for the shortened URL.

**Returns: (string)**

success: returns a shortened URL
failure: error code with response


## Database Design

To start, we would need two tables:
- store URL mapping
- store user info

```
Table: URL
- id: int (Primary Key)
- originalURL: varchar
- createdAt: timestamp
- expiredAt: timestamp
- userId: int (Foreign Key)


Table: User
- id: int (Primary Key)
- name: varchar
- email: varchar
- created_at: varchar
```

SQL v.s. NoSQL

Since we anticipate storing billions of rows, and we don’t need to use relationships between objects – a NoSQL store like DynamoDB, is a better choice. A NoSQL choice would also be easier to scale.

## Service and Algorithm

Encoding a long URL

We can compute a unique hash using algorithms such as MD5 or SHA256 of a given URL. The hash can then be encoded for display. This encoding could be base36 ([a-z ,0-9]) or base62 ([A-Z, a-z, 0-9]) and if we add ‘+’ and ‘/’ we can use Base64 encoding. A reasonable question would be, what should be the length of the short key? 6, 8, or 10 characters?

## Scaling

### Data Partitioning and Replication

a. Range Based Partitioning: We can store URLs in separate partitions based on the the ID of URL. Hence we will save all the URL primary keys ranging from 1-10000 in one partition, save those that ranging from 10001 - 20000 in another partition.


b. Hash-Based Partitioning: In this scheme, we take a hash of the object we are storing. We then calculate which partition to use based upon the hash. In our case, we can take the hash of the ‘key’ or the short link to determine the partition in which we store the data object.

### Cache

We can cache URLs that are frequently accessed. We can use any off-the-shelf solution like Varnish, which can store full URLs with their respective hashes. Thus, the application servers, before hitting the backend storage, can quickly check if the cache has the desired URL.

The detail to consider is when to expire the cache. If a cache has a fixed size, one strategy is to expire least frequently used or least recently used item.

### Load Balancer
We can add a Load balancing layer at three places in our system:

- Between Clients and Application servers
- Between Application Servers and database servers
- Between Application Servers and Cache servers

We could use a simple Round Robin approach that distributes incoming requests equally among backend servers. As we add more backend servers, they will be put behind the load balancer to serve traffic.
