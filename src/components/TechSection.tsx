import { motion } from "framer-motion";
import { Shield, Activity, Thermometer, Volume2, Radio, Cpu, Speaker, Lightbulb, HardDrive, Waves } from "lucide-react";

export const techComponents = [
  { name: "ESP32 Microcontroller", desc: "Central processing unit", icon: Cpu },
  { name: "Ultrasonic Sensor", desc: "Proximity detection", icon: Radio },
  { name: "Vibration Sensor", desc: "Machine vibration monitoring", icon: Activity },
  { name: "Sound Sensor", desc: "Noise level detection", icon: Volume2 },
  { name: "DHT11 Sensor", desc: "Temperature & humidity", icon: Thermometer },
  { name: "SD Card Module", desc: "Audio file storage", icon: HardDrive },
  { name: "MAX98357A Amplifier", desc: "Audio amplification", icon: Waves },
  { name: "Speaker", desc: "Voice alert output", icon: Speaker },
  { name: "LED Indicators", desc: "Visual status alerts", icon: Lightbulb },
];

const TechSection = () => {
  return (
    <section id="technology" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Key Technology
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Purpose-built hardware stack for reliable industrial safety monitoring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techComponents.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-6 flex items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                <comp.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">{comp.name}</h3>
                <p className="text-sm text-muted-foreground">{comp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
