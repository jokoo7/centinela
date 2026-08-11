import { base64ToBuffer, bufferToBase64, generateIv } from './encoding';

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
}

// Mengenkripsi data (string atau object apa pun) menjadi ciphertext + IV
export async function encryptData<T>(data: T, vaultKey: CryptoKey): Promise<EncryptedPayload> {
  const plaintext = typeof data === 'string' ? data : JSON.stringify(data);

  const ivBase64 = generateIv();
  const iv = base64ToBuffer(ivBase64);

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    vaultKey,
    new TextEncoder().encode(plaintext),
  );

  return {
    ciphertext: bufferToBase64(ciphertextBuffer),
    iv: ivBase64,
  };
}

// Mendekripsi ciphertext + IV kembali menjadi data asli (string atau object)
export async function decryptData<T = string>(
  payload: EncryptedPayload,
  vaultKey: CryptoKey,
): Promise<T> {
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBuffer(payload.iv) },
    vaultKey,
    base64ToBuffer(payload.ciphertext),
  );

  const plaintext = new TextDecoder().decode(plaintextBuffer);

  try {
    return JSON.parse(plaintext) as T;
  } catch {
    return plaintext as unknown as T;
  }
}
