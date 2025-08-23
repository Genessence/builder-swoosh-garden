import { useState } from "react";
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download,
  Calendar,
  Building,
  Filter,
  ChevronDown,
  ChevronRight,
  FileText,
  Package,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Layout from "@/components/Layout";

// Mock data for charts
const inventoryTrendData = [
  { month: "Jan", CO2: 45, Argon: 38, Oxygen: 72 },
  { month: "Feb", CO2: 52, Argon: 42, Oxygen: 68 },
  { month: "Mar", CO2: 48, Argon: 45, Oxygen: 75 },
  { month: "Apr", CO2: 61, Argon: 48, Oxygen: 82 },
  { month: "May", CO2: 55, Argon: 52, Oxygen: 78 },
  { month: "Jun", CO2: 67, Argon: 55, Oxygen: 85 }
];

const poStatusData = [
  { name: "Completed", value: 45, color: "#28A745" },
  { name: "In Progress", value: 25, color: "#FD7E14" },
  { name: "Pending", value: 20, color: "#DC3545" },
  { name: "Cancelled", value: 10, color: "#6C757D" }
];

// Mock report data
const poHistoryData = [
  { id: "PO-2024-001", vendor: "ABC Industrial Gases", startDate: "2024-01-15", endDate: "2024-01-20", status: "Completed", amount: "$2,500" },
  { id: "PO-2024-002", vendor: "XYZ Gas Solutions", startDate: "2024-01-14", endDate: "2024-01-18", status: "Completed", amount: "$3,200" },
  { id: "PO-2024-003", vendor: "Industrial Air Supply", startDate: "2024-01-13", endDate: "In Progress", status: "In Progress", amount: "$4,500" },
  { id: "PO-2024-004", vendor: "ABC Industrial Gases", startDate: "2024-01-12", endDate: "2024-01-16", status: "Completed", amount: "$6,000" },
  { id: "PO-2024-005", vendor: "Premium Gas Corp", startDate: "2024-01-11", endDate: "2024-01-11", status: "Cancelled", amount: "$3,000" }
];

const inwardLogsData = [
  { id: "SI-001", vendor: "ABC Industrial Gases", weight: "2,500 kg", items: "10 CO2 Cylinders", date: "2024-01-15", status: "Completed" },
  { id: "SI-002", vendor: "XYZ Gas Solutions", weight: "1,800 kg", items: "8 Argon Cylinders", date: "2024-01-16", status: "Completed" },
  { id: "SI-003", vendor: "Industrial Air Supply", weight: "3,200 kg", items: "15 Oxygen Cylinders", date: "2024-01-17", status: "In Progress" },
  { id: "SI-004", vendor: "ABC Industrial Gases", weight: "4,100 kg", items: "20 Mixed Package", date: "2024-01-14", status: "Completed" }
];

const issueLogsData = [
  { id: "REQ-2024-001", department: "Manufacturing", itemsIssued: "3 CO2 Full", itemsReceived: "3 CO2 Empty", date: "2024-01-17", user: "John Smith" },
  { id: "REQ-2024-002", department: "Welding", itemsIssued: "2 Argon Full", itemsReceived: "2 Argon Empty", date: "2024-01-17", user: "Mike Wilson" },
  { id: "REQ-2024-003", department: "Quality Control", itemsIssued: "1 Oxygen Full", itemsReceived: "1 Oxygen Empty", date: "2024-01-16", user: "Sarah Johnson" },
  { id: "REQ-2024-004", department: "Manufacturing", itemsIssued: "5 CO2 Full", itemsReceived: "5 CO2 Empty", date: "2024-01-16", user: "Tom Anderson" }
];

const inventorySummaryData = [
  { type: "CO2", full: 45, empty: 15, inUse: 8, maintenance: 2, total: 70 },
  { type: "Argon", full: 38, empty: 12, inUse: 5, maintenance: 1, total: 56 },
  { type: "Oxygen", full: 72, empty: 18, inUse: 12, maintenance: 3, total: 105 }
];

interface ReportFilters {
  dateRange: string;
  department: string;
  vendor: string;
}

