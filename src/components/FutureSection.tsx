import { motion } from "framer-motion";
import { Wifi, Power, BarChart3, Brain, Smartphone } from "lucide-react";

const futureItems = [
  { title: "IoT Dashboard", desc: "Real-time cloud monitoring interface", icon: Wifi },
  { title: "Auto Shutdown", desc: "Automatic machine power cutoff on danger", icon: Power },
  { title: "Cloud Analytics", desc: "Safety data analytics and reporting", icon: BarChart3 },
  { title: "Predictive Maintenance", desc: "AI-driven failure prediction", icon: Brain },
  { title: "Mobile Alerts", desc: "Push notifications for safety events", icon: Smartphone },
];

const FutureSection = () => {
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
            Future Technology
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our roadmap for next-generation industrial safety
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {futureItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="p-3 rounded-lg bg-primary/10 text-primary inline-block mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
