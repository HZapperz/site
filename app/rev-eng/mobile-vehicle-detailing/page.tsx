"use client";

import { useState } from "react";

const SLIDES = [
  // SLIDE 0 - COVER
  {
    id: "cover",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-6" style={{color:'#2563eb',letterSpacing:'0.2em'}}>Zapp Studios Presents</div>
        <h1 className="text-6xl font-black leading-tight mb-4" style={{color:'#0f172a'}}>Revenue Engineering<br/>for Mobile Detailing</h1>
        <p className="text-lg max-w-xl mb-8" style={{color:'#64748b'}}>A custom booking platform that turns ad clicks into booked jobs - with A/B tested funnels, session recording, and conversion optimization no SaaS tool offers.</p>
        <div className="flex gap-6 text-sm font-semibold" style={{color:'#64748b'}}>
          <span>Houston, TX</span><span>·</span><span>March 2026</span>
        </div>
      </div>
    ),
  },
  // SLIDE 1 - PROBLEM
  {
    id: "problem",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#dc2626'}}>The Problem</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>$18.7B industry. Stone-age booking.</h2>
        <div className="grid grid-cols-3 gap-5 mb-6">
          {[
            {n:"38%",l:"of Houston mobile detailers are phone-only",c:"#dc2626"},
            {n:"5+",l:"different booking tools used by 8 operators - zero standard",c:"#fb923c"},
            {n:"0",l:"operators A/B test their booking flow or track funnel drop-off",c:"#d97706"},
          ].map((s,i)=>(
            <div key={i} className="rounded-2xl p-6" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="text-4xl font-black mb-3" style={{color:s.c}}>{s.n}</div>
              <div className="text-base" style={{color:'#64748b'}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-5 mb-4" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
          <div className="text-xs font-bold uppercase mb-3" style={{color:'#64748b'}}>What a typical customer journey looks like today</div>
          <div className="flex items-center gap-2 flex-wrap text-sm" style={{color:'#1e293b'}}>
            {["Google search","→","Visit website","→","Call or text","→","Wait for callback","→","Phone tag","→","Verbal quote","→","Schedule over phone","→","Maybe show up"].map((s,i)=>(
              <span key={i} className={s==="→"?"font-bold":""} style={s==="→"?{color:'#64748b'}:{background:s==="Maybe show up"?'rgba(220,38,38,0.1)':'rgba(0,0,0,0.06)',padding:'4px 10px',borderRadius:6}}>{s}</span>
            ))}
          </div>
          <div className="text-xs mt-3" style={{color:'#dc2626'}}>Average: 2-4 days from intent to booking. Every touchpoint leaks revenue.</div>
        </div>
        <div className="text-base" style={{color:'#64748b'}}>Source: Primary research - 10+ Houston mobile detailer websites audited (March 2026)</div>
      </div>
    ),
  },
  // SLIDE 2 - MARKET
  {
    id: "market",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#2563eb'}}>Market Opportunity</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Houston is the perfect launchpad</h2>
        <div className="grid grid-cols-2 gap-5 mb-6">
          {[
            {n:"$18.7B",l:"US car wash & detailing industry (2026)",s:"IBISWorld"},
            {n:"19.4%",l:"CAGR for mobile/on-demand detailing segment",s:"Mordor Intelligence"},
            {n:"3.2M",l:"registered vehicles in Harris County alone",s:"Harris County Tax Office"},
            {n:"665 mi²",l:"Houston sprawl - makes mobile model dominant",s:""},
          ].map((s,i)=>(
            <div key={i} className="rounded-2xl p-5" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="text-2xl font-black mb-1" style={{color:'#2563eb'}}>{s.n}</div>
              <div className="text-base" style={{color:'#334155'}}>{s.l}</div>
              {s.s && <div className="text-xs mt-1" style={{color:'#64748b'}}>{s.s}</div>}
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6" style={{background:'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.06))',border:'1px solid rgba(37,99,235,0.15)'}}>
          <div className="text-xs font-bold uppercase mb-3" style={{color:'#2563eb'}}>TAM → SAM → SOM</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {n:"$100–220M",l:"Houston metro mobile detailing TAM",d:"3.2M vehicles × 34% use detailing × avg $250"},
              {n:"$15–30M",l:"SAM: premium segment reachable via Google Ads",d:"High-intent searchers in affluent suburbs"},
              {n:"$500K–2M",l:"Year 1 SOM across 3–5 partner operators",d:"Per operator: $125K–400K annual revenue"},
            ].map((s,i)=>(
              <div key={i}>
                <div className="text-xl font-black mb-1" style={{color:'#1e293b'}}>{s.n}</div>
                <div className="text-sm font-semibold mb-1" style={{color:'#2563eb'}}>{s.l}</div>
                <div className="text-sm" style={{color:'#64748b'}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 3 - SOLUTION
  {
    id: "solution",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#059669'}}>The Solution</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Revenue engineering, not just software</h2>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {[
            {icon:"🎯",t:"Conversion-Optimized Landing Pages",d:"Custom-built for Google Ads with message match, trust signals, and mobile-first design. Not a template."},
            {icon:"📊",t:"A/B Tested Booking Flows",d:"Multi-step booking with vehicle selection → package tier → upsells → calendar → payment. Every step measured."},
            {icon:"🔥",t:"Session Recording & Heatmaps",d:"See exactly where customers drop off. No existing detailing SaaS offers this. Zero."},
            {icon:"📱",t:"Automated SMS Sequences",d:"Post-booking confirmations, reminders, rebooking prompts at the optimal interval, review requests."},
            {icon:"💰",t:"Google Ads Management",d:"Keyword research, campaign build, bid optimization. Conversion tracking tied directly to completed bookings."},
            {icon:"📈",t:"Full Funnel Analytics",d:"Ad click → page view → booking started → step 2 → step 3 → completed → paid. End-to-end visibility."},
          ].map((s,i)=>(
            <div key={i} className="rounded-xl p-4 flex gap-3" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="text-2xl">{s.icon}</div>
              <div>
                <div className="text-sm font-bold mb-1" style={{color:'#1e293b'}}>{s.t}</div>
                <div className="text-sm" style={{color:'#64748b'}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4 text-center" style={{background:'rgba(5,150,105,0.08)',border:'1px solid rgba(5,150,105,0.15)'}}>
          <span className="text-base font-bold" style={{color:'#059669'}}>The moat:</span>
          <span className="text-sm ml-2" style={{color:'#334155'}}>Every A/B test insight from one operator improves conversion for all operators on the platform.</span>
        </div>
      </div>
    ),
  },
  // SLIDE 4 - CASE STUDY (TRACTION)
  {
    id: "traction",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#d97706'}}>Proven Traction</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Case study: Royal Pawz Mobile Pet Grooming</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            {n:"33%",l:"Booking flow completion",b:"of users who enter /book finish it",c:"#d97706"},
            {n:"8×",l:"Revenue growth",b:"in 4 months",c:"#059669"},
            {n:"$20",l:"Customer acquisition cost",b:"via Google Ads",c:"#0891b2"},
            {n:"9×+",l:"LTV:CPA ratio",b:"$180+ lifetime per $20 CAC",c:"#2563eb"},
          ].map((s,i)=>(
            <div key={i} className="rounded-xl p-4 text-center" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="text-3xl font-black" style={{color:s.c}}>{s.n}</div>
              <div className="text-xs font-bold mt-1" style={{color:'#1e293b'}}>{s.l}</div>
              <div className="text-xs mt-1" style={{color:'#64748b'}}>{s.b}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-5 mb-4" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
          <div className="text-xs font-bold uppercase mb-3" style={{color:'#64748b'}}>What we built - same playbook for detailing</div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[
              {s:"Google Ads",p:"High-intent\nkeywords",c:"#0891b2"},
              {s:"Landing Page",p:"Custom, CRO\noptimized",c:"#2563eb"},
              {s:"Booking Flow",p:"Multi-step\nA/B tested",c:"#059669"},
              {s:"Payment",p:"Upfront\ncollection",c:"#d97706"},
              {s:"SMS Engine",p:"Confirm, remind\nrebook, review",c:"#dc2626"},
            ].map((s,i)=>(
              <div key={i} className="rounded-lg p-3" style={{background:'#ffffff'}}>
                <div className="font-black mb-1" style={{color:s.c}}>{s.s}</div>
                <div style={{color:'#64748b',whiteSpace:'pre-line'}}>{s.p}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-base" style={{color:'#64748b'}}>Same structural conditions exist in mobile detailing: recurring demand, Houston sprawl advantage, terrible booking UX, viable Google Ads with <span style={{color:'#059669',fontWeight:700}}>14.67% conversion rate</span> (highest of any Google Ads vertical).</div>
      </div>
    ),
  },
  // SLIDE 5 - COMPETITIVE LANDSCAPE
  {
    id: "competition",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#ea580c'}}>Competitive Landscape</div>
        <h2 className="text-4xl font-black mb-4" style={{color:'#0f172a'}}>They manage operations. We drive revenue.</h2>
        <div className="overflow-hidden rounded-xl" style={{border:'1px solid #e2e8f0'}}>
          <table className="w-full text-xs" style={{borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(0,0,0,0.06)'}}>
                {["Feature","Urable\n$25–75/mo","OrbisX\n$100/mo","Jobber\n$39–599/mo","GHL\n$97/mo","Zapp\nRevenue %"].map((h,i)=>(
                  <th key={i} className="p-2 text-left font-bold" style={{color:i===5?'#059669':'#64748b',borderBottom:'1px solid rgba(0,0,0,0.06)',whiteSpace:'pre-line'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Online Booking","✅","✅","✅","✅","✅"],
                ["CRM & Invoicing","✅","✅","✅","✅","✅"],
                ["Route Optimization","✅","✅","✅","❌","✅"],
                ["Automated SMS Reminders","✅","✅","✅","✅","✅"],
                ["Custom Landing Pages","❌","❌","❌","✅","✅"],
                ["A/B Testing Booking Flow","❌","❌","❌","❌","✅"],
                ["Session Recording / Heatmaps","❌","❌","❌","❌","✅"],
                ["Funnel Analytics (ad→booking)","❌","❌","❌","Partial","✅"],
                ["Google Ads Management","❌","❌","❌","❌","✅"],
                ["Conversion Rate Optimization","❌","❌","❌","❌","✅"],
                ["Behavioral Customer Segmentation","❌","❌","❌","❌","✅"],
              ].map((r,i)=>(
                <tr key={i} style={{background:i%2===0?'rgba(0,0,0,0.02)':'transparent'}}>
                  {r.map((c,j)=>(
                    <td key={j} className="p-2" style={{
                      color:j===0?'#334155':c==="✅"?'#059669':c==="❌"?'#334155':c==="Partial"?'#d97706':'#059669',
                      fontWeight:j===0||j===5?600:400,
                      borderBottom:'1px solid rgba(0,0,0,0.03)',
                      fontSize:j===0?'11px':'12px'
                    }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs" style={{color:'#64748b'}}>
          <span style={{color:'#ea580c',fontWeight:700}}>Key insight:</span> Existing tools are operations software (manage what you have). Zapp is a growth engine (get you more). Different category entirely. We can integrate with or replace their CRM - the value is in the demand layer.
        </div>
      </div>
    ),
  },
  // SLIDE 6 - BUSINESS MODEL
  {
    id: "model",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#0891b2'}}>Business Model</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Three revenue layers that stack</h2>
        <div className="grid grid-cols-3 gap-5 mb-6">
          {[
            {t:"Platform Fee",n:"$300–500/mo",d:"White-label booking platform with CRO tooling, SMS engine, analytics dashboard. Operator keeps their brand.",c:"#0891b2",g:"Recurring SaaS"},
            {t:"Ad Management",n:"15–20% of spend",d:"Google Ads campaign build, optimization, and conversion tracking. Tied directly to booked revenue.",c:"#2563eb",g:"Performance"},
            {t:"Equity / Rev Share",n:"2–10% equity",d:"For founding clients: Zapp equity-for-services model. We engineer growth, take a stake in the outcome.",c:"#059669",g:"Upside capture"},
          ].map((s,i)=>(
            <div key={i} className="rounded-xl p-5 flex flex-col" style={{background:'#ffffff',border:`1px solid ${s.c}33`}}>
              <div className="text-xs font-bold uppercase mb-1" style={{color:s.c}}>{s.g}</div>
              <div className="text-lg font-black mb-1" style={{color:'#0f172a'}}>{s.t}</div>
              <div className="text-2xl font-black mb-2" style={{color:s.c}}>{s.n}</div>
              <div className="text-sm" style={{color:'#64748b'}}>{s.d}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
          <div className="text-xs font-bold uppercase mb-3" style={{color:'#64748b'}}>Unit Economics Per Operator Client</div>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              {n:"$250",l:"Avg booking ticket"},
              {n:"$40–85",l:"Customer acq. cost"},
              {n:"$750–1,200",l:"Annual customer LTV"},
              {n:"9–25×",l:"LTV:CPA ratio"},
            ].map((s,i)=>(
              <div key={i}>
                <div className="text-xl font-black" style={{color:'#0891b2'}}>{s.n}</div>
                <div className="text-xs mt-1" style={{color:'#64748b'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 7 - GO TO MARKET
  {
    id: "gtm",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#059669'}}>Go-to-Market</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Land, prove, expand</h2>
        <div className="flex flex-col gap-4 mb-4">
          {[
            {phase:"Phase 1",t:"Q2 2026 - First Operator",items:["Sign Kings Mobile or 4K Auto Detailing (phone-only, high traffic)", "Build custom booking platform on multi-tenant architecture", "Launch Google Ads campaign, target $1K–2K/mo ad spend", "Hit 25%+ booking conversion within 60 days"],c:"#2563eb"},
            {phase:"Phase 2",t:"Q3–Q4 2026 - Prove & Document",items:["Publish case study with hard revenue numbers", "Sign 2–3 more Houston operators via warm outreach + case study", "Refine white-label platform with insights from first deployment", "Target $15K–25K MRR across platform fees + ad management"],c:"#0891b2"},
            {phase:"Phase 3",t:"2027 - Scale",items:["Expand to adjacent Houston niches (mosquito treatment, window cleaning)","Deploy across Texas metros (Dallas, Austin, San Antonio)", "10–15 operators on platform, $50K+ MRR", "Evaluate SaaS productization vs. continuing high-touch model"],c:"#059669"},
          ].map((s,i)=>(
            <div key={i} className="rounded-xl p-4 flex gap-4" style={{background:'#ffffff',border:`1px solid ${s.c}33`}}>
              <div className="flex-shrink-0 w-28">
                <div className="text-xs font-bold" style={{color:s.c}}>{s.phase}</div>
                <div className="text-sm font-bold mt-1" style={{color:'#1e293b'}}>{s.t}</div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1">
                {s.items.map((item,j)=>(
                  <div key={j} className="text-xs flex gap-2" style={{color:'#64748b'}}>
                    <span style={{color:s.c}}>→</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 8 - TARGET CLIENTS
  {
    id: "targets",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#dc2626'}}>Target First Clients</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>5 Houston operators ready for growth engineering</h2>
        <div className="flex flex-col gap-3">
          {[
            {name:"Kings Mobile Car Detailing",est:"20+ years",booking:"Phone + contact form only",seo:"30+ suburb pages with strong local SEO",opp:"High traffic, zero conversion infrastructure. Easiest win.",pri:"🔴"},
            {name:"4K Mobile Auto Detailing",est:"Est. 2018, veteran-owned",booking:"Phone + quote request form",seo:"Ceramic coating & PPF focused",opp:"Premium positioning but no online booking. Phone-tag bottleneck.",pri:"🔴"},
            {name:"The Luxe Wash",est:"Est. 2017",booking:"Phone + quote form",seo:"Eco-friendly + aircraft/semi detailing",opp:"Multi-vertical operator limited by manual scheduling.",pri:"🟡"},
            {name:"Azul Auto Detailing",est:"Luxury market focus",booking:"PocketSuite + WhatsApp",seo:"River Oaks, Memorial, Galleria areas",opp:"Has booking tool but relies on WhatsApp. Fragmented UX.",pri:"🟡"},
            {name:"Hypergloss Detailing",est:"120+ Google reviews",booking:"Fieldd (redirects off-site)",seo:"Strong GMB presence",opp:"Already tech-forward but booking flow breaks the customer journey.",pri:"🟢"},
          ].map((s,i)=>(
            <div key={i} className="rounded-xl p-4 grid grid-cols-12 gap-3 items-center" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="col-span-3">
                <div className="text-base font-bold" style={{color:'#1e293b'}}>{s.pri} {s.name}</div>
                <div className="text-sm" style={{color:'#64748b'}}>{s.est}</div>
              </div>
              <div className="col-span-3">
                <div className="text-xs font-bold mb-1" style={{color:'#dc2626'}}>Current Booking</div>
                <div className="text-sm" style={{color:'#64748b'}}>{s.booking}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs font-bold mb-1" style={{color:'#0891b2'}}>Presence</div>
                <div className="text-sm" style={{color:'#64748b'}}>{s.seo}</div>
              </div>
              <div className="col-span-4">
                <div className="text-xs font-bold mb-1" style={{color:'#059669'}}>Opportunity</div>
                <div className="text-sm" style={{color:'#64748b'}}>{s.opp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 9 - GOOGLE ADS OPP
  {
    id: "ads",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#0891b2'}}>Google Ads Opportunity</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Auto detailing has the best ad economics in all of Google</h2>
        <div className="grid grid-cols-3 gap-5 mb-6">
          {[
            {n:"14.67%",l:"Conversion rate for automotive services on Google Ads",sub:"Highest of any industry (WordStream 2025 benchmarks)",c:"#059669"},
            {n:"$3–8",l:"Estimated CPC for Houston mobile detailing keywords",sub:"Lower than pest control ($7–20) or legal ($50+)",c:"#0891b2"},
            {n:"~0",l:"Houston mobile detailers running sophisticated paid search",sub:"Wide open competitive landscape",c:"#d97706"},
          ].map((s,i)=>(
            <div key={i} className="rounded-2xl p-6" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="text-3xl font-black mb-1" style={{color:s.c}}>{s.n}</div>
              <div className="text-sm font-semibold mb-2" style={{color:'#1e293b'}}>{s.l}</div>
              <div className="text-sm" style={{color:'#64748b'}}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
          <div className="text-xs font-bold uppercase mb-3" style={{color:'#64748b'}}>Projected Campaign Economics (per operator, per month)</div>
          <div className="grid grid-cols-6 gap-3 text-center">
            {[
              {n:"$1,500",l:"Ad Spend"},
              {n:"250–500",l:"Clicks"},
              {n:"37–73",l:"Bookings (14.67% CVR)"},
              {n:"$9,250–18,250",l:"Revenue Generated"},
              {n:"$20–41",l:"Cost Per Booking"},
              {n:"6–12×",l:"ROAS"},
            ].map((s,i)=>(
              <div key={i}>
                <div className="text-lg font-black" style={{color:'#0891b2'}}>{s.n}</div>
                <div className="text-xs mt-1" style={{color:'#64748b'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // SLIDE 10 - RISKS
  {
    id: "risks",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#dc2626'}}>Risks & Mitigants</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Eyes wide open</h2>
        <div className="flex flex-col gap-3">
          {[
            {risk:"Urable/OrbisX adoption growing",impact:"High",mit:"We don't compete on CRM. Our value is the demand-side growth engine (landing pages, ads, CRO, funnel analytics) that no SaaS tool provides. Can integrate alongside existing tools."},
            {risk:"Operators reluctant to pay for marketing",impact:"Med",mit:"Equity-for-services model removes cash objection. Operator pays nothing upfront - we take a stake in the growth we create. Proven with Royal Pawz."},
            {risk:"Google Ads CPC inflation over time",impact:"Med",mit:"Early mover advantage locks in lower CPCs. Conversion optimization (33% vs 7%) means we can afford 4× higher CPCs than competitors and still win."},
            {risk:"Operator churn - they learn and leave",impact:"Med",mit:"The platform is the moat. Session recording data, A/B test history, and automated SMS sequences are embedded in our infrastructure. Switching cost is real."},
            {risk:"Seasonal demand fluctuations",impact:"Low",mit:"Houston's heat means year-round demand (no snow season). Pollen, dust, and sun damage drive recurring need across all 12 months."},
          ].map((s,i)=>(
            <div key={i} className="rounded-xl p-4 grid grid-cols-12 gap-3" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="col-span-3">
                <div className="text-base font-bold" style={{color:'#dc2626'}}>{s.risk}</div>
                <div className="text-xs mt-1 inline-block px-2 py-0.5 rounded" style={{background:s.impact==="High"?'rgba(220,38,38,0.1)':s.impact==="Med"?'rgba(217,119,6,0.1)':'rgba(5,150,105,0.12)',color:s.impact==="High"?'#dc2626':s.impact==="Med"?'#d97706':'#059669'}}>{s.impact} impact</div>
              </div>
              <div className="col-span-9 text-sm" style={{color:'#64748b'}}>{s.mit}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // SLIDE 11 - TEAM
  {
    id: "team",
    render: () => (
      <div className="flex flex-col h-full px-16 py-10 justify-between">
        <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#2563eb'}}>Why Us</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Builder + operator. Not just a dev shop.</h2>
        <div className="rounded-xl p-6 mb-5" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black" style={{background:'rgba(37,99,235,0.12)',color:'#2563eb'}}>HZ</div>
            <div>
              <div className="text-xl font-black" style={{color:'#0f172a'}}>Hamza - Founder, Zapp Studios</div>
              <div className="text-sm mt-2 leading-relaxed" style={{color:'#64748b'}}>
                7+ years full-stack iOS, Android & web development. Built Royal Pawz from scratch - landing page, client web app, admin portal, ad system - at under 10% of traditional dev cost using AI. Took booking conversion from industry-standard 7% to 33% and grew revenue 8× in 4 months. Runs the Houston AI Club. Former VC deal evaluator under Bryan Chambers at Capital Factory. CS background (UTD), pivoted to business because the real edge isn't code - it's judgment.
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-5">
          {[
            {n:"Zapp Studios",d:"AI-native venture studio. Co-builds MVPs in 2–12 weeks in exchange for equity (2–10%) or cash. Validation-first, not dev-agency."},
            {n:"Royal Pawz USA",d:"Owned & operated mobile pet grooming business. The case study. Proof that revenue engineering works in mobile services."},
            {n:"Houston Network",d:"Houston AI Club organizer. Capital Factory, Ion District connections. Active in startup ecosystem - warm intros to operator clients."},
          ].map((s,i)=>(
            <div key={i} className="rounded-2xl p-5" style={{background:'#ffffff',border:'1px solid #e2e8f0'}}>
              <div className="text-sm font-bold mb-2" style={{color:'#2563eb'}}>{s.n}</div>
              <div className="text-sm" style={{color:'#64748b'}}>{s.d}</div>
            </div>
          ))}
        </div>
        <div className="text-sm font-semibold text-center" style={{color:'#64748b'}}>
          Core thesis: AI commoditizes coding. The real value is business judgment, validation, and execution.
        </div>
      </div>
    ),
  },
  // SLIDE 12 - ASK
  {
    id: "ask",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-10">
        <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{color:'#059669'}}>The Ask</div>
        <h2 className="text-5xl font-black mb-6" style={{color:'#0f172a'}}>Let's build the growth engine<br/>for mobile services</h2>
        <div className="grid grid-cols-2 gap-6 max-w-2xl mb-8">
          <div className="rounded-xl p-6 text-left" style={{background:'rgba(5,150,105,0.08)',border:'1px solid rgba(5,150,105,0.15)'}}>
            <div className="text-sm font-bold mb-2" style={{color:'#059669'}}>For Operators</div>
            <div className="text-base" style={{color:'#334155'}}>We build your booking platform, run your ads, and engineer your growth. You focus on detailing cars. Pay nothing upfront - we take equity or a revenue share.</div>
          </div>
          <div className="rounded-xl p-6 text-left" style={{background:'rgba(59,130,246,0.08)',border:'1px solid rgba(37,99,235,0.15)'}}>
            <div className="text-sm font-bold mb-2" style={{color:'#2563eb'}}>For Investors</div>
            <div className="text-base" style={{color:'#334155'}}>Proven playbook (33% CVR, 8× revenue growth). Expanding from pet grooming to $18.7B detailing market. Platform economics with compounding data moats. Houston first, then Texas, then national.</div>
          </div>
        </div>
        <div className="text-lg font-bold mb-2" style={{color:'#0f172a'}}>zappstudios.us</div>
        <div className="text-base" style={{color:'#64748b'}}>Houston, TX - Built with AI, driven by judgment</div>
      </div>
    ),
  },
];

export default function MobileVehicleDetailingPitchDeck() {
  const [slide, setSlide] = useState(0);
  const total = SLIDES.length;

  return (
    <div className="w-full flex flex-col" style={{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',background:'#f1f5f9',color:'#0f172a',height:'100vh'}}>
      {/* Slide area - fixed height so h-full works inside */}
      <div style={{height:'calc(100vh - 64px)',overflowY:'auto'}}>
        {SLIDES[slide].render()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-8 flex-shrink-0" style={{height:64,background:'#ffffff',borderTop:'1px solid #e2e8f0'}}>
        <button
          onClick={()=>setSlide(Math.max(0,slide-1))}
          disabled={slide===0}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background:slide===0?'transparent':'#f1f5f9',
            color:slide===0?'#334155':'#64748b',
            cursor:slide===0?'default':'pointer',
            border:'1px solid',
            borderColor:slide===0?'transparent':'#334155'
          }}
        >← Back</button>

        <div className="flex gap-1.5">
          {SLIDES.map((_,i)=>(
            <button
              key={i}
              onClick={()=>setSlide(i)}
              className="transition-all"
              style={{
                width:slide===i?24:8,height:8,borderRadius:4,border:'none',cursor:'pointer',
                background:slide===i?'#2563eb':'#334155'
              }}
            />
          ))}
        </div>

        <button
          onClick={()=>setSlide(Math.min(total-1,slide+1))}
          disabled={slide===total-1}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background:slide===total-1?'transparent':'#2563eb',
            color:slide===total-1?'#334155':'#ffffff',
            cursor:slide===total-1?'default':'pointer',
            border:'none'
          }}
        >Next →</button>
      </div>
    </div>
  );
}
