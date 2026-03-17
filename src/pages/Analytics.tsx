import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowLeft, BarChart3, Clock, Cpu } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { database, ref, onValue, query, orderByChild, limitToLast } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface Device {
  device_id: string;
  device_name: string;
  user_id: string;
}

interface HistoryEntry {
  temperature: number;
  vibration: number;
  distance: number;
  timestamp: number;
}

type TimeRange = "1h" | "24h" | "7d";

const RANGE_CONFIG: Record<TimeRange, { label: string; ms: number; limit: number }> = {
  "1h": { label: "Last 1 Hour", ms: 3600000, limit: 120 },
  "24h": { label: "Last 24 Hours", ms: 86400000, limit: 500 },
  "7d": { label: "Last 7 Days", ms: 604800000, limit: 1000 },
};

const Analytics = () => {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [range, setRange] = useState<TimeRange>("1h");
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  // Load devices
  useEffect(() => {
    if (!user) return;
    const unsub = onValue(ref(database, "devices"), (snap) => {
      const data = snap.val();
      if (!data) return;
      const userDevices = Object.values(data as Record<string, Device>).filter((d) => d.user_id === user.uid);
      setDevices(userDevices);
      if (userDevices.length > 0 && !selectedDevice) setSelectedDevice(userDevices[0].device_id);
    });
    return unsub;
  }, [user]);

  // Load history
  useEffect(() => {
    if (!selectedDevice) return;
    const config = RANGE_CONFIG[range];
    const histRef = query(ref(database, `sensorData/${selectedDevice}/history`), orderByChild("timestamp"), limitToLast(config.limit));

    const unsub = onValue(histRef, (snap) => {
      const data = snap.val();
      if (!data) { setHistoryData([]); return; }
<<<<<<< HEAD
      const now = Date.now();
      const entries = Object.values(data as Record<string, HistoryEntry>)
        .map((e) => ({
          ...e,
          // Normalize: if timestamp is in seconds (< 1e12), convert to ms
          timestamp: e.timestamp < 1e12 ? e.timestamp * 1000 : e.timestamp,
        }))
        .filter((e) => e.timestamp >= now - config.ms)
=======
      const cutoff = Date.now() - config.ms;
      const entries = Object.values(data as Record<string, HistoryEntry>)
        .filter((e) => e.timestamp >= cutoff)
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
        .sort((a, b) => a.timestamp - b.timestamp);
      setHistoryData(entries);
    });
    return unsub;
  }, [selectedDevice, range]);

  const chartData = historyData.map((e) => ({
    time: range === "7d"
      ? new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : new Date(e.timestamp).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
    temperature: e.temperature,
    vibration: e.vibration,
    distance: e.distance,
  }));

  // Averages
  const avg = (key: keyof HistoryEntry) => {
    if (historyData.length === 0) return "—";
    const sum = historyData.reduce((s, e) => s + (Number(e[key]) || 0), 0);
    return (sum / historyData.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-display text-sm font-bold tracking-wider">ANALYTICS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="section-container py-6">
        {/* Device + Time Range Selectors */}
<<<<<<< HEAD
        <div className="flex flex-col gap-4 mb-6">
=======
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
          <div className="flex items-center gap-2 flex-wrap">
            {devices.map((d) => (
              <button
                key={d.device_id}
                onClick={() => setSelectedDevice(d.device_id)}
                className={`px-3 py-1.5 rounded-lg font-display text-xs tracking-wider border transition-all flex items-center gap-1.5 ${
                  selectedDevice === d.device_id
                    ? "bg-primary/10 text-primary border-primary/40"
                    : "bg-secondary text-muted-foreground border-border hover:border-muted-foreground"
                }`}
              >
                <Cpu className="w-3 h-3" /> {d.device_name}
              </button>
            ))}
          </div>
<<<<<<< HEAD
          <div className="flex items-center gap-2 flex-wrap">
=======
          <div className="flex items-center gap-2">
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
            {(Object.keys(RANGE_CONFIG) as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg font-display text-xs tracking-wider border transition-all flex items-center gap-1.5 ${
                  range === r ? "bg-primary/10 text-primary border-primary/40" : "bg-secondary text-muted-foreground border-border hover:border-muted-foreground"
                }`}
              >
                <Clock className="w-3 h-3" /> {RANGE_CONFIG[r].label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
=======
        <div className="grid grid-cols-3 gap-4 mb-6">
>>>>>>> 25fd855714dd7c1f71da56d8c03ada7841f3cc74
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 text-center">
            <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">AVG TEMPERATURE</p>
            <p className="text-2xl font-display font-bold text-foreground">{avg("temperature")}°C</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-5 text-center">
            <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">AVG VIBRATION</p>
            <p className="text-2xl font-display font-bold text-foreground">{avg("vibration")} g</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 text-center">
            <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">AVG DISTANCE</p>
            <p className="text-2xl font-display font-bold text-foreground">{avg("distance")} cm</p>
          </motion.div>
        </div>

        {historyData.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">No Historical Data</h3>
            <p className="text-sm text-muted-foreground">
              Your ESP32 should push data to <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[11px]">/sensorData/{selectedDevice}/history</code>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnalyticsChart title="Temperature (°C)" data={chartData} dataKey="temperature" color="hsl(0, 84%, 60%)" />
            <AnalyticsChart title="Vibration (g)" data={chartData} dataKey="vibration" color="hsl(38, 92%, 50%)" />
            <AnalyticsChart title="Distance (cm)" data={chartData} dataKey="distance" color="hsl(45, 96%, 53%)" />
          </div>
        )}
      </div>
    </div>
  );
};

const AnalyticsChart = ({ title, data, dataKey, color }: { title: string; data: any[]; dataKey: string; color: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
    <h3 className="font-display text-xs font-bold tracking-wider text-muted-foreground mb-4">{title.toUpperCase()}</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`ag-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} />
          <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 22%)", borderRadius: "8px", fontSize: "12px" }} />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#ag-${dataKey})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export default Analytics;
