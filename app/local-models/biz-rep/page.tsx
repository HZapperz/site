import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zapp Studios - AI Infrastructure Investment',
  description: 'DGX Spark + Mac Studio M4 Ultra infrastructure proposal for Zapp Studios.',
}

export default function BizRepPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

        .biz-rep {
          --bg: #f5f0e8;
          --surface: #faf6ef;
          --surface-2: #efe9df;
          --border: #e5e7eb;
          --border-dark: #d1d5db;
          --text: #111827;
          --text-2: #374151;
          --text-3: #6b7280;
          --accent: #4f46e5;
          --accent-light: #6366f1;
          --green: #059669;
          --green-bg: #ecfdf5;
          --green-border: #a7f3d0;
          --red: #dc2626;
          --red-bg: #fef2f2;
          --amber: #d97706;
          --amber-bg: #fffbeb;

          font-family: 'Inter', -apple-system, sans-serif;
          background: var(--bg);
          color: var(--text);
          font-size: 22px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          min-height: 100vh;
        }
        .biz-rep *, .biz-rep *::before, .biz-rep *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .biz-rep .wrap { max-width: 960px; margin: 0 auto; padding: 0 40px; }

        .biz-rep .hero { padding: 80px 0 56px; text-align: center; }
        .biz-rep .hero-tag { display: inline-block; padding: 6px 18px; background: var(--accent); color: #fff; border-radius: 100px; font-size: 17px; font-weight: 600; letter-spacing: 0.04em; margin-bottom: 24px; }
        .biz-rep .hero h1 { font-size: 48px; font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; color: var(--text); margin-bottom: 20px; max-width: 720px; margin-left: auto; margin-right: auto; }
        .biz-rep .hero p { font-size: 24px; color: var(--text-3); max-width: 620px; margin: 0 auto; }

        .biz-rep section { padding: 64px 0; border-top: 1px solid var(--border); }
        .biz-rep .slabel { font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 8px; }
        .biz-rep h2 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; line-height: 1.2; }
        .biz-rep h3 { font-size: 26px; font-weight: 700; margin: 40px 0 12px; }
        .biz-rep p { font-size: 22px; color: var(--text-2); margin-bottom: 16px; line-height: 1.65; }

        .biz-rep .compare { display: grid; grid-template-columns: 1fr 60px 1fr; align-items: center; gap: 0; margin: 40px 0; }
        .biz-rep .compare-box { border-radius: 16px; padding: 36px 32px; text-align: center; }
        .biz-rep .compare-box.old { background: var(--red-bg); border: 2px solid #fecaca; }
        .biz-rep .compare-box.new { background: var(--green-bg); border: 2px solid var(--green-border); }
        .biz-rep .compare-label { font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
        .biz-rep .compare-box.old .compare-label { color: var(--red); }
        .biz-rep .compare-box.new .compare-label { color: var(--green); }
        .biz-rep .compare-amount { font-family: 'JetBrains Mono', monospace; font-size: 52px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
        .biz-rep .compare-box.old .compare-amount { color: var(--red); }
        .biz-rep .compare-box.new .compare-amount { color: var(--green); }
        .biz-rep .compare-sub { font-size: 19px; color: var(--text-3); margin-top: 8px; }
        .biz-rep .compare-arrow { text-align: center; font-size: 32px; color: var(--text-3); }

        .biz-rep .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 36px 0; }
        .biz-rep .stat { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 28px 24px; text-align: center; }
        .biz-rep .stat-val { font-family: 'JetBrains Mono', monospace; font-size: 40px; font-weight: 800; color: var(--accent); letter-spacing: -0.03em; }
        .biz-rep .stat-label { font-size: 18px; color: var(--text-3); margin-top: 4px; font-weight: 500; }

        .biz-rep .flow { display: flex; align-items: center; justify-content: center; gap: 0; margin: 40px 0; flex-wrap: wrap; }
        .biz-rep .flow-step { background: var(--surface); border: 2px solid var(--border); border-radius: 14px; padding: 20px 24px; text-align: center; min-width: 160px; }
        .biz-rep .flow-step.highlight { border-color: var(--accent); background: #eef2ff; }
        .biz-rep .flow-step.green { border-color: var(--green); background: var(--green-bg); }
        .biz-rep .flow-icon { font-size: 32px; margin-bottom: 6px; }
        .biz-rep .flow-text { font-size: 18px; font-weight: 600; color: var(--text); }
        .biz-rep .flow-sub { font-size: 16px; color: var(--text-3); margin-top: 2px; }
        .biz-rep .flow-arrow { font-size: 26px; color: var(--text-3); padding: 0 8px; flex-shrink: 0; }

        .biz-rep .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 28px 0; }
        .biz-rep .card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 28px; }
        .biz-rep .card.full { grid-column: 1 / -1; }
        .biz-rep .card-icon { font-size: 36px; margin-bottom: 10px; }
        .biz-rep .card-title { font-size: 24px; font-weight: 700; margin-bottom: 6px; }
        .biz-rep .card p { font-size: 20px; color: var(--text-3); margin-bottom: 0; }

        .biz-rep .hw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 32px 0; }
        .biz-rep .hw { background: var(--surface); border: 2px solid var(--border); border-radius: 16px; padding: 32px; position: relative; overflow: hidden; }
        .biz-rep .hw::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; }
        .biz-rep .hw.spark::before { background: var(--green); }
        .biz-rep .hw.mac::before { background: var(--accent); }
        .biz-rep .hw-name { font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
        .biz-rep .hw.spark .hw-name { color: var(--green); }
        .biz-rep .hw.mac .hw-name { color: var(--accent); }
        .biz-rep .hw-product { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .biz-rep .hw-price { font-family: 'JetBrains Mono', monospace; font-size: 32px; font-weight: 800; margin-bottom: 16px; }
        .biz-rep .hw.spark .hw-price { color: var(--green); }
        .biz-rep .hw.mac .hw-price { color: var(--accent); }
        .biz-rep .hw-list { list-style: none; padding: 0; margin: 0; }
        .biz-rep .hw-list li { font-size: 20px; color: var(--text-2); padding: 6px 0 6px 24px; position: relative; }
        .biz-rep .hw-list li::before { content: ''; position: absolute; left: 0; top: 14px; width: 8px; height: 8px; border-radius: 50%; }
        .biz-rep .hw.spark .hw-list li::before { background: #a7f3d0; }
        .biz-rep .hw.mac .hw-list li::before { background: #c7d2fe; }

        .biz-rep .callout { border-radius: 14px; padding: 24px 28px; margin: 28px 0; font-size: 22px; }
        .biz-rep .callout-green { background: var(--green-bg); border: 1px solid var(--green-border); color: var(--text-2); }
        .biz-rep .callout-amber { background: var(--amber-bg); border: 1px solid #fde68a; color: var(--text-2); }
        .biz-rep .callout-blue { background: #eef2ff; border: 1px solid #c7d2fe; color: var(--text-2); }
        .biz-rep .callout-red { background: var(--red-bg); border: 1px solid #fecaca; color: var(--text-2); }
        .biz-rep .callout strong { color: var(--text); }

        .biz-rep .simple-table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 21px; }
        .biz-rep .simple-table th { text-align: left; padding: 14px 20px; background: var(--surface-2); font-weight: 700; font-size: 17px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); border-bottom: 2px solid var(--border); }
        .biz-rep .simple-table td { padding: 14px 20px; border-bottom: 1px solid var(--border); color: var(--text-2); }
        .biz-rep .simple-table td:first-child { font-weight: 600; color: var(--text); }
        .biz-rep .simple-table tr:last-child td { border-bottom: none; }
        .biz-rep .simple-table .total td { font-weight: 800; color: var(--green); font-size: 23px; border-top: 2px solid var(--border); background: var(--green-bg); }

        .biz-rep .timeline { margin: 32px 0; }
        .biz-rep .tl-step { display: grid; grid-template-columns: 100px 1fr; gap: 20px; margin-bottom: 20px; align-items: start; }
        .biz-rep .tl-when { font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; color: var(--accent); padding-top: 4px; text-align: right; }
        .biz-rep .tl-what { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; }
        .biz-rep .tl-title { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
        .biz-rep .tl-desc { font-size: 20px; color: var(--text-3); }

        .biz-rep .big-quote { text-align: center; padding: 48px 32px; max-width: 640px; margin: 0 auto; }
        .biz-rep .big-quote p { font-size: 30px; font-weight: 700; color: var(--text); line-height: 1.35; }
        .biz-rep .big-quote .sub { font-size: 22px; color: var(--text-3); font-weight: 400; margin-top: 12px; }

        .biz-rep .footer { padding: 40px 0; text-align: center; color: var(--text-3); font-size: 18px; border-top: 1px solid var(--border); }

        .biz-rep .risk-item { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px 28px; margin-bottom: 16px; }
        .biz-rep .risk-item .risk-title { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
        .biz-rep .risk-item .risk-mitigation { font-size: 20px; color: var(--green); font-weight: 600; margin-top: 8px; }
        .biz-rep .risk-item p { font-size: 20px; color: var(--text-3); margin-bottom: 0; }

        @media (max-width: 768px) {
          .biz-rep .wrap { padding: 0 20px; }
          .biz-rep .hero { padding: 48px 0 36px; }
          .biz-rep .hero h1 { font-size: 32px; }
          .biz-rep .hero p { font-size: 20px; }
          .biz-rep section { padding: 48px 0; }
          .biz-rep h2 { font-size: 28px; }
          .biz-rep h3 { font-size: 22px; }
          .biz-rep p { font-size: 19px; }
          .biz-rep .slabel { font-size: 15px; }
          .biz-rep .compare { grid-template-columns: 1fr; gap: 12px; }
          .biz-rep .compare-arrow { transform: rotate(90deg); padding: 4px 0; }
          .biz-rep .compare-amount { font-size: 40px; }
          .biz-rep .compare-box { padding: 28px 24px; }
          .biz-rep .stats { grid-template-columns: 1fr; gap: 12px; }
          .biz-rep .stat { padding: 20px 16px; }
          .biz-rep .stat-val { font-size: 34px; }
          .biz-rep .cards, .biz-rep .hw-grid { grid-template-columns: 1fr !important; }
          .biz-rep .card { padding: 22px; }
          .biz-rep .card-title { font-size: 21px; }
          .biz-rep .card p { font-size: 18px; }
          .biz-rep .hw { padding: 24px; }
          .biz-rep .hw-product { font-size: 24px; }
          .biz-rep .hw-price { font-size: 28px; }
          .biz-rep .hw-list li { font-size: 18px; }
          .biz-rep .flow { flex-direction: column; gap: 0; }
          .biz-rep .flow-arrow { transform: rotate(90deg); padding: 4px 0; }
          .biz-rep .flow-step { min-width: unset; width: 100%; }
          .biz-rep .simple-table { font-size: 17px; }
          .biz-rep .simple-table th { font-size: 14px; padding: 10px 12px; }
          .biz-rep .simple-table td { padding: 10px 12px; }
          .biz-rep .simple-table .total td { font-size: 19px; }
          .biz-rep .tl-step { grid-template-columns: 1fr; gap: 6px; }
          .biz-rep .tl-when { text-align: left; font-size: 16px; }
          .biz-rep .tl-what { padding: 16px 20px; }
          .biz-rep .tl-title { font-size: 19px; }
          .biz-rep .tl-desc { font-size: 17px; }
          .biz-rep .callout { font-size: 19px; padding: 20px 22px; }
          .biz-rep .risk-item { padding: 20px 22px; }
          .biz-rep .risk-item .risk-title { font-size: 19px; }
          .biz-rep .risk-item p { font-size: 17px; }
          .biz-rep .risk-item .risk-mitigation { font-size: 17px; }
          .biz-rep .big-quote { padding: 32px 16px; }
          .biz-rep .big-quote p { font-size: 24px; }
          .biz-rep .big-quote .sub { font-size: 19px; }
          .biz-rep .footer { font-size: 16px; }
        }

        @media (max-width: 400px) {
          .biz-rep .wrap { padding: 0 16px; }
          .biz-rep .hero h1 { font-size: 28px; }
          .biz-rep .compare-amount { font-size: 34px; }
          .biz-rep .stat-val { font-size: 30px; }
          .biz-rep .hw-product { font-size: 22px; }
          .biz-rep .hw-price { font-size: 26px; }
          .biz-rep .big-quote p { font-size: 22px; }
        }
      `}} />

      <div className="biz-rep">
        <div className="wrap">

          {/* HERO */}
          <div className="hero">
            <div className="hero-tag">Zapp Studios &bull; Infrastructure Investment</div>
            <h1>Own the infrastructure. Control&nbsp;the&nbsp;cost. Unlock&nbsp;10x&nbsp;output.</h1>
            <p>Local AI models have caught up to the ones we rent. By owning the hardware, we cut monthly cash burn, eliminate dependency on third-party pricing, and unlock capabilities that aren&rsquo;t economical with APIs alone.</p>
          </div>

          {/* THE SIMPLE MATH */}
          <section>
            <div className="slabel">The Math</div>
            <h2>What we pay now vs. what we&rsquo;d pay with local hardware</h2>
            <p>We consistently spend <strong>$800/month on Claude API tokens</strong> &mdash; this is not a spike or an outlier, it&rsquo;s our steady-state burn across multiple billing cycles. And this number only scales up with usage &mdash; the more we build, the more we pay. Local hardware flips that: a fixed one-time cost with near-zero marginal cost per task.</p>

            <div className="compare">
              <div className="compare-box old">
                <div className="compare-label">Current API Costs</div>
                <div className="compare-amount">$800/mo</div>
                <div className="compare-sub">Claude API tokens &mdash; scales up with every new project</div>
              </div>
              <div className="compare-arrow">&rarr;</div>
              <div className="compare-box new">
                <div className="compare-label">With Local Hardware</div>
                <div className="compare-amount">~$218/mo</div>
                <div className="compare-sub">Electricity (~$58) + Claude for the 20% that needs frontier intelligence</div>
              </div>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-val">~$10K</div>
                <div className="stat-label">One-time hardware cost</div>
              </div>
              <div className="stat">
                <div className="stat-val">50&ndash;80%</div>
                <div className="stat-label">Of AI tasks move to local &mdash; trending higher</div>
              </div>
              <div className="stat">
                <div className="stat-val">$340&ndash;580/mo</div>
                <div className="stat-label">Saved in API costs alone</div>
              </div>
            </div>

            <h3>Where the 50&ndash;80% comes from (and why it trends higher)</h3>
            <p>Not all AI tasks require frontier-level reasoning. Conservatively, at least 50% of our workload runs locally today. Realistically, it&rsquo;s closer to 80% &mdash; and as open-source models continue to improve, the local share will only increase over time. Here&rsquo;s how our current workload breaks down:</p>

            <table className="simple-table" style={{border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden'}}>
              <thead>
                <tr><th>Task Category</th><th>% of Spend</th><th>Can Run Locally?</th></tr>
              </thead>
              <tbody>
                <tr><td>Content generation (copy, captions, scripts)</td><td>~30%</td><td style={{color:'var(--green)', fontWeight:600}}>Yes &mdash; Qwen 3.5 handles this</td></tr>
                <tr><td>Code generation (frontend, UI, boilerplate)</td><td>~25%</td><td style={{color:'var(--green)', fontWeight:600}}>Yes &mdash; tested and validated</td></tr>
                <tr><td>Image &amp; video generation</td><td>~15%</td><td style={{color:'var(--green)', fontWeight:600}}>Yes &mdash; LTX 2.3 + ComfyUI</td></tr>
                <tr><td>Data processing &amp; analysis</td><td>~10%</td><td style={{color:'var(--green)', fontWeight:600}}>Yes &mdash; well within local capability</td></tr>
                <tr><td>Complex reasoning &amp; novel architecture</td><td>~15%</td><td style={{color:'var(--red)', fontWeight:600}}>No &mdash; stays on Claude Opus</td></tr>
                <tr><td>Difficult debugging &amp; multi-system problems</td><td>~5%</td><td style={{color:'var(--red)', fontWeight:600}}>No &mdash; stays on Claude Opus</td></tr>
              </tbody>
            </table>

            <div className="callout callout-amber">
              <strong>Why it gets worse if we wait:</strong> Anthropic, OpenAI, and Google are all heavily subsidizing API prices to gain market share. Token prices are artificially low. When that strategy shifts &mdash; and it will &mdash; our $800/month could become $1,500+. Local hardware locks in a fixed cost and removes our dependency on any single provider&rsquo;s pricing decisions.
            </div>
          </section>

          {/* THE UNLOCK */}
          <section>
            <div className="slabel">The Real Value</div>
            <h2>It&rsquo;s not just cheaper &mdash; it unlocks 10x more output</h2>
            <p>Cost savings alone don&rsquo;t tell the full story. The real ROI is in what we can now <em>do</em> that we couldn&rsquo;t justify with per-token pricing. For the same budget, we can run 10x the experiments, generate 10x the content, and automate workflows that would be cost-prohibitive on APIs.</p>

            <div className="cards">
              <div className="card">
                <div className="card-icon">&#9881;</div>
                <div className="card-title">Automated Content Generation</div>
                <p>Today, our marketing director spends <strong>15&ndash;60 minutes per short-form content piece</strong>. The DGX Spark generates <strong>10 pieces in 15 minutes</strong>. We pick the best outputs, post those, and discard the rest. That&rsquo;s a 10&ndash;40x throughput increase &mdash; using LTX 2.3 for video and Qwen 3.5 for copy, across Royal Pawz, PawScan, and Dawn Patrol.</p>
              </div>
              <div className="card">
                <div className="card-icon">&#8635;</div>
                <div className="card-title">Self-Improving Feedback Loop</div>
                <p>The only real variable in the system is the prompt. Content gets posted &rarr; we track views, likes, engagement &rarr; we scrape trends to see what&rsquo;s working in the market &rarr; we refine the prompt &rarr; generate more winning content &rarr; kill what doesn&rsquo;t perform. It&rsquo;s human-in-the-loop reinforcement learning: over 3&ndash;6 months, we identify the north-star metrics and hyper-tune toward them. Quality first, then scale.</p>
              </div>
              <div className="card">
                <div className="card-icon">&#9202;</div>
                <div className="card-title">Runs 24/7 Without Supervision</div>
                <p>Once calibrated, the system generates content overnight, queues it for review, and flags only what needs human attention. Not day one &mdash; but the end-state after a few months of tuning.</p>
              </div>
              <div className="card">
                <div className="card-icon">&#128300;</div>
                <div className="card-title">Unlimited Experimentation</div>
                <p>Right now we can test 5 ideas before hitting our budget. With local hardware we can test 100. Different hooks, styles, formats &mdash; across every platform &mdash; at no additional cost per experiment.</p>
              </div>
            </div>

            <h3>How the content pipeline works</h3>
            <div className="flow">
              <div className="flow-step highlight">
                <div className="flow-icon">&#129302;</div>
                <div className="flow-text">AI Generates</div>
                <div className="flow-sub">Videos, images, copy</div>
              </div>
              <div className="flow-arrow">&rarr;</div>
              <div className="flow-step">
                <div className="flow-icon">&#128065;</div>
                <div className="flow-text">Human Reviews</div>
                <div className="flow-sub">Quality gate (early stage)</div>
              </div>
              <div className="flow-arrow">&rarr;</div>
              <div className="flow-step">
                <div className="flow-icon">&#128244;</div>
                <div className="flow-text">Posts to Platforms</div>
                <div className="flow-sub">TikTok, Reels, Shorts</div>
              </div>
              <div className="flow-arrow">&rarr;</div>
              <div className="flow-step">
                <div className="flow-icon">&#128200;</div>
                <div className="flow-text">Tracks Metrics</div>
                <div className="flow-sub">Views, likes, clicks</div>
              </div>
              <div className="flow-arrow">&rarr;</div>
              <div className="flow-step green">
                <div className="flow-icon">&#128161;</div>
                <div className="flow-text">Learns &amp; Iterates</div>
                <div className="flow-sub">More winners, kill losers</div>
              </div>
            </div>

            <p style={{textAlign:'center', color:'var(--text-3)', fontSize:'20px'}}>This pipeline runs across <strong style={{color:'var(--text)'}}>Royal Pawz</strong>, <strong style={{color:'var(--text)'}}>PawScan</strong>, and <strong style={{color:'var(--text)'}}>Dawn Patrol</strong> simultaneously. The approach: start with quality (generate many, post the best 1&ndash;2), then scale once the quality bar is consistently met.</p>
          </section>

          {/* REVENUE IMPACT */}
          <section>
            <div className="slabel">Revenue Generation</div>
            <h2>This isn&rsquo;t just cost savings &mdash; it&rsquo;s a customer acquisition engine</h2>
            <p>The hardware doesn&rsquo;t just reduce expenses. It generates content that drives real revenue across the portfolio. Here&rsquo;s the math on what that looks like:</p>

            <div className="cards" style={{gridTemplateColumns:'1fr'}}>
              <div className="card full">
                <div className="card-title">Royal Pawz: Content &rarr; Customers</div>
                <p>Our current customer acquisition cost at Royal Pawz is approximately <strong>$20 per new client</strong>. Right now, our marketing director creates 1&ndash;4 content pieces per hour. With the DGX Spark, we generate 10 pieces in 15 minutes, pick the best, and post. That same hour of human time now produces 10x the output &mdash; and the hardware cost per piece is effectively zero. We only need one out of every few hundred videos to convert a single customer. The volume play drives acquisition costs toward zero &mdash; and every new grooming client is recurring revenue.</p>
              </div>
            </div>

            <div className="cards">
              <div className="card">
                <div className="card-title">PawScan &amp; Dawn Patrol: The Funnel</div>
                <p>Both apps are near-launch: <strong>Dawn Patrol is live in TestFlight</strong> awaiting client feedback, and <strong>PawScan enters TestFlight within 2 weeks</strong>. For app-based businesses, the funnel is: <strong>Views &rarr; Downloads &rarr; Paying Users</strong>. Industry benchmarks: 2&ndash;10% of viewers download, 5&ndash;20% of downloaders convert to paid. At scale, even modest view counts create meaningful revenue. The local hardware lets us produce the volume of content needed to drive those views &mdash; and the AI can assist with funnel optimization (landing pages, A/B testing) with human oversight.</p>
              </div>
              <div className="card">
                <div className="card-title">Dawn Patrol: High-Value Niche</div>
                <p>Golf content commands <strong>$7&ndash;12 CPM</strong> &mdash; among the highest on social platforms. AI-generated course visuals, tips, and scorekeeping content targets a demographic with high disposable income. More content = more impressions = more app downloads.</p>
              </div>
            </div>

            <div className="callout callout-green">
              <strong>The compounding effect:</strong> Every piece of content the hardware generates is a free shot at acquiring a customer. With APIs, each piece costs tokens. With local hardware, the 500th video costs the same as the 1st &mdash; nothing. This fundamentally changes the economics of content marketing across the entire portfolio.
            </div>
          </section>

          {/* WHY LOCAL, NOT CLOUD */}
          <section>
            <div className="slabel">Why Own Instead of Rent</div>
            <h2>The models caught up. The economics flipped.</h2>
            <p>Six months ago, you needed frontier API access to get good AI output. Today, open-source models running on local hardware match that quality on the majority of tasks &mdash; and we&rsquo;ve tested this ourselves.</p>

            <div className="cards" style={{gridTemplateColumns:'1fr'}}>
              <div className="card full">
                <div className="card-title">The Hybrid Approach</div>
                <p>We don&rsquo;t go 100% off Claude. We keep it for the 20% of tasks that genuinely need frontier-level intelligence &mdash; complex multi-system reasoning, novel architecture decisions, difficult debugging. The other 80% runs locally on <strong>Qwen 3.5</strong> for text/code and <strong>LTX 2.3 + ComfyUI</strong> for video/image generation. Best of both worlds.</p>
              </div>
            </div>

            <div className="callout callout-blue">
              <strong>We tested this.</strong> In a head-to-head experiment, we generated a complete landing page for Dawn Patrol using both local AI (Qwen 3.5-27B on an M4 Pro) and Cloud API (Claude Sonnet 4.6). The local model produced 75% production-ready output for less than $0.01. Claude produced 85% production-ready output for $0.23. Neither was perfect out of the box &mdash; both needed refinement. But the local model delivered the vast majority of the value at a fraction of the cost. <a href="https://www.zappstudios.us/local-models/dawn-patrol-landing" style={{color:'var(--accent)', fontWeight:600}}>See the full experiment &rarr;</a>
            </div>

            <div className="cards" style={{gridTemplateColumns:'1fr 1fr'}}>
              <div className="card" style={{textAlign:'center'}}>
                <div className="card-title" style={{color:'var(--amber)'}}>Paying API Per-Token</div>
                <p><strong>$800/mo</strong> today<br/>Scales up with usage<br/>Subject to provider pricing changes</p>
              </div>
              <div className="card" style={{textAlign:'center', borderColor:'var(--green-border)', background:'var(--green-bg)'}}>
                <div className="card-title" style={{color:'var(--green)'}}>Owning Local Hardware</div>
                <p><strong>~$10K</strong> once<br/>~$65/mo electricity<br/>Fixed cost, unlimited use</p>
              </div>
            </div>

            <div className="callout callout-amber" style={{marginTop:'16px'}}>
              <strong>Alternative evaluated &mdash; cloud GPU rental:</strong> We also considered renting cloud GPUs (e.g., an A100 at ~$3/hr = $1,080/month at 12hrs/day). While this fills some of the same gaps, it introduces higher complexity (remote infrastructure management, network latency, egress costs) and higher ongoing risk (provider outages, price changes). Owning the hardware is simpler and more predictable.
            </div>

            <div className="callout callout-green">
              <strong>Data privacy bonus:</strong> All client data (Royal Pawz customers, PawScan users) stays on our machines. No third-party servers. No data exposure. And as AI models keep getting more efficient, this same hardware runs <em>better</em> over time, not worse.
            </div>
          </section>

          {/* THE HARDWARE */}
          <section>
            <div className="slabel">The Hardware</div>
            <h2>Two machines. Two jobs. One budget.</h2>

            <div className="hw-grid">
              <div className="hw spark">
                <div className="hw-name">The AI Factory</div>
                <div className="hw-product">NVIDIA DGX Spark</div>
                <div className="hw-price">$4,699</div>
                <ul className="hw-list">
                  <li>128GB unified memory &mdash; runs large models natively</li>
                  <li>Generates content 24/7 in the background</li>
                  <li>Video generation via LTX 2.3 + ComfyUI</li>
                  <li>Runs always-on scheduling + booking agents</li>
                  <li>Full NVIDIA ecosystem &mdash; TensorRT-LLM, CUDA, vLLM</li>
                  <li>Can add a 2nd unit later for double the capacity</li>
                </ul>
              </div>
              <div className="hw mac">
                <div className="hw-name">The Daily Driver</div>
                <div className="hw-product">Mac Studio M4 Ultra</div>
                <div className="hw-price">$5,199</div>
                <ul className="hw-list">
                  <li>192GB unified memory &mdash; runs the largest open models</li>
                  <li>3x faster interactive responses vs. API round-trips</li>
                  <li>Replaces most Claude API calls for daily development</li>
                  <li>Development workstation for all apps</li>
                  <li>Silent, compact, macOS ecosystem</li>
                  <li>Handles code, design, and content creation</li>
                </ul>
              </div>
            </div>

            <div className="callout callout-blue">
              <strong>Why both?</strong> The Spark is the always-on production server &mdash; generating content overnight, running agents, processing video. The Mac Studio is the fast daily-use machine &mdash; replacing API calls in real-time, running the development workflow. One can&rsquo;t do the other&rsquo;s job well. Together they provide 320GB of combined AI-capable memory, covering everything from interactive development to batch production.
            </div>

            <div className="callout callout-amber">
              <strong>We&rsquo;ve already hit the ceiling on current hardware.</strong> We tested local model inference on our existing M4 Pro &mdash; it&rsquo;s too slow and impractical for production workloads. The 192GB Mac Studio and DGX Spark aren&rsquo;t speculative upgrades; they&rsquo;re the minimum viable hardware to make local AI actually usable for real work.
            </div>

            <p style={{color:'var(--text-3)', fontSize:'20px'}}><strong style={{color:'var(--text)'}}>On model efficiency:</strong> We already have access to Claude 4.5-class models locally through Qwen 3.5 and similar. Models continue to get more efficient &mdash; the same 128GB and 192GB of memory will run increasingly capable models over time. This hardware doesn&rsquo;t become obsolete; it becomes more valuable.</p>
          </section>

          {/* WHAT IT POWERS */}
          <section>
            <div className="slabel">Across the Portfolio</div>
            <h2>Every venture benefits from the same two machines</h2>

            <div className="cards">
              <div className="card">
                <div className="card-title">Royal Pawz</div>
                <p>Automated before/after grooming videos posted regularly. AI scheduling agent handles rebooking + client messages. Customer acquisition cost driven toward zero through content volume.</p>
              </div>
              <div className="card">
                <div className="card-title">PawScan</div>
                <p>On-device pet food label scanning powered by local AI vision model. Runs thousands of scans/day at zero cost. AI-generated content drives app downloads. Entering TestFlight within 2 weeks.</p>
              </div>
              <div className="card">
                <div className="card-title">Dawn Patrol</div>
                <p>AI-generated golf content &mdash; course visuals, tips, scorekeeping carousels. Golf is a high-value content niche ($7&ndash;12 CPM). Content drives app downloads in a high-disposable-income demographic. Live in TestFlight, awaiting client feedback.</p>
              </div>
              <div className="card">
                <div className="card-title">Zapp Studios</div>
                <p>Content production for all portfolio companies. AI-powered prototyping for new ventures. The infrastructure itself becomes a competitive advantage and selling point to future partners.</p>
              </div>
            </div>
          </section>

          {/* THE NUMBERS */}
          <section>
            <div className="slabel">Detailed Breakdown</div>
            <h2>Where the money goes and what comes back</h2>

            <table className="simple-table" style={{border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden'}}>
              <thead>
                <tr><th>Item</th><th style={{textAlign:'right'}}>Cost</th></tr>
              </thead>
              <tbody>
                <tr><td>NVIDIA DGX Spark</td><td style={{textAlign:'right'}}>$4,699</td></tr>
                <tr><td>Mac Studio M4 Ultra (192GB)</td><td style={{textAlign:'right'}}>$5,199</td></tr>
                <tr className="total"><td>Total one-time investment</td><td style={{textAlign:'right'}}>$9,898</td></tr>
              </tbody>
            </table>

            <table className="simple-table" style={{border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden'}}>
              <thead>
                <tr><th>Monthly cost comparison</th><th style={{textAlign:'right'}}>Before</th><th style={{textAlign:'right'}}>After</th></tr>
              </thead>
              <tbody>
                <tr><td>Claude API</td><td style={{textAlign:'right'}}>$800</td><td style={{textAlign:'right', color:'var(--green)'}}>~$160</td></tr>
                <tr><td>Electricity (both machines at 100% load)</td><td style={{textAlign:'right'}}>$0</td><td style={{textAlign:'right'}}>~$58</td></tr>
                <tr className="total"><td>Monthly operating cost</td><td style={{textAlign:'right', color:'var(--red)'}}>$800</td><td style={{textAlign:'right'}}>~$218</td></tr>
              </tbody>
            </table>

            <table className="simple-table" style={{border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden'}}>
              <thead>
                <tr><th>Payback Analysis</th><th style={{textAlign:'right'}}>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Monthly API savings (50&ndash;80% local)</td><td style={{textAlign:'right', color:'var(--green)'}}>~$340&ndash;580/mo</td></tr>
                <tr><td>Monthly electricity cost (new)</td><td style={{textAlign:'right', color:'var(--red)'}}>-$58/mo</td></tr>
                <tr><td>Net monthly cash savings</td><td style={{textAlign:'right', color:'var(--green)', fontWeight:700}}>~$282&ndash;522/mo</td></tr>
                <tr className="total"><td>Payback on $9,898 hardware</td><td style={{textAlign:'right'}}>~19 months (conservative) to ~12 months (realistic) on savings alone</td></tr>
              </tbody>
            </table>

            <div className="callout callout-blue" style={{marginBottom:'16px'}}>
              <strong>Electricity cost validated:</strong> At 100% sustained load, the Mac Studio draws ~295W and the DGX Spark draws ~170W &mdash; totaling 465W. At Houston residential rates (~$0.159/kWh), that&rsquo;s <strong>~$53/month</strong>. At the US national average (~$0.172/kWh), it&rsquo;s <strong>~$58/month</strong>. We use the higher figure. On a commercial plan (~$0.09/kWh), the cost drops to ~$30/month.
            </div>

            <div className="callout callout-green">
              <strong>But savings are only half the picture.</strong> The hardware also generates revenue through content-driven customer acquisition and frees up real human time. At Royal Pawz, where our marketing director currently spends 15&ndash;60 minutes per content piece, the DGX Spark generates 10 pieces in 15 minutes &mdash; freeing that time for higher-value work. With a $20 CAC and hundreds of AI-generated videos costing near-zero to produce, even modest conversion rates meaningfully accelerate payback. The hardware also enables an AI scheduling agent to handle client requests and rebooking, further reducing admin overhead. When you factor in new customers acquired across Royal Pawz, PawScan downloads, and Dawn Patrol installs, the effective payback period shortens significantly. The hardware is both a cost reduction tool and a revenue generation engine.
            </div>

            <p style={{color:'var(--text-3)', fontSize:'20px'}}><strong style={{color:'var(--text)'}}>On setup time:</strong> Building the content pipelines, configuring local models, building the AI scheduling/admin agent, and integrating analytics is real work &mdash; estimated at 80&ndash;100 hours over the first 2 months. This work was already planned as part of the product development roadmap regardless of the hardware decision. The hardware makes it possible; the time was already allocated.</p>

            <p style={{color:'var(--text-3)', fontSize:'20px'}}><strong style={{color:'var(--text)'}}>On future hardware:</strong> As the portfolio grows, we may eventually need additional hardware. But the ROI from these two machines will be realized well before that point. Models are getting more efficient &mdash; 128GB and 192GB of usable memory will remain more than sufficient for the foreseeable future. We scale hardware spend only after proven returns.</p>
          </section>

          {/* TIMELINE */}
          <section>
            <div className="slabel">Rollout</div>
            <h2>How fast does this come online</h2>

            <div className="timeline">
              <div className="tl-step">
                <div className="tl-when">Week 1</div>
                <div className="tl-what">
                  <div className="tl-title">Machines arrive, set up, validate ROI within 15-day return window</div>
                  <div className="tl-desc">Mac Studio starts handling daily AI tasks. API bill drops from $800 to ~$160 immediately. DGX Spark runs real production workloads. If either machine doesn&rsquo;t deliver, the Spark goes back within 15 days.</div>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-when">Week 2&ndash;4</div>
                <div className="tl-what">
                  <div className="tl-title">Content pipeline: quality calibration</div>
                  <div className="tl-desc">DGX Spark begins generating content for Royal Pawz. Approach: generate ~10 pieces, manually curate and post the best 1&ndash;2. Focus on solving quality before scaling volume. Video generation via LTX 2.3 + ComfyUI, copy via Qwen 3.5.</div>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-when">Month 2</div>
                <div className="tl-what">
                  <div className="tl-title">Scale what works, expand to all ventures</div>
                  <div className="tl-desc">Once content quality is validated, increase volume and connect to scheduling + analytics. Expand to PawScan and Dawn Patrol content. Begin automated posting with human review.</div>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-when">Month 3&ndash;6</div>
                <div className="tl-what">
                  <div className="tl-title">Closed-loop automation</div>
                  <div className="tl-desc">The feedback loop matures: generate &rarr; post &rarr; measure &rarr; learn &rarr; iterate. Human oversight decreases as the system proves itself. Content drives measurable customer acquisition across the portfolio.</div>
                </div>
              </div>
              <div className="tl-step">
                <div className="tl-when">Month 12&ndash;19</div>
                <div className="tl-what">
                  <div className="tl-title" style={{color:'var(--green)'}}>Hardware fully paid for</div>
                  <div className="tl-desc">Between API savings (~$282&ndash;522/mo), revenue generated through content-driven acquisition, and admin time freed by the AI scheduling agent, the hardware has paid for itself. Everything from here is margin.</div>
                </div>
              </div>
            </div>
          </section>

          {/* WHY NOW */}
          <section>
            <div className="slabel">Timing</div>
            <h2>Why now, specifically</h2>

            <div className="cards" style={{gridTemplateColumns:'1fr'}}>
              <div className="card">
                <div className="card-title">Open-source models have caught up to frontier APIs</div>
                <p>Qwen 3.5 (released February 2026) matches frontier models on most practical tasks. We&rsquo;ve validated this ourselves &mdash; in a direct comparison, the local model produced 75% production-ready output vs. Claude&rsquo;s 85%, at 1/23rd the cost. For 80% of our workload, that gap is either irrelevant or easily bridged with light refinement. Six months ago, this wasn&rsquo;t true.</p>
              </div>
              <div className="card">
                <div className="card-title">API prices are artificially low &mdash; and will go up</div>
                <p>Claude, OpenAI, and Google are all burning cash subsidizing token prices to win market share. When that funding strategy shifts, our $800/month API bill could double or triple overnight. Local hardware insulates us from pricing decisions we don&rsquo;t control.</p>
              </div>
              <div className="card">
                <div className="card-title">The hardware itself is getting more expensive</div>
                <p>The DGX Spark already increased 18% ($3,999 to $4,699) due to memory chip supply constraints. Prices may continue rising. Better to lock in now than pay more for the same hardware later.</p>
              </div>
              <div className="card">
                <div className="card-title">Models keep getting more efficient &mdash; same hardware, better results</div>
                <p>NVIDIA delivered a <strong>2.5x performance boost via software update alone</strong> (announced CES 2026) &mdash; specifically, running Qwen-235B with TensorRT-LLM using NVFP4 quantization and Eagle3 speculative decoding. Video generation workloads saw an <strong>8x speed improvement</strong>. The machines we buy today will run faster next year through software optimization alone.</p>
              </div>
            </div>
          </section>

          {/* RISKS */}
          <section>
            <div className="slabel">Risks &amp; Mitigations</div>
            <h2>What could go wrong and how we&rsquo;re covered</h2>

            <div className="risk-item">
              <div className="risk-title">Local models only cover 50% instead of 80%</div>
              <p>If local models handle fewer tasks than expected, our API savings would be ~$340/mo instead of ~$580/mo. Payback extends to ~19 months instead of ~12, but the hardware still pays for itself &mdash; and all other benefits (content generation, admin automation, data privacy, provider independence) still hold. Importantly, open-source models are improving rapidly &mdash; the local share will only increase over time, potentially approaching 100%.</p>
              <div className="risk-mitigation">Mitigation: We&rsquo;ve tested this split with real workloads. Even the conservative 50/50 scenario produces a positive ROI. And we have a 15-day return window on the DGX Spark to validate before fully committing.</div>
            </div>

            <div className="risk-item">
              <div className="risk-title">Content pipeline takes longer than expected to build</div>
              <p>The automated content loop may take 4&ndash;6 months to fully calibrate instead of 2&ndash;3. Manual posting in the interim means more of my time, but the API cost savings are immediate regardless of content pipeline status.</p>
              <div className="risk-mitigation">Mitigation: API savings kick in from Week 1 independent of content pipeline progress.</div>
            </div>

            <div className="risk-item">
              <div className="risk-title">Hardware doesn&rsquo;t meet expectations</div>
              <p>What if the DGX Spark or Mac Studio underperform for our specific workloads?</p>
              <div className="risk-mitigation">Mitigation: The DGX Spark has a <strong>15-day return policy</strong> at Micro Center &mdash; more than enough time to validate real ROI on actual production workloads before committing. If it doesn&rsquo;t perform, we return it. Both machines also carry strong resale value &mdash; NVIDIA AI hardware and Apple Silicon machines currently sell for 70&ndash;90% of purchase price on the secondary market. This is not a sunk cost &mdash; it&rsquo;s a liquid asset with a built-in trial period.</div>
            </div>

            <div className="risk-item">
              <div className="risk-title">A new model generation makes the hardware insufficient</div>
              <p>Future models might require more memory or compute than these machines provide.</p>
              <div className="risk-mitigation">Mitigation: Model efficiency is trending in our favor &mdash; each generation does more with less. 128GB + 192GB is substantial headroom. And if we do eventually need more, we will have already captured significant ROI from these machines before any upgrade is needed.</div>
            </div>

            <div className="risk-item">
              <div className="risk-title">NVIDIA or Apple discontinues software support</div>
              <p>Long-term platform risk if the vendor ecosystem shifts.</p>
              <div className="risk-mitigation">Mitigation: Both platforms have massive developer ecosystems. NVIDIA&rsquo;s CUDA/TensorRT stack and Apple&rsquo;s MLX framework are industry standards with broad community support. Vendor lock-in risk is minimal.</div>
            </div>
          </section>

          {/* BOTTOM LINE */}
          <section style={{borderTop:'none', paddingTop:0}}>
            <div className="big-quote">
              <p>For $10K upfront, we get infrastructure that generates unlimited content, drives customer acquisition, automates admin operations, and cuts monthly cash expenditure by $282&ndash;522 &mdash; across every business in the portfolio.</p>
              <p className="sub">Ongoing costs are ~$218/month (electricity + reduced Claude usage). Hardware pays for itself within 12&ndash;19 months through savings alone &mdash; faster when you count the revenue it generates and the human time it frees up. The DGX Spark has a 15-day return window &mdash; if it doesn&rsquo;t deliver, we send it back. Everything after payback is margin.</p>
            </div>
          </section>

          <div className="footer">
            Zapp Studios &bull; March 2026
          </div>

        </div>
      </div>
    </>
  )
}
