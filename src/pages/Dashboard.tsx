import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, ArrowLeft, Power, Clock, AlertTriangle, Activity,
  Thermometer, Radio, Wifi, WifiOff, LogOut, BarChart3, Cpu, Trash2, Bell
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { database, ref, onValue, set, get } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import SensorCard from "@/components/SensorCard";
import AddDeviceDialog from "@/components/AddDeviceDialog";
import AlertSettings from "@/components/AlertSettings";
import { useToast } from "@/hooks/use-toast";

interface Device {
  device_id: string;
  device_name: string;
  user_id: string;
}

interface SensorData {
  temperature: number;
  vibration: number;
  distance: number;
  timestamp: number;
}

interface Thresholds {
  tempMax: number;
  vibMax: number;
  distMin: number;
}

const OFFLINE_TIMEOUT = 60000; // 60 seconds
const defaultThresholds: Thresholds = { tempMax: 38, vibMax: 4, distMin: 30 };

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState<number | null>(null);
  const [thresholds, setThresholds] = useState<Thresholds>(defaultThresholds);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [distData, setDistData] = useState<{ time: string; value: number }[]>([]);
  const [vibData, setVibData] = useState<{ time: string; value: number }[]>([]);
  const [tempData, setTempData] = useState<{ time: string; value: number }[]>([]);

  // Load user's devices
  const loadDevices = useCallback(() => {
    if (!user) return;
    const unsub = onValue(ref(database, "devices"), (snap) => {
      const data = snap.val();
      if (!data) { setDevices([]); return; }
      const userDevices = Object.values(data as Record<string, Device>).filter(
        (d) => d.user_id === user.uid
      );
      setDevices(userDevices);
      if (userDevices.length > 0 && !selectedDevice) {
        setSelectedDevice(userDevices[0].device_id);
      }
    });
    return unsub;
  }, [user, selectedDevice]);

  useEffect(() => {
    const unsub = loadDevices();
    return () => unsub?.();
  }, [loadDevices]);

  // Load thresholds for selected device
  useEffect(() => {
    if (!user || !selectedDevice) return;
    const unsub = onValue(ref(database, `alertSettings/${user.uid}/${selectedDevice}`), (snap) => {
      if (snap.exists()) setThresholds(snap.val());
      else setThresholds(defaultThresholds);
    });
    return unsub;
  }, [user, selectedDevice]);

  // Listen to sensor data for selected device
  useEffect(() => {
    if (!selectedDevice) return;
    setDistData([]);
    setVibData([]);
    setTempData([]);
    setSensorData(null);

    const unsub = onValue(ref(database, `sensorData/${selectedDevice}/current`), (snap) => {
      const data = snap.val();
      if (!data) { setIsOnline(false); return; }

      const now = Date.now();
      // Normalize: if timestamp is in seconds (< 1e12), convert to ms
      const rawTs = data.timestamp || now;
      const ts = rawTs < 1e12 ? rawTs * 1000 : rawTs;
      setLastSeen(ts);
      setIsOnline(now - ts < OFFLINE_TIMEOUT);

      const sd: SensorData = {
        temperature: Number(data.temperature) || 0,
        vibration: Number(data.vibration) || 0,
        distance: Number(data.distance) || 0,
        timestamp: ts,
      };
      setSensorData(sd);

      const timeStr = new Date(ts).toLocaleTimeString("en-US", { hour12: false, minute: "2-digit", second: "2-digit" });
      setDistData((p) => [...p.slice(-29), { time: timeStr, value: sd.distance }]);
      setVibData((p) => [...p.slice(-29), { time: timeStr, value: sd.vibration }]);
      setTempData((p) => [...p.slice(-29), { time: timeStr, value: sd.temperature }]);

      // Check alerts
      const newAlerts: string[] = [];
      if (sd.temperature > thresholds.tempMax) newAlerts.push(`🌡️ Temperature ${sd.temperature}°C exceeds ${thresholds.tempMax}°C`);
      if (sd.vibration > thresholds.vibMax) newAlerts.push(`📳 Vibration ${sd.vibration}g exceeds ${thresholds.vibMax}g`);
      if (sd.distance < thresholds.distMin && sd.distance > 0) newAlerts.push(`📏 Distance ${sd.distance}cm below ${thresholds.distMin}cm`);
      setAlerts(newAlerts);
    });

    return unsub;
  }, [selectedDevice, thresholds]);

  // Offline check interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSeen) setIsOnline(Date.now() - lastSeen < OFFLINE_TIMEOUT);
    }, 10000);
    return () => clearInterval(interval);
  }, [lastSeen]);

  const deleteDevice = async (deviceId: string) => {
    if (!confirm("Remove this device?")) return;
    await set(ref(database, `devices/${deviceId}`), null);
    if (selectedDevice === deviceId) setSelectedDevice(devices.find((d) => d.device_id !== deviceId)?.device_id || null);
    toast({ title: "Device Removed" });
  };

  const currentDevice = devices.find((d) => d.device_id === selectedDevice);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-display text-sm font-bold tracking-wider">DASHBOARD</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/analytics" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors">
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </Link>
            <div className="w-px h-4 bg-border" />
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.displayName || user?.email}</span>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="section-container py-6">
        {/* Device Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {devices.map((d) => (
              <button
                key={d.device_id}
                onClick={() => setSelectedDevice(d.device_id)}
                className={`px-4 py-2 rounded-lg font-display text-xs tracking-wider border transition-all flex items-center gap-2 ${
                  selectedDevice === d.device_id
                    ? "bg-primary/10 text-primary border-primary/40"
                    : "bg-secondary text-muted-foreground border-border hover:border-muted-foreground"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                {d.device_name}
              </button>
            ))}
          </div>
          <AddDeviceDialog onDeviceAdded={() => {}} />
        </div>

        {devices.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
            <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-lg font-bold text-foreground mb-2">No Devices Registered</h2>
            <p className="text-sm text-muted-foreground mb-6">Add your first ESP32 device to start monitoring.</p>
            <AddDeviceDialog onDeviceAdded={() => {}} />
          </motion.div>
        ) : selectedDevice && currentDevice ? (
          <>
            {/* Alerts */}
            {alerts.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 mb-6 border-danger/40 bg-danger/5">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-danger shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-danger mb-1">ACTIVE ALERTS</h3>
                    {alerts.map((a, i) => (
                      <p key={i} className="text-xs text-foreground">{a}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Device Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground mb-1">{currentDevice.device_name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> {currentDevice.device_id}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {isOnline ? <Wifi className="w-4 h-4 text-success" /> : <WifiOff className="w-4 h-4 text-danger" />}
                    {isOnline ? "Online" : "Offline"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {lastSeen ? `Last: ${new Date(lastSeen).toLocaleTimeString()}` : "No data yet"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertSettings deviceId={selectedDevice} />
                <Button variant="outline" size="sm" className="font-display text-xs tracking-wider text-danger border-danger/30 hover:bg-danger/10" onClick={() => deleteDevice(selectedDevice)}>
                  <Trash2 className="w-3.5 h-3.5" /> REMOVE
                </Button>
              </div>
            </motion.div>

            {/* Sensor Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <SensorCard
                title="Distance"
                value={sensorData ? `${sensorData.distance} cm` : "—"}
                icon={Radio}
                danger={!!sensorData && sensorData.distance < thresholds.distMin && sensorData.distance > 0}
                color="text-primary"
              />
              <SensorCard
                title="Vibration"
                value={sensorData ? `${sensorData.vibration} g` : "—"}
                icon={Activity}
                danger={!!sensorData && sensorData.vibration > thresholds.vibMax}
                color="text-warning"
                delay={0.05}
              />
              <SensorCard
                title="Temperature"
                value={sensorData ? `${sensorData.temperature}°C` : "—"}
                icon={Thermometer}
                danger={!!sensorData && sensorData.temperature > thresholds.tempMax}
                color="text-primary"
                delay={0.1}
              />
              <SensorCard
                title="Alert Status"
                value={alerts.length > 0 ? "ACTIVE" : isOnline ? "NORMAL" : "OFFLINE"}
                icon={AlertTriangle}
                danger={alerts.length > 0}
                warning={!isOnline}
                color={alerts.length > 0 ? "text-danger" : isOnline ? "text-success" : "text-warning"}
                delay={0.15}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <ChartCard title="Distance (cm)" data={distData} color="hsl(45, 96%, 53%)" />
              <ChartCard title="Vibration (g)" data={vibData} color="hsl(38, 92%, 50%)" />
              <ChartCard title="Temperature (°C)" data={tempData} color="hsl(45, 96%, 53%)" />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const ChartCard = ({ title, data, color }: { title: string; data: { time: string; value: number }[]; color: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
    <h3 className="font-display text-xs font-bold tracking-wider text-muted-foreground mb-4">{title.toUpperCase()}</h3>
    <div className="h-48">
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-xs text-muted-foreground">Waiting for data...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }} />
            <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 15%, 22%)", borderRadius: "8px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${title})`} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  </motion.div>
);

export default Dashboard;
