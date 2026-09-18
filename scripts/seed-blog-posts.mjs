import pg from 'pg';
const { Client } = pg;

async function seedBlogPosts() {
  const client = new Client({
    user: 'postgres.tcqykhpivalgfzavjkze',
    password: 'Digifolks#2025!',
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL database...");

    // Check existing posts
    const postCheck = await client.query('SELECT COUNT(*) FROM blog_posts');
    if (parseInt(postCheck.rows[0].count) > 0) {
      console.log(`blog_posts already has ${postCheck.rows[0].count} posts. Skipping seed.`);
      return;
    }

    // Get category IDs
    const catRes = await client.query('SELECT id, slug FROM blog_categories');
    const catMap = {};
    catRes.rows.forEach(r => { catMap[r.slug] = r.id; });

    const posts = [
      {
        slug: "architecting-resilient-enterprise-systems-nextjs-supabase",
        title: "Architecting Resilient Enterprise Systems with Next.js and Supabase",
        excerpt: "A technical deep dive into designing low-latency, highly available transactional web applications that scale effortlessly across global regions.",
        content: `
          <h2>The Modern Paradigm for Enterprise Architecture</h2>
          <p>In high-throughput enterprise environments, legacy architectures frequently become bottlenecks rather than enablers. Monolithic architectures often impose heavy deployment overhead, high memory footprints, and challenging regression testing cycles.</p>
          <p>By pairing <strong>Next.js 16 Server Components</strong> with <strong>Supabase (PostgreSQL with Row Level Security)</strong>, engineering teams can build platforms that deliver sub-100ms response times while strictly maintaining granular tenant data isolation.</p>
          
          <blockquote>
            "Resilience is not merely the absence of failure; it is the deliberate engineering capability to degrade gracefully under high computational and transactional load."
          </blockquote>

          <h3>Core Pillars of the Stack</h3>
          <ul>
            <li><strong>Zero-Trust Data Layer:</strong> Utilizing PostgreSQL Row Level Security (RLS) policies at the database layer rather than relying exclusively on application middleware.</li>
            <li><strong>Optimistic UI with Edge Revalidation:</strong> Leveraging server actions combined with precise path revalidation for instant state updates.</li>
            <li><strong>Multi-Region Caching:</strong> Edge CDN caching with stale-while-revalidate guarantees near-instant initial page loads globally.</li>
          </ul>

          <h3>Handling Complex Data Ingestion</h3>
          <p>When ingesting thousands of concurrent operational signals—such as warehouse telemetry, inventory updates, or client activity—traditional connection pooling can exhaust database connections.</p>
          
          <pre><code>// Example: Structured batch ingestion with transactional safety
const { data, error } = await supabase.rpc('process_operational_batch', {
  payload_records: recordsList,
  batch_timestamp: new Date().toISOString()
});
</code></pre>

          <h3>Conclusion</h3>
          <p>Modern enterprise web applications no longer need to accept trade-offs between dynamic capability and rock-solid stability. With the proper architectural foundations, scalable systems can be delivered faster and maintained with lower total cost of ownership.</p>
        `,
        cover_image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
        cover_image_alt: "Enterprise Server Infrastructure and High Performance Architecture",
        author: "Rayendra Arya",
        category_id: catMap["engineering-tech"],
        tags: ["Architecture", "Next.js", "Supabase", "Cloud"],
        reading_time_minutes: 6,
        sort_order: 1,
        is_published: true,
        published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        seo_title: "Architecting Resilient Enterprise Systems with Next.js and Supabase",
        meta_description: "A technical deep dive into designing low-latency, highly available transactional web applications with Next.js 16 and Supabase.",
        canonical_url: "https://digifolks.id/blog/architecting-resilient-enterprise-systems-nextjs-supabase"
      },
      {
        slug: "scaling-b2b-digital-transformation-without-chaos",
        title: "Scaling B2B Digital Transformation Without Operational Chaos",
        excerpt: "Strategies for phasing legacy modernization, maintaining zero downtime, and aligning engineering execution with executive business priorities.",
        content: `
          <h2>Why Most Modernization Initiatives Stall</h2>
          <p>Digital transformation is rarely a purely technological challenge—it is predominantly an operational alignment challenge. Enterprises often attempt a high-risk 'Big Bang' migration that risks catastrophic business disruption.</p>
          
          <h3>The Strangler Fig Pattern in Action</h3>
          <p>Rather than replacing legacy enterprise resource planning (ERP) or custom management systems overnight, we implement the <strong>Strangler Fig Pattern</strong>. New modular micro-services gradually intercept and replace legacy routes one capability at a time.</p>
          
          <ul>
            <li><strong>Step 1:</strong> Intercept traffic via an edge gateway router.</li>
            <li><strong>Step 2:</strong> Mirror write operations between legacy and new databases with automated reconciliation.</li>
            <li><strong>Step 3:</strong> Shift read workloads to the modern data cache layer.</li>
            <li><strong>Step 4:</strong> Decommission legacy endpoints once parity benchmarks are consistently verified.</li>
          </ul>

          <blockquote>
            "Clean architecture respects existing operational gravity while establishing a definitive trajectory towards maintainable modern infrastructure."
          </blockquote>

          <p>By breaking large overhauls into measurable 2-week deliverable increments, stakeholders maintain continuous visibility and business operations experience zero unscheduled downtime.</p>
        `,
        cover_image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        cover_image_alt: "Global digital transformation and cloud operations network",
        author: "Digifolks Strategy Team",
        category_id: catMap["digital-transformation"],
        tags: ["Digital Transformation", "Legacy Modernization", "B2B", "Strategy"],
        reading_time_minutes: 5,
        sort_order: 2,
        is_published: true,
        published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        seo_title: "Scaling B2B Digital Transformation Without Operational Chaos",
        meta_description: "Phased legacy modernization strategies that eliminate business downtime and align engineering with commercial objectives.",
        canonical_url: "https://digifolks.id/blog/scaling-b2b-digital-transformation-without-chaos"
      },
      {
        slug: "bridging-design-systems-production-code-enterprise",
        title: "Bridging Design Systems and Production Code in Enterprise Applications",
        excerpt: "How tokenized design systems, Tailwind CSS tokens, and component contracts bridge the communication gap between UX designers and backend engineers.",
        content: `
          <h2>Design Systems as Software Contracts</h2>
          <p>A design system is not just a Figma library—it is a living, executable contract between design intent and production implementation. When token names and hierarchy drift between Figma and codebase, UI inconsistency and engineering velocity bottlenecks inevitably emerge.</p>
          
          <h3>Single Source of Truth with Tokenization</h3>
          <p>By standardizing color tokens, spacing scale, typographic weights, and transition curves as CSS variables, any brand or theme adjustments propagate throughout the entire ecosystem instantly without touching individual component files.</p>
          
          <pre><code>:root {
  --color-navy-base: #0E1E38;
  --color-accent-emerald: #00DF89;
  --font-display: var(--font-display);
}
</code></pre>

          <p>This approach guarantees pixel-perfect visual fidelity, accessible contrast ratios, and effortless consistency across complex web platforms.</p>
        `,
        cover_image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop",
        cover_image_alt: "Modern UI UX design interface and code workflow",
        author: "Zahra Ramadhani",
        category_id: catMap["product-design"],
        tags: ["Design Systems", "Tailwind", "React", "UX Engineering"],
        reading_time_minutes: 4,
        sort_order: 3,
        is_published: true,
        published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
        seo_title: "Bridging Design Systems and Production Code in Enterprise Applications",
        meta_description: "Learn how tokenized design systems and component contracts accelerate enterprise development velocity.",
        canonical_url: "https://digifolks.id/blog/bridging-design-systems-production-code-enterprise"
      }
    ];

    for (const post of posts) {
      await client.query(`
        INSERT INTO blog_posts (
          slug, title, excerpt, content, cover_image_url, cover_image_alt,
          author, category_id, tags, reading_time_minutes, sort_order,
          is_published, published_at, seo_title, meta_description, canonical_url
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        ) ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          is_published = EXCLUDED.is_published,
          published_at = EXCLUDED.published_at;
      `, [
        post.slug, post.title, post.excerpt, post.content, post.cover_image_url, post.cover_image_alt,
        post.author, post.category_id, JSON.stringify(post.tags), post.reading_time_minutes, post.sort_order,
        post.is_published, post.published_at, post.seo_title, post.meta_description, post.canonical_url
      ]);
      console.log(`Seeded post: ${post.title}`);
    }

    console.log("Seeding blog posts complete!");

  } catch (err) {
    console.error("Error seeding blog posts:", err);
  } finally {
    await client.end();
  }
}

seedBlogPosts();
