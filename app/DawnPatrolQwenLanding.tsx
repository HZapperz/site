'use client';

import React, { useState } from 'react';

// --- Types & Interfaces ---

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FormatCardProps {
  name: string;
  description: string;
}

// --- Icons (Inline SVGs for zero dependencies) ---

const Icons = {
  GolfBall: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Apple: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.66-.84 1.02.12 2.06.56 2.82 1.46-2.5 1.5-2.09 5.06.38 6.22-.57 1.6-1.45 3.13-2.94 4.39zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  ),
  Calculator: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="14" />
      <line x1="12" y1="14" x2="12" y2="14" />
      <line x1="8" y1="14" x2="8" y2="14" />
      <line x1="16" y1="18" x2="16" y2="18" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="8" y1="18" x2="8" y2="18" />
    </svg>
  )
};

// --- Components ---

const Button = ({ children, variant = 'primary', className = '' }: { children: React.ReactNode, variant?: 'primary' | 'secondary', className?: string }) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95";
  const variants = {
    primary: "bg-[#D4FF00] text-[#1A2A27] hover:bg-[#c0e600] shadow-[0_0_20px_rgba(212,255,0,0.3)]",
    secondary: "bg-transparent border-2 border-[#D9D9D9] text-[#D9D9D9] hover:border-[#D4FF00] hover:text-[#D4FF00]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12 md:mb-20">
    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
    {subtitle && <p className="text-[#D9D9D9] text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const PhoneMockup = () => (
  <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden">
    {/* Notch */}
    <div className="h-[32px] w-full bg-gray-800 absolute top-0 inset-x-0 z-20 flex justify-center items-center">
      <div className="h-[20px] w-[120px] bg-black rounded-b-[10px]"></div>
    </div>
    
    {/* Screen Content (Fake UI) */}
    <div className="bg-[#1A2A27] h-full w-full flex flex-col pt-10 relative z-10">
      {/* App Header */}
      <div className="px-6 pb-4 border-b border-gray-700 flex justify-between items-center">
        <span className="text-[#D4FF00] font-bold text-sm">Dawn Patrol</span>
        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
      </div>
      
      {/* App Body */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="bg-gray-800 p-4 rounded-xl">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Hole</div>
          <div className="text-4xl font-black text-white">18<span className="text-lg text-[#D4FF00] align-top">PAR 4</span></div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border-l-4 border-[#D4FF00]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4FF00] text-[#1A2A27] flex items-center justify-center font-bold text-xs">JD</div>
              <div>
                <div className="text-white font-bold">John D.</div>
                <div className="text-xs text-gray-400">Net: 3 | Gross: 5</div>
              </div>
            </div>
            <div className="text-[#D4FF00] font-bold">WIN</div>
          </div>
          
          <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border-l-4 border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-xs">MK</div>
              <div>
                <div className="text-white font-bold">Mike K.</div>
                <div className="text-xs text-gray-400">Net: 4 | Gross: 6</div>
              </div>
            </div>
            <div className="text-gray-500 font-bold">LOSS</div>
          </div>
        </div>

        <div className="mt-auto bg-[#D4FF00] p-4 rounded-xl text-center">
          <div className="text-[#1A2A27] font-bold text-sm uppercase">Skins Pot</div>
          <div className="text-3xl font-black text-[#1A2A27]">$45.00</div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formats = [
    { name: "Skins", desc: "Hole-by-hole betting. Winner takes all." },
    { name: "Wolf", desc: "Dynamic partners. High risk, high reward." },
    { name: "Stableford", desc: "Points based on par. Forget the bogeys." },
    { name: "Best Net", desc: "Lowest net score wins. Simple." },
    { name: "Football", desc: "Grid betting. Pick your players." },
    { name: "Par", desc: "Beat par to win. Miss it to lose." },
  ];

  return (
    <div className="min-h-screen bg-[#1A2A27] text-white font-sans selection:bg-[#D4FF00] selection:text-[#1A2A27]">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1A2A27]/90 backdrop-blur-md py-4 border-b border-white/10' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4FF00] rounded-lg flex items-center justify-center text-[#1A2A27]">
              <Icons.GolfBall />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">Dawn Patrol</span>
          </div>
          <Button variant="secondary" className="hidden md:flex text-sm py-2 px-4">
            Download App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4FF00] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[#D4FF00] text-xs font-bold uppercase tracking-wider mb-2">
              iOS App Now Available
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
              GOLF IS HARD.<br />
              <span className="text-[#D4FF00]">SCORING SHOULDN'T BE.</span>
            </h1>
            <p className="text-[#D9D9D9] text-lg md:text-xl max-w-md leading-relaxed">
              The league app for the weekend warrior. Auto-calculate handicaps, run complex formats, and settle bets before you reach the 19th hole.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto">
                <Icons.Apple />
                <span>Download on App Store</span>
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto">
                View Features
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400 pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1A2A27]"></div>
                ))}
              </div>
              <p>Trusted by 10,000+ golfers</p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section className="py-24 bg-[#15221f]">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="FORMATS FOR EVERY VIBE" 
            subtitle="From casual foursomes to serious Sunday leagues. We support 10+ formats so you can play how you want."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {formats.map((format, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-[#1A2A27] border border-white/5 hover:border-[#D4FF00] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,255,0,0.1)]">
                <div className="w-12 h-12 bg-[#D4FF00]/10 rounded-lg flex items-center justify-center text-[#D4FF00] mb-6 group-hover:scale-110 transition-transform">
                  <Icons.Check />
                </div>
                <h3 className="text-2xl font-bold mb-3">{format.name}</h3>
                <p className="text-[#D9D9D9]">{format.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading title="SETTLE UP INSTANTLY" />
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4FF00]/20 to-transparent"></div>

            {[
              { step: "01", title: "Input Handicaps", desc: "Enter your index once. We handle the rest." },
              { step: "02", title: "Play & Score", desc: "Tap strokes as you play. No math required." },
              { step: "03", title: "Auto-Settle", desc: "Points, skins, and money calculated instantly." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-[#1A2A27] border-2 border-[#D4FF00] rounded-full flex items-center justify-center text-3xl font-black text-[#D4FF00] mb-6 shadow-[0_0_20px_rgba(212,255,0,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#D9D9D9]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* League Features */}
      <section className="py-24 bg-[#15221f] relative overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-[#D4FF00] text-[#1A2A27] text-xs font-bold uppercase tracking-wider mb-4 rounded-full">
              League Management
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              BE THE COMMISSIONER <br/>
              <span className="text-[#D4FF00]">WITHOUT THE HEADACHE.</span>
            </h2>
            <p className="text-[#D9D9D9] text-lg mb-8">
              Running a league shouldn't feel like a second job. Dawn Patrol automates the boring stuff so you can focus on the trash talk.
            </p>
            
            <ul className="space-y-4">
              {[
                "Real-time standings & leaderboards",
                "Automated invites & RSVPs",
                "Money management & payouts",
                "Course & tee time scheduling"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 rounded-full bg-[#D4FF00] flex items-center justify-center text-[#1A2A27] shrink-0">
                    <Icons.Check />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4FF00] rounded-2xl rotate-3 opacity-20"></div>
            <div className="relative bg-[#1A2A27] border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Fake League UI */}
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="font-bold text-xl">Sunday Morning League</h3>
                <span className="text-[#D9D9D9] text-sm">Week 4/12</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Sarah J.", pos: 1, pts: 142, trend: "+2" },
                  { name: "Mike T.", pos: 2, pts: 138, trend: "-1" },
                  { name: "You", pos: 3, pts: 135, trend: "0" },
                  { name: "Dave B.", pos: 4, pts: 120, trend: "-4" },
                ].map((player, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl ${i === 2 ? 'bg-[#D4FF00]/10 border border-[#D4FF00]' : 'bg-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-bold w-6 ${i === 0 ? 'text-[#D4FF00]' : 'text-gray-500'}`}>#{player.pos}</span>
                      <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                      <span className="font-bold">{player.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg">{player.pts}</div>
                      <div className={`text-xs ${player.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{player.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social / Friends */}
      <section className="py-24 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="w-20 h-20 bg-[#D4FF00] rounded-full flex items-center justify-center text-[#1A2A27] mx-auto mb-8">
            <Icons.Users />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            INVITE YOUR BUDDIES.<br/>
            <span className="text-[#D9D9D9]">TRASH TALK SAFELY.</span>
          </h2>
          <p className="text-[#D9D9D9] text-lg mb-10">
            Connect with friends, create private groups, and share your best rounds. Because golf is better with friends (and slightly worse with enemies).
          </p>
          <Button variant="secondary">
            Connect Friends
          </Button>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-[#D4FF00] text-[#1A2A27]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tight">
            Ready to lower your score?
          </h2>
          <p className="text-xl font-medium mb-10 max-w-xl mx-auto opacity-80">
            Join the league. Play the game. Stop doing math.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#1A2A27] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-3 shadow-xl">
              <Icons.Apple />
              Download for iOS
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2A27] py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#D4FF00] rounded flex items-center justify-center text-[#1A2A27]">
              <Icons.GolfBall />
            </div>
            <span className="font-bold text-lg tracking-tighter uppercase">Dawn Patrol</span>
          </div>
          
          <div className="text-[#D9D9D9] text-sm text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Dawn Patrol Golf. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end mt-2">
              <a href="#" className="hover:text-[#D4FF00] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#D4FF00] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#D4FF00] transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}