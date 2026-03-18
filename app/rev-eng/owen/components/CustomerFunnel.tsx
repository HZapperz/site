"use client"

import { useState } from "react"
import { Eye, MessageCircle, UserCheck, Calculator, CreditCard, Star, ChevronDown, ChevronUp } from "lucide-react"

const stages = [
  {
    icon: Eye,
    title: "Discovery",
    description: "Facebook Marketplace listings, Instagram/TikTok posts, paid ads, word of mouth, Reddit",
    metric: "10,000",
    metricLabel: "monthly impressions",
    conversion: "3%",
    conversionLabel: "click-through rate",
    output: "300 visitors",
    color: "#5b8def",
  },
  {
    icon: MessageCircle,
    title: "Inquiry",
    description: "DM on Messenger, Instagram message, site chat, or email. ManyChat handles initial response in <60 seconds",
    metric: "300",
    metricLabel: "visitors",
    conversion: "40%",
    conversionLabel: "inquiry rate",
    output: "120 inquiries",
    color: "#818cf8",
  },
  {
    icon: UserCheck,
    title: "Qualification",
    description: "ManyChat bot qualifies lead: style preference, budget range, timeline. Collects email and phone number",
    metric: "120",
    metricLabel: "inquiries",
    conversion: "50%",
    conversionLabel: "qualification rate",
    output: "60 qualified leads",
    color: "#a78bfa",
  },
  {
    icon: Calculator,
    title: "Quote & Configure",
    description: "Collection tier auto-priced. Premium/Bespoke gets custom quote. Configurator lets them design their watch",
    metric: "60",
    metricLabel: "qualified leads",
    conversion: "40%",
    conversionLabel: "quote acceptance",
    output: "24 quotes accepted",
    color: "#c084fc",
  },
  {
    icon: CreditCard,
    title: "Checkout",
    description: "Stripe checkout with abandoned cart recovery. Payment triggers automated order pipeline in admin portal",
    metric: "24",
    metricLabel: "quotes accepted",
    conversion: "50%",
    conversionLabel: "checkout completion",
    output: "12 purchases",
    color: "#34d399",
  },
  {
    icon: Star,
    title: "Review & Referral",
    description: "14 days post-delivery: automated review request. Day 30: referral ask. Reviews feed back into Discovery",
    metric: "12",
    metricLabel: "customers",
    conversion: "15%",
    conversionLabel: "review rate",
    output: "~2 reviews/month",
    color: "#facc15",
  },
]

export default function CustomerFunnel() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null)

  return (
    <div className="space-y-0">
      {/* Funnel stages */}
      <div className="relative">
        {stages.map((stage, i) => {
          const Icon = stage.icon
          const isExpanded = expandedStage === i
          const isLast = i === stages.length - 1
          const widthPercent = 100 - (i * 10)

          return (
            <div key={i} className="relative">
              {/* Stage card */}
              <div
                className="mx-auto transition-all duration-300"
                style={{ width: `${widthPercent}%`, minWidth: "280px" }}
              >
                <button
                  onClick={() => setExpandedStage(isExpanded ? null : i)}
                  className="w-full text-left"
                >
                  <div
                    className="relative rounded-xl border border-white/[0.08] p-4 sm:p-5 transition-all hover:border-white/[0.12]"
                    style={{ backgroundColor: `${stage.color}08` }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Stage number + icon */}
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${stage.color}20` }}
                      >
                        <Icon size={20} style={{ color: stage.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold tracking-wider" style={{ color: stage.color }}>
                            STAGE {i + 1}
                          </span>
                        </div>
                        <h4 className="text-white font-semibold text-base sm:text-lg">{stage.title}</h4>

                        {/* Expanded description */}
                        {isExpanded && (
                          <p className="text-[#b0aca7] text-[15px] mt-2 leading-relaxed">{stage.description}</p>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="flex-shrink-0 text-right hidden sm:block">
                        <div className="text-xl font-bold text-white">{stage.metric}</div>
                        <div className="text-xs text-[#8a8580]">{stage.metricLabel}</div>
                      </div>

                      {/* Expand toggle */}
                      <div className="flex-shrink-0 text-[#6b6762]">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>

                    {/* Mobile metrics */}
                    <div className="sm:hidden flex items-center gap-4 mt-3 pl-14">
                      <div>
                        <span className="text-white font-bold text-lg">{stage.metric}</span>
                        <span className="text-xs text-[#8a8580] ml-1.5">{stage.metricLabel}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Connector with conversion rate */}
              {!isLast && (
                <div className="flex flex-col items-center py-2">
                  <div className="w-px h-3 bg-[#302d2a]" />
                  <div className="px-3 py-1.5 rounded-full bg-[#161625] border border-[#242220] text-xs">
                    <span className="text-[#8a8580]">{stage.conversion}</span>
                    <span className="text-[#6b6762] ml-1">{stage.conversionLabel}</span>
                  </div>
                  <div className="w-px h-3 bg-[#302d2a]" />
                  <div className="text-xs font-medium" style={{ color: stages[i + 1].color }}>
                    {stage.output}
                  </div>
                  <div className="w-px h-3 bg-[#302d2a]" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Unit Economics Summary */}
      <div className="mt-8 bg-[#161625] rounded-xl border border-[#5b8def]/20 p-5 sm:p-7">
        <div className="text-xs font-semibold text-[#5b8def] mb-5 tracking-widest">UNIT ECONOMICS SUMMARY</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <div className="text-xs text-[#8a8580] uppercase tracking-wider mb-1">Monthly Sales</div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-[#6b6762]">watches</div>
          </div>
          <div>
            <div className="text-xs text-[#8a8580] uppercase tracking-wider mb-1">Revenue</div>
            <div className="text-2xl font-bold text-[#34d399]">$5,400</div>
            <div className="text-xs text-[#6b6762]">at $450 ASP</div>
          </div>
          <div>
            <div className="text-xs text-[#8a8580] uppercase tracking-wider mb-1">Organic CAC</div>
            <div className="text-2xl font-bold text-white">$0</div>
            <div className="text-xs text-[#6b6762]">before paid ads</div>
          </div>
          <div>
            <div className="text-xs text-[#8a8580] uppercase tracking-wider mb-1">Gross Profit</div>
            <div className="text-2xl font-bold text-[#34d399]">$3,348</div>
            <div className="text-xs text-[#6b6762]">62% margin</div>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-[#242220] text-sm text-[#8a8580] leading-relaxed">
          These are organic-only numbers before paid advertising. With $2,000/month ad spend targeting 3-5x ROAS, multiply the top of funnel by 3-5x while maintaining similar conversion rates through each stage.
        </div>
      </div>

      {/* Feedback loop indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#6b6762]">
        <div className="h-px w-8 bg-[#302d2a]" />
        <span>Reviews feed back into Discovery — the flywheel compounds</span>
        <div className="h-px w-8 bg-[#302d2a]" />
      </div>
    </div>
  )
}
