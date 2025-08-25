import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  FileText, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Send,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

const kpiData = [
  {
    title: "Active POs",
    value: "5",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Inventory Level", 
    value: "200",
    subtitle: "Cylinders",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-50",
    progress: 75
  },
  {
    title: "Pending Requests",
    value: "3",
    icon: Clock,
    color: "text-orange-600", 
    bgColor: "bg-orange-50"
  },
  {
    title: "Low Stock Alerts",
    value: "1",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

const inventoryData = [
  { type: "CO2", full: 45, empty: 15, total: 60 },
  { type: "Argon", full: 38, empty: 12, total: 50 },
  { type: "Oxygen", full: 72, empty: 18, total: 90 },
];

const recentActivity = [
  {
    id: 1,
    action: "PO #PO-2024-001 Fetched from SAP",
    time: "10 min ago",
    icon: Download,
    color: "text-blue-600"
  },
  {
    id: 2,
    action: "Material Inward Completed - Shipment #SI-001",
    time: "25 min ago", 
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    id: 3,
    action: "Email sent to Vendor - ABC Industrial",
    time: "1 hour ago",
    icon: Send,
    color: "text-purple-600"
  },
  {
    id: 4,
    action: "Low Stock Alert: CO2 Cylinders (Dept A)",
    time: "2 hours ago",
    icon: AlertTriangle,
    color: "text-red-600"
  },
  {
    id: 5,
    action: "RFID Tagging Completed - 15 Cylinders",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "text-green-600"
  }
];

// Notification analytics data for chart
const notificationAnalytics = [
  { category: "PO Alerts", count: 5, color: "#3B82F6" },
  { category: "Low Stock", count: 3, color: "#DC3545" },
  { category: "Quality Issues", count: 2, color: "#FD7E14" },
  { category: "System Updates", count: 4, color: "#28A745" },
  { category: "Maintenance", count: 1, color: "#6C757D" }
];

const weeklyNotificationTrend = [
  { day: "Mon", alerts: 8, resolved: 6 },
  { day: "Tue", alerts: 12, resolved: 10 },
  { day: "Wed", alerts: 6, resolved: 8 },
  { day: "Thu", alerts: 15, resolved: 12 },
  { day: "Fri", alerts: 10, resolved: 9 },
  { day: "Sat", alerts: 4, resolved: 4 },
  { day: "Sun", alerts: 3, resolved: 3 }
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-industrial-navy">Dashboard</h1>
            <p className="text-gray-600">Overview of cylinder inventory operations</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-industrial-success hover:bg-industrial-success/90">
              <Download className="w-4 h-4 mr-2" />
              Fetch New POs
            </Button>
            <Button className="bg-industrial-warning hover:bg-industrial-warning/90">
              <Send className="w-4 h-4 mr-2" />
              Issue Cylinders
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                        {kpi.subtitle && (
                          <p className="text-sm text-gray-500">{kpi.subtitle}</p>
                        )}
                      </div>
                      {kpi.progress && (
                        <div className="mt-2">
                          <Progress value={kpi.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{kpi.progress}% capacity</p>
                        </div>
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                      <Icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="w-5 h-5 mr-2" />
                Inventory by Type
              </CardTitle>
              <CardDescription>Current cylinder inventory levels by gas type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="full" fill="hsl(var(--industrial-success))" name="Full" />
                  <Bar dataKey="empty" fill="hsl(var(--industrial-warning))" name="Empty" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Notifications Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">{notification}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
