import { motion } from "framer-motion";
import { AlertTriangle, UserX, Activity, BellOff, Shield, Radio, Bell, CheckCircle } from "lucide-react";

const beforeItems = [
  { text: "No proximity detection", icon: UserX },
  { text: "No vibration monitoring", icon: Activity },
  { text: "No real-time alerts", icon: BellOff },
  { text: "High risk of accidents", icon: AlertTriangle },
];

const afterItems = [
  { text: "Ultrasonic proximity sensing", icon: Radio },
  { text: "Continuous vibration monitoring", icon: Activity },
  { text: "Instant voice warnings", icon: Bell },
  { text: "Proactive safety system", icon: CheckCircle },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Industrial Safety Problems
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Workers unknowingly enter dangerous zones. Small workshops lack safety systems. 
            Machine faults go unnoticed. No early warnings exist.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-danger/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-danger/10">
                <AlertTriangle className="w-6 h-6 text-danger" />
              </div>
              <h3 className="font-display text-lg font-bold text-danger">Before MachineSentinel</h3>
            </div>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-danger/5"
                >
                  <item.icon className="w-5 h-5 text-danger/70 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-success/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/10">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-display text-lg font-bold text-success">After MachineSentinel</h3>
            </div>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-success/5"
                >
                  <item.icon className="w-5 h-5 text-success/70 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
