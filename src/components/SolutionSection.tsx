import { motion } from "framer-motion";
import { Radio, Activity, Thermometer, Volume2, Shield } from "lucide-react";

const features = [
  { title: "Ultrasonic Proximity Detection", desc: "Detects workers approaching dangerous machine zones", icon: Radio },
  { title: "Vibration Monitoring", desc: "Monitors machine vibrations for anomaly detection", icon: Activity },
  { title: "Environmental Monitoring", desc: "Tracks temperature and humidity conditions", icon: Thermometer },
  { title: "Voice Alert System", desc: "Real-time audio warnings via SD card playback", icon: Volume2 },
  { title: "Real-time Safety Monitoring", desc: "Continuous 24/7 hazard assessment", icon: Shield },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Introducing MachineSentinel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An intelligent safety system that monitors machines using sensors and provides 
            voice warnings before accidents occur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary inline-block mb-4">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-sm font-bold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
