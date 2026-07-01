# Design System Spec: solutions.digifolks.id
> **Project Blueprint:** B2B Enterprise & Tech Agency Platform
> **Core Aesthetic:** Modern Tech Agency / International Tech Startup (Awwwards-Standard, Stripe, Vercel, Widya Wicara, Wesclic)
> **Tone & Vibe:** Elegan, dinamis, mengandalkan kekuatan ruang kosong (white space), tipografi berani (bold typography), pergerakan sangat halus.

---

## 1. Design Tokens (Variabel Utama)

### A. Palet Warna (The "Growth & Trust" Palette)
Menggunakan basis *Dark Mode* premium sebagai warna utama/dominan, namun dikombinasikan cerdas dengan area putih/terang yang kontras.

**SEKSI GELAP (Dominant Navy Surface)**
| Token Name | Hex Code | Canvas Role / Usage |
| :--- | :--- | :--- |
| `--bg-navy-base` | `#0E1E38` | Deep Electric Navy. Biru pekat, dingin, dan mewah. Untuk area Hero dan Layanan Kami. |
| `--bg-navy-light`| `#162A4A` | Slate Blue Medium. Transisi halus ke arah abu-baja. Untuk seksi Footer & FAQ. |
| `--bg-navy-teal` | `#041E26` | Deep Teal / Ocean Ink. Sentuhan hijau samudera purba (bisa digunakan untuk variasi). |
| `--text-pure` | `#FFFFFF` | Tipografi Judul (Headings) agar kontras maksimal. |
| `--text-off-white`| `#E2E8F0` | Tipografi Deskripsi (Body text). DILARANG menggunakan putih murni. |
| `--accent-emerald`| `#00DF89` | Aksen warna di area gelap (Metrik, nomor, ikon aktif). DILARANG pakai hijau tua. |

**SEKSI TERANG (White/Off-White Surface)**
| Token Name | Hex Code | Canvas Role / Usage |
| :--- | :--- | :--- |
| `--bg-pure` | `#FFFFFF` | Latar belakang seksi terang murni (Kartu, Kotak, dll). |
| `--bg-ice-blue`| `#F0F4F8` | Ice Blue Light. Pengganti putih murni yang sangat bersih dan teduh untuk seksi terang utama. |
| `--bg-slate-soft`| `#F1F5F9` | Slate Soft. Digunakan untuk variasi kontainer terang. |
| `--text-ink` | `#0F172A` | Tipografi utama (Dark Slate) untuk area terang. |
| `--accent-forest`| `#064E3B` | Aksen hijau untuk teks metrik, tombol, indikator di area terang. |

**BORDER UTAMA**
| Token Name | Hex Code | Canvas Role / Usage |
| :--- | :--- | :--- |
| `--border-flat` | `#E2E8F0` | Garis tepi `1px` untuk komponen terang. Gunakan Navy terang untuk komponen gelap. |

### B. Tipografi & Geometri
*   **Heading Font:** `Satoshi` atau `Plus Jakarta Sans`
    *   Karakter: Bobot *Bold/Black* dengan *letter-spacing* dipersempit `-0.02em` pada ukuran besar.
*   **Body Font:** `Inter` atau `Geist Sans`
    *   Karakter: Bobot *Regular*, *line-height* longgar minimal `1.5`.
*   **Border Radius:** Konstan di `8px` hingga `12px` (Card, Badge, Button).
*   **Borders Over Shadows:** Batasi shadow berlebihan. Utamakan garis tepi (*borders*) tipis `1px`.

---

## 2. Panduan Spesifik Komponen & Halaman

### A. Navigasi Header (Global Sticky Navbar)
*   Efek *Glassmorphism* (Awwwards): `backdrop-filter: blur(12px); background-color: rgba(255, 255, 255, 0.8);` (terang).
*   Garis pembatas bawah `1px` agar terpisah tegas dari konten saat digulir.

