import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { SparklesCore } from "@/components/ui/sparkles"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { Navbar } from "@/components/ui/navbar"
import { Pricing } from "@/components/ui/pricing"
import dynamic from "next/dynamic"
import { ElectricBorderDefs } from "@/components/electric-border-card"

const Dither = dynamic(() => import("@/components/Dither"), { ssr: false })

import {
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Bot,
  Workflow,
  Brain,
  MessageSquare,
  Cog,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react"
import GoToDashboard from "@/components/GoToDashboard"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <ElectricBorderDefs />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Dither enableMouseInteraction={false} />
      </div>
      <div className="relative z-10">
        <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="container mx-auto px-4 z-10">
          <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-none">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="flex h-full">
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text">
                   Your Business Has Enemies.
                   Now It Has Us.
                </h1>
                <p className="mt-4 text-neutral-300 max-w-lg">
                    Alegis protects small and medium businesses from phishing, 
                    data breaches, deepfakes, and ransomware — with real-time 
                    AI detection that works 24/7, no IT team required.
                  
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <GoToDashboard view="login" />
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
                  >
                    See How It Works
                  </Button>
                </div>

                <div className="flex items-center gap-8 text-sm text-neutral-400 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>No Setup Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>30-Day ROI Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400"/>
                    <span>trust badges</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Still Leaving Your Business Unprotected?</h2>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  Assuming "we're too small to be targeted
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  Using the same weak password across all accounts

                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  No way to tell if an email is real or a phishing scam
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  One click by an employee could cost you everything
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white">Alegis Protects You Automatically </h3>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Detects phishing emails before your team even opens them
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Scans for your leaked data on the dark web 24/7
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Alerts you the moment a threat is detected — in plain English
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  No IT team needed — set up in under 5 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Complete Security Arsenal</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Six layers of AI-powered protection working silently 
              in the background — so you can focus on your business
            </p>
          </div>

          <BentoGrid className="lg:grid-rows-3">
            <BentoCard
              name="Dark Web Monitor"
              className="lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Bot}
              description="Scans thousands of dark web sources 24/7 
                           for your email addresses, passwords, and 
                           company data — alerts you the moment 
                           anything leaks."
              href="http://localhost:5002"
              cta="Learn more"
            />
            <BentoCard
              name="Phishing & Threat Scanner"
              className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Workflow}
              description="Catches fake emails, fraudulent links, and 
                          scam messages before they reach your team.
                          Works on Gmail, Outlook, and WhatsApp links."
              href="http://localhost:5000"
              cta="Learn more"
            />
            <BentoCard
              name="Deepfake Detector"
              className="lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Cog}
              description="Identifies AI-generated fake photos, 
                           videos, and voice calls in real time — 
                           before a scam fools your team."
              href="http://localhost:3001"
              cta="Learn more"
            />
            <BentoCard
              name="File Encryption"
              className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={Brain}
              description="Lock any file with military-grade AES-256 
                           encryption. Share documents, invoices, and 
                           contracts knowing only the right person 
                           can ever open them."
              href="http://localhost:3003"
              cta="Learn more"
            />
            <BentoCard
              name="Steganography"
              className="lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4"
              background={<div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10" />}
              Icon={MessageSquare}
              description="Hide sensitive messages inside ordinary 
                           images — invisible to anyone who intercepts 
                           them. Secure communication that doesn't 
                           look like communication."
              href="http://localhost:3007"
              cta="Learn more"
            />
          </BentoGrid>
        </div>
      </section>
      <section id="testimonials" className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Questions We Hear Every Day</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <p className="text-gray-300">
                    "Antivirus catches old-style 
malware. It does nothing against 
phishing emails, dark web leaks, 
fake invoices, deepfake calls, 
or an employee using 
"password123"."
                  </p>
                  <div>
                    <p className="font-semibold text-white">Michael Chen</p>
                    <p className="text-sm text-gray-400">Modern attacks don't need 
a virus to destroy you</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <p className="text-gray-300">
                    "Human error causes 95% of 
all security breaches. Your 
team is busy running a business 
— they can't be security experts 
at the same time."
                  </p>
                  <div>
                    <p className="font-semibold text-white">Emily Rodriguez</p>
                    <p className="text-sm text-gray-400">Alegis handles it automatically 
so they don't have to</p>
                  </div>
                </div>
              </CardContent>
            </Card>
               <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <p className="text-gray-300">
                    "Because you're easier to attack 
than a large company, you hold 
valuable customer data, and 
you're less likely to have 
proper protection in place."
                  </p>
                  <div>
                    <p className="font-semibold text-white">jhon rehd</p>
                    <p className="text-sm text-gray-400">43% of all cyberattacks 
target small businesses.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">The Cost of Doing Nothing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cyberattacks on small businesses are rising every year. 
              Here's what the numbers say
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-green-900/40 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">60%</h3>
              <p className="text-gray-300">of SMEs shut down within 6 months of a cyberattack</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-blue-900/40 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">35L</h3>
              <p className="text-gray-300">average financial loss per breach
for a small business in India</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-purple-900/40 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">1 in 3</h3>
              <p className="text-gray-300">phishing emails specifically
targets small businesses</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-orange-900/40 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">24/7</h3>
              <p className="text-gray-300">Alegis monitors your business
while you sleep</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="min-h-screen py-24 bg-black/70 flex items-center justify-center">
        <Pricing
          title="Simple Protection, Simple Pricing"
          description="No hidden fees. No long contracts. Cancel anytime"
          plans={[
            {
              name: "Starter",
              price: "499",
              yearlyPrice: "797",
              period: "month",
              features: [
                "Phishing & URL Scanner",
                "Password Strength Checker",
                "Password Vault (up to 50 entries)",
                "Data Breach Checker",
                "Basic Security Dashboard",
                "Email support",
              ],
              description: "Great for freelancers just getting started",
              buttonText: "Start Free Trial",
              href: "#contact",
              isPopular: false,
            },
            {
              name: "Professional",
              price: "999",
              yearlyPrice: "1997",
              period: "month",
              features: [
                "Everything in Starter",
                "Dark Web Monitoring",
                "File Encryption & Decryption",
                "Deepfake Detection (Photo + Video)",
                "AI Risk Advisor (Virtual CISO)",
                "Steganography Tool",
                "Auto Heal Security Boost",
                "Priority email & chat support",
              ],
              description: "Most popular among SMEs with a team",
              buttonText: "Get Started",
              href: "#contact",
              isPopular: true,
            },
            {
              name: "Enterprise",
              price: "2,499",
              yearlyPrice: "3997",
              period: "month",
              features: [
                "Everything in Professional",
                "Unlimited users",
                "Leaderboard & Team Training",
                "Honeypot Attack Simulations",
                "Monthly security audit report",
                "WhatsApp alert integration",
                "Custom cyber cell notifications",
                "Advanced Threat Monitoring",
                "SLA-backed response time",
                "Dedicated security manager"
              ],
              description: "Built for teams serious about security",
              buttonText: "Contact Sales",
              href: "#contact",
              isPopular: false,
            },
          ]}
        />
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Up and Running in 3 Simple Steps</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              No IT team. No technical setup. No stress
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Create Your Account</h3>
              <p className="text-gray-300">
                Sign up in under 2 minutes. Add your 
business email, connect your team, 
and Alegis immediately starts watching 
for threats
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Alegis Scans Everything</h3>
              <p className="text-gray-300">
                Your emails, files, network, and dark 
web mentions are monitored 24/7 
automatically. No configuration needed — 
it works right out of the box
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Stay Protected, Get Alerts</h3>
              <p className="text-gray-300">
                Receive instant plain-English alerts 
the moment something suspicious is 
detected. One click to fix it. 
Back to work in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <AnimatedGradientBackground
          Breathing={true}
          gradientColors={["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]}
          gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative h-32 w-full flex flex-col items-center justify-center">
              <div className="w-full absolute inset-0">
                <SparklesCore
                  id="ctasparticles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                  speed={0.8}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 relative z-20 text-balance">
                Ready to cut costs with AI?
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-20 bg-black/70 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">AI Agency</h3>
                <p className="text-gray-300 leading-relaxed">
                  Protecting small and medium businesses 
from cyber threats with AI-powered 
detection that works 24/7 — no IT 
team required.
                </p>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Services</h4>
              <ul className="space-y-3">
                {[
                  "Phishing & Threat Scanner",
                  "Dark Web Monitor",
                  "File Encryption",
                  "Deepfake Detector",
                  "Data Breach Checker",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Alegis", href: "#" },
                  { name: "How it Works", href: "#testimonials" },
                  { name: "Pricing", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href="mailto:hello@alegis.com" className="hover:text-white transition-colors duration-300">
                    hello@alegis.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <Phone className="h-4 w-4" />
                  </div>
                  <a href="tel:+15551234567" className="hover:text-white transition-colors duration-300">
                    +91 98765 43210
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>chat with us on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-center lg:text-left">© 2024 AI Agency. All rights reserved.</p>

              <div className="flex flex-wrap justify-center lg:justify-end space-x-8">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
