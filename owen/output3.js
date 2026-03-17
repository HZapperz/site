import { useState } from "react";

const sections = [
  {
    id: "exec",
    title: "Executive Summary",
    icon: "⚡",
    content: [
      {
        subtitle: "The Opportunity",
        text: `Owen can build 8 custom Seiko watches per day. He's currently building 1–2. The difference isn't skill or capacity — it's that he's spending 70% of his day responding to DMs, quoting prices, tracking orders, posting content, and managing listings instead of doing what he's best at: building watches.`
      },
      {
        subtitle: "The Three-Phase Strategy",
        text: `**Phase 1 — Free Owen's hands.** Hamza joins as revenue engineering partner handling all marketing, customer service, and business operations. An AI-powered automation system (ManyChat + Make.com + Google Sheets) handles 80% of repetitive customer inquiries automatically. Owen's only job becomes building watches. Immediate impact: production jumps from 1–2 to 6–8 watches/day.

**Phase 2 — Flood the pipeline with demand.** A Shopify store with a visual watch configurator ("design your own Seiko mod") captures buyers 24/7. Paid ads on Meta, TikTok, and Google drive targeted traffic. Organic content across Instagram, TikTok, and YouTube builds brand awareness. Owen's 50+ Facebook reviews become cross-platform social proof. Email and SMS sequences nurture every lead. Result: demand significantly exceeds Owen's daily build capacity.

**Phase 3 — Raise prices because you can.** When you have a waitlist, you're underpriced. Supply-constrained demand allows a shift from a flat $300–$500 range to a tiered model: Collection ($350–$425), Premium ($500–$700), and Bespoke ($750–$1,200). The brand evolves from "guy who mods Seikos on Facebook" to a premium microbrand with a reputation, a waitlist, and pricing power.`
      },
      {
        subtitle: "The Math at Scale",
        text: `6–8 watches/day × ~$500 blended ASP × 22 working days = **$66,000–$88,000/month** in revenue. At 60–65% gross margins after parts, that's $40,000–$57,000 gross profit before marketing, software, and labor. Even conservatively at 5 watches/day with a $450 ASP, that's $49,500/month.`
      },
      {
        subtitle: "The Deal Structure",
        text: `Zapp Studios provides all revenue engineering services — strategy, automation setup, ad management, content direction, and ongoing optimization — at **zero cost** to Owen. Owen is the founding case study for Zapp Studios' revenue engineering service.

**Owen covers direct hard costs only:**
• Ad spend: $1,500–$3,000/month (when ready to launch paid)
• Software subscriptions: ~$55–$150/month
• API credits for AI tools: ~$5–$10/month

Hamza's time, expertise, and systems are completely free. If external development is needed (custom website features, advanced AI agents), Owen covers infrastructure costs (hosting, API usage) but not Hamza's development time.`
      }
    ]
  },
  {
    id: "market",
    title: "Market Research & Competitive Landscape",
    icon: "🔍",
    content: [
      {
        subtitle: "The Seiko Mod Market in 2026",
        text: `The custom Seiko modding market has exploded since 2020. #SeikoMods has 850K+ Instagram posts. r/SeikoMods has grown past 400K members. The broader watch market reached $75.8 billion in 2024, projected to hit $116.7B by 2034. Seiko Group's own sales climbed 11.7% to ~$1.22B in FY2024–2025.

The COVID hobby boom of 2020–2022 brought a wave of new modders and buyers. Sources describe "new companies appearing weekly." The barrier to entry is extremely low — AliExpress parts + Instagram = instant "business." But the barrier to building a reputable, quality operation remains high. That's Owen's moat.`
      },
      {
        subtitle: "Competitor Pricing Tiers",
        text: `**Budget ($75–$150):** AliExpress sellers using clone movements with high failure rates. Minimal service, no warranty. Not real competition for quality builders.

**Mid-range ($200–$350):** SKYRIM Wrist ($249–$449, 447+ designs, polished Shopify store), Nomods, WatchBrick. Established operations with proper e-commerce infrastructure.

**Premium ($400–$700) — Owen's tier:** Lucius Atelier (superior finishing, Swiss Super-LumiNova), Circa Watch Labs (full online configurator). Differentiation through craftsmanship, unique designs, and customer experience.

**Ultra-premium ($700–$1,500+):** Fully custom one-of-one builds. Undone Watches has built an entire brand here with a world-class configurator and made-to-order model using Seiko NH35A movements.`
      },
      {
        subtitle: "Key Competitors to Study",
        table: {
          headers: ["Builder", "Price Range", "Channels", "Differentiator"],
          rows: [
            ["SKYRIM Wrist", "$249–$449", "Shopify, IG, SEO blog", "Largest catalog (447+), strong content"],
            ["Circa Watch Labs", "$400–$700+", "Shopify w/ configurator", "Online watch builder tool"],
            ["Nomods", "$250–$500", "Shopify, Instagram", "Clean branding, educational content"],
            ["WatchModMaker", "Free tool / $300–$600", "Custom website", "Community visualization tool"],
            ["Lucius Atelier", "$400–$800+", "Shopify, Instagram", "Premium parts supplier AND builder"],
            ["Undone Watches", "$350–$800+", "Proprietary configurator", "Gold-standard configurator, made-to-order"],
            ["Crystal Times", "Parts + builds", "Shopify", "Major supplier + business guides"]
          ]
        }
      },
      {
        subtitle: "Trending Styles & Market Shifts",
        text: `**Hot right now:** Rolex Datejust builds, Patek Nautilus "Seikonaut" mods, AP Royal Oak "Seikoak" builds, GMT builds (NH34 movement), VK meca-quartz chronographs (Namoki's VK parts sold out in weeks).

**Case size shift:** 42mm+ is increasingly dated. 38–40mm is the new standard. 36mm women's/unisex builds are an almost completely untapped market.

**Design direction:** Clean, sterile (unbranded) dials now outperform copycat logos. This aligns perfectly with the post-Seiko-IP-notice landscape.`
      },
      {
        subtitle: "⚠️ Seiko's October 2025 IP Notice",
        text: `Seiko Corporation issued an official notice warning against "MOD watches assembled with fake or unauthorized components," targeting sellers using counterfeit parts and Seiko logos. Most legal experts concluded that modifying genuine Seiko parts remains legal under first-sale doctrine.

**Strategic implication:** Evolve toward selling under the "Modded Seiko" brand identity with "powered by Seiko NH35 movement" language rather than positioning as a Seiko product. This also positions the brand more professionally for the premium tiers where the real margin lives.`
      }
    ]
  },
  {
    id: "audit",
    title: "Current State Audit",
    icon: "📊",
    content: [
      {
        subtitle: "What's Working",
        text: `• **Product quality** — Consistently positive reviews, repeat customers, and word-of-mouth referrals
• **Organic reputation** — 50+ Facebook reviews and 700 lifetime sales create a trust foundation that can't be bought
• **Production capability** — Owen can build 8 watches/day when focused solely on assembly
• **Market position** — $300–$500 captures the premium-accessible segment with 60–65% gross margins
• **Early mover advantage** — 3 years of supplier relationships, design intuition, and build efficiency`
      },
      {
        subtitle: "What's Bottlenecking Growth",
        text: `• **Solo operator doing everything** — Every minute on non-build tasks = a watch not built
• **No website** — 100% of sales via Facebook Marketplace DMs. Every competitor has Shopify
• **No automation** — Every customer interaction is manual
• **No email/phone list** — 700 past customers are uncaptured. No re-engagement, no referrals
• **Single-channel dependency** — Facebook Marketplace is rented land
• **No paid advertising** — Organic-only creates a ceiling
• **Declining volume** — From 50/day at peak to 20–30/month. Lack of systems, not lack of demand`
      },
      {
        subtitle: "Revenue at Current State",
        text: `At 20–30 watches/month × $400 average:
• Monthly revenue: **$8,000–$12,000**
• COGS at 35–40%: **$2,800–$4,800**
• Gross profit: **$5,200–$7,200/month**
• No marketing spend, minimal software costs

This is a profitable side hustle. The playbook turns it into a real business.`
      }
    ]
  },
  {
    id: "automation",
    title: "The Automation System",
    icon: "🤖",
    content: [
      {
        subtitle: "The Core Problem",
        text: `Owen's four biggest time sinks are all automatable:
1. **Responding to DMs/messages** — 80% are the same 5 questions
2. **Order tracking & follow-ups** — Manual status updates for every order
3. **Quoting/pricing inquiries** — Repeating the same info with minor variations
4. **Posting content & managing listings** — Falls to the bottom of the priority list

Automating these recovers an estimated **15–20 hours per month** — equivalent to 40–50 additional watches at Owen's build rate.`
      },
      {
        subtitle: "⚠️ Critical: Facebook Marketplace Limitation",
        text: `**ManyChat cannot automate personal Facebook Marketplace messages.** Meta's Messenger API only grants automation access to Business Page conversations, not personal profile threads. This applies to every chatbot tool.

**The fix:** List all products on Marketplace through a connected **Facebook Business Page**. Inquiries from Page-listed items route through the Page's Messenger inbox, which ManyChat can fully automate. Listing descriptions should say "Message our Page for fastest response."

For personal profile messages that still come through, **FB Auto Reply AI** (Chrome extension) can provide automated responses — though these carry some account risk.

**This is step zero. Everything else depends on it.**`
      },
      {
        subtitle: "ManyChat Setup — $44/month",
        text: `**ManyChat Pro ($15/mo for 500 contacts) + AI add-on ($29/mo)**

**FAQ Bot handles 5 core inquiry types:**

**Pricing** → Visual pricing menu: Collection ($350–$425), Premium ($500–$700), Bespoke ($750+) with Quick Reply buttons to Shopify

**Shipping** → "Custom builds take 7–14 days. Standard shipping included. Express available."

**Customization** → Gallery carousel of options + direct link to the watch configurator

**Warranty/Returns** → Policy summary + link to full terms

**Order Status** → Collects order number, looks up via Sheets integration or escalates to human

**AI Replies** trains on your website and product info (250K chars). Responds contextually to any question in your knowledge base. Multi-language auto-detection for international buyers.

**AI Step** runs goal-oriented conversations: "Qualify this lead — collect email, style preference, budget, timeline." Sends follow-up if no reply in 30 min.

**Live Chat Handoff** routes complex questions to Owen/Hamza with push notifications.`
      },
      {
        subtitle: "The Automated Order Pipeline",
        text: `**ManyChat + Make.com ($9/mo) + Google Sheets (free):**

**Stage 1 — Inquiry:** Customer messages. ManyChat qualifies (style, budget, timeline), captures email/phone.

**Stage 2 — Quote:** Collection builds get auto-pricing. Premium/Bespoke hits Google Sheets for custom quote.

**Stage 3 — Payment:** Shopify checkout link sent. Payment triggers Make.com → logs order in Sheets → sends confirmation DM.

**Stage 4 — Production updates:** Owen updates status in Sheets (Parts Ordered → Build In Progress → QC → Shipped). Each change auto-sends customer DM/email.

**Stage 5 — Delivery:** Auto shipping notification with tracking.

**Stage 6 — Review request:** 3 days post-delivery: "How's the new watch? A review helps us reach more enthusiasts → [link]"`
      },
      {
        subtitle: "Full Automation Stack",
        table: {
          headers: ["Tool", "Monthly Cost", "Purpose"],
          rows: [
            ["ManyChat Pro + AI", "~$44", "DM automation, FAQ bot, AI replies, lead qualification"],
            ["Make.com Core", "$9", "Connects ManyChat → Sheets → email triggers"],
            ["Google Sheets", "$0", "Lightweight CRM and order tracker"],
            ["Buffer or Canva Pro", "$6–$13", "Content scheduling (IG + FB)"],
            ["TOTAL", "$59–$66/mo", ""]
          ]
        }
      }
    ]
  },
  {
    id: "funnel",
    title: "The Sales Funnel",
    icon: "🛒",
    content: [
      {
        subtitle: "Why Owen Needs Shopify — $39/month",
        text: `Every established Seiko mod shop runs Shopify. Owen is the exception. A store provides:

• **24/7 sales** — Browsers at 2 AM buy immediately instead of waiting for a DM reply
• **Abandoned cart recovery** — Auto-emails buyers who started checkout but didn't finish (critical at $300–$500)
• **Instagram Shopping** — Tag products in posts/stories with direct checkout
• **Meta Pixel** — Track every visitor, build retargeting audiences, feed the ad algorithm
• **Email capture** — Pop-ups, checkout, configurator all collect emails
• **Professional credibility** — Polished store with reviews + secure checkout vs. "DM me for pricing"
• **Analytics** — Know where buyers come from and where they drop off`
      },
      {
        subtitle: "The Watch Configurator — \"Design Your Own\"",
        text: `This is the centerpiece. Every successful Seiko mod configurator uses **2D layered image-swap**, not 3D. Components are flat layers (dial → hands → crystal → bezel), making photography cheaper and more effective than 3D modeling.

**Recommended: Kickflip** — $0/month + 1.95% per sale. No-code drag-and-drop editor on Shopify. Each component is a layer, customers swap in real time, dynamic pricing adjusts totals, conditional logic hides incompatible combos.

**Implementation:**
• **Week 1 ($0):** Typeform with component photos to validate demand
• **Weeks 2–3 ($200–$500):** Shopify + Kickflip. Photograph all components on transparent backgrounds. Build configurators per style (Diver, Datejust, Nautilus)
• **Month 2+:** Expand styles, add conditional logic, optimize

The configurator's value: it transforms passive browsers into engaged buyers who've already emotionally committed to "their" watch before they pay.`
      },
      {
        subtitle: "Configurator Tool Comparison",
        table: {
          headers: ["Tool", "Monthly Cost", "Setup Cost", "Best For"],
          rows: [
            ["Kickflip ⭐", "$0 + 1.95%/sale", "$0–$500 (photos)", "Best value for small builders"],
            ["Zakeke", "$30–$105/mo + fees", "$500–$2K (3D)", "Shops wanting 3D/AR"],
            ["Product Personalizer", "$15/mo", "$0", "Simple dropdowns only"],
            ["Threekit", "$1K–$5K+/mo", "$5K–$20K+", "Enterprise — overkill"],
            ["Typeform (MVP)", "$0–$35/mo", "$0", "Demand validation before investing"]
          ]
        }
      },
      {
        subtitle: "Leveraging 50+ Facebook Reviews",
        text: `Owen's reviews are his most underutilized asset. They need to appear everywhere:

**Shopify store:** Install **Reputon** (~$10–$15/mo, Shopify native) or **Elfsight** (free/200 views) to auto-sync Facebook reviews into widgets. Place near "Add to Cart" and on homepage. Enable schema markup for Google star ratings.

**Ad creative:** Review screenshots consistently outperform generic product ads on Meta.

**Email sequences:** Include "What our customers say" in every email with 2–3 excerpts.

**Instagram:** Create a "Reviews" Story Highlight. Post testimonials as feed content.

**Zero-cost approach:** Screenshot best reviews → add as images on product pages, Stories, emails, ads. Works perfectly.`
      },
      {
        subtitle: "Email & SMS via Klaviyo (Free for 500 contacts)",
        text: `**Immediate action:** Import all available customer emails into Klaviyo.

**5 automated flows:**

**1. Welcome Series** — Email 1 (instant): brand story + configurator link. Email 2 (Day 2): "How Owen builds your watch." Email 3 (Day 5): reviews + limited availability. Avg revenue: $2.65/recipient.

**2. Abandoned Cart** — 1hr: "Still thinking?" 24hr: social proof + reviews. 72hr: urgency + lead time reminder. Avg revenue: $3.65/recipient.

**3. Post-Purchase** — Day 0: confirmation. Day 3: build-in-progress photo. Day 7: shipping. Day 14: review request. Day 30: referral ask.

**4. New Drop Announcement** — Email + SMS blast for limited edition releases. Drives urgency and waitlist signups.

**5. Win-Back** — 90-day inactive customers get a re-engagement sequence with new builds and incentive.

Automated flows generate **30x more revenue per recipient** than standard campaigns and represent 41% of email revenue from just 5.3% of sends. Email marketing returns **$36–$42 for every $1 spent** for DTC brands.`
      }
    ]
  },
  {
    id: "ads",
    title: "Paid Ads & Organic Content Strategy",
    icon: "📢",
    content: [
      {
        subtitle: "Paid Ads: Start on Meta at $1,500–$3,000/month",
        text: `**Meta (Facebook/Instagram) gets 70–80% of initial ad spend.** Starting budget: $50–$100/day.

**Best creative formats (ranked):**
1. UGC-style video (15–30 sec, phone-shot build process) — 4x higher engagement than polished brand content
2. Carousel ads showcasing different builds — 30–50% lower CPC than single images  
3. Testimonial/review ads — customer unboxing reactions + review screenshots

**Targeting:** Layer watch interests (Seiko, Orient, Casio, Hamilton, horology, mechanical watches) + lifestyle (whiskey, leather goods, EDC) + behavioral (engaged shoppers). After 50+ conversions, Lookalike Audiences from the 700-customer email list become the primary scaling lever.

**Expected benchmarks:** CPM $9–$14, CPC $0.70–$1.50, CTR 2.0–2.8%, target ROAS 3x–5x. Initial CAC: $75–$150, optimizing to $60–$100.

**Seasonal note:** Q4 (Nov–Dec) inflates CAC by 30–40%. Q1 is cheapest.`
      },
      {
        subtitle: "TikTok — 15% of Budget ($300–$500/month)",
        text: `Focus on **Spark Ads** — these promote existing organic posts as paid ads. All engagement accrues to the organic post, creating compound growth. Spark Ads show 142% higher engagement and 43% higher conversion than standard in-feed ads.

**Content that goes viral in watch modding:**
• Compressed build videos (15–60 sec) with satisfying snap/click sounds
• ASMR assembly close-ups
• Before/after transformations with "Drip or Skip?" hooks
• Controversy hooks: "This $350 Seiko mod beats every Rolex"
• Hook viewers in the first 1–2 seconds with the finished watch, then rewind to the build`
      },
      {
        subtitle: "Google Shopping — 10% of Budget",
        text: `Captures high-intent search traffic for "custom Seiko watch," "Seiko mod for sale," etc. Custom products qualify for Shopping ads by setting identifier_exists to FALSE in the product feed. Lower volume than Meta but highest purchase intent of any channel.`
      },
      {
        subtitle: "Organic Content Strategy",
        text: `**Posting cadence:** 4–5 Instagram feed posts/week (carousels + Reels), daily Stories, 5–7 TikToks/week.

**Content pillars:**
• **Build Process (40%)** — Time-lapse assembly, ASMR close-ups, "what goes into a $400 watch"
• **Finished Reveals (20%)** — Beauty shots, wrist rolls, lume photography
• **Behind the Scenes (15%)** — Workbench life, sourcing, problem-solving
• **Education (15%)** — Movement comparisons, crystal types, water resistance testing
• **Community/Social Proof (10%)** — Customer wrist shots, testimonials, "your mod, your story"

**Reddit (underutilized, high-trust):** r/SeikoMods (400K members) — share builds with detailed spec breakdowns as a contributor, not salesperson. r/WatchExchange (119K) — list individual builds for sale. Accounts need 30+ days age and positive karma.`
      },
      {
        subtitle: "The Organic-to-Paid Flywheel",
        text: `Post build videos and wrist shots organically → identify which posts get the most engagement → boost those as ads or build them into ad creative → capture emails from clickers → build Lookalike Audiences → run Click-to-Messenger ads → ManyChat automates the conversation → Shopify closes the sale → post-purchase review feeds back into social proof.

**Click-to-Messenger ads** are a powerful mid-funnel tool: they capture name and email from every respondent automatically while starting a conversation ManyChat can handle.

A **Facebook Group** ("Seiko Mod Collectors") builds community that feeds organic discovery. Group posts appear in members' feeds without competing in the ad auction — free distribution.`
      },
      {
        subtitle: "Technical Prerequisites (Before Spending $1 on Ads)",
        text: `• Install **Meta Pixel** + Conversions API on Shopify (43% of users run ad blockers — CAPI captures what pixels miss)
• Install **TikTok Pixel** on Shopify
• Install **Google Tag** on Shopify
• Let pixels collect 1–2 weeks of data before launching retargeting
• Build three retargeting tiers: Hot (0–7 day cart abandoners), Warm (7–30 day page viewers), Cool (30–90 day visitors)`
      }
    ]
  },
  {
    id: "operations",
    title: "Scaling Operations",
    icon: "⚙️",
    content: [
      {
        subtitle: "Batch Production Workflow",
        text: `An experienced builder completes a Seiko mod in 45–75 minutes. At 8/day serial, that's 8–10 hours before photography, shipping, or anything else. Batch production cuts this to 7–8 hours for 8 watches by eliminating tool swapping and decision fatigue.

**The assembly-line day (8 watches):**
• Morning prep & staging: 1 hour (all 8 builds)
• Movement & dial installation: 1.5 hours
• Hand setting: 1.5–2 hours (most skilled step)
• Case assembly (crystal, bezel): 1 hour
• Final assembly (stems, crowns, casebacks): 1 hour
• QC, strap fitting, photography: 1 hour
• **Total: 7–8 hours**

The key enabler is **design standardization**: 5 Signature designs (60% of volume), 5 rotating Seasonal designs (25%), and Bespoke custom orders (15%). Signature builds use identical case/crystal/bezel combos — only dials and hands vary. Same stem lengths, same press settings, same gaskets across the batch.`
      },
      {
        subtitle: "Tiered Pricing Model",
        text: `Move from a flat $300–$500 range to three explicit tiers:

**Collection ($350–$425)** — 60% of volume. Highest batchability. Signature designs with curated options. This is the volume driver and entry point.

**Premium ($500–$700)** — 25% of volume. GMT builds, skeleton dials, premium finishing, exotic configurations. Higher margin, moderate customization.

**Bespoke ($750–$1,200)** — 15% of volume. Fully custom one-of-one builds. Founder-built only. Waitlist model. This is the brand prestige play.

**The demand-driven pricing strategy:** As the pipeline fills and Owen consistently has more orders than he can fill in a week, prices increase across all tiers. A 2–3 week waitlist justifies a 15–20% price increase. A 4+ week waitlist justifies 25–30%. The goal is to always have slightly more demand than capacity — that's where pricing power lives.`
      },
      {
        subtitle: "Hiring Timeline",
        text: `**At $15K–$25K/month (3–4 watches/day):**
Hire part-time assistant at $15–20/hr for packaging, shipping, customer service, and inventory logging.

**At $25K–$40K/month (5–6 watches/day):**
Upgrade to full-time assembly assistant. Train on standard builds — start with crystal pressing and bezel assembly, add one step per week. Owen retains hand installation (most skilled step) and all QC. Budget 4–6 weeks and ~$500–$1,000 in practice parts for training.

**At full scale (7–8 watches/day, $60K+/month):**
Three-person team:
• **Owen:** Premium/Bespoke builds, QC, product development
• **Assembly tech:** 4–5 Signature watches/day independently
• **Part-time admin:** Shipping, CS overflow, social media execution`
      },
      {
        subtitle: "Parts Sourcing at Volume",
        text: `At 160 watches/month, order in bulk:
• **Movements:** Batches of 50–100 (genuine NH35 wholesale: $30–$50 each)
• **Cases:** Standardize on 2–3 types, order 25–50 at a time
• **Crystals & bezel inserts:** Lots of 50–100
• Maintain 2–3 weeks buffer stock on core components

**Craftybase** (~$49–$79/month) is purpose-built for small-batch manufacturers — recipe/BOM features auto-deduct components from inventory when a watch is built, calculate real-time COGS, and sync with Shopify.`
      },
      {
        subtitle: "Limited Drops & Waitlist Model",
        text: `**Helm Watches maintains a 27-month, 3,397-person waitlist** for their $375 Miyako model with minimal marketing. The waitlist IS the marketing.

**The playbook:** Monthly drops of 10–15 themed watches ("Arctic Diver," "Midnight GMT") at premium pricing ($450–$600), announced 2 weeks in advance via email and SMS, with a signup form collecting demand signals. At 12% waitlist-to-purchase conversion, a waitlist of 200 people yields 24 sales per drop.

Numbered limited editions create collector value and secondary market premiums that amplify brand cachet. This is exactly how modder Lume Shot partnered with Long Island Watch for the "Islander Glacier" (200 pieces).`
      }
    ]
  },
  {
    id: "brand",
    title: "Brand Evolution",
    icon: "🏷️",
    content: [
      {
        subtitle: "From Marketplace Seller to Microbrand",
        text: `The Seiko October 2025 IP notice accelerates a shift that was already happening: serious modders are building their own brand identities. "Modded Seiko" needs to evolve from a Facebook Marketplace handle to a recognized microbrand.

**Brand positioning:** "Handcrafted custom watches powered by legendary Seiko movements. Every piece built to order. 700+ watches delivered. 50+ five-star reviews."

**The language shift:** Move from "Seiko mod" to "custom-built watch featuring a Seiko NH35 automatic movement." This is legally safer, sounds more premium, and positions the brand independently of Seiko's IP.

**Visual identity:** Professional product photography, consistent color palette, branded packaging (sticker, card, case), branded dial option for Bespoke tier.`
      },
      {
        subtitle: "Revenue Diversification",
        text: `**Curated Mod Kits ($150–$250):** Sell pre-selected component packages for DIY builders. DIY Watch Club proves the model works. Start with 5–10 kits themed around signature builds. Potential: $2,000–$5,000/month with modest inventory.

**YouTube Channel:** Watch content CPM of $3–$8 yields $150–$800/month at 50K–100K monthly views. But the indirect sales funnel is the real value — Long Island Watch built a multi-million dollar business primarily through YouTube.

**Content types:** Build tutorials, movement comparisons, "building a $400 watch from scratch," component reviews, customer story features.

**Monetization threshold:** 1,000 subscribers + 4,000 watch hours for YouTube Partner Program.`
      }
    ]
  },
  {
    id: "roadmap",
    title: "Phased Roadmap",
    icon: "🗺️",
    content: [
      {
        subtitle: "Months 1–2: Foundation",
        text: `**Actions:**
• Create Facebook Business Page, re-list all Marketplace items through it
• Set up Shopify Basic ($39/mo) with Meta Pixel
• Install Kickflip configurator — photograph all components
• Set up ManyChat Pro + AI ($44/mo) for DM automation
• Connect Make.com ($9/mo) to Google Sheets order tracker
• Import all available customer emails into Klaviyo (free)
• Build Welcome + Abandoned Cart email flows
• Begin filming TikTok/Reels content daily
• Implement batch production workflow
• Design 5 Signature builds for standardized production

**Investment:** ~$2,000–$3,000 (software, bulk inventory, photo setup)
**Expected output:** 4–6 watches/day, $25,000–$40,000/month
**Owen's role:** Build watches. Send Hamza raw photos/videos.`
      },
      {
        subtitle: "Months 3–4: First Hire + Ads Launch",
        text: `**Actions:**
• Hire part-time assistant for packaging, shipping, CS overflow
• Launch Meta ads at $1,500–$2,000/month (10–15 creative assets)
• Begin TikTok Spark Ads on best-performing organic content
• Launch first 10-piece limited drop at premium pricing
• Write SOPs for all assembly steps
• Place first volume parts order (100 movements, 50 cases)
• Start training assistant on basic assembly tasks

**Investment:** ~$2,000–$3,000/mo (ads + assistant + software)
**Expected output:** 5–7 watches/day, $40,000–$60,000/month
**Owen's role:** Build watches, train assistant on basic tasks.`
      },
      {
        subtitle: "Months 5–8: Scale",
        text: `**Actions:**
• Promote assistant to full-time or hire dedicated assembly tech
• Set up second workstation with duplicate tools (~$600–$1,300)
• Owen shifts to Premium/Bespoke builds + QC + product development
• Launch curated mod kits on Shopify
• Reach YouTube monetization threshold
• Establish monthly limited drop cadence
• Begin micro-influencer seeding (2–3 watches/month to reviewers)
• Scale Meta ads to $3,000–$5,000/month as ROAS proves out

**Investment:** ~$5,000–$8,000/mo (labor + ads + inventory)
**Expected output:** 6–8 watches/day, $60,000–$90,000/month
**Owen's role:** Premium builds, QC, product vision.`
      },
      {
        subtitle: "Months 9–12: Optimization",
        text: `**Actions:**
• Negotiate direct supplier relationships for volume pricing
• Launch Bespoke tier with online configurator
• Invest in pressure tester ($200–$500) as quality differentiator
• Explore co-branded limited editions with watch influencers
• Evaluate custom dial production for proprietary designs
• Consider wholesale/B2B channel to watch retailers
• Explore expansion to other watch platforms (Casio "Casioak" mods, etc.)

**Expected output:** Sustained 7–8 watches/day, $80,000–$100,000/month
**Owen's role:** Creative director + master builder. Everything else is systemized.`
      }
    ]
  },
  {
    id: "techstack",
    title: "Tech Stack & Costs",
    icon: "💻",
    content: [
      {
        subtitle: "Budget-Lite Stack (~$115/month)",
        table: {
          headers: ["Tool", "Cost", "Purpose"],
          rows: [
            ["Shopify Basic", "$39/mo", "E-commerce store"],
            ["Kickflip", "$0 + 1.95%/sale", "Watch configurator"],
            ["ManyChat Pro + AI", "~$44/mo", "DM/Messenger automation"],
            ["Make.com Core", "$9/mo", "Workflow automation"],
            ["Google Sheets", "$0", "CRM + order tracking"],
            ["Klaviyo", "$0 (under 500 contacts)", "Email/SMS marketing"],
            ["Elfsight", "$0 (200 views)", "Facebook review widget"],
            ["Buffer", "$6/mo", "Content scheduling"],
            ["Canva Free", "$0", "Design"],
            ["TOTAL", "~$98/mo + 1.95%/sale", ""]
          ]
        }
      },
      {
        subtitle: "Full Automation Stack (~$195/month)",
        table: {
          headers: ["Tool", "Cost", "Purpose"],
          rows: [
            ["Shopify Basic", "$39/mo", "E-commerce store"],
            ["Kickflip", "$0 + 1.95%/sale", "Watch configurator"],
            ["ManyChat Pro + AI", "~$44/mo", "DM/Messenger automation"],
            ["Make.com Core", "$9/mo", "Workflow automation"],
            ["Google Sheets", "$0", "CRM + order tracking"],
            ["Klaviyo Email", "$20–$30/mo (500+ contacts)", "Email/SMS automation"],
            ["Reputon", "~$15/mo", "Facebook reviews on Shopify"],
            ["Canva Pro", "$13/mo", "Design + scheduling"],
            ["Craftybase", "$49/mo", "Inventory/BOM management"],
            ["TOTAL", "~$189–$199/mo", ""]
          ]
        }
      },
      {
        subtitle: "Future Additions (When Revenue Justifies)",
        table: {
          headers: ["Tool", "Cost", "When to Add"],
          rows: [
            ["GoHighLevel", "$97/mo", "Replace Sheets CRM + add SMS at $25K+/mo revenue"],
            ["Shopify Plan Upgrade", "$105/mo", "For advanced reporting at scale"],
            ["Triple Whale / Northbeam", "$100+/mo", "Ad attribution at $5K+/mo ad spend"],
            ["Claude API (custom agent)", "~$5–$10/mo", "Advanced AI quoting/CS agent"]
          ]
        }
      }
    ]
  }
];

