import { motion } from "framer-motion";
import { Factory, Wrench, Drill, Cog, Package, HardHat, Hammer } from "lucide-react";

const applications = [
  { name: "CNC Machines", icon: Factory },
  { name: "Lathe Machines", icon: Cog },
  { name: "Drilling Machines", icon: Drill },
  { name: "Industrial Motors", icon: Wrench },
  { name: "Assembly Lines", icon: Package },
  { name: "Construction", icon: HardHat },
  { name: "Small Workshops", icon: Hammer },
];

const ApplicationsSection = () => {
  return (
    <section className="py-24 relative hazard-stripe">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Industrial Applications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Versatile safety monitoring across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {applications.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-6 text-center group cursor-default"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <app.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xs font-semibold tracking-wider text-foreground">{app.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
