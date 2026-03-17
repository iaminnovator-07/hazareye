import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
            About the Project
          </h2>
          <div className="glass-card p-8 md:p-12">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              HazardEye is an engineering prototype demonstrating how low-cost embedded systems 
              can dramatically improve industrial safety. Built on the ESP32 platform with an array 
              of environmental sensors, this system proves that effective worker protection doesn't 
              require expensive enterprise solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to make industrial safety monitoring accessible to small workshops 
              and manufacturing units that currently operate without any automated safety systems, 
              preventing accidents before they happen through intelligent sensor fusion and 
              real-time voice alerts.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary">5+</div>
                <div className="text-xs text-muted-foreground mt-1">Sensors</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary">&lt;$50</div>
                <div className="text-xs text-muted-foreground mt-1">Total Cost</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-primary">Real-time</div>
                <div className="text-xs text-muted-foreground mt-1">Alerts</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
