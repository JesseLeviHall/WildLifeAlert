/* 
redis data types:
1. string
2. hash
3. list
4. set
5. sorted set
6. Bitmaps
7. Hyperlogs
8. Geospatial indexes

Redis questions to ask yourself when deciding what data structure to implement:
1. Do values need keys? = Hash
2. Do you need to access values by index? = List
3. multiple fields to one key? = Hash
4. unique values? = Set
5. counts of elements under one collection? = Sorted Set
6. storing objects? = Hash


Redis Stack extends Redis with modern data models, such as Document, Graph, Time Series, and data processing engines, such as search, AI, and server side functions.


basic commands:
SET key value string
GET key string
DEL key string
INCR increments by 1
INCRBY increments by n
DECR decrements by 1
DECRBY decrements by n
EXISTS key string
EXPIRE key seconds string
TTL key string
PERSIST key string
KEYS pattern string
FLUSHALL string
FLUSHDB string
RANDOMKEY string
RENAME key newkey string
RENAMENX key newkey string name cannot already exist
TYPE key string
APPEND key value string
GETRANGE key start end string negative offsets can be used to start from the end of the string
GETSET key value string - like set but returns the old value, returns error if key exists, can be used with incr for counting with automatic reset. 
SETEX set key to hold a string value and timeout after x seconds 
MGET key1 key2 key3 string
MSET key1 value1 key2 value2 key3 value3 string
MSETNX key1 value1 key2 value2 key3 value3 string will not overwrite existing values, will not perform if even one key already exists

To get other commands run command and command info or
redis-cli
help

client list
client kill ip:port
client getname
client setname name
client pause timeout
client reply on/off


Lists:
//redis data lists are defined as?
ordered collection of strings
duplicates allowed
support serverside commands to compute
LPUSH key value
RPUSH key value
LPOP key
RPOP key
LLEN key
LRANGE key start stop
LINDEX key index
LINSERT key BEFORE/AFTER pivot value
LSET key index value
LREM key count value
LTRIM key start stop
RPOPLPUSH source destination
BLPOP key1 key2 timeout
BRPOP key1 key2 timeout
BRPOPLPUSH source destination timeout

Sets:
//redis data sets are defined as?
unordered collection of strings
unique elements (no repeating members)
support serverside commands to compute
SADD key member adds given values to a set, ones that already exist are ignored. 
SREM key member removes values from set
SPOP key
SISMEMBER key member returns a list of all members of a set
SCARD key returns the count of member / elements in a set. returns 0 if key does not exist
SMEMBERS key
SRANDMEMBER key count
SINTER key1 key2
SINTERSTORE destination key1 key2
SUNION key1 key2
SUNIONSTORE destination key1 key2
SDIFF key1 key2 - returns the members of hte set resulting from the differnece between the first and all successive sets. keys that do not exist are considered empty sets.
SDIFFSTORE destination key1 key2
SMOVE source destination member - moves member from one set to another
SPOP key count

Sorted Sets:
//redis data sorted sets are defined as?
ordered collection of strings
unique elements associated with a "score" as a float (no repeating members)
support serverside commands to compute
ZADD key score member
ZREM key member
ZINCRBY key increment member
ZRANK key member
ZREVRANK key member
ZRANGE key start stop
ZREVRANGE key start stop
ZRANGEBYSCORE key min max
ZCARD key
ZSCORE key member
ZCOUNT key min max
ZINTERSTORE destination numkeys key1 key2
ZUNIONSTORE destination numkeys key1 key2
ZREM key member
ZREMRANGEBYRANK key start stop
ZREMRANGEBYSCORE key min max

Hashes:
HSET key field value - sets a field in the hash - overwrites if already exists and returns 0, otherwise returns 1
HGET key field
HDEL key field
HEXISTS key field
HLEN key
HKEYS key
HVALS key
HGETALL key
HINCRBY key field increment
HINCRBYFLOAT key field increment
HMSET key field1 value1 field2 value2
HMGET key field1 field2
HSETNX key field value

Pub/Sub:
PUBLISH channel message
SUBSCRIBE channel1 channel2
UNSUBSCRIBE channel1 channel2
PSUBSCRIBE pattern1 pattern2
PUNSUBSCRIBE pattern1 pattern2
PUBSUB subcommand [argument [argument ...]]

Transactions:
MULTI
EXEC
DISCARD
WATCH key1 key2
UNWATCH

Scripting:
EVAL script numkeys key1 key2
EVALSHA sha1 numkeys key1 key2
SCRIPT EXISTS script1 script2
SCRIPT FLUSH
SCRIPT KILL
SCRIPT LOAD script

Server:
BGREWRITEAOF
BGSAVE
CLIENT KILL ip:port
CLIENT LIST
CLIENT GETNAME
CLIENT SETNAME name
CLIENT PAUSE timeout
CLIENT REPLY on/off
CONFIG GET parameter
CONFIG SET parameter value
CONFIG RESETSTAT
DBSIZE
DEBUG OBJECT key
DEBUG SEGFAULT
FLUSHALL
FLUSHDB
INFO [section]
LASTSAVE
MONITOR
SAVE
SHUTDOWN [NOSAVE|SAVE]
SLAVEOF host port
SLOWLOG subcommand [argument]
SYNC
TIME

Connection:
AUTH password
ECHO message
PING
QUIT
SELECT index

HyperLogLog:
PFADD key element
PFCOUNT key
PFMERGE destkey sourcekey1 sourcekey2

Geo:
GEOADD key longitude latitude member
GEOHASH key member1 member2
GEOPOS key member1 member2
GEODIST key member1 member2
GEORADIUS key longitude latitude radius m|km|ft|mi
GEORADIUSBYMEMBER key member radius m|km|ft|mi

Stream:
XADD key id field value
XLEN key
XRANGE key start end
XREVRANGE key end start
XREAD COUNT count STREAMS key1 key2
XGROUP CREATE key groupname id
XGROUP SETID key groupname id
XGROUP DESTROY key groupname
XGROUP DELCONSUMER key groupname consumername
XREADGROUP GROUP groupname consumername COUNT count STREAMS key1 key2
XACK key groupname id1 id2
XCLAIM key groupname consumername min-idle-time id1 id2
XPENDING key groupname
XTRIM key MAXLEN count
XTRIM key MAXLEN ~ count


==============This Project=================================
==============Data Structure===============================
# Use HSET to store the properties of the alert in a hash
HSET alerts:animals:1 FullName "John Doe" Latitude 39.7392 Longitude -104.9903 Photo "photo_url" PhoneNumber "+123456789" Animal "Dog" Description "Injured dog" Email "johndoe@email.com" Timestamp 1649827200

# Use GEOADD to add the geospatial data to a sorted set (the key is the same as the hash key)
"GEOADD alerts:animals -104.9903 39.7392 1"
alerts:animals:1 is the key for the hash that stores the properties of the alert. The 1 at the end can be replaced with the ID of the alert.

FullName, Latitude, Longitude, Photo, PhoneNumber, Animal, Description, Email are the fields in the hash, and the values following them are the respective values of these fields.

In the GEOADD command, -104.9903 is the longitude, 39.7392 is the latitude, and 1 is the ID of the alert.

simple add geo command:
GEOADD pagosa -104.9903 39.7392 "Pagosa, Colorado"


SETTING ALERTS:
1. set hash:
HSET alerts:animals:2 FullName "Julee Dee" Latitude 39.7392 Longitude -104.9903 Photo "photo_urlforthis" PhoneNumber "5056872733" Animal "bear" Description "Injured Bear this time" Email "juleedee@email.com" Timestamp 1649827200

2. add geo:
GEOADD alerts:animals -104.9903 39.7392 2

GETTING ALL ALERTS:
1. get all the alert id's: 
ZRANGE alerts:animals 0 -1
2. loop over id's:
GEOPOS alerts:animals 1 

other example setting hash:
HSET alerts:animals:1 FullName "John Doe" Latitude 39.7392 Longitude -104.9903 Photo "photo_url" PhoneNumber "+123456789" Animal "Dog" Description "Injured dog" Email "johndoe@email.com" Timestamp 1649827200








*/
