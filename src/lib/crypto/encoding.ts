// Mengubah ArrayBuffer atau Uint8Array menjadi string Base64
export function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  // Pastikan data berbentuk Uint8Array
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  // Ubah setiap byte menjadi karakter
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  // Encode string binary ke Base64
  return btoa(binary);
}

// Mengubah string Base64 kembali menjadi ArrayBuffer
export function base64ToBuffer(base64: string): ArrayBuffer {
  // Decode Base64 menjadi string binary
  const binary = atob(base64);

  // Siapkan array untuk menyimpan byte
  const bytes = new Uint8Array(binary.length);

  // Ubah setiap karakter menjadi byte
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // Kembalikan sebagai ArrayBuffer
  return bytes.buffer;
}

// Membuat byte acak dengan panjang tertentu
export function generateRandomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}

// Membuat salt acak sepanjang 16 byte lalu diubah ke Base64
export function generateSalt(): string {
  return bufferToBase64(generateRandomBytes(16));
}

// Membuat IV acak sepanjang 12 byte lalu diubah ke Base64
export function generateIv(): string {
  return bufferToBase64(generateRandomBytes(12));
}