const Playbook = () => {
  const [activeSection, setActiveSection] = useState("exec");
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpand = (sectionId, idx) => {
    const key = `${sectionId}-${idx}`;
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeData = sections.find(s => s.id === activeSection);

  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderBlock = (text) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("•")) {
        return <div key={i} style={{ paddingLeft: 16, marginBottom: 6, lineHeight: 1.6 }}>{renderText(trimmed)}</div>;
      }
      return <p key={i} style={{ margin: "8px 0", lineHeight: 1.7 }}>{renderText(trimmed)}</p>;
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#0a0a0a", color: "#e0e0e0" }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: "#111", borderRight: "1px solid #222", padding: "20px 0", flexShrink: 0, overflowY: "auto", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #222" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#7c5cfc", marginBottom: 4 }}>ZAPP STUDIOS</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Modded Seiko</div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>Revenue Engineering Playbook</div>
        </div>
        <div style={{ padding: "12px 0" }}>
          {sections.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                background: activeSection === s.id ? "#1a1a2e" : "transparent",
                borderLeft: activeSection === s.id ? "3px solid #7c5cfc" : "3px solid transparent",
                transition: "all 0.15s",
                fontSize: 13,
                color: activeSection === s.id ? "#fff" : "#888",
                fontWeight: activeSection === s.id ? 600 : 400,
              }}
            >
              <span style={{ marginRight: 8 }}>{s.icon}</span>{s.title}
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #222", marginTop: "auto" }}>
          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5 }}>
            Prepared by Hamza<br />
            zappstudios.us<br />
            March 2026
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px 48px", maxWidth: 820, overflowY: "auto" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#7c5cfc", marginBottom: 8 }}>{activeData.icon} {activeData.title.toUpperCase()}</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 32, lineHeight: 1.3 }}>{activeData.title}</h1>

        {activeData.content.map((block, idx) => {
          const key = `${activeSection}-${idx}`;
          const isExpanded = expandedSections[key] !== false;

          return (
            <div key={idx} style={{ marginBottom: 24, background: "#141420", borderRadius: 10, border: "1px solid #222", overflow: "hidden" }}>
              <div
                onClick={() => toggleExpand(activeSection, idx)}
                style={{ padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: isExpanded ? "#1a1a2e" : "#141420", transition: "background 0.15s" }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{block.subtitle}</span>
                <span style={{ color: "#7c5cfc", fontSize: 18, transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
              </div>
              {isExpanded && (
                <div style={{ padding: "4px 20px 20px" }}>
                  {block.text && <div style={{ fontSize: 14, color: "#ccc" }}>{renderBlock(block.text)}</div>}
                  {block.table && (
                    <div style={{ overflowX: "auto", marginTop: 8 }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                          <tr>
                            {block.table.headers.map((h, i) => (
                              <th key={i} style={{ textAlign: "left", padding: "10px 12px", borderBottom: "2px solid #333", color: "#7c5cfc", fontWeight: 600, fontSize: 11, letterSpacing: 1, whiteSpace: "nowrap" }}>{h.toUpperCase()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, ri) => (
                            <tr key={ri} style={{ borderBottom: "1px solid #222" }}>
                              {row.map((cell, ci) => (
                                <td key={ci} style={{ padding: "10px 12px", color: ci === 0 ? "#fff" : "#aaa", fontWeight: ci === 0 ? 500 : 400 }}>{renderText(cell)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playbook;