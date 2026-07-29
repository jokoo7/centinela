import { deriveMasterKey, generateVaultKey, rewrapVaultKey, wrapVaultKey } from './keys';

/**
 * Digunakan saat user membuat master password pertama kali.
 *
 * Hasil encryptedVaultKey dan encryptedVaultKeyIv
 * disimpan ke tabel user.
 */
export async function setupMasterPassword(masterPassword: string, vaultSalt: string) {
  // Buat masterKey dari master password + salt
  const masterKey = await deriveMasterKey(masterPassword, vaultSalt);

  // Buat vaultKey baru
  const vaultKey = await generateVaultKey();

  // Enkripsi (wrap) vaultKey menggunakan masterKey
  const { wrappedKey, iv } = await wrapVaultKey(vaultKey, masterKey);

  // Kembalikan vaultKey untuk sesi saat ini
  // dan data yang akan disimpan ke database
  return {
    vaultKey,
    encryptedVaultKey: wrappedKey,
    encryptedVaultKeyIv: iv,
  };
}

/**
 * Digunakan saat user mengganti master password.
 *
 * Hasil encryptedVaultKey dan encryptedVaultKeyIv
 * diperbarui di tabel user.
 */
export async function changeMasterPassword(
  currentVaultKey: CryptoKey,
  newMasterPassword: string,
  vaultSalt: string,
) {
  // Buat masterKey baru dari master password yang baru
  const newMasterKey = await deriveMasterKey(newMasterPassword, vaultSalt);

  // Bungkus ulang vaultKey dengan masterKey baru
  const { wrappedKey, iv } = await rewrapVaultKey(currentVaultKey, newMasterKey);

  // Kembalikan data yang akan disimpan ke database
  return {
    encryptedVaultKey: wrappedKey,
    encryptedVaultKeyIv: iv,
  };
}
