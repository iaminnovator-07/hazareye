import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="section-container text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <span className="font-display text-sm font-bold tracking-wider text-foreground">
          HAZARD<span className="text-primary">EYE</span>
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        MachineSentinel — Voice Enabled Industrial Safety Monitoring System
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        An Engineering Prototype Project © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
