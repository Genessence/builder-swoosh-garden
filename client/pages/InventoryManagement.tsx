import { useState, useEffect } from "react";
import { 
  Package, 
  Search, 
  Filter, 
  Zap,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Circle,
  RefreshCw,
  Download,
  Eye,
  BarChart3,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

interface CylinderInventory {
  id: string;
  rfidId: string;
  type: "CO2" | "Argon" | "Oxygen";
  status: "Full" | "Empty" | "In Use" | "Maintenance";
  location: string;
  lastUpdated: string;
  capacity: string;
  pressure: number;
  department?: string;
  notes?: string;
}

interface AuditLog {
  id: string;
  action: string;
  cylinders: number;
  type: string;
  department?: string;
  user: string;
  timestamp: string;
  details: string;
}

const mockInventory: CylinderInventory[] = [
  {
    id: "CYL-001",
    rfidId: "RF001234567",
    type: "CO2",
    status: "Full",
    location: "Warehouse A-1",
    lastUpdated: "2024-01-17T10:30:00",
    capacity: "50L",
    pressure: 150
  },
  {
    id: "CYL-002", 
    rfidId: "RF001234568",
    type: "CO2",
    status: "In Use",
    location: "Production Line 1",
    lastUpdated: "2024-01-17T09:15:00",
    capacity: "50L",
    pressure: 120,
    department: "Manufacturing"
  },
  {
    id: "CYL-003",
    rfidId: "RF001234569", 
    type: "Argon",
    status: "Full",
    location: "Warehouse B-2",
    lastUpdated: "2024-01-17T08:45:00",
    capacity: "40L",
    pressure: 200
  },
  {
    id: "CYL-004",
    rfidId: "RF001234570",
    type: "Argon", 
    status: "Empty",
    location: "Return Bay",
    lastUpdated: "2024-01-17T07:20:00",
    capacity: "40L",
    pressure: 5
  },
  {
    id: "CYL-005",
    rfidId: "RF001234571",
    type: "Oxygen",
    status: "Full", 
    location: "Warehouse C-3",
    lastUpdated: "2024-01-17T11:10:00",
    capacity: "30L",
    pressure: 180
  },
  {
    id: "CYL-006",
    rfidId: "RF001234572",
    type: "Oxygen",
    status: "Maintenance",
    location: "Service Bay", 
    lastUpdated: "2024-01-16T16:30:00",
    capacity: "30L",
    pressure: 0,
    notes: "Valve repair required"
  },
  {
    id: "CYL-007",
    rfidId: "RF001234573",
    type: "CO2",
    status: "Empty",
    location: "Return Bay",
    lastUpdated: "2024-01-17T06:45:00", 
    capacity: "50L",
    pressure: 8
  },
  {
    id: "CYL-008",
    rfidId: "RF001234574",
    type: "Argon",
    status: "In Use",
    location: "Welding Dept",
    lastUpdated: "2024-01-17T10:00:00",
    capacity: "40L", 
    pressure: 145,
    department: "Welding"
  }
];

const mockAuditLog: AuditLog[] = [
  {
    id: "AUD-001",
    action: "Cylinder Issued",
    cylinders: -2,
    type: "CO2 Full",
    department: "Manufacturing",
    user: "John Smith",
    timestamp: "2024-01-17T10:30:00",
    details: "Issued 2 full CO2 cylinders, received 2 empty"
  },
  {
    id: "AUD-002", 
    action: "Material Inward",
    cylinders: +15,
    type: "Oxygen Full",
    user: "Sarah Johnson",
    timestamp: "2024-01-17T09:15:00",
    details: "Received 15 full oxygen cylinders from Industrial Air Supply"
  },
  {
    id: "AUD-003",
    action: "Cylinder Issued",
    cylinders: -1,
    type: "Argon Full", 
    department: "Welding",
    user: "Mike Wilson",
    timestamp: "2024-01-17T08:45:00",
    details: "Issued 1 full argon cylinder, received 1 empty"
  },
  {
    id: "AUD-004",
    action: "Status Update",
    cylinders: 0,
    type: "Oxygen",
    user: "System",
    timestamp: "2024-01-17T08:30:00",
    details: "Cylinder CYL-006 marked for maintenance - valve inspection required"
  },
  {
    id: "AUD-005",
    action: "RFID Scan",
    cylinders: 0,
    type: "CO2",
    user: "Tom Brown",
    timestamp: "2024-01-17T07:20:00",
    details: "Location updated for CYL-007 via RFID scan"
  }
];

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<CylinderInventory[]>(mockInventory);
  const [auditLog, setAuditLog] = useState<AuditLog[]>(mockAuditLog);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh simulation
  useEffect(() => {
    if (!isAutoRefresh) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In real app, would fetch fresh data
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rfidId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.department && item.department.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesLocation = locationFilter === "all" || item.location.includes(locationFilter);
    
    return matchesSearch && matchesType && matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Full": return "bg-green-100 text-green-800 border-green-200";
      case "Empty": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Use": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Maintenance": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Full": return <CheckCircle className="w-4 h-4" />;
      case "Empty": return <Circle className="w-4 h-4" />;
      case "In Use": return <Clock className="w-4 h-4" />;
      case "Maintenance": return <AlertTriangle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getStockSummary = () => {
    const summary = {
      CO2: { full: 0, empty: 0, inUse: 0, maintenance: 0, total: 0 },
      Argon: { full: 0, empty: 0, inUse: 0, maintenance: 0, total: 0 },
      Oxygen: { full: 0, empty: 0, inUse: 0, maintenance: 0, total: 0 }
    };

    inventory.forEach(item => {
      summary[item.type].total++;
      switch (item.status) {
        case "Full": summary[item.type].full++; break;
        case "Empty": summary[item.type].empty++; break;
        case "In Use": summary[item.type].inUse++; break;
        case "Maintenance": summary[item.type].maintenance++; break;
      }
    });

    return summary;
  };

  const stockSummary = getStockSummary();
  const uniqueLocations = [...new Set(inventory.map(item => item.location))];

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // In real app, would trigger data refresh
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-industrial-navy">Inventory Management</h1>
            <p className="text-gray-600">Real-time cylinder tracking with RFID monitoring</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={isAutoRefresh ? "bg-green-50 border-green-200" : ""}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isAutoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh: {isAutoRefresh ? "ON" : "OFF"}
            </Button>
            <Button onClick={handleRefresh} className="bg-industrial-success hover:bg-industrial-success/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Now
            </Button>
          </div>
        </div>

        {/* Stock Level Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(stockSummary).map(([type, stats]) => {
            const fillPercentage = stats.total > 0 ? (stats.full / stats.total) * 100 : 0;
            const isLowStock = fillPercentage < 30;
            
            return (
              <Card key={type} className={isLowStock ? "border-red-200 bg-red-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      {type} Cylinders
                    </span>
                    {isLowStock && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Stock Level</span>
                      <span className={isLowStock ? "text-red-600 font-medium" : ""}>
                        {fillPercentage.toFixed(0)}% Full
                      </span>
                    </div>
                    <Progress 
                      value={fillPercentage} 
                      className={`h-3 ${isLowStock ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-green-600">Full:</span>
                        <span className="font-medium">{stats.full}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-600">Empty:</span>
                        <span className="font-medium">{stats.empty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">In Use:</span>
                        <span className="font-medium">{stats.inUse}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-600">Maintenance:</span>
                        <span className="font-medium">{stats.maintenance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="RFID, ID, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="CO2">CO2</SelectItem>
                    <SelectItem value="Argon">Argon</SelectItem>
                    <SelectItem value="Oxygen">Oxygen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Full">Full</SelectItem>
                    <SelectItem value="Empty">Empty</SelectItem>
                    <SelectItem value="In Use">In Use</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    {uniqueLocations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Actions</Label>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cylinder Inventory ({filteredInventory.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cylinder</TableHead>
                      <TableHead>RFID ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Zap className="w-3 h-3 mr-1 text-blue-500" />
                            <span className="font-mono text-xs">{item.rfidId}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{item.type}</span>
                          <div className="text-xs text-gray-500">{item.capacity}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(item.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                          {item.department && (
                            <div className="text-xs text-gray-500">Dept: {item.department}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-gray-500">
                            {new Date(item.lastUpdated).toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredInventory.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No cylinders found matching your criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Audit Log */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Audit Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {auditLog.map((log) => (
                    <div key={log.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{log.action}</span>
                            <div className="flex items-center">
                              {log.cylinders > 0 ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                              ) : log.cylinders < 0 ? (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                              ) : (
                                <Circle className="w-3 h-3 text-gray-400" />
                              )}
                              <span className={`text-xs font-medium ml-1 ${
                                log.cylinders > 0 ? 'text-green-600' : 
                                log.cylinders < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {log.cylinders > 0 ? '+' : ''}{log.cylinders !== 0 ? log.cylinders : ''}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{log.details}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{log.user}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
