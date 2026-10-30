import { LegalDocument } from './privacyData';

export const securityData: { id: LegalDocument; en: LegalDocument } = {
  id: {
    title: "Kebijakan Pengungkapan Kerentanan",
    badge: "Keamanan Sistem & Safe Harbor (RFC 9116)",
    lastUpdated: "25 Oktober 2026",
    effectiveDate: "1 Januari 2025",
    intro: "Arunika Vistara Digital (beroperasi sebagai 'Digifolks') sangat memprioritaskan keamanan informasi, keandalan arsitektur perangkat lunak, dan perlindungan privasi data klien. Kami menyambut baik kolaborasi dengan peneliti keamanan, ethical hacker, dan komunitas teknologi untuk membantu menjaga ketahanan infrastruktur kami melalui pengungkapan celah keamanan yang bertanggung jawab (Coordinated Vulnerability Disclosure).",
    tableOfContentsLabel: "Daftar Isi Kebijakan",
    summaryHighlights: [
      {
        title: "Perlindungan Safe Harbor",
        description: "Kami menjamin perlindungan hukum bagi peneliti yang menguji sistem dengan itikad baik sesuai pedoman kebijakan ini.",
        icon: "shield"
      },
      {
        title: "Coordinated Disclosure",
        description: "Komitmen menjaga kerahasiaan celah bersama selama proses peninjauan dan perbaikan berlangsung.",
        icon: "lock"
      },
      {
        title: "Batasan Scope yang Jelas",
        description: "Panduan tegas mengenai target aset yang diperbolehkan diuji dan pengujian yang dilarang keras.",
        icon: "scale"
      },
      {
        title: "Respon Cepat & Transparan",
        description: "Komitmen waktu respon 2 hari kerja dan pembaruan transparan selama proses perbaikan.",
        icon: "check"
      }
    ],
    sections: [
      {
        id: "komitmen-keamanan",
        number: "1",
        title: "Komitmen Keamanan & Prinsip Kerja Sama",
        content: [
          "Sebagai software engineering house yang membangun sistem operasional berskala enterprise, Digifolks percaya bahwa keamanan perangkat lunak adalah proses berkelanjutan yang membutuhkan ketelitian tinggi.",
          "Kebijakan ini dibuat untuk memberikan kerangka kerja yang jelas, transparan, dan aman bagi siapa saja yang menemukan potensi celah keamanan di aset digital Digifolks, agar dapat melaporkannya langsung kepada tim teknis kami sebelum dipublikasikan ke publik."
        ]
      },
      {
        id: "safe-harbor",
        number: "2",
        title: "Perlindungan Hukum (Safe Harbor)",
        content: [
          "Kami menganggap aktivitas riset keamanan yang dilakukan sesuai dengan kebijakan ini sebagai tindakan yang sah dan bermanfaat bagi ekosistem teknologi.",
          "Jika Anda melakukan pengujian keamanan dengan itikad baik (good faith) dan mematuhi seluruh batasan dalam kebijakan ini, Digifolks menyatakan:",
          "1. Kami TIDAK akan menuntut atau meminta tindakan penegakan hukum (termasuk di bawah UU ITE atau hukum pidana/perdata terkait akses tanpa izin) terhadap Anda.",
          "2. Jika ada pihak ketiga yang memulai tindakan hukum terhadap Anda terkait riset yang Anda lakukan dalam batas panduan ini, kami akan menegaskan bahwa aktivitas Anda dilakukan dengan izin dan koordinasi kami.",
          "3. Kami akan bekerja sama secara kooperatif untuk memvalidasi dan menyelesaikan temuan Anda secepat mungkin."
        ],
        callout: {
          type: "important",
          title: "Prinsip Itikad Baik (Good Faith)",
          text: "Safe Harbor hanya berlaku apabila pengujian tidak bertujuan untuk merusak data, memeras, mengganggu operasional sistem, atau mengeksploitasi data sensitif pengguna."
        }
      },
      {
        id: "ruang-lingkup",
        number: "3",
        title: "Ruang Lingkup Pengujian (Scope)",
        content: [
          "Untuk menjaga stabilitas layanan dan integritas data klien kami, pengujian keamanan hanya diperbolehkan pada aset yang telah ditentukan di bawah ini:"
        ],
        subsections: [
          {
            title: "Aset In-Scope (Boleh Diuji):",
            items: [
              "Situs web resmi: https://www.digifolks.id dan seluruh subpath publik (/en/*, /id/*).",
              "Public Application APIs yang terdokumentasi dan di-host langsung di domain digifolks.id."
            ]
          },
          {
            title: "Aset & Aktivitas Out-of-Scope (Dilarang Keras):",
            items: [
              "Serangan Denial of Service (DoS / DDoS) atau pengujian volume tinggi yang mengganggu ketersediaan layanan.",
              "Social engineering, phishing, spear-phishing, atau vishing terhadap karyawan, kontraktor, atau klien Digifolks.",
              "Akses fisik langsung ke kantor, perangkat keras, atau fasilitas infrastruktur fisik Digifolks.",
              "Infrastruktur vendor pihak ketiga (misalnya Google Workspace, Supabase cloud host, GitHub, atau Vercel network edge).",
              "Spamming pada formulir publik, contact inquiries, atau email relay."
            ]
          }
        ]
      },
      {
        id: "aturan-pengujian",
        number: "4",
        title: "Aturan Pengujian & Etika Peneliti",
        content: [
          "Selama melakukan penelitian, Anda diwajibkan untuk mematuhi etika berikut:",
          "1. Segera hentikan pengujian begitu Anda menemukan indikasi celah keamanan (Proof of Concept minimal). Jangan mengekstrak atau mengunduh data lebih dari yang diperlukan untuk membuktikan adanya celah.",
          "2. DILARANG melihat, memodifikasi, merusak, menghapus, atau membagikan data milik klien atau pengguna lain.",
          "3. Gunakan akun atau payload pengujian Anda sendiri untuk mendemonstrasikan kerentanan.",
          "4. Berikan waktu minimal 60 (enam puluh) hari kalender bagi tim Digifolks untuk menganalisis dan merilis perbaikan sebelum mendiskusikan temuan kepada publik atau pihak ketiga."
        ]
      },
      {
        id: "cara-melapor",
        number: "5",
        title: "Tata Cara & Format Pelaporan",
        content: [
          "Jika Anda menemukan kerentanan, segera kirimkan laporan Anda melalui email ke digifolkstech@gmail.com.",
          "Agar tim kami dapat memproses laporan Anda dengan cepat, mohon sertakan informasi berikut dalam laporan Anda:"
        ],
        subsections: [
          {
            title: "Format Laporan yang Diperlukan:",
            items: [
              "Judul celah yang jelas dan tingkat keparahan yang diperkirakan (misal: Reflected XSS pada endpoint X, Kategori: Medium).",
              "Langkah reproduksi langkah-demi-langkah (step-by-step reproduction steps) yang dapat diulang.",
              "Bukti konsep (PoC) seperti cuplikan layar, script cURL, atau rekaman video singkat.",
              "Analisis potensi dampak keamanan (Security Impact).",
              "Rekomendasi teknis mitigasi atau perbaikan (opsional namun sangat kami hargai)."
            ]
          }
        ]
      },
      {
        id: "timeline-respon",
        number: "6",
        title: "Komitmen Waktu Respon (SLA)",
        content: [
          "Tim keamanan dan rekayasa perangkat lunak Digifolks berkomitmen untuk menindaklanjuti setiap laporan dengan standar waktu berikut:",
          "1. Konfirmasi Penerimaan: Kami akan mengonfirmasi penerimaan laporan Anda dalam waktu maksimal 2 (dua) hari kerja.",
          "2. Triase & Validasi: Kami akan melakukan verifikasi teknis dan mengabari status validitas temuan dalam 5 (lima) hari kerja.",
          "3. Notifikasi Perbaikan: Kami akan memberi tahu Anda secara transparan saat perbaikan telah berhasil dideploy ke lingkungan produksi."
        ]
      },
      {
        id: "kebijakan-program",
        number: "7",
        title: "Ketentuan Program & Apresiasi",
        content: [
          "Program pengungkapan kerentanan ini diselenggarakan sebagai bentuk kolaborasi keamanan sukarela (volunteer & non-monetary program).",
          "Digifolks tidak menyediakan imbalan finansial (bounty) atau kompensasi moneter. Kami menyampaikan terima kasih dan apresiasi sebesar-besarnya atas kerja sama seluruh peneliti dalam membantu menjaga keamanan ekosistem digital kami."
        ]
      }
    ],
    contactBox: {
      title: "Tim Tanggap Keamanan Siber Digifolks",
      description: "Untuk pelaporan celah keamanan atau pertanyaan terkait kebijakan ini, silakan hubungi tim keamanan kami melalui saluran berikut:",
      companyName: "PT Arunika Vistara Digital",
      brandName: "Digifolks Engineering",
      address: "D.I. Yogyakarta, Indonesia",
      email: "marketing@digifolks.id",
      secondaryEmail: "digifolkstech@gmail.com",
      phone: "+62-858-1441-2099"
    }
  },
  en: {
    title: "Vulnerability Disclosure Policy",
    badge: "System Security & Safe Harbor (RFC 9116)",
    lastUpdated: "October 25, 2026",
    effectiveDate: "January 1, 2025",
    intro: "Arunika Vistara Digital (operating as 'Digifolks') places the highest priority on information security, architectural reliability, and the confidentiality of client data. We welcome collaboration with security researchers, ethical hackers, and the broader tech community to enhance the resilience of our infrastructure through Coordinated Vulnerability Disclosure.",
    tableOfContentsLabel: "Policy Contents",
    summaryHighlights: [
      {
        title: "Legal Safe Harbor",
        description: "We provide explicit legal safe harbor protection for researchers operating in good faith under this policy.",
        icon: "shield"
      },
      {
        title: "Coordinated Disclosure",
        description: "Mutual commitment to responsible non-disclosure while vulnerability remediation is underway.",
        icon: "lock"
      },
      {
        title: "Clear Scope Boundaries",
        description: "Unambiguous rules detailing permissible target assets and strictly forbidden attack vectors.",
        icon: "scale"
      },
      {
        title: "Transparent Response SLA",
        description: "Committed 2-day acknowledgment SLA and proactive updates throughout the remediation process.",
        icon: "check"
      }
    ],
    sections: [
      {
        id: "security-commitment",
        number: "1",
        title: "Security Commitment & Collaboration",
        content: [
          "As an engineering house dedicated to building scalable enterprise operational systems, Digifolks views software security as an iterative and continuous discipline.",
          "This policy establishes a clear, transparent, and legally protected framework for researchers to safely submit potential security vulnerabilities directly to our engineering team prior to any public disclosure."
        ]
      },
      {
        id: "safe-harbor",
        number: "2",
        title: "Legal Safe Harbor Protection",
        content: [
          "We consider security research conducted within the scope of this policy to be authorized and beneficial to our ecosystem.",
          "If you make a good-faith effort to comply with this policy during your security research, Digifolks commits to:",
          "1. NOT initiating or pursuing civil lawsuits or criminal complaints (including unauthorized access allegations under Indonesian cyber law or relevant foreign statutes).",
          "2. Supporting you and validating that your activities were authorized in the event that third parties pursue legal action against you for research conducted in compliance with this policy.",
          "3. Collaborating transparently to validate and remediate your findings as swiftly as possible."
        ],
        callout: {
          type: "important",
          title: "Good-Faith Requirement",
          text: "Safe Harbor protection strictly requires that activities do not compromise user data, disrupt production operations, or involve extortion/blackmail."
        }
      },
      {
        id: "scope",
        number: "3",
        title: "Permissible Scope & Target Boundaries",
        content: [
          "To safeguard customer uptime and confidentiality, security testing is strictly restricted to designated assets:"
        ],
        subsections: [
          {
            title: "In-Scope Assets:",
            items: [
              "Primary public website: https://www.digifolks.id and all localized routes (/en/*, /id/*).",
              "Public application APIs hosted directly on the digifolks.id domain."
            ]
          },
          {
            title: "Out-of-Scope Assets & Prohibited Vectors:",
            items: [
              "Denial of Service (DoS / DDoS) attacks or high-volume automated testing that impacts service availability.",
              "Phishing, spear-phishing, social engineering, or vishing against Digifolks employees, contractors, or clients.",
              "Physical security attacks against Digifolks offices, facilities, or hardware assets.",
              "Third-party providers and vendors (e.g. Google Workspace, Supabase cloud database tier, GitHub, or Vercel edge networks).",
              "Spamming contact forms, inquiry pipelines, or automated mail relays."
            ]
          }
        ]
      },
      {
        id: "rules-of-engagement",
        number: "4",
        title: "Rules of Engagement & Ethical Conduct",
        content: [
          "Researchers must adhere to the following ethical guidelines during all assessment activities:",
          "1. Cease active testing immediately upon establishing a minimal Proof of Concept (PoC). Do not download, exfiltrate, or inspect more data than minimally required.",
          "2. Do NOT view, modify, delete, corrupt, or disclose data belonging to other users or customers.",
          "3. Use only test accounts or non-destructive payloads under your own control.",
          "4. Allow Digifolks a minimum of 60 (sixty) calendar days to remediate the vulnerability before public disclosure or third-party sharing."
        ]
      },
      {
        id: "how-to-report",
        number: "5",
        title: "How to Submit a Report",
        content: [
          "If you identify a vulnerability, please submit your findings to marketing@digifolks.id with a copy to digifolkstech@gmail.com.",
          "To enable our engineering team to triage and resolve your report quickly, please include:"
        ],
        subsections: [
          {
            title: "Required Report Details:",
            items: [
              "A concise summary of the issue and estimated severity (e.g., Cross-Site Scripting on blog search endpoint).",
              "Clear, step-by-step reproduction instructions.",
              "Proof of concept artifacts (e.g., sample cURL command, raw HTTP request, or sanitized screenshot).",
              "Assessment of the potential security impact.",
              "Remediation suggestions (optional, but greatly appreciated)."
            ]
          }
        ]
      },
      {
        id: "timeline",
        number: "6",
        title: "Response & Remediation SLA",
        content: [
          "Our engineering team commits to following standardized timelines for all vulnerability reports:",
          "1. Acknowledgment: We will acknowledge receipt of your report within 2 (two) business days.",
          "2. Triaging & Validation: We will validate the technical finding and provide a severity assessment within 5 (five) business days.",
          "3. Remediation Update: We will notify you once the fix has been deployed and verified in production."
        ]
      },
      {
        id: "program-terms",
        number: "7",
        title: "Program Terms & Non-Monetary Policy",
        content: [
          "This Vulnerability Disclosure Program operates on a voluntary and non-monetary basis.",
          "Digifolks does not provide cash bounties or financial compensation. We extend our sincere gratitude and appreciation to researchers for their responsible collaboration in keeping our digital ecosystem secure."
        ]
      }
    ],
    contactBox: {
      title: "Digifolks Security Incident Response Team",
      description: "For vulnerability submissions or security policy inquiries, contact our team via the following channels:",
      companyName: "PT Arunika Vistara Digital",
      brandName: "Digifolks Engineering",
      address: "D.I. Yogyakarta, Indonesia",
      email: "marketing@digifolks.id",
      secondaryEmail: "digifolkstech@gmail.com",
      phone: "+62-858-1441-2099"
    }
  }
};
