export type CredentialType = 'PASSWORD' | 'PIN';
export type VaultItemType = 'ACCOUNT' | 'NOTE';

// Credential History
export interface CredentialHistoryEntry {
  type: CredentialType;
  value: string;
  changedAt: string;
}

// Type ACCOUNT
export interface AccountData {
  email?: string;
  username?: string;
  phone?: string;
  password?: string;
  pin?: string;
  notes?: string;

  credentialHistory?: CredentialHistoryEntry[];
}

// Type NOTE
export interface NoteData {
  content: string;
}

export type VaultItemPlaintext =
  | { type: 'ACCOUNT'; data: AccountData }
  | { type: 'NOTE'; data: NoteData };

// Metadata Vault
export interface VaultItemMetadata {
  title: string;
  url?: string;
  pinned: boolean;
}

// type gabungan metadata + vault
export type VaultItem = VaultItemMetadata & {
  id: string;
  createdAt: string;
  updatedAt: string;
} & VaultItemPlaintext;

// type gabungan metadata + vault tanpa `credentialHistoty`
export type VaultItemFormValues = VaultItemMetadata & VaultItemPlaintext;
