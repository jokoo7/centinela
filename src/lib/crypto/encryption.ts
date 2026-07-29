import { base64ToBuffer, bufferToBase64, generateIv } from './encoding';

export interface EncryptedPayload {
  ciphertext: string; // Data yang sudah dienkripsi (Base64)
  iv: string; // Initialization Vector (Base64)
}

// Mengenkripsi data menjadi ciphertext dan IV
export async function encryptData(
  plaintext: string,
  vaultKey: CryptoKey,
): Promise<EncryptedPayload> {
  // Buat IV baru untuk proses enkripsi
  const ivBase64 = generateIv();
  const iv = base64ToBuffer(ivBase64);

  // Enkripsi plaintext menggunakan AES-GCM
  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    vaultKey,
    new TextEncoder().encode(plaintext),
  );

  // Kembalikan hasil enkripsi dalam format Base64
  return {
    ciphertext: bufferToBase64(ciphertextBuffer),
    iv: ivBase64,
  };
}

// Mendekripsi ciphertext menjadi data asli
export async function decryptData(payload: EncryptedPayload, vaultKey: CryptoKey): Promise<string> {
  // Dekripsi menggunakan IV yang tersimpan
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBuffer(payload.iv) },
    vaultKey,
    base64ToBuffer(payload.ciphertext),
  );

  // Ubah hasil dekripsi menjadi string
  return new TextDecoder().decode(plaintextBuffer);
}

// Mengenkripsi object agar bisa disimpan ke database
export async function encryptVaultItem<T>(data: T, vaultKey: CryptoKey): Promise<EncryptedPayload> {
  // Ubah object menjadi JSON lalu enkripsi
  return encryptData(JSON.stringify(data), vaultKey);
}

// Mendekripsi data dari database menjadi object kembali
export async function decryptVaultItem<T>(
  payload: EncryptedPayload,
  vaultKey: CryptoKey,
): Promise<T> {
  // Dekripsi menjadi JSON
  const json = await decryptData(payload, vaultKey);

  // Ubah JSON menjadi object
  return JSON.parse(json) as T;
}
