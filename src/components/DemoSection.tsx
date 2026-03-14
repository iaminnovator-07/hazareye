import { motion } from "framer-motion";
import { AlertTriangle, Activity, Thermometer } from "lucide-react";

const demos = [
  {
    trigger: "Worker enters danger zone",
    response: "Voice warning: \"Caution! You are too close to the machine!\"",
    icon: AlertTriangle,
    color: "text-danger",
    bgColor: "bg-danger/10",
  },
  {
    trigger: "Machine vibration increases",
    response: "Alert: \"Abnormal vibration detected. Machine inspection required.\"",
    icon: Activity,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    trigger: "Unsafe environmental condition",
    response: "Warning: \"High temperature detected in work area.\"",
    icon: Thermometer,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const DemoSection = () => {
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
            Live System Demo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how MachineSentinel responds to real-world hazard scenarios
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.trigger}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`p-3 rounded-lg ${demo.bgColor} shrink-0 self-start`}>
                  <demo.icon className={`w-6 h-6 ${demo.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-display tracking-wider text-muted-foreground">TRIGGER</span>
                    <span className={`text-sm font-semibold ${demo.color}`}>{demo.trigger}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <span className="text-xs font-display tracking-wider text-muted-foreground mr-2">RESPONSE</span>
                    <span className="text-sm text-foreground">{demo.response}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
