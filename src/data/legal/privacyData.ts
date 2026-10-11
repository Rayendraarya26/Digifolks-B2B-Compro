export interface LegalSection {
  id: string;
  number: string;
  title: string;
  content: string[];
  subsections?: {
    title: string;
    items: string[];
  }[];
  callout?: {
    type: 'info' | 'important' | 'highlight';
    title: string;
    text: string;
  };
}

export interface LegalDocument {
  title: string;
  badge: string;
  lastUpdated: string;
  effectiveDate: string;
  intro: string;
  summaryHighlights: {
    title: string;
    description: string;
    icon: 'shield' | 'lock' | 'file' | 'user' | 'scale' | 'check';
  }[];
  tableOfContentsLabel: string;
  sections: LegalSection[];
  contactBox: {
    title: string;
    description: string;
    companyName: string;
    brandName: string;
    address: string;
    email: string;
    secondaryEmail: string;
    phone: string;
  };
}

export const privacyData: { id: LegalDocument; en: LegalDocument } = {
  id: {
    title: "Kebijakan Privasi",
    badge: "Pelindungan Data Pribadi (UU PDP)",
    lastUpdated: "11 Oktober 2026",
    effectiveDate: "1 Januari 2025",
    intro: "Arunika Vistara Digital (beroperasi sebagai 'Digifolks' atau 'Digifolks Solutions') berkomitmen tinggi dalam melindungi privasi, kerahasiaan, dan keamanan data pribadi klien korporat, mitra bisnis, calon klien, serta setiap pengunjung situs web kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, mengelola, memproses, menyimpan, dan melindungi informasi pribadi Anda sesuai dengan Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan regulasi relevan lainnya di Indonesia.",
    tableOfContentsLabel: "Daftar Isi Kebijakan",
    summaryHighlights: [
      {
        title: "Kepatuhan Regulasi Penuh",
        description: "Disusun berlandaskan Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022) & UU ITE.",
        icon: "shield"
      },
      {
        title: "Tanpa Penjualan Data",
        description: "Kami tidak pernah dan tidak akan menjual atau menyewakan data pribadi Anda ke pihak ketiga manapun.",
        icon: "lock"
      },
      {
        title: "Kerahasiaan Tingkat B2B",
        description: "Setiap diskusi teknis dan konsultasi sistem dilindungi prinsip kerahasiaan bisnis yang ketat.",
        icon: "file"
      },
      {
        title: "Kontrol Penuh Hak Anda",
        description: "Anda memiliki hak mutlak untuk mengakses, memutakhirkan, atau menghapus data Anda kapan saja.",
        icon: "user"
      }
    ],
    sections: [
      {
        id: "pengendali-data",
        number: "01",
        title: "Identitas Pengendali Data Pribadi",
        content: [
          "Pengendali Data Pribadi yang bertanggung jawab atas pengelolaan dan pemrosesan data pribadi melalui situs web digifolks.id dan seluruh saluran komunikasi resmi kami adalah:",
          "Nama Badan Usaha: Arunika Vistara Digital",
          "Merek Dagang & Operasional: Digifolks / Digifolks Solutions",
          "Domisili & Kantor Operasional: Yogyakarta, Daerah Istimewa Yogyakarta, Indonesia",
          "Email Kontak Privasi: marketing@digifolks.id / digifolkstech@gmail.com",
          "Kontak Telepon / WhatsApp Resmi: +62 858-1441-2099 / +62 895-4010-88270",
          "Dalam konteks B2B (Business-to-Business), Arunika Vistara Digital bertindak sebagai Pengendali Data (Data Controller) untuk data interaksi bisnis dan calon klien, serta dapat bertindak sebagai Prosesor Data (Data Processor) dalam lingkup pengembangan perangkat lunak sesuai dengan perjanjian kontrak terpisah."
        ]
      },
      {
        id: "landasan-hukum",
        number: "02",
        title: "Landasan Hukum Pemrosesan Data",
        content: [
          "Kami memproses data pribadi Anda hanya jika terdapat landasan hukum yang sah berdasarkan Pasal 20 UU No. 27 Tahun 2022 (UU PDP), antara lain:",
          "Persetujuan yang Sah: Anda memberikan persetujuan eksplisit saat mengisi formulir konsultasi, meminta penawaran proyek, atau berlangganan komunikasi kami.",
          "Pelaksanaan Kontrak (Pra-kontraktual): Pemrosesan diperlukan dalam rangka penyiapan penawaran teknis, estimasi arsitektur, Non-Disclosure Agreement (NDA), atau Statement of Work (SOW) atas permintaan Anda.",
          "Kewajiban Hukum: Pemrosesan yang diwajibkan oleh peraturan perundang-undangan Republik Indonesia, termasuk perpajakan dan pelaporan transaksi elektronik.",
          "Kepentingan yang Sah (Legitimate Interests): Menjaga keamanan sistem siber kami, mencegah penyalahgunaan formulir inquiry, dan meningkatkan keandalan performa platform digital kami tanpa mengesampingkan hak privasi Anda."
        ]
      },
      {
        id: "data-yang-dikumpulkan",
        number: "03",
        title: "Kategori Data Pribadi yang Dikumpulkan",
        content: [
          "Kami membatasi pengumpulan data hanya pada informasi yang relevan dan dibutuhkan untuk melayani keperluan konsultasi dan kerja sama teknologi B2B:"
        ],
        subsections: [
          {
            title: "A. Data yang Anda Berikan Secara Sukarela",
            items: [
              "Data Identitas: Nama lengkap, gelar/posisi jabatan dalam perusahaan.",
              "Data Kontak Bisnis: Alamat email korporat/pribadi, nomor telepon seluler atau WhatsApp.",
              "Data Organisasi/Perusahaan: Nama perusahaan/instansi, industri bisnis, tautan situs web resmi perusahaan.",
              "Rincian Permintaan Proyek: Informasi teknis kebutuhan sistem (misal: AI Automation, Custom ERP/CRM, Cloud Migration, Mobile App), estimasi anggaran proyek, dan pesan singkat terkait tantangan operasional Anda."
            ]
          },
          {
            title: "B. Data Teknis yang Dikumpulkan Secara Otomatis",
            items: [
              "Informasi Perangkat & Jaringan: Alamat IP (Internet Protocol), jenis dan versi peramban (browser), sistem operasi, resolusi layar, dan preferensi bahasa sistem.",
              "Data Aktivitas & Telemetri: Waktu kunjungan, durasi halaman, jalur navigasi (page views), klik elemen, serta sumber rujukan kunjungan (referral URL).",
              "Informasi Log Server: Catatan error, latensi jaringan, dan indikator performa untuk menjamin uptime infrastruktur web."
            ]
          }
        ],
        callout: {
          type: "important",
          title: "Catatan Data Sensitif",
          text: "Kami TIDAK PERNAH meminta atau mengumpulkan data pribadi spesifik/sensitif seperti data biometrik pribadi pengunjung, riwayat medis, pandangan politik, atau data finansial perbankan pribadi melalui formulir publik website ini."
        }
      },
      {
        id: "tujuan-pemrosesan",
        number: "04",
        title: "Tujuan Penggunaan dan Pemrosesan Data",
        content: [
          "Data yang kami kumpulkan dipergunakan secara bertanggung jawab untuk tujuan-tujuan berikut:",
          "1. Menanggapi Permintaan Konsultasi: Menghubungi Anda kembali guna mendiskusikan kebutuhan arsitektur sistem, studi kelayakan teknis, dan rancangan solusi perangkat lunak.",
          "2. Penyusunan Dokumen Komersial & Legal: Menyusun proposal teknis, estimasi biaya, Non-Disclosure Agreement (NDA), serta Service Level Agreement (SLA) sebelum dimulainya kerja sama formal.",
          "3. Komunikasi Profesional: Mengirimkan pembaruan informasi status proyek, follow-up diskusi, atau pemberitahuan layanan penting terkait akun perusahaan Anda.",
          "4. Optimalisasi & Keamanan Website: Memantau traffic dan kesehatan server, mendeteksi upaya peretasan atau bot spam pada formulir kontak, dan menyajikan performa halaman yang cepat dan stabil.",
          "5. Kepatuhan Regulasi: Memenuhi ketentuan audit, pembukuan komersial, dan regulasi pemerintah Republik Indonesia."
        ]
      },
      {
        id: "cookies-pelacak",
        number: "05",
        title: "Penggunaan Cookies dan Teknologi Serupa",
        content: [
          "Situs web kami dapat menggunakan cookies dan penyimpanan lokal (local storage) untuk keperluan operasional teknis:",
          "Cookies Esensial: Diperlukan agar fungsi navigasi dan fitur dasar situs (seperti pemilihan bahasa ID/EN dan keamanan sesi) dapat berjalan semestinya.",
          "Cookies Analitik: Membantu kami memahami bagaimana pengunjung berinteraksi dengan halaman kami (misal: halaman layanan yang paling diminati) guna menyempurnakan struktur dan konten situs.",
          "Anda memiliki hak untuk menonaktifkan cookies melalui pengaturan pada browser web Anda. Harap diperhatikan bahwa penonaktifan cookies tertentu dapat memengaruhi kenyamanan pengalaman berselancar Anda di situs kami."
        ]
      },
      {
        id: "pembagian-data",
        number: "06",
        title: "Pengungkapan dan Pembagian Data kepada Pihak Ketiga",
        content: [
          "Arunika Vistara Digital menjunjung tinggi etika bisnis dan transparansi:",
          "1. Kami TIDAK PERNAH memperjualbelikan, menyewakan, atau menukar data pribadi Anda kepada pihak broker data atau pengiklan pihak ketiga manapun untuk tujuan komersial mereka.",
          "2. Pembagian Terbatas kepada Mitra Infrastruktur: Data dapat diproses oleh penyedia infrastruktur cloud hosting tepercaya, penyedia relay email transaksional (seperti Resend), dan alat analitik web dengan ketentuan bahwa mitra tersebut terikat kewajiban kerahasiaan dan kepatuhan standar keamanan data (misalnya enkripsi SOC 2 / ISO 27001).",
          "3. Kepatuhan Hukum: Kami hanya akan membuka data apabila diperintahkan secara resmi dan sah oleh institusi penegak hukum atau putusan peradilan Republik Indonesia yang berkekuatan hukum tetap."
        ]
      },
      {
        id: "keamanan-data",
        number: "07",
        title: "Keamanan dan Penyimpanan Data",
        content: [
          "Kami menerapkan serangkaian langkah perlindungan teknis dan organisasional yang ketat guna melindungi data pribadi dari akses tanpa hak, pengubahan yang tidak sah, kebocoran, atau kehancuran data:",
          "Enkripsi Dalam Transit: Seluruh pertukaran data antara browser Anda dan server kami dienkripsi menggunakan protokol HTTPS (TLS 1.3).",
          "Kontrol Akses Berlapis: Akses ke data prospek bisnis dan konsultasi hanya diberikan secara eksklusif kepada personel berwenang (tim solusi teknis & legal) dengan autentikasi ganda (2FA).",
          "Pemisahan Lingkungan Sistem: Data interaksi web dikelola secara terpisah dari repositori kode produksi dan basis data klien enterprise.",
          "Penyimpanan & Retensi: Data kontak dan konsultasi disimpan selama diperlukan untuk menindaklanjuti hubungan bisnis atau maksimal 3 (tiga) tahun setelah komunikasi terakhir jika tidak berlanjut ke tahap kontrak proyek, kecuali diwajibkan lebih lama oleh ketentuan perundang-undangan."
        ]
      },
      {
        id: "hak-subjek-data",
        number: "08",
        title: "Hak-Hak Anda sebagai Subjek Data Pribadi",
        content: [
          "Sesuai dengan Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022), Anda memiliki hak-hak fundamental berikut:",
          "1. Hak Mendapatkan Informasi: Berhak mengetahui identitas pengendali data, dasar hukum, tujuan, dan pihak penerima data.",
          "2. Hak Mengakses & Memperoleh Salinan: Berhak meminta konfirmasi dan salinan data pribadi Anda yang tersimpan di sistem kami.",
          "3. Hak Pemutakhiran & Koreksi: Berhak meminta perbaikan atas data pribadi Anda yang tidak akurat, tidak lengkap, atau usang.",
          "4. Hak Penghapusan (Right to Erasure): Berhak meminta penghapusan data pribadi Anda apabila tidak lagi diperlukan untuk tujuan pemrosesan semula atau jika Anda menarik persetujuan.",
          "5. Hak Penarikan Persetujuan: Berhak menarik kembali persetujuan pemrosesan data pribadi kapan saja tanpa memengaruhi keabsahan pemrosesan yang telah dilakukan sebelumnya.",
          "6. Hak Penundaan atau Pembatasan Pemrosesan: Berhak membatasi pemrosesan jika keakuratan data sedang disengketakan.",
          "Untuk melaksanakan hak-hak tersebut, Anda dapat mengirimkan permohonan tertulis melalui email resmi kami di marketing@digifolks.id. Tim kami akan memverifikasi identitas Anda dan menindaklanjuti permohonan dalam waktu maksimal 3x24 jam kerja."
        ]
      },
      {
        id: "transfer-internasional",
        number: "09",
        title: "Transfer Data Lintas Batas",
        content: [
          "Infrastruktur server cloud kami dapat memanfaatkan penyedia pusat data bereputasi internasional (seperti Vercel, AWS, atau Cloudflare). Apabila terjadi transfer data pribadi ke luar wilayah Indonesia, Arunika Vistara Digital memastikan negara tujuan atau penyedia layanan tersebut memiliki tingkat pelindungan data pribadi yang setara atau lebih tinggi, serta terikat klausul kontraktual standar (Standard Contractual Clauses / SCC) guna menjamin perlindungan berkelanjutan sesuai Pasal 56 UU PDP."
        ]
      },
      {
        id: "perubahan-kebijakan",
        number: "10",
        title: "Pembaruan Kebijakan Privasi",
        content: [
          "Kami dapat memperbarui Kebijakan Privasi ini secara berkala guna mencerminkan penyesuaian regulasi hukum, teknologi baru, atau perkembangan model layanan kami. Setiap pembaruan akan dicantumkan dengan tanggal revisi terbaru di bagian atas halaman ini. Kunjungan atau interaksi berkelanjutan Anda pada situs web kami setelah tanggal revisi tersebut menandakan penerimaan Anda terhadap ketentuan yang diperbarui."
        ]
      }
    ],
    contactBox: {
      title: "Hubungi Tim Perlindungan Data",
      description: "Apabila Anda memiliki pertanyaan, klarifikasi klausul hukum, atau hendak mengajukan permohonan pemenuhan hak subjek data pribadi, silakan hubungi kontak resmi kami:",
      companyName: "Arunika Vistara Digital",
      brandName: "Digifolks Solutions",
      address: "Yogyakarta, Daerah Istimewa Yogyakarta, Indonesia",
      email: "marketing@digifolks.id",
      secondaryEmail: "digifolkstech@gmail.com",
      phone: "+62 858-1441-2099 / +62 895-4010-88270"
    }
  },
  en: {
    title: "Privacy Policy",
    badge: "Personal Data Protection & Compliance",
    lastUpdated: "October 11, 2026",
    effectiveDate: "January 1, 2025",
    intro: "Arunika Vistara Digital (operating commercially as 'Digifolks' or 'Digifolks Solutions') is deeply committed to upholding the confidentiality, privacy, and security of personal data entrusted to us by corporate clients, business partners, prospective enterprise leads, and website visitors. This Privacy Policy outlines how we collect, process, manage, store, and safeguard your information in full adherence to Indonesian Law No. 27 of 2022 on Personal Data Protection (PDP Law) and international privacy standards.",
    tableOfContentsLabel: "Policy Contents",
    summaryHighlights: [
      {
        title: "Regulatory Compliance",
        description: "Formulated in accordance with Indonesia's PDP Law (Law No. 27/2022) and international best practices.",
        icon: "shield"
      },
      {
        title: "Zero Data Sale",
        description: "We never monetize, sell, or rent your personal or corporate data to third parties.",
        icon: "lock"
      },
      {
        title: "Enterprise Confidentiality",
        description: "All architectural inquiries and project briefs are guarded by rigorous confidentiality standards.",
        icon: "file"
      },
      {
        title: "Unconditional Data Rights",
        description: "You retain full rights to access, rectify, or purge your records at any time.",
        icon: "user"
      }
    ],
    sections: [
      {
        id: "pengendali-data",
        number: "01",
        title: "Data Controller Identity",
        content: [
          "The Data Controller legally responsible for the processing of personal data gathered via the digifolks.id website and our official communication channels is:",
          "Legal Entity Name: Arunika Vistara Digital",
          "Brand & Operational Identity: Digifolks / Digifolks Solutions",
          "Registered & Operational Office: Yogyakarta, Special Region of Yogyakarta, Indonesia",
          "Official Privacy Email: marketing@digifolks.id / digifolkstech@gmail.com",
          "Official Telephone / WhatsApp: +62 858-1441-2099 / +62 895-4010-88270",
          "In the B2B context, Arunika Vistara Digital serves as a Data Controller for inbound enterprise inquiries and business relationships, and operates as a Data Processor when building custom systems governed by separate bilateral Master Services Agreements."
        ]
      },
      {
        id: "landasan-hukum",
        number: "02",
        title: "Lawful Basis for Processing",
        content: [
          "We process personal data strictly where an authorized lawful ground exists under Article 20 of Law No. 27 of 2022 (PDP Law), specifically:",
          "Explicit Consent: When you voluntarily submit an inquiry form, schedule a consultation, or request technical proposals.",
          "Contractual / Pre-contractual Necessity: Processing is required to prepare technical architecture estimates, Non-Disclosure Agreements (NDAs), or Statements of Work (SOWs) prior to entering into a formal agreement.",
          "Legal Obligation: Compliance with statutory obligations under Indonesian corporate, electronic transaction, and tax laws.",
          "Legitimate Interests: Maintaining server cyber hygiene, mitigating malicious automated submissions, and ensuring high-availability web delivery without overriding your fundamental privacy rights."
        ]
      },
      {
        id: "data-yang-dikumpulkan",
        number: "03",
        title: "Categories of Personal Data Collected",
        content: [
          "We adhere to the principle of data minimization, collecting only information vital for B2B technological consultation and commercial engagements:"
        ],
        subsections: [
          {
            title: "A. Information You Voluntarily Provide",
            items: [
              "Identity Information: Full name, professional role, and executive title.",
              "Business Contact Details: Corporate or direct email address, direct telephone or WhatsApp contact number.",
              "Company / Institutional Profile: Corporate entity name, industry sector, official company domain.",
              "Technical Scope & Requirements: Target system architecture (e.g., AI Automation, Custom ERP/CRM, Cloud Modernization, Mobile Apps), estimated implementation budget, and project brief."
            ]
          },
          {
            title: "B. Technical & Telemetry Data Collected Automatically",
            items: [
              "Device & Connection Metadata: Internet Protocol (IP) address, browser family and version, operating system, display resolution, and preferred locale.",
              "Browsing Analytics: Timestamp of access, duration per session, route transitions, element interactions, and referring URL paths.",
              "Operational Logs: Server request traces and error metrics monitored for uptime reliability."
            ]
          }
        ],
        callout: {
          type: "important",
          title: "Sensitive Data Statement",
          text: "We NEVER solicit or gather sensitive personal data (e.g., biometric markers, personal health records, religious beliefs, or personal credit card credentials) via our public corporate website."
        }
      },
      {
        id: "tujuan-pemrosesan",
        number: "04",
        title: "Purposes of Data Processing",
        content: [
          "Information collected is utilized exclusively for legitimate business objectives:",
          "1. Fulfilling Consultation Requests: Communicating with your team to discuss engineering requirements, architectural feasibility, and custom software roadmaps.",
          "2. Commercial & Legal Preparation: Generating customized technical proposals, Statements of Work (SOWs), Non-Disclosure Agreements (NDAs), and SLAs.",
          "3. Ongoing Business Communication: Delivering updates regarding mutual projects, meeting schedules, or pertinent operational service alerts.",
          "4. Infrastructure Integrity & Performance: Safeguarding against DDoS incidents, preventing brute-force or bot abuse on contact forms, and ensuring ultra-fast page delivery.",
          "5. Regulatory & Audit Compliance: Fulfilling accounting, commercial record-keeping, and legal compliance mandates under Indonesian jurisdiction."
        ]
      },
      {
        id: "cookies-pelacak",
        number: "05",
        title: "Cookies and Tracking Technologies",
        content: [
          "Our web properties utilize cookies and local storage tokens for strictly controlled technical functions:",
          "Strictly Necessary Cookies: Essential for fundamental navigation, language switching (ID/EN), and session authentication verification.",
          "Performance & Analytics Cookies: Gather aggregated, anonymized insights regarding page load times and user engagement patterns to refine our technical information architecture.",
          "You retain the authority to configure or decline cookies through your web browser preference settings. Please note that disabling essential cookies may impact specific user interface behaviors."
        ]
      },
      {
        id: "pembagian-data",
        number: "06",
        title: "Third-Party Data Disclosures",
        content: [
          "Arunika Vistara Digital maintains transparent, ethical handling of all information:",
          "1. No Commercial Data Trading: We do not sell, rent, or lease your personal information to third-party data brokers or marketing intermediaries under any circumstance.",
          "2. Vetted Infrastructure Providers: Data may be securely processed by premier infrastructure services (e.g., encrypted cloud hosting, transactional email relays like Resend) bound by stringent contractual data protection terms and certified security credentials (SOC 2, ISO 27001).",
          "3. Law Enforcement Disclosures: We disclose records only where legally mandated by an authentic court order, warrant, or valid governmental subpoena under Indonesian law."
        ]
      },
      {
        id: "keamanan-data",
        number: "07",
        title: "Data Security and Retention",
        content: [
          "We deploy robust administrative, organizational, and technical security safeguards to prevent unauthorized interception, alteration, disclosure, or loss:",
          "Encryption In Transit: All communications between your client device and our infrastructure are encrypted utilizing TLS 1.3.",
          "Least-Privilege Access Controls: Access to prospective enterprise correspondence is restricted strictly to authorized solutions architects and legal leads protected with multi-factor authentication (2FA).",
          "Data Retention Period: Inbound inquiry records are retained for the duration needed to resolve your technical consultation or for up to three (3) years following your last correspondence, after which records are permanently purged unless retention is required by prevailing statutory legislation."
        ]
      },
      {
        id: "hak-subjek-data",
        number: "08",
        title: "Your Rights as a Data Subject",
        content: [
          "Under Indonesian Law No. 27 of 2022 (PDP Law), you hold explicit legal rights regarding your personal records:",
          "1. Right to Information: Gain full transparency concerning the processing purposes and identities of recipients.",
          "2. Right of Access & Portability: Request confirmation and structured digital copies of your personal data.",
          "3. Right to Rectification: Require correction and updating of inaccurate, outdated, or incomplete records.",
          "4. Right to Erasure / Deletion: Demand the permanent removal of your data where original processing purposes are fulfilled or upon consent withdrawal.",
          "5. Right to Withdraw Consent: Revoke previously granted processing consent at any time without invalidating prior lawful processing.",
          "6. Right to Restrict Processing: Suspend processing activities while disputed data accuracy is verified.",
          "To exercise any of these statutory rights, please submit a formal request to marketing@digifolks.id. Our compliance team verifies your identity and processes verified requests within 3 business days."
        ]
      },
      {
        id: "transfer-internasional",
        number: "09",
        title: "Cross-Border Data Transfers",
        content: [
          "Certain underlying cloud infrastructure nodes may reside in tier-1 enterprise data centers located outside the territory of the Republic of Indonesia. Whenever cross-border transmission occurs, Arunika Vistara Digital verifies that the destination jurisdiction enforces equivalent or higher standards of data governance, and binds all vendors to Standard Contractual Clauses (SCC) in complete compliance with Article 56 of the PDP Law."
        ]
      },
      {
        id: "perubahan-kebijakan",
        number: "10",
        title: "Amendments to this Policy",
        content: [
          "We reserve the right to amend this Privacy Policy periodically to reflect technological shifts, operational updates, or legal enactments. Revisions become effective upon publication with the updated effective date reflected at the header. Continued usage of our website and services denotes acceptance of the revised terms."
        ]
      }
    ],
    contactBox: {
      title: "Contact Data Protection Officer",
      description: "For any inquiries regarding data protection, legal interpretation, or exercising your statutory privacy rights, please reach our legal and compliance desk:",
      companyName: "Arunika Vistara Digital",
      brandName: "Digifolks Solutions",
      address: "Yogyakarta, Special Region of Yogyakarta, Indonesia",
      email: "marketing@digifolks.id",
      secondaryEmail: "digifolkstech@gmail.com",
      phone: "+62 858-1441-2099 / +62 895-4010-88270"
    }
  }
};
