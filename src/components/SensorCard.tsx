import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  danger: boolean;
  warning?: boolean;
  color: string;
  delay?: number;
}

const SensorCard = ({ title, value, icon: Icon, danger, warning, color, delay = 0 }: SensorCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`glass-card p-5 ${danger ? "border-danger/40" : warning ? "border-warning/40" : ""}`}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-muted-foreground font-display tracking-wider">{title.toUpperCase()}</span>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <div className={`text-2xl font-display font-bold ${danger ? "text-danger" : warning ? "text-warning" : "text-foreground"}`}>
      {value}
    </div>
  </motion.div>
);

export default SensorCard;
