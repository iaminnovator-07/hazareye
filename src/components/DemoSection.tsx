<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, WifiOff, Cpu, Clock, Thermometer, Activity, Radio } from "lucide-react";
import { database, ref, onValue } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface Device {
  device_id: string;
  device_name: string;
  user_id: string;
}
interface DeviceStatus {
  device: Device;
  isOnline: boolean;
  lastSeen: number | null;
  temperature?: number;
  vibration?: number;
  distance?: number;
}
const OFFLINE_TIMEOUT = 60000;
const LiveStatusSection = () => {
  const { user } = useAuth();
  const [statuses, setStatuses] = useState<DeviceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      setStatuses([]);
      setLoading(false);
      return;
    }
    const unsub = onValue(ref(database, "devices"), (snap) => {
      const data = snap.val();
      if (!data) {
        setStatuses([]);
        setLoading(false);
        return;
      }
      const userDevices = Object.values(data as Record<string, Device>).filter(
        (d) => d.user_id === user.uid
      );
      // Listen to each device's current sensor data
      const unsubSensors: (() => void)[] = [];
      const statusMap = new Map<string, DeviceStatus>();
      userDevices.forEach((device) => {
        statusMap.set(device.device_id, {
          device,
          isOnline: false,
          lastSeen: null,
        });
        const sensorUnsub = onValue(
          ref(database, `sensorData/${device.device_id}/current`),
          (sSnap) => {
            const sData = sSnap.val();
            const now = Date.now();
            const ts = sData?.timestamp || null;
            statusMap.set(device.device_id, {
              device,
              isOnline: ts ? now - ts < OFFLINE_TIMEOUT : false,
              lastSeen: ts,
              temperature: sData?.temperature,
              vibration: sData?.vibration,
              distance: sData?.distance,
            });
            setStatuses(Array.from(statusMap.values()));
            setLoading(false);
          }
        );
        unsubSensors.push(sensorUnsub);
      });
      if (userDevices.length === 0) setLoading(false);
      return () => unsubSensors.forEach((u) => u());
    });
    return () => unsub();
  }, [user]);
  // Periodic offline check
  useEffect(() => {
    const interval = setInterval(() => {
      setStatuses((prev) =>
        prev.map((s) => ({
          ...s,
          isOnline: s.lastSeen ? Date.now() - s.lastSeen < OFFLINE_TIMEOUT : false,
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  if (!user) return null;
  if (loading && statuses.length === 0) return null;
  if (statuses.length === 0) return null;
  const onlineCount = statuses.filter((s) => s.isOnline).length;
  const offlineCount = statuses.length - onlineCount;
  return (
    <section className="py-16 relative">
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
<<<<<<< HEAD
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
=======
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
            <span className="text-xs font-display tracking-widest text-muted-foreground uppercase">
              Live Device Status
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-3">
            Your Devices
          </h2>
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-success">
              <Wifi className="w-4 h-4" /> {onlineCount} Online
            </span>
            <span className="flex items-center gap-1.5 text-danger">
              <WifiOff className="w-4 h-4" /> {offlineCount} Offline
            </span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
          {statuses.map((s, i) => (
            <motion.div
              key={s.device.device_id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-5 border ${
                s.isOnline ? "border-success/30" : "border-danger/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-lg ${
                      s.isOnline ? "bg-success/10" : "bg-danger/10"
                    }`}
                  >
                    <Cpu
                      className={`w-4 h-4 ${
                        s.isOnline ? "text-success" : "text-danger"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {s.device.device_name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {s.device.device_id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {s.isOnline ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                      </span>
                      <span className="text-[10px] font-display tracking-wider text-success">
                        ONLINE
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-danger" />
                      <span className="text-[10px] font-display tracking-wider text-danger">
                        OFFLINE
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* Sensor readings */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <Thermometer className="w-3 h-3 text-primary mx-auto mb-1" />
                  <p className="text-xs font-bold text-foreground">
                    {s.temperature != null ? `${s.temperature}°C` : "—"}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <Activity className="w-3 h-3 text-warning mx-auto mb-1" />
                  <p className="text-xs font-bold text-foreground">
                    {s.vibration != null ? `${s.vibration}g` : "—"}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <Radio className="w-3 h-3 text-primary mx-auto mb-1" />
                  <p className="text-xs font-bold text-foreground">
                    {s.distance != null ? `${s.distance}cm` : "—"}
                  </p>
                </div>
              </div>
              {/* Last seen */}
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {s.lastSeen
                  ? `Last seen: ${new Date(s.lastSeen).toLocaleTimeString()}`
                  : "No data received yet"}
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
              </div>
            </motion.div>
          ))}
        </div>
<<<<<<< HEAD
=======
        <div className="text-center">
          <Link to="/dashboard">
            <Button variant="outline" className="font-display text-xs tracking-wider">
              Open Full Dashboard →
            </Button>
          </Link>
        </div>
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
      </div>
    </section>
  );
};
<<<<<<< HEAD

export default DemoSection;
=======
export default LiveStatusSection;
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
