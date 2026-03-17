import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ChevronRight, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-px bg-primary/20 animate-scan-line" />
      </div>

      <div className="relative z-10 section-container text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-display tracking-widest text-primary">HAZARDEYE SAFETY SYSTEM</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6">
            <span className="gradient-text">Machine</span>
            <span className="text-foreground">Sentinel</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-light">
            Preventing Industrial Accidents Before They Happen
          </p>

          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-10">
            A low-cost industrial safety monitoring system that detects hazardous conditions 
            around machines and warns workers through real-time voice alerts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#solution"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider hover:brightness-110 transition-all"
            >
              Explore System
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary/30 text-primary font-display text-sm font-bold tracking-wider hover:bg-primary/10 transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              Live Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
