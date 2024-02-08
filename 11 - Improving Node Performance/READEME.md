# Improving Node Performance

## Crypto

> crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)

Scrypt is a password-based key derivation function (hash password).

> crypto.scrypt(password, salt, keylen[, options], callback)

### Hash Function

Hash functions can be used for many different problems, from integrity and authenticity (see Chapter 6, “Message Authentication Code Algorithms”) to pseudo random number generation (see Chapter 3, “Random Number Generation”) and key derivation. Now we shall explore the latter property.

Key derivation functions (KDF) derive key material from another source of entropy while preserving the entropy of the input and being one-way. Key derivation is often used for more than generating key material. It is also used to derive initial values (IV) and nonces (see Chapter 6) for cryptographic sessions.