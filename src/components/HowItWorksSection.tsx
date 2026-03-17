import { motion } from "framer-motion";
import { Cpu, ArrowDown, Shield, Volume2, Radio } from "lucide-react";

const steps = [
  { label: "Sensors", desc: "Ultrasonic, Vibration, Temp, Sound", icon: Radio, color: "text-primary" },
  { label: "ESP32 Processing", desc: "Real-time data acquisition", icon: Cpu, color: "text-primary" },
  { label: "Hazard Detection", desc: "Intelligent threshold analysis", icon: Shield, color: "text-warning" },
  { label: "Voice Alert System", desc: "SD card audio playback", icon: Volume2, color: "text-danger" },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The ESP32 reads sensor data continuously and triggers audio warnings 
            using an SD card module and amplifier.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto space-y-2">
          {steps.map((step, i) => (
            <div key={step.label}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-center gap-4"
              >
                <div className={`p-3 rounded-lg bg-card ${step.color} shrink-0`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">{step.label}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-5 h-5 text-primary/50" />
                </div>
              )}
            </div>
          ))}
          {/* Final: Worker Safety */}
          <div className="flex justify-center py-1">
            <ArrowDown className="w-5 h-5 text-primary/50" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6 text-center glow-border animate-pulse-glow"
          >
            <Shield className="w-8 h-8 text-success mx-auto mb-2" />
            <h3 className="font-display text-sm font-bold text-success">Worker Safety</h3>
            <p className="text-xs text-muted-foreground">Protected and informed</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
