import pg from 'pg';
const { Client } = pg;

async function run() {
  const client = new Client({
    user: 'postgres.tcqykhpivalgfzavjkze',
    password: 'Digifolks#2025!',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  console.log("Connecting to Supabase PostgreSQL database...");
  await client.connect();
  console.log("Connected successfully!");

  try {
    // 1. Create Tables
    console.log("Creating database tables...");
    await client.query(`
      -- Portfolios Table
      CREATE TABLE IF NOT EXISTS portfolios (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        client TEXT NOT NULL,
        title TEXT NOT NULL,
        project_type TEXT NOT NULL DEFAULT 'Web App',
        headline TEXT NOT NULL DEFAULT '',
        industry TEXT NOT NULL,
        duration TEXT NOT NULL DEFAULT 'Completed',
        year TEXT NOT NULL DEFAULT '2026',
        metric TEXT NOT NULL DEFAULT '',
        metric_label TEXT NOT NULL DEFAULT '',
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        overview TEXT NOT NULL,
        challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
        solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
        results JSONB NOT NULL DEFAULT '[]'::jsonb,
        is_proposal BOOLEAN NOT NULL DEFAULT FALSE,
        cover_image_url TEXT,
        gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Services Table
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        num INTEGER NOT NULL,
        title TEXT NOT NULL,
        short_desc TEXT NOT NULL,
        description TEXT NOT NULL,
        features JSONB NOT NULL DEFAULT '[]'::jsonb,
        theme_bg TEXT NOT NULL DEFAULT 'bg-pop-blue',
        theme_text TEXT NOT NULL DEFAULT 'text-pop-blue',
        tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
        icon_url TEXT NOT NULL DEFAULT '',
        icon_lp_url JSONB NOT NULL DEFAULT '[]'::jsonb,
        image_url TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- FAQs Table
      CREATE TABLE IF NOT EXISTS faqs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT 'bg-pop-pink',
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Testimonials Table
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        quote TEXT NOT NULL,
        author TEXT NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Team DNA Table
      CREATE TABLE IF NOT EXISTS team_dna (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        value TEXT NOT NULL,
        short_pitch TEXT NOT NULL,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- General Settings Table
      CREATE TABLE IF NOT EXISTS general_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hero_animation_url TEXT NOT NULL DEFAULT '/Video/Hero/HeroAnimV2.webm',
        hero_cta_url TEXT NOT NULL DEFAULT '/contact',
        grand_cta_url TEXT NOT NULL DEFAULT '/services',
        book_meeting_url TEXT NOT NULL DEFAULT '/book-meeting',
        instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com',
        linkedin_url TEXT NOT NULL DEFAULT 'https://linkedin.com',
        github_url TEXT NOT NULL DEFAULT 'https://github.com',
        email TEXT NOT NULL DEFAULT 'digifolkstech@gmail.com',
        contact_numbers JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Contact Submissions Table (Inquiries from client form)
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        company TEXT,
        email TEXT NOT NULL,
        service TEXT NOT NULL,
        budget TEXT,
        currency TEXT NOT NULL DEFAULT 'IDR',
        details TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Enable Row Level Security (RLS)
      ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
      ALTER TABLE services ENABLE ROW LEVEL SECURITY;
      ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
      ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
      ALTER TABLE team_dna ENABLE ROW LEVEL SECURITY;
      ALTER TABLE general_settings ENABLE ROW LEVEL SECURITY;
      ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

      -- Drop existing policies if any to avoid duplication errors
      DROP POLICY IF EXISTS "Public can view published portfolios" ON portfolios;
      DROP POLICY IF EXISTS "Public can view published services" ON services;
      DROP POLICY IF EXISTS "Public can view published faqs" ON faqs;
      DROP POLICY IF EXISTS "Public can view published testimonials" ON testimonials;
      DROP POLICY IF EXISTS "Public can view team_dna" ON team_dna;
      DROP POLICY IF EXISTS "Public can view general_settings" ON general_settings;
      DROP POLICY IF EXISTS "Public can insert contact submissions" ON contact_submissions;
      DROP POLICY IF EXISTS "Authenticated users have full access to all tables" ON portfolios;
      DROP POLICY IF EXISTS "Authenticated users have full access to services" ON services;
      DROP POLICY IF EXISTS "Authenticated users have full access to faqs" ON faqs;
      DROP POLICY IF EXISTS "Authenticated users have full access to testimonials" ON testimonials;
      DROP POLICY IF EXISTS "Authenticated users have full access to team_dna" ON team_dna;
      DROP POLICY IF EXISTS "Authenticated users have full access to general_settings" ON general_settings;
      DROP POLICY IF EXISTS "Authenticated users have full access to contact_submissions" ON contact_submissions;

      -- Read Policies (Public)
      CREATE POLICY "Public can view published portfolios" ON portfolios FOR SELECT USING (true);
      CREATE POLICY "Public can view published services" ON services FOR SELECT USING (true);
      CREATE POLICY "Public can view published faqs" ON faqs FOR SELECT USING (true);
      CREATE POLICY "Public can view published testimonials" ON testimonials FOR SELECT USING (true);
      CREATE POLICY "Public can view team_dna" ON team_dna FOR SELECT USING (true);
      CREATE POLICY "Public can view general_settings" ON general_settings FOR SELECT USING (true);
      CREATE POLICY "Public can insert contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

      -- Full access policies for Authenticated users (Admin)
      CREATE POLICY "Authenticated users have full access to all tables" ON portfolios FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated users have full access to services" ON services FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated users have full access to faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated users have full access to testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated users have full access to team_dna" ON team_dna FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated users have full access to general_settings" ON general_settings FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated users have full access to contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
    `);
    console.log("Tables and RLS policies created successfully!");

    // 2. Seeding 8 Portfolios
    console.log("Seeding 8 portfolios...");
    const portfolios = [
      {
        slug: "gorillacoach",
        title: "Integrated Web e-Commerce & POS System",
        client: "GorillaCoachID",
        project_type: "E-Commerce & POS",
        headline: "Integrated Web e-Commerce & POS System",
        industry: "Retail / E-Commerce",
        duration: "On Going",
        year: "2026",
        metric: "3-in-1",
        metric_label: "Unified Platform (POS + Store + Back Office)",
        tags: ["Next.js", "Node.js", "PostgreSQL", "POS Integration", "Real-time Sync"],
        overview: "GorillaCoachID managed retail sales, online orders, inventory, and business operations through separate systems, creating data inconsistencies, duplicate administrative work, and limited visibility into overall business performance. They needed a unified platform to centralize all operations.",
        challenges: [
          "Data inconsistencies across separate retail sales and online order systems.",
          "Duplicate administrative work due to disconnected inventory and customer databases.",
          "Limited visibility into overall business performance without a centralized dashboard.",
          "No real-time synchronization between online and offline sales channels."
        ],
        solutions: [
          "Developed an integrated business platform combining Point of Sale (POS), Online Store, and Back Office Management into a single ecosystem.",
          "Implemented real-time synchronization of sales transactions, inventory, product catalogs, and customer information across all channels.",
          "Built a centralized administrative dashboard for monitoring business performance and managing daily operations.",
          "Delivered a seamless purchasing experience for customers across online and offline channels."
        ],
        results: [
          { value: "3-in-1", label: "Unified Platform" },
          { value: "Real-time", label: "Data Sync" },
          { value: "100%", label: "Channel Coverage" },
          { value: "1", label: "Central Dashboard" }
        ],
        cover_image_url: "/Image/Portfolio/gorillacoach/cover.png",
        gallery_images: [
          "/Image/Portfolio/gorillacoach/gallery-01.png",
          "/Image/Portfolio/gorillacoach/gallery-02.png",
          "/Image/Portfolio/gorillacoach/gallery-03.png",
          "/Image/Portfolio/gorillacoach/gallery-04.png"
        ],
        is_proposal: false,
        sort_order: 1
      },
      {
        slug: "wecore",
        title: "Professional Agency Company Profile",
        client: "Wisesa Cipta Karsa (We Core)",
        project_type: "Web App",
        headline: "Professional Agency Company Profile for We Core",
        industry: "Creative Agency",
        duration: "Completed",
        year: "2026",
        metric: "SEO",
        metric_label: "Search Engine Optimized",
        tags: ["Next.js", "WebGL", "UI/UX Strategy", "SEO", "Conversion Optimization"],
        overview: "We Core struggled with low conversion rates due to a static, slow-loading website that failed to capture professional credibility. Potential clients lost interest before engaging with the content, resulting in missed business opportunities.",
        challenges: [
          "Low conversion rates due to static and slow-loading website design.",
          "Failed to capture professional credibility through the existing digital presence.",
          "Potential clients lost interest before engaging with the content.",
          "Poor search engine visibility limiting organic discovery by prospects."
        ],
        solutions: [
          "Implemented a conversion-oriented UI/UX strategy combined with technical optimizations for page speed.",
          "Streamlined navigation architecture for prospective clients to quickly find relevant information.",
          "Boosted search engine visibility through optimized content architecture and SEO best practices.",
          "Transformed the website into an active marketing tool that converts traffic into high-potential business leads."
        ],
        results: [
          { value: "SEO", label: "Optimized" },
          { value: "Fast", label: "Page Load" },
          { value: "High", label: "Conversion Rate" },
          { value: "Pro", label: "Brand Credibility" }
        ],
        cover_image_url: "/Image/Portfolio/wecore/cover.png",
        gallery_images: [
          "/Image/Portfolio/wecore/gallery-01.png",
          "/Image/Portfolio/wecore/gallery-02.png",
          "/Image/Portfolio/wecore/gallery-03.png",
          "/Image/Portfolio/wecore/gallery-04.png"
        ],
        is_proposal: false,
        sort_order: 2
      },
      {
        slug: "kazeer",
        title: "Next-Generation FnB POS & AI Business Consultant",
        client: "Kazeer Solusi Digital",
        project_type: "POS & AI System",
        headline: "Next-Generation FnB POS & AI Business Consultant",
        industry: "Food & Beverage",
        duration: "Completed",
        year: "2026",
        metric: "AI",
        metric_label: "Integrated Business Consultant",
        tags: ["Next.js", "AI Chatbot", "WhatsApp API", "Payment Gateway", "Business Analytics"],
        overview: "Kazeer's POS system development was stalled by their previous vendor, resulting in unstable source code, a broken core ordering flow, and asynchronous frontend-backend communication that rendered the application non-functional. They needed a complete code overhaul.",
        challenges: [
          "POS system development stalled by the previous vendor with unstable source code.",
          "Broken core ordering flow rendering the application non-functional.",
          "Asynchronous frontend-backend communication causing data inconsistencies.",
          "No AI-driven analytics for business decision-making and operational insights."
        ],
        solutions: [
          "Performed complete code overhaul and application optimization to stabilize the system.",
          "Refined the open-bill ordering flow for seamless FnB transaction management.",
          "Integrated a local payment gateway for automated transaction processing.",
          "Embedded an AI Business Consultant Chatbot via WhatsApp for automated turnover analysis, stock tracking, P&L reporting, and real-time COGS estimation."
        ],
        results: [
          { value: "AI", label: "Business Consultant" },
          { value: "Auto", label: "Payment Processing" },
          { value: "Real-time", label: "COGS Estimation" },
          { value: "WhatsApp", label: "Integrated" }
        ],
        cover_image_url: "/Image/Portfolio/kazeer/cover.png",
        gallery_images: [
          "/Image/Portfolio/kazeer/gallery-01.png",
          "/Image/Portfolio/kazeer/gallery-02.png",
          "/Image/Portfolio/kazeer/gallery-03.png",
          "/Image/Portfolio/kazeer/gallery-04.png"
        ],
        is_proposal: false,
        sort_order: 3
      },
      {
        slug: "homestay",
        title: "Digital Tourism Catalog & Management Platform",
        client: "Homestaydijogja.Id",
        project_type: "Web App",
        headline: "Digital Tourism Catalog & Management Platform",
        industry: "Tourism",
        duration: "Completed",
        year: "2026",
        metric: "Local",
        metric_label: "SEO Focused Platform",
        tags: ["Custom CMS", "Local SEO", "Responsive Architecture", "Real-time Updates"],
        overview: "Local accommodation providers in Yogyakarta lacked a centralized digital presence, forcing them to rely heavily on third-party booking platforms with high commission fees that eroded their profit margins. They needed an independent digital catalog.",
        challenges: [
          "No centralized digital presence for local accommodation providers in Yogyakarta.",
          "Heavy reliance on third-party booking platforms with high commission fees.",
          "Eroding profit margins due to platform dependency costs.",
          "Managers lacked full control over their property content and pricing updates."
        ],
        solutions: [
          "Developed a high-performance digital catalog focused on local SEO and user-centric navigation.",
          "Integrated a custom CMS enabling real-time updates for unit details, amenities, and pricing.",
          "Built with a lightweight and responsive architecture ensuring rapid access for travelers.",
          "Created a powerful independent alternative to third-party platform dependencies."
        ],
        results: [
          { value: "Local", label: "SEO Optimized" },
          { value: "CMS", label: "Custom Built" },
          { value: "Fast", label: "Access Speed" },
          { value: "0%", label: "Commission Fees" }
        ],
        cover_image_url: "/Image/Portfolio/homestay/cover.png",
        gallery_images: [
          "/Image/Portfolio/homestay/gallery-01.png",
          "/Image/Portfolio/homestay/gallery-02.png",
          "/Image/Portfolio/homestay/gallery-03.png",
          "/Image/Portfolio/homestay/gallery-04.png"
        ],
        is_proposal: false,
        sort_order: 4
      },
      {
        slug: "kawan-kita-semua",
        title: "Smart Aquaculture Decision Support System",
        client: "PT Kawan Kita Semua",
        project_type: "Web App",
        headline: "Smart Aquaculture Decision Support System",
        industry: "Aquaculture",
        duration: "On Going",
        year: "2026",
        metric: "AI",
        metric_label: "Driven Precision Insights",
        tags: ["AI Analytics", "IoT Monitoring", "Real-time Dashboard", "Inventory Management"],
        overview: "Shrimp farmers faced significant risks of harvest failure due to unmonitored water quality parameters and the difficulty of generating accurate growth predictions from data often skewed by outliers. They needed a centralized digital command center with AI capabilities.",
        challenges: [
          "Significant risks of harvest failure due to unmonitored water quality parameters.",
          "Difficulty generating accurate growth predictions from data skewed by outliers.",
          "No centralized system for integrating daily operational data (feed, water quality, sampling).",
          "Lack of early environmental risk detection and cultivation strategy optimization."
        ],
        solutions: [
          "Engineered a comprehensive digital ecosystem digitizing the entire shrimp farming lifecycle with real-time water quality monitoring.",
          "Integrated AI to analyze multidimensional relationships between environmental variables and shrimp biomass for high-precision managerial insights.",
          "Built atomic inventory management to prevent race conditions in stock tracking.",
          "Implemented an automated risk dashboard ensuring operational efficiency and biological stability throughout every cultivation cycle."
        ],
        results: [
          { value: "AI", label: "Precision Analytics" },
          { value: "24/7", label: "Water Monitoring" },
          { value: "Atomic", label: "Inventory Mgmt" },
          { value: "Auto", label: "Risk Detection" }
        ],
        cover_image_url: "/Image/Portfolio/kawan-kita-semua/cover.png",
        gallery_images: [
          "/Image/Portfolio/kawan-kita-semua/gallery-01.png",
          "/Image/Portfolio/kawan-kita-semua/gallery-02.png",
          "/Image/Portfolio/kawan-kita-semua/gallery-03.png",
          "/Image/Portfolio/kawan-kita-semua/gallery-04.png"
        ],
        is_proposal: false,
        sort_order: 5
      },
      {
        slug: "positive-strength",
        title: "Scalable Business Website",
        client: "Positive Strength",
        project_type: "Web App",
        headline: "Scalable Business Website for Positive Strength",
        industry: "Fitness",
        duration: "Completed",
        year: "2025",
        metric: "∞",
        metric_label: "Scalable Architecture",
        tags: ["Scalable Architecture", "Flexible CMS", "Modular Design", "Performance"],
        overview: "Positive Strength, a gym equipment supplier, encountered critical technical bottlenecks and site crashes during high-traffic growth phases, leading to lost sales opportunities and a degraded brand reputation. They needed a future-proof digital foundation.",
        challenges: [
          "Critical technical bottlenecks during high-traffic growth phases.",
          "Site crashes leading to lost sales opportunities.",
          "Degraded brand reputation due to unreliable platform performance.",
          "No elastic capacity to handle expanding market reach without compromising performance."
        ],
        solutions: [
          "Engineered a robust web infrastructure utilizing scalable architecture for consistent stability.",
          "Implemented a flexible CMS empowering the client with autonomous catalog control.",
          "Ensured consistent platform stability during traffic surges with elastic capacity.",
          "Prioritized modular design so future feature expansions can be integrated seamlessly without rebuilding the core system."
        ],
        results: [
          { value: "∞", label: "Scalability" },
          { value: "99.9%", label: "Uptime" },
          { value: "CMS", label: "Autonomous Control" },
          { value: "Modular", label: "Architecture" }
        ],
        cover_image_url: "/Image/Portfolio/positive-strength/cover.png",
        gallery_images: [
          "/Image/Portfolio/positive-strength/gallery-01.png",
          "/Image/Portfolio/positive-strength/gallery-02.png",
          "/Image/Portfolio/positive-strength/gallery-03.png",
          "/Image/Portfolio/positive-strength/gallery-04.png"
        ],
        is_proposal: false,
        sort_order: 6
      },
      {
        slug: "digital-assessment",
        title: "Introduction to Company Culture: Digital Assessment",
        client: "TMMIN",
        project_type: "Web App",
        headline: "Introduction to Company Culture: Digital Assessment for Prospective Client",
        industry: "Human Resources",
        duration: "Completed",
        year: "2025",
        metric: "100%",
        metric_label: "Automated Scoring",
        tags: ["Assessment Platform", "Automated Scoring", "Analytics Dashboard", "Question Bank"],
        overview: "Traditional evaluation methods at the organization were plagued by labor-intensive administration and inherent human bias, leading to inconsistent results and fragmented data that hindered objective performance tracking.",
        challenges: [
          "Labor-intensive administration of traditional evaluation methods.",
          "Inherent human bias leading to inconsistent assessment results.",
          "Fragmented data hindering objective performance tracking.",
          "No centralized framework for automating complex scoring workflows."
        ],
        solutions: [
          "Developed a web-based assessment application to digitize the entire employee evaluation lifecycle.",
          "Integrated comprehensive question bank management with automated scoring engine.",
          "Built real-time analytical dashboards for data-driven insights.",
          "Eliminated manual administrative bottlenecks and enhanced data integrity for objective decision-making."
        ],
        results: [
          { value: "100%", label: "Automated Scoring" },
          { value: "Real-time", label: "Analytics" },
          { value: "Zero", label: "Manual Bottlenecks" },
          { value: "Data", label: "Driven Decisions" }
        ],
        cover_image_url: "/Image/Portfolio/digital-assessment/cover.png",
        gallery_images: [
          "/Image/Portfolio/digital-assessment/gallery-01.png",
          "/Image/Portfolio/digital-assessment/gallery-02.png",
          "/Image/Portfolio/digital-assessment/gallery-03.png",
          "/Image/Portfolio/digital-assessment/gallery-04.png"
        ],
        is_proposal: true,
        sort_order: 7
      },
      {
        slug: "malaka",
        title: "Integrated Learning Platform (Malaka Project)",
        client: "Malaka Project",
        project_type: "Web App",
        headline: "Integrated Learning Platform (Malaka Project)",
        industry: "Education",
        duration: "Completed",
        year: "2025",
        metric: "All-in-1",
        metric_label: "Learning Ecosystem",
        tags: ["Video Streaming", "Classroom Management", "Assessment Tools", "Unified Portal"],
        overview: "The digital educational ecosystem was fragmented, forcing users to navigate between disconnected platforms for course materials, classroom management, and examinations. This led to a disjointed and frustrating learning experience that hurt engagement.",
        challenges: [
          "Fragmented digital educational ecosystem with disconnected platforms.",
          "Users forced to navigate between separate systems for course materials, classroom management, and exams.",
          "Disjointed and frustrating learning experience reducing engagement.",
          "No unified environment consolidating the entire educational lifecycle."
        ],
        solutions: [
          "Engineered an integrated digital ecosystem merging high-quality video streaming, classroom management, and assessment tools into a unified portal.",
          "Consolidated the full user journey ensuring a seamless transition from registration to evaluation.",
          "Designed with centralized architecture to simplify operational control.",
          "Significantly improved user engagement and retention through a unified learning experience."
        ],
        results: [
          { value: "All-in-1", label: "Unified Platform" },
          { value: "HD", label: "Video Streaming" },
          { value: "Seamless", label: "User Journey" },
          { value: "High", label: "Engagement" }
        ],
        cover_image_url: "/Image/Portfolio/malaka/cover.png",
        gallery_images: [
          "/Image/Portfolio/malaka/gallery-01.png",
          "/Image/Portfolio/malaka/gallery-02.png",
          "/Image/Portfolio/malaka/gallery-03.png",
          "/Image/Portfolio/malaka/gallery-04.png"
        ],
        is_proposal: true,
        sort_order: 8
      }
    ];

    for (const p of portfolios) {
      await client.query(`
        INSERT INTO portfolios (
          slug, client, title, project_type, headline, industry, duration, year,
          metric, metric_label, tags, overview, challenges, solutions, results,
          is_proposal, cover_image_url, gallery_images, sort_order, is_published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, true)
        ON CONFLICT (slug) DO UPDATE SET
          client = EXCLUDED.client,
          title = EXCLUDED.title,
          project_type = EXCLUDED.project_type,
          headline = EXCLUDED.headline,
          industry = EXCLUDED.industry,
          duration = EXCLUDED.duration,
          year = EXCLUDED.year,
          metric = EXCLUDED.metric,
          metric_label = EXCLUDED.metric_label,
          tags = EXCLUDED.tags,
          overview = EXCLUDED.overview,
          challenges = EXCLUDED.challenges,
          solutions = EXCLUDED.solutions,
          results = EXCLUDED.results,
          is_proposal = EXCLUDED.is_proposal,
          cover_image_url = EXCLUDED.cover_image_url,
          gallery_images = EXCLUDED.gallery_images,
          sort_order = EXCLUDED.sort_order;
      `, [
        p.slug, p.client, p.title, p.project_type, p.headline, p.industry, p.duration, p.year,
        p.metric, p.metric_label, JSON.stringify(p.tags), p.overview, JSON.stringify(p.challenges),
        JSON.stringify(p.solutions), JSON.stringify(p.results), p.is_proposal, p.cover_image_url,
        JSON.stringify(p.gallery_images), p.sort_order
      ]);
    }
    console.log("Portfolios seeded successfully!");

    // 3. Seeding Services
    console.log("Seeding services...");
    const services = [
      {
        slug: "svc-ai",
        num: 1,
        title: "Artificial Intelligence",
        short_desc: "AI-powered systems for automation, prediction, and data-driven decision making.",
        description: "We don't just code AI. We birth digital brains that learn, adapt, and outsmart humans. From chatbots that roast you to predictive models that know you better than your mom.",
        features: ["Machine Learning Models", "NLP & Chatbots", "Predictive Analytics", "Computer Vision"],
        theme_bg: "bg-pop-pink",
        theme_text: "text-pop-pink",
        tech_stack: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
        icon_url: "/Image/Brain.webp",
        icon_lp_url: ["/Image/Brain.webp", "/Image/Cubic.webp", "/Image/Obj2.webp"],
        image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        sort_order: 1
      },
      {
        slug: "svc-mgmt",
        num: 2,
        title: "Management System",
        short_desc: "Custom operational systems to streamline workflows and centralize business processes.",
        description: "ERP, CRM, DMS - whatever you call it, we make it sexy. Dashboards that pop, workflows that flow, and data that dances. Your business, but make it Gen Z.",
        features: ["Custom ERP Solutions", "Real-time Dashboards", "Automated Workflows", "Data Visualization"],
        theme_bg: "bg-pop-blue",
        theme_text: "text-pop-blue",
        tech_stack: ["React", "Node.js", "PostgreSQL", "Docker"],
        icon_url: "/Image/Chart.webp",
        icon_lp_url: ["/Image/Chart.webp", "/Image/Server.webp", "/Image/Disk.webp"],
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        sort_order: 2
      },
      {
        slug: "svc-web",
        num: 3,
        title: "Web Platforms",
        short_desc: "Scalable web systems built for performance, stability, and growth.",
        description: "Not just websites. Hyper-interactive playgrounds with WebGL, shaders, and animations that break the internet. Your web presence will go viral (the good kind).",
        features: ["Interactive 3D Web", "High-Performance SSR", "Scalable Architecture", "SEO Optimization"],
        theme_bg: "bg-pop-yellow",
        theme_text: "text-pop-yellow",
        tech_stack: ["Next.js", "Tailwind v4", "Framer Motion", "Three.js"],
        icon_url: "/Image/Laptop.webp",
        icon_lp_url: ["/Image/Laptop.webp", "/Image/Window.webp", "/Image/Text2.webp"],
        image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        sort_order: 3
      },
      {
        slug: "svc-apps",
        num: 4,
        title: "iOS, Android, Desktop",
        short_desc: "Cross-platform applications designed for operational efficiency and usability.",
        description: "Android, iOS, Desktop - we build apps that feel native but look futuristic. Cross-platform sorcery with React Native, Flutter, and Electron. One codebase, infinite flex.",
        features: ["Cross-Platform Mobile", "Native Desktop Apps", "Offline Capabilities", "Hardware Integration"],
        theme_bg: "bg-pop-green",
        theme_text: "text-pop-green",
        tech_stack: ["React Native", "Flutter", "Swift", "Electron"],
        icon_url: "/Image/Phone.webp",
        icon_lp_url: ["/Image/Phone.webp", "/Image/DB.webp", "/Image/Text3.webp"],
        image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        sort_order: 4
      },
      {
        slug: "svc-it",
        num: 5,
        title: "IT Solution & Consulting",
        short_desc: "System architecture planning and technical consulting for scalable infrastructure.",
        description: "Stuck in digital hell? We rescue you with custom solutions, cloud migration, and consulting that actually makes sense. Your IT nightmare becomes our playground.",
        features: ["Cloud Migration", "DevOps Setup", "Security Audits", "Tech Consultation"],
        theme_bg: "bg-pop-purple",
        theme_text: "text-pop-purple",
        tech_stack: ["AWS", "Google Cloud", "Kubernetes", "Linux"],
        icon_url: "/Image/Bulb.webp",
        icon_lp_url: ["/Image/Bulb.webp", "/Image/Puzzle.webp", "/Image/Screwdriver.webp"],
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        sort_order: 5
      }
    ];

    for (const s of services) {
      await client.query(`
        INSERT INTO services (
          slug, num, title, short_desc, description, features, theme_bg,
          theme_text, tech_stack, icon_url, icon_lp_url, image_url, sort_order, is_published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true)
        ON CONFLICT (slug) DO UPDATE SET
          num = EXCLUDED.num,
          title = EXCLUDED.title,
          short_desc = EXCLUDED.short_desc,
          description = EXCLUDED.description,
          features = EXCLUDED.features,
          theme_bg = EXCLUDED.theme_bg,
          theme_text = EXCLUDED.theme_text,
          tech_stack = EXCLUDED.tech_stack,
          icon_url = EXCLUDED.icon_url,
          icon_lp_url = EXCLUDED.icon_lp_url,
          image_url = EXCLUDED.image_url,
          sort_order = EXCLUDED.sort_order;
      `, [
        s.slug, s.num, s.title, s.short_desc, s.description, JSON.stringify(s.features),
        s.theme_bg, s.theme_text, JSON.stringify(s.tech_stack), s.icon_url,
        JSON.stringify(s.icon_lp_url), s.image_url, s.sort_order
      ]);
    }
    console.log("Services seeded successfully!");

    // 4. Seeding FAQs
    console.log("Seeding FAQs...");
    const faqs = [
      {
        question: "How does the collaboration process with Digifolks work?",
        answer: "We start with a discovery session to deeply understand your operational challenges. Then, we design an architecture blueprint, conduct iterative development (Agile), through to deployment and continuous maintenance.",
        color: "bg-pop-pink",
        sort_order: 1
      },
      {
        question: "Does Digifolks handle maintenance after the system goes live?",
        answer: "Yes. We provide enterprise-level SLA (Service Level Agreement) that includes 24/7 monitoring, routine maintenance, and proactive technical support.",
        color: "bg-pop-blue",
        sort_order: 2
      },
      {
        question: "How long does it typically take to develop a system?",
        answer: "Development time depends heavily on system complexity. An MVP (Minimum Viable Product) typically takes 3-4 months, while full-scale enterprise systems can take 6-12 months.",
        color: "bg-pop-yellow",
        sort_order: 3
      },
      {
        question: "Can you handle fullstack backend and scalable database architecture?",
        answer: "Absolutely. From UI/UX systems to resilient microservices and relational databases (PostgreSQL, Go, Node.js), we engineer end-to-end solutions designed for enterprise durability.",
        color: "bg-pop-green",
        sort_order: 4
      }
    ];

    await client.query("DELETE FROM faqs");
    for (const f of faqs) {
      await client.query(`
        INSERT INTO faqs (question, answer, color, sort_order, is_published)
        VALUES ($1, $2, $3, $4, true);
      `, [f.question, f.answer, f.color, f.sort_order]);
    }
    console.log("FAQs seeded successfully!");

    // 5. Seeding Testimonials
    console.log("Seeding Testimonials...");
    const testimonials = [
      { quote: "Their frontend magic made our conversion rate skyrocket. Absolute wizards.", author: "Sarah J., Startup Founder", sort_order: 1 },
      { quote: "I didn't know a dashboard could look this sexy. My team loves it.", author: "Mike T., Product Manager", sort_order: 2 },
      { quote: "Fast, reliable, and they actually understand Gen Z aesthetics.", author: "Elena R., Creative Director", sort_order: 3 },
      { quote: "They rebuilt our backend architecture from scratch. Zero downtime since.", author: "David L., CTO", sort_order: 4 },
      { quote: "From Figma to React, pixel perfect. Best agency I've worked with.", author: "Chloe W., Designer", sort_order: 5 }
    ];

    await client.query("DELETE FROM testimonials");
    for (const t of testimonials) {
      await client.query(`
        INSERT INTO testimonials (quote, author, sort_order, is_published)
        VALUES ($1, $2, $3, true);
      `, [t.quote, t.author, t.sort_order]);
    }
    console.log("Testimonials seeded successfully!");

    // 6. Seeding Team DNA
    console.log("Seeding Team DNA...");
    const teamDNA = [
      { value: "Build Fast. Scale Safely.", short_pitch: "Speed matters—but system stability is never compromised.", sort_order: 1 },
      { value: "Function Over Interface Noise", short_pitch: "Every interface is designed to support real operational workflows.", sort_order: 2 },
      { value: "Systems That Evolve", short_pitch: "Built with modular architecture to adapt as your business grows.", sort_order: 3 }
    ];

    await client.query("DELETE FROM team_dna");
    for (const d of teamDNA) {
      await client.query(`
        INSERT INTO team_dna (value, short_pitch, sort_order)
        VALUES ($1, $2, $3);
      `, [d.value, d.short_pitch, d.sort_order]);
    }
    console.log("Team DNA seeded successfully!");

    // 7. Seeding General Settings
    console.log("Seeding General Settings...");
    const contactNumbers = [
      {
        name: "Ailsa",
        displayNumber: "+62 895-4010-88270",
        contactNumber: "https://wa.me/62895401088270",
        hoverColor: "hover:text-pop-green"
      },
      {
        name: "Zahra",
        displayNumber: "+62 895-8004-03266",
        contactNumber: "https://wa.me/62895800403266",
        hoverColor: "hover:text-pop-blue"
      }
    ];

    await client.query("DELETE FROM general_settings");
    await client.query(`
      INSERT INTO general_settings (
        hero_animation_url, hero_cta_url, grand_cta_url, book_meeting_url,
        instagram_url, linkedin_url, github_url, email, contact_numbers
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `, [
      "/Video/Hero/HeroAnimV2.webm",
      "/contact",
      "/services",
      "/book-meeting",
      "https://instagram.com",
      "https://linkedin.com",
      "https://github.com",
      "digifolkstech@gmail.com",
      JSON.stringify(contactNumbers)
    ]);
    console.log("General Settings seeded successfully!");

    console.log("\n==========================================");
    console.log("ALL MIGRATIONS & SEED DATA COMPLETED!");
    console.log("==========================================");

  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
