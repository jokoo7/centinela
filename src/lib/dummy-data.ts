import { VaultItem } from '@/types/vault-type';

export const dummyVaultItems: VaultItem[] = [
  // 1. ACCOUNT lengkap - ada credentialHistory (password pernah diganti)
  {
    id: 'vault-001',
    title: 'Gmail Pribadi',
    url: 'https://mail.google.com',
    pinned: true,
    type: 'ACCOUNT',
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

  // 2. ACCOUNT minimal - tanpa credentialHistory
  {
    id: 'vault-002',
    title: 'GitHub Account',
    url: 'https://github.com',
    pinned: false,
    type: 'ACCOUNT',
    data: {
      username: 'dev-budi',
      password: 'Gh_2024_secure#',
    },
  },

  // 3. ACCOUNT dengan PIN - ada credentialHistory (PIN pernah diganti)
  {
    id: 'vault-003',
    title: 'BCA Mobile Banking',
    url: 'https://m.bca.co.id',
    pinned: true,
    type: 'ACCOUNT',
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

  // 4. NOTE - tidak relevan dengan credentialHistory
  {
    id: 'vault-004',
    title: 'Kode Backup 2FA',
    pinned: false,
    type: 'NOTE',
    data: {
      content:
        'Kode cadangan autentikasi dua faktor:\n1. 8291-4720\n2. 5610-3384\n3. 9012-7765\nSimpan di tempat aman.',
    },
  },

  // 5. NOTE pinned
  {
    id: 'vault-005',
    title: 'Alamat Kantor & Kontak Darurat',
    pinned: true,
    type: 'NOTE',
    data: {
      content:
        'Kantor: Jl. Sudirman No. 45, Jakarta Pusat\nKontak darurat: Ibu Sari - 0812-9988-7766',
    },
  },
];
