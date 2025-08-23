import { useState } from "react";
import { 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  RefreshCw,
  Calendar,
  Building,
  Package,
  Clock,
  CheckCircle,
  X
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";

interface PurchaseOrder {
  id: string;
  vendor: string;
  items: string;
  quantity: number;
  status: "Draft" | "Sent to Vendor" | "Confirmed" | "Delivered" | "Cancelled";
  date: string;
  total: number;
  description: string;
  vendorEmail: string;
}

const mockPOs: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    vendor: "ABC Industrial Gases",
    items: "CO2 Cylinders",
    quantity: 10,
    status: "Sent to Vendor",
    date: "2024-01-15",
    total: 2500,
    description: "High-pressure CO2 cylinders for production line A",
    vendorEmail: "orders@abcindustrial.com"
  },
  {
    id: "PO-2024-002", 
    vendor: "XYZ Gas Solutions",
    items: "Argon Cylinders",
    quantity: 8,
    status: "Confirmed",
    date: "2024-01-14",
    total: 3200,
    description: "Pure argon cylinders for welding operations",
    vendorEmail: "sales@xyzgas.com"
  },
  {
    id: "PO-2024-003",
    vendor: "Industrial Air Supply",
    items: "Oxygen Cylinders", 
    quantity: 15,
    status: "Draft",
    date: "2024-01-13",
    total: 4500,
    description: "Medical grade oxygen cylinders",
    vendorEmail: "purchasing@industrialair.com"
  },
  {
    id: "PO-2024-004",
    vendor: "ABC Industrial Gases",
    items: "Mixed Gas Package",
    quantity: 20,
    status: "Delivered",
    date: "2024-01-12",
    total: 6000,
    description: "CO2, Argon, and Oxygen cylinder package",
    vendorEmail: "orders@abcindustrial.com"
  },
  {
    id: "PO-2024-005",
    vendor: "Premium Gas Corp",
    items: "CO2 Cylinders",
    quantity: 12,
    status: "Cancelled",
    date: "2024-01-11",
    total: 3000,
    description: "Cancelled due to quality issues",
    vendorEmail: "orders@premiumgas.com"
  }
];

const vendors = [...new Set(mockPOs.map(po => po.vendor))];

export default function POManagement() {
  const [pos, setPOs] = useState<PurchaseOrder[]>(mockPOs);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handleFetchFromSAP = async () => {
    setIsLoading(true);
    // Simulate SAP fetch delay
    setTimeout(() => {
      setIsLoading(false);
      // In real app, would fetch new POs from SAP
      console.log("Fetched new POs from SAP");
    }, 2000);
  };

  const filteredPOs = pos.filter(po => {
    const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVendor = !vendorFilter || vendorFilter === "all" || po.vendor === vendorFilter;
    const matchesStatus = !statusFilter || statusFilter === "all" || po.status === statusFilter;

    return matchesSearch && matchesVendor && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Sent to Vendor": return "bg-blue-100 text-blue-800";
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Delivered": return "bg-purple-100 text-purple-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEmailVendor = (po: PurchaseOrder) => {
    setEmailSubject(`PO Confirmation - ${po.id}`);
    setEmailBody(`Dear ${po.vendor},

Please confirm receipt and acceptance of the following purchase order:

PO Number: ${po.id}
Items: ${po.items}
Quantity: ${po.quantity}
Total Amount: $${po.total.toLocaleString()}
Expected Delivery: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}

Description: ${po.description}

Please confirm the order and provide expected delivery timeline.

Best regards,
Cylinder Inventory Portal`);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = () => {
    // In real app, would send email via API
    console.log("Sending email:", { emailSubject, emailBody, to: selectedPO?.vendorEmail });
    setIsEmailModalOpen(false);
    setEmailSubject("");
    setEmailBody("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-industrial-navy">PO Management</h1>
            <p className="text-gray-600">Manage purchase orders from SAP and vendor communications</p>
          </div>
          <Button 
            onClick={handleFetchFromSAP}
            disabled={isLoading}
            className="bg-industrial-success hover:bg-industrial-success/90"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Fetch from SAP
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search POs, vendors, items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Vendor</Label>
                <Select value={vendorFilter} onValueChange={setVendorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All vendors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All vendors</SelectItem>
                    {vendors.map(vendor => (
                      <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                    ))}
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
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Sent to Vendor">Sent to Vendor</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 days
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PO Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders ({filteredPOs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PO ID</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPOs.map((po) => (
                      <TableRow 
                        key={po.id}
                        className={`cursor-pointer hover:bg-gray-50 ${selectedPO?.id === po.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedPO(po)}
                      >
                        <TableCell className="font-medium">{po.id}</TableCell>
                        <TableCell>{po.vendor}</TableCell>
                        <TableCell>{po.items}</TableCell>
                        <TableCell>{po.quantity}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(po.status)}>
                            {po.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPO(po);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPO(po);
                                handleEmailVendor(po);
                              }}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredPOs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No purchase orders found matching your criteria
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* PO Details Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>PO Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPO ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">PO Number</Label>
                      <p className="text-lg font-semibold">{selectedPO.id}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Vendor</Label>
                      <p className="flex items-center mt-1">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedPO.vendor}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">Items</Label>
                      <p className="flex items-center mt-1">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedPO.items} (Qty: {selectedPO.quantity})
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">Status</Label>
                      <div className="mt-1">
                        <Badge className={getStatusColor(selectedPO.status)}>
                          {selectedPO.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">Date</Label>
                      <p className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(selectedPO.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">Total Amount</Label>
                      <p className="text-lg font-semibold text-green-600">
                        ${selectedPO.total.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">Description</Label>
                      <p className="text-sm text-gray-700 mt-1">{selectedPO.description}</p>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button 
                        className="w-full bg-industrial-warning hover:bg-industrial-warning/90"
                        onClick={() => handleEmailVendor(selectedPO)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Vendor
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a PO to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Email Modal */}
        <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Email Vendor</DialogTitle>
              <DialogDescription>
                Send confirmation email to {selectedPO?.vendor}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>To</Label>
                <Input 
                  value={selectedPO?.vendorEmail || ""} 
                  disabled 
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label>Subject</Label>
                <Input 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>
              
              <div>
                <Label>Message</Label>
                <Textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Email body"
                  className="min-h-[200px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSendEmail} className="bg-industrial-success hover:bg-industrial-success/90">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
