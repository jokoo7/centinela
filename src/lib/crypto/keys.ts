import { base64ToBuffer, bufferToBase64, generateIvBytes } from './encoding';

const PBKDF2_ITERATIONS = 600_000; // Rekomendasi OWASP 2023+ untuk PBKDF2-SHA256
const AES_KEY_LENGTH = 256;

/**
 * Menghasilkan masterKey dari masterPassword + vaultSalt.
 *
 * Catatan:
 * - masterKey tidak bisa diekspor (extractable: false).
 * - Hanya bisa dipakai untuk wrap/unwrap vaultKey.
 * - Tidak bisa diubah kembali menjadi data asli.
 */
export async function deriveMasterKey(
  masterPassword: string,
  vaultSaltBase64: string,
): Promise<CryptoKey> {
  // Ubah master password menjadi CryptoKey untuk proses PBKDF2
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(masterPassword),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  // Turunkan masterKey menggunakan PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: base64ToBuffer(vaultSaltBase64),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: AES_KEY_LENGTH },
    false, // masterKey tidak boleh diekspor
    ['wrapKey', 'unwrapKey'],
  );
}

// Membuat vaultKey baru (hanya sekali saat setup vault)
export async function generateVaultKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: 'AES-GCM', length: AES_KEY_LENGTH }, true, [
    'encrypt',
    'decrypt',
  ]);
}

// Mengenkripsi (wrap) vaultKey menggunakan masterKey
// Hasilnya disimpan sebagai encryptedVaultKey + iv di database user
export async function wrapVaultKey(
  vaultKey: CryptoKey,
  masterKey: CryptoKey,
): Promise<{ wrappedKey: string; iv: string }> {
  // Buat IV acak
  const iv = generateIvBytes();

  // Enkripsi vaultKey
  const wrapped = await crypto.subtle.wrapKey('raw', vaultKey, masterKey, {
    name: 'AES-GCM',
    iv,
  });

  // Simpan hasil dalam format Base64
  return {
    wrappedKey: bufferToBase64(wrapped),
    iv: bufferToBase64(iv),
  };
}

// Membuka kembali wrappedKey menjadi vaultKey
export async function unwrapVaultKey(
  wrappedKeyBase64: string,
  ivBase64: string,
  masterKey: CryptoKey,
): Promise<CryptoKey> {
  return crypto.subtle.unwrapKey(
    'raw',
    base64ToBuffer(wrappedKeyBase64),
    masterKey,
    { name: 'AES-GCM', iv: base64ToBuffer(ivBase64) },
    { name: 'AES-GCM', length: AES_KEY_LENGTH },
    false, // vaultKey tetap tidak bisa diekspor
    ['encrypt', 'decrypt'],
  );
}

// Membungkus ulang vaultKey saat master password diganti
export async function rewrapVaultKey(
  vaultKey: CryptoKey,
  newMasterKey: CryptoKey,
): Promise<{ wrappedKey: string; iv: string }> {
  return wrapVaultKey(vaultKey, newMasterKey);
}
