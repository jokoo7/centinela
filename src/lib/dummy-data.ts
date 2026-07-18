import { VaultItem } from '@/types/vault-type';

export const dummyVaultItems: VaultItem[] = [
  {
    id: 'vault-001',
    title: 'Gmail Pribadi',
    url: 'https://mail.google.com',
    pinned: true,
    type: 'ACCOUNT',
    createdAt: '2024-01-10T08:30:00.000Z',
    updatedAt: '2025-06-12T14:15:00.000Z',
    data: {
      email: 'budi.santoso@gmail.com',
      username: 'budisantoso',
      password: 'P@ssw0rd!2024',
      notes: 'Akun utama untuk email dan Google Workspace',
      credentialHistory: [
        {
          type: 'PASSWORD',
          value: 'OldP@ss2022',
          changedAt: '2022-03-10T08:30:00.000Z',
        },
        {
          type: 'PASSWORD',
          value: 'MidP@ss2023!',
          changedAt: '2023-06-15T14:20:00.000Z',
        },
      ],
    },
  },
  {
    id: 'vault-002',
    title: 'GitHub Account',
    url: 'https://github.com',
    pinned: false,
    type: 'ACCOUNT',
    createdAt: '2024-02-18T09:45:00.000Z',
    updatedAt: '2025-05-01T16:20:00.000Z',
    data: {
      username: 'dev-budi',
      password: 'Gh_2024_secure#',
    },
  },
  {
    id: 'vault-003',
    title: 'BCA Mobile Banking',
    url: 'https://m.bca.co.id',
    pinned: true,
    type: 'ACCOUNT',
    createdAt: '2024-03-05T11:15:00.000Z',
    updatedAt: '2025-07-08T07:50:00.000Z',
    data: {
      phone: '081234567890',
      pin: '482910',
      notes: 'PIN untuk transaksi, jangan dibagikan',
      credentialHistory: [
        {
          type: 'PIN',
          value: '113322',
          changedAt: '2023-11-01T09:00:00.000Z',
        },
      ],
    },
  },
  {
    id: 'vault-004',
    title: 'Kode Backup 2FA',
    pinned: false,
    type: 'NOTE',
    createdAt: '2024-04-22T13:10:00.000Z',
    updatedAt: '2024-09-15T10:25:00.000Z',
    data: {
      content:
        'Kode cadangan autentikasi dua faktor:\n1. 8291-4720\n2. 5610-3384\n3. 9012-7765\nSimpan di tempat aman.',
    },
  },
  {
    id: 'vault-005',
    title: 'Alamat Kantor & Kontak Darurat',
    pinned: true,
    type: 'NOTE',
    createdAt: '2024-05-30T15:40:00.000Z',
    updatedAt: '2025-03-18T09:35:00.000Z',
    data: {
      content:
        'Kantor: Jl. Sudirman No. 45, Jakarta Pusat\nKontak darurat: Ibu Sari - 0812-9988-7766',
    },
  },
];
