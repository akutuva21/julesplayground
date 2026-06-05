## 2025-06-05 - Insecure Storage Fallback Removal
**Vulnerability:** `SecureStorage` implemented an insecure fallback mechanism that attempted to read unencrypted (`atob`) data if crypto was unavailable or decryption failed.
**Learning:** Fallback mechanisms that downgrade security protocols (like returning unencrypted data when decryption fails) completely negate the purpose of the security control and create a false sense of security.
**Prevention:** Fail securely. If an expected security mechanism (like encryption/decryption) is unavailable or fails, the operation must abort securely (e.g. return null) rather than falling back to an insecure state.
