import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Database, 
  Users, 
  Zap,
  Mail,
  Bell,
  AlertTriangle,
  Building,
  Truck,
  Save,
  TestTube,
  Shield,
  HardDrive,
  Clock,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Layout from "@/components/Layout";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Operator" | "Viewer";
  department: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

interface Department {
  id: string;
  name: string;
  manager: string;
  location: string;
  status: "Active" | "Inactive";
}

interface Vendor {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

const mockUsers: User[] = [
  { id: "U001", name: "John Smith", email: "john.smith@company.com", role: "Admin", department: "IT", status: "Active", lastLogin: "2024-01-17T10:30:00" },
  { id: "U002", name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Manager", department: "Manufacturing", status: "Active", lastLogin: "2024-01-17T09:15:00" },
  { id: "U003", name: "Mike Wilson", email: "mike.wilson@company.com", role: "Operator", department: "Welding", status: "Active", lastLogin: "2024-01-17T08:45:00" },
  { id: "U004", name: "Emily Brown", email: "emily.brown@company.com", role: "Manager", department: "Quality Control", status: "Active", lastLogin: "2024-01-16T16:20:00" },
  { id: "U005", name: "Tom Anderson", email: "tom.anderson@company.com", role: "Operator", department: "Manufacturing", status: "Inactive", lastLogin: "2024-01-15T14:10:00" }
];

const mockDepartments: Department[] = [
  { id: "D001", name: "Manufacturing", manager: "Sarah Johnson", location: "Building A", status: "Active" },
  { id: "D002", name: "Welding", manager: "Mike Wilson", location: "Building B", status: "Active" },
  { id: "D003", name: "Quality Control", manager: "Emily Brown", location: "Building C", status: "Active" },
  { id: "D004", name: "Research & Development", manager: "Dr. Robert Kim", location: "Building D", status: "Active" },
  { id: "D005", name: "Maintenance", manager: "Steve Davis", location: "Building E", status: "Inactive" }
];

const mockVendors: Vendor[] = [
  { id: "V001", name: "ABC Industrial Gases", contact: "Robert Smith", email: "orders@abcindustrial.com", phone: "(555) 123-4567", status: "Active" },
  { id: "V002", name: "XYZ Gas Solutions", contact: "Jennifer Lee", email: "sales@xyzgas.com", phone: "(555) 234-5678", status: "Active" },
  { id: "V003", name: "Industrial Air Supply", contact: "Michael Brown", email: "purchasing@industrialair.com", phone: "(555) 345-6789", status: "Active" },
  { id: "V004", name: "Premium Gas Corp", contact: "Lisa Wang", email: "orders@premiumgas.com", phone: "(555) 456-7890", status: "Inactive" }
];

export default function Settings() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [showPassword, setShowPassword] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // System Settings
  const [sapSettings, setSapSettings] = useState({
    serverUrl: "https://sap.company.com:443",
    username: "sap_integration_user",
    password: "••••••••••••",
    clientId: "100",
    connectionTimeout: "30",
    retryAttempts: "3",
    isConnected: true
  });

  const [rfidSettings, setRfidSettings] = useState({
    deviceType: "Zebra MC3300",
    connectionType: "Bluetooth",
    autoScan: true,
    beepOnScan: true,
    vibrationFeedback: false,
    scanTimeout: "5"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    lowStockAlerts: true,
    poConfirmations: true,
    systemMaintenance: true,
    auditAlerts: false
  });

  const [thresholdSettings, setThresholdSettings] = useState({
    co2LowStock: "10",
    argonLowStock: "8",
    oxygenLowStock: "15",
    criticalLevel: "5",
    alertFrequency: "daily"
  });

  const [emailTemplates, setEmailTemplates] = useState({
    poConfirmation: "Dear {{vendor}}, Please confirm receipt of PO {{poNumber}}...",
    lowStockAlert: "Low stock alert for {{cylinderType}}. Current level: {{currentLevel}}...",
    maintenanceReminder: "Maintenance reminder for cylinder {{cylinderId}}..."
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800";
      case "Manager": return "bg-blue-100 text-blue-800";
      case "Operator": return "bg-green-100 text-green-800";
      case "Viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings`);
    // In real app, would save to backend
  };

  const handleTestConnection = () => {
    console.log("Testing SAP connection...");
    // In real app, would test actual connection
  };

  const handleUserAction = (action: string, user?: User) => {
    console.log(`${action} user:`, user);
    // In real app, would handle user management
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-industrial-navy">Settings</h1>
          <p className="text-gray-600">System configuration and administration settings</p>
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Devices</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Departments</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4" />
              <span>Maintenance</span>
            </TabsTrigger>
          </TabsList>

          {/* System Configuration */}
          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SAP Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    SAP Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-green-800 font-medium">Connected</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleTestConnection}>
                      <TestTube className="w-3 h-3 mr-1" />
                      Test
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>Server URL</Label>
                      <Input
                        value={sapSettings.serverUrl}
                        onChange={(e) => setSapSettings(prev => ({ ...prev, serverUrl: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Username</Label>
                        <Input
                          value={sapSettings.username}
                          onChange={(e) => setSapSettings(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Client ID</Label>
                        <Input
                          value={sapSettings.clientId}
                          onChange={(e) => setSapSettings(prev => ({ ...prev, clientId: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={sapSettings.password}
                          onChange={(e) => setSapSettings(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Connection Timeout (s)</Label>
                        <Input
                          type="number"
                          value={sapSettings.connectionTimeout}
                          onChange={(e) => setSapSettings(prev => ({ ...prev, connectionTimeout: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Retry Attempts</Label>
                        <Input
                          type="number"
                          value={sapSettings.retryAttempts}
                          onChange={(e) => setSapSettings(prev => ({ ...prev, retryAttempts: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSaveSettings('sap')} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save SAP Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Email Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>PO Confirmation Template</Label>
                    <Textarea
                      value={emailTemplates.poConfirmation}
                      onChange={(e) => setEmailTemplates(prev => ({ ...prev, poConfirmation: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label>Low Stock Alert Template</Label>
                    <Textarea
                      value={emailTemplates.lowStockAlert}
                      onChange={(e) => setEmailTemplates(prev => ({ ...prev, lowStockAlert: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label>Maintenance Reminder Template</Label>
                    <Textarea
                      value={emailTemplates.maintenanceReminder}
                      onChange={(e) => setEmailTemplates(prev => ({ ...prev, maintenanceReminder: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button onClick={() => handleSaveSettings('email')} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Email Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <Button onClick={() => setIsUserModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleUserAction('edit', user)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleUserAction('delete', user)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Device Settings */}
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  RFID Scanner Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Device Type</Label>
                      <Select value={rfidSettings.deviceType} onValueChange={(value) => setRfidSettings(prev => ({ ...prev, deviceType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Zebra MC3300">Zebra MC3300</SelectItem>
                          <SelectItem value="Honeywell CT60">Honeywell CT60</SelectItem>
                          <SelectItem value="Datalogic Memor 35">Datalogic Memor 35</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Connection Type</Label>
                      <Select value={rfidSettings.connectionType} onValueChange={(value) => setRfidSettings(prev => ({ ...prev, connectionType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bluetooth">Bluetooth</SelectItem>
                          <SelectItem value="WiFi">WiFi</SelectItem>
                          <SelectItem value="USB">USB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Scan Timeout (seconds)</Label>
                      <Input
                        type="number"
                        value={rfidSettings.scanTimeout}
                        onChange={(e) => setRfidSettings(prev => ({ ...prev, scanTimeout: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Auto Scan Mode</Label>
                      <Switch
                        checked={rfidSettings.autoScan}
                        onCheckedChange={(checked) => setRfidSettings(prev => ({ ...prev, autoScan: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Beep on Scan</Label>
                      <Switch
                        checked={rfidSettings.beepOnScan}
                        onCheckedChange={(checked) => setRfidSettings(prev => ({ ...prev, beepOnScan: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Vibration Feedback</Label>
                      <Switch
                        checked={rfidSettings.vibrationFeedback}
                        onCheckedChange={(checked) => setRfidSettings(prev => ({ ...prev, vibrationFeedback: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <Button onClick={() => handleSaveSettings('rfid')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Device Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Low Stock Alerts</Label>
                    <Switch
                      checked={notificationSettings.lowStockAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, lowStockAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>PO Confirmations</Label>
                    <Switch
                      checked={notificationSettings.poConfirmations}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, poConfirmations: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System Maintenance</Label>
                    <Switch
                      checked={notificationSettings.systemMaintenance}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, systemMaintenance: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Audit Alerts</Label>
                    <Switch
                      checked={notificationSettings.auditAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, auditAlerts: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Inventory Thresholds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>CO2 Low Stock Threshold</Label>
                    <Input
                      type="number"
                      value={thresholdSettings.co2LowStock}
                      onChange={(e) => setThresholdSettings(prev => ({ ...prev, co2LowStock: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Argon Low Stock Threshold</Label>
                    <Input
                      type="number"
                      value={thresholdSettings.argonLowStock}
                      onChange={(e) => setThresholdSettings(prev => ({ ...prev, argonLowStock: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Oxygen Low Stock Threshold</Label>
                    <Input
                      type="number"
                      value={thresholdSettings.oxygenLowStock}
                      onChange={(e) => setThresholdSettings(prev => ({ ...prev, oxygenLowStock: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Critical Level Threshold</Label>
                    <Input
                      type="number"
                      value={thresholdSettings.criticalLevel}
                      onChange={(e) => setThresholdSettings(prev => ({ ...prev, criticalLevel: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Alert Frequency</Label>
                    <Select value={thresholdSettings.alertFrequency} onValueChange={(value) => setThresholdSettings(prev => ({ ...prev, alertFrequency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => handleSaveSettings('notifications')} className="px-8">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>

          {/* Departments & Vendors */}
          <TabsContent value="departments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departments.map((dept) => (
                        <TableRow key={dept.id}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.manager}</TableCell>
                          <TableCell>{dept.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(dept.status)}>
                              {dept.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">{vendor.name}</TableCell>
                          <TableCell>{vendor.contact}</TableCell>
                          <TableCell>{vendor.phone}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(vendor.status)}>
                              {vendor.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Maintenance */}
          <TabsContent value="maintenance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HardDrive className="w-5 h-5 mr-2" />
                    System Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">System Status</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Uptime:</span>
                        <p className="font-medium">15 days, 7 hours</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Backup:</span>
                        <p className="font-medium">2024-01-17 03:00 AM</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Database Size:</span>
                        <p className="font-medium">2.3 GB</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Active Users:</span>
                        <p className="font-medium">12</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <HardDrive className="w-4 h-4 mr-2" />
                      Run System Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Scan
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Audit Log Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Log Retention Period</Label>
                    <Select defaultValue="90days">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="90days">90 Days</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Auto-Archive After</Label>
                    <Select defaultValue="6months">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">3 Months</SelectItem>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Enable Detailed Logging</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Log User Actions</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Log System Events</Label>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => handleSaveSettings('maintenance')} className="px-8">
                <Save className="w-4 h-4 mr-2" />
                Save Maintenance Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add User Modal */}
        <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with appropriate permissions
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="user@company.com" />
              </div>
              <div>
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="welding">Welding</SelectItem>
                    <SelectItem value="quality">Quality Control</SelectItem>
                    <SelectItem value="rd">Research & Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsUserModalOpen(false)}>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