### B. SEKSI TERANG / MUTED LIGHT (Anti-Glare Rules)
*   **DILARANG** menggunakan warna Pure White (`#FFFFFF`) sebagai latar belakang penuh sebuah seksi (Section Background).
*   **Latar Belakang Dasar Seksi Terang:** Gunakan Soft Gray `--bg-terang-warm` (`#F8F9FA`) atau Ice Blue Muted `--bg-terang-cool` (`#F4F6F8`).
*   **Komponen di Atas Seksi Terang:** Kotak kartu (*cards*), kontainer, atau tumpukan list fitur menggunakan warna Putih Murni (`#FFFFFF`) dengan garis tepi `1px` berwarna `#E2E8F0`. 
*   **Efek Visual:** Menciptakan efek dimensi (layering) di mana kartu putih terlihat mengapung secara lembut di atas latar belakang seksi yang abu-abu, sehingga mata klien tidak lelah karena silau.

**Strategi Irama Kontras Halaman (Alternating Sections):**
- **Hero Section:** Deep Electric Navy (`#0E1E38`). Menyala solid dan kokoh.
- **Core DNA (Seksi Terang 1):** Ice Blue Light (`#F0F4F8`). Memberikan ruang napas pertama yang sangat bersih. Kartu di dalamnya menggunakan `#FFFFFF` (Putih murni).
- **Layanan Kami (Seksi Gelap):** Deep Electric Navy (`#0E1E38`). Kontras tajam yang membuat elemen aksen hijau sangat menyala.
- **Featured Work (Seksi Terang 2):** Ice Blue Light (`#F0F4F8`). Memberi kesan presisi dan profesional ala majalah bisnis.
- **FAQ & Footer:** Slate Blue Medium (`#162A4A`). Transisi gelap yang berbeda dari Hero untuk penutup elegan.
- **Transisi Halus:** Setiap pergantian seksi (Gelap - Terang - Gelap) menciptakan irama (rhythm) visual untuk memecah kebosanan (*anti-monoton*). Latar belakang memudar secara alami dengan garis pembatas tipis 1px (`border-border-flat/10`).

### C. Layanan Kami & `/services`
*   Latar belakang menggunakan nuansa Navy terang dengan *border 1px*.
*   Teks judul: Putih murni. Deskripsi: Off-white.
*   Nomor (`01`, `02`) dan Ikon: `Emerald Green` (`#00DF89`).
*   Tags Teknologi (`Next.js`): Latar abu-abu sangat tipis, teks Navy agar tak dominan.

### D. Portofolio & `/work`
*   **Metrik Bisnis:** Tampilkan statistik besar (`40% Fuel Efficiency`). Warna Emerald di area gelap, Forest Green di area terang.
*   Visual Kartu: Potongan *screenshot UI* asli dengan *fade-out* atau *overlay border* minimalis (hapus abstrak bulat).
*   **Detail Proyek (`/work/detail`):** Blok atas Navy dengan garis tepi `1px` pada metrik 4 kolom. Angka menyala warna Emerald Green.

### E. Halaman Kontak (`/contact`)
*   Tema: **Full Navy Blue**.
*   Kotak Formulir: Navy sedikit lebih muda dari latar belakang dasar.
*   Input Minimalis: Hanya garis bawah tipis (*underlined input*). Saat `:focus` berubah warna *Bright Emerald Green*.
*   *Badges Selection* ("What are you looking for?"): Interaktif. Aktif -> Latar/Border hijau terang.

---

## 3. Panduan Animasi & Gerakan (Motion Spec)
*   **Scroll Reveal:** Efek animasi *fade-in up* (muncul dari bawah `20px`) untuk memperkuat kesan premium.
*   **Hover Interaction:** Semua elemen interaktif merespon halus menggunakan kurva kustom `cubic-bezier(0.4, 0, 0.2, 1)` dengan durasi `200ms - 300ms`.