export default function Reports() {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: "last30days",
    department: "all",
    vendor: "all"
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    poHistory: false,
    inwardLogs: false,
    issueLogs: false,
    inventorySummary: false
  });

  const handleFilterChange = (key: keyof ReportFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleExport = (section: string, format: 'pdf' | 'excel') => {
    // In real app, would trigger export functionality
    console.log(`Exporting ${section} as ${format}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-industrial-navy">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive operational insights and data export capabilities</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Label>
                <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                    <SelectItem value="thisyear">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Department
                </Label>
                <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="welding">Welding</SelectItem>
                    <SelectItem value="quality">Quality Control</SelectItem>
                    <SelectItem value="rd">Research & Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Vendor
                </Label>
                <Select value={filters.vendor} onValueChange={(value) => handleFilterChange("vendor", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vendors</SelectItem>
                    <SelectItem value="abc">ABC Industrial Gases</SelectItem>
                    <SelectItem value="xyz">XYZ Gas Solutions</SelectItem>
                    <SelectItem value="industrial">Industrial Air Supply</SelectItem>
                    <SelectItem value="premium">Premium Gas Corp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Actions</Label>
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Inventory Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={inventoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="CO2" stroke="#DC3545" strokeWidth={2} />
                  <Line type="monotone" dataKey="Argon" stroke="#FD7E14" strokeWidth={2} />
                  <Line type="monotone" dataKey="Oxygen" stroke="#28A745" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* PO Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2" />
                PO Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={poStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {poStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabular Reports */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-industrial-navy">Detailed Reports</h2>

          {/* PO History */}
          <Card>
            <Collapsible open={expandedSections.poHistory} onOpenChange={() => toggleSection("poHistory")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      PO History ({poHistoryData.length} records)
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('po-history', 'pdf'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('po-history', 'excel'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        Excel
                      </Button>
                      {expandedSections.poHistory ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>PO ID</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {poHistoryData.map((po) => (
                        <TableRow key={po.id}>
                          <TableCell className="font-medium">{po.id}</TableCell>
                          <TableCell>{po.vendor}</TableCell>
                          <TableCell>{po.startDate}</TableCell>
                          <TableCell>{po.endDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(po.status)}>
                              {po.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{po.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Inward Logs */}
          <Card>
            <Collapsible open={expandedSections.inwardLogs} onOpenChange={() => toggleSection("inwardLogs")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Inward Logs ({inwardLogsData.length} records)
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('inward-logs', 'pdf'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('inward-logs', 'excel'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        Excel
                      </Button>
                      {expandedSections.inwardLogs ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shipment ID</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inwardLogsData.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.id}</TableCell>
                          <TableCell>{log.vendor}</TableCell>
                          <TableCell>{log.weight}</TableCell>
                          <TableCell>{log.items}</TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(log.status)}>
                              {log.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Issue Logs */}
          <Card>
            <Collapsible open={expandedSections.issueLogs} onOpenChange={() => toggleSection("issueLogs")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Issue Logs ({issueLogsData.length} records)
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('issue-logs', 'pdf'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('issue-logs', 'excel'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        Excel
                      </Button>
                      {expandedSections.issueLogs ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Items Issued</TableHead>
                        <TableHead>Items Received</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issueLogsData.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.id}</TableCell>
                          <TableCell>{log.department}</TableCell>
                          <TableCell className="text-red-600">-{log.itemsIssued}</TableCell>
                          <TableCell className="text-green-600">+{log.itemsReceived}</TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.user}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Inventory Summary */}
          <Card>
            <Collapsible open={expandedSections.inventorySummary} onOpenChange={() => toggleSection("inventorySummary")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Inventory Summary ({inventorySummaryData.length} types)
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('inventory-summary', 'pdf'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleExport('inventory-summary', 'excel'); }}>
                        <Download className="w-3 h-3 mr-1" />
                        Excel
                      </Button>
                      {expandedSections.inventorySummary ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Full</TableHead>
                        <TableHead>Empty</TableHead>
                        <TableHead>In Use</TableHead>
                        <TableHead>Maintenance</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventorySummaryData.map((item) => (
                        <TableRow key={item.type}>
                          <TableCell className="font-medium">{item.type}</TableCell>
                          <TableCell className="text-green-600 font-medium">{item.full}</TableCell>
                          <TableCell className="text-yellow-600 font-medium">{item.empty}</TableCell>
                          <TableCell className="text-blue-600 font-medium">{item.inUse}</TableCell>
                          <TableCell className="text-red-600 font-medium">{item.maintenance}</TableCell>
                          <TableCell className="font-bold">{item.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
