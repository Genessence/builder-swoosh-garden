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
  X,
  Link,
  Phone,
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
  emailSentAt?: string;
  expectedResponseBy?: string;
  vendorConfirmedAt?: string;
  confirmationMethod?: "Email" | "Phone" | "Portal" | "Manual";
  vendorResponse?: string;
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
    vendorEmail: "orders@abcindustrial.com",
    emailSentAt: "2024-01-17T09:30:00",
    expectedResponseBy: "2024-01-19T17:00:00",
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
    vendorEmail: "sales@xyzgas.com",
    emailSentAt: "2024-01-16T14:20:00",
    expectedResponseBy: "2024-01-18T17:00:00",
    vendorConfirmedAt: "2024-01-17T10:15:00",
    confirmationMethod: "Email",
    vendorResponse: "Order confirmed. Expected delivery: Jan 25th. Thank you!",
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
    vendorEmail: "purchasing@industrialair.com",
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
    vendorEmail: "orders@abcindustrial.com",
    emailSentAt: "2024-01-14T11:00:00",
    expectedResponseBy: "2024-01-16T17:00:00",
    vendorConfirmedAt: "2024-01-15T08:30:00",
    confirmationMethod: "Phone",
    vendorResponse: "Order confirmed via phone call. Delivered on schedule.",
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
    vendorEmail: "orders@premiumgas.com",
    emailSentAt: "2024-01-13T16:45:00",
    expectedResponseBy: "2024-01-15T17:00:00",
  },
];

const vendors = [...new Set(mockPOs.map((po) => po.vendor))];

export default function POManagement() {
  const [pos, setPOs] = useState<PurchaseOrder[]>(mockPOs);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [confirmationMethod, setConfirmationMethod] = useState<
    "Email" | "Phone" | "Portal" | "Manual"
  >("Manual");
  const [vendorResponse, setVendorResponse] = useState("");

  const handleFetchFromSAP = async () => {
    setIsLoading(true);
    // Simulate SAP fetch delay
    setTimeout(() => {
      setIsLoading(false);
      // In real app, would fetch new POs from SAP
      console.log("Fetched new POs from SAP");
    }, 2000);
  };

  const filteredPOs = pos.filter((po) => {
    const matchesSearch =
      po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVendor =
      !vendorFilter || vendorFilter === "all" || po.vendor === vendorFilter;
    const matchesStatus =
      !statusFilter || statusFilter === "all" || po.status === statusFilter;

    return matchesSearch && matchesVendor && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Sent to Vendor":
        return "bg-blue-100 text-blue-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Delivered":
        return "bg-purple-100 text-purple-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewPO = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setIsViewModalOpen(true);
  };

  const handleEmailVendor = (po: PurchaseOrder) => {
    const confirmationLink = `https://vendor-portal.company.com/confirm/${po.id}?token=${btoa(po.id + po.vendorEmail)}`;

    setEmailSubject(`PO Confirmation Required - ${po.id}`);
    setEmailBody(`Dear ${po.vendor},

Please confirm receipt and acceptance of the following purchase order:

PO Number: ${po.id}
Items: ${po.items}
Quantity: ${po.quantity}
Total Amount: $${po.total.toLocaleString()}
Expected Delivery: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}

Description: ${po.description}

**CONFIRMATION REQUIRED:**
Please respond within 48 hours using one of these methods:

1. **Online Confirmation (Recommended):**
   Click here to confirm: ${confirmationLink}

2. **Email Reply:**
   Simply reply to this email with "CONFIRMED" and expected delivery date

3. **Phone Confirmation:**
   Call us at +1-555-CYLINDER (1-555-295-4633)

Please confirm the order and provide expected delivery timeline.

Best regards,
Cylinder Inventory Portal
Manufacturing Operations Team`);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = () => {
    if (!selectedPO) return;

    // Update PO with email sent timestamp and expected response
    const updatedPO = {
      ...selectedPO,
      status: "Sent to Vendor" as const,
      emailSentAt: new Date().toISOString(),
      expectedResponseBy: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 2 days
    };

    setPOs((prev) =>
      prev.map((po) => (po.id === selectedPO.id ? updatedPO : po)),
    );

    // In real app, would send email via API
    console.log("Sending email:", {
      emailSubject,
      emailBody,
      to: selectedPO.vendorEmail,
    });
    setIsEmailModalOpen(false);
    setEmailSubject("");
    setEmailBody("");
  };

  const handleManualConfirm = (po: PurchaseOrder) => {
    setSelectedPO(po);
    setConfirmationMethod("Manual");
    setVendorResponse("");
    setIsConfirmModalOpen(true);
  };

  const handleGeneratePortalLink = (po: PurchaseOrder) => {
    // Generate unique confirmation link
    const confirmationLink = `https://vendor-portal.company.com/confirm/${po.id}?token=${btoa(po.id + po.vendorEmail)}`;

    // Copy to clipboard
    navigator.clipboard.writeText(confirmationLink);

    // In real app, would also send this link via email or SMS
    console.log("Generated vendor portal link:", confirmationLink);
    alert("Vendor confirmation link copied to clipboard!");
  };

  const handleVendorConfirmation = () => {
    if (!selectedPO) return;

    const updatedPO = {
      ...selectedPO,
      status: "Confirmed" as const,
      vendorConfirmedAt: new Date().toISOString(),
      confirmationMethod,
      vendorResponse:
        vendorResponse || "Confirmed via " + confirmationMethod.toLowerCase(),
    };

    setPOs((prev) =>
      prev.map((po) => (po.id === selectedPO.id ? updatedPO : po)),
    );

    setIsConfirmModalOpen(false);
    setVendorResponse("");
    setSelectedPO(null);
  };

  const getResponseStatus = (po: PurchaseOrder) => {
    if (!po.emailSentAt || !po.expectedResponseBy) return null;

    const now = new Date();
    const expectedBy = new Date(po.expectedResponseBy);
    const isOverdue = now > expectedBy && po.status === "Sent to Vendor";
    const hoursRemaining = Math.ceil(
      (expectedBy.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    return { isOverdue, hoursRemaining };
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-industrial-navy">
              PO Management
            </h1>
            <p className="text-gray-600">
              Manage purchase orders from SAP and vendor communications
            </p>
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
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
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
                    <SelectItem value="Sent to Vendor">
                      Sent to Vendor
                    </SelectItem>
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
                        className={`cursor-pointer hover:bg-gray-50 ${selectedPO?.id === po.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedPO(po)}
                      >
                        <TableCell className="font-medium">{po.id}</TableCell>
                        <TableCell>{po.vendor}</TableCell>
                        <TableCell>{po.items}</TableCell>
                        <TableCell>{po.quantity}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getStatusColor(po.status)}>
                              {po.status}
                            </Badge>
                            {po.status === "Sent to Vendor" &&
                              (() => {
                                const responseStatus = getResponseStatus(po);
                                if (responseStatus) {
                                  return (
                                    <div
                                      className={`text-xs px-2 py-1 rounded ${
                                        responseStatus.isOverdue
                                          ? "bg-red-100 text-red-800"
                                          : responseStatus.hoursRemaining <= 24
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {responseStatus.isOverdue
                                        ? "Overdue"
                                        : `${responseStatus.hoursRemaining}h left`}
                                    </div>
                                  );
                                }
                                return null;
                              })()}
                            {po.vendorConfirmedAt && (
                              <div className="text-xs text-green-600">
                                ✓ Confirmed via {po.confirmationMethod}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewPO(po);
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
                            {po.status === "Sent to Vendor" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleManualConfirm(po);
                                  }}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGeneratePortalLink(po);
                                  }}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Package className="w-4 h-4" />
                                </Button>
                              </>
                            )}
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
                      <Label className="text-sm font-medium text-gray-500">
                        PO Number
                      </Label>
                      <p className="text-lg font-semibold">{selectedPO.id}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Vendor
                      </Label>
                      <p className="flex items-center mt-1">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedPO.vendor}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Items
                      </Label>
                      <p className="flex items-center mt-1">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedPO.items} (Qty: {selectedPO.quantity})
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Status
                      </Label>
                      <div className="mt-1">
                        <Badge className={getStatusColor(selectedPO.status)}>
                          {selectedPO.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Date
                      </Label>
                      <p className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(selectedPO.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Total Amount
                      </Label>
                      <p className="text-lg font-semibold text-green-600">
                        ${selectedPO.total.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Description
                      </Label>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedPO.description}
                      </p>
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
              <Button
                variant="outline"
                onClick={() => setIsEmailModalOpen(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                className="bg-industrial-success hover:bg-industrial-success/90"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View PO Details Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Purchase Order Details
              </DialogTitle>
              <DialogDescription>
                Complete information for {selectedPO?.id}
              </DialogDescription>
            </DialogHeader>

            {selectedPO && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        PO Number
                      </Label>
                      <p className="text-lg font-semibold">{selectedPO.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Vendor
                      </Label>
                      <p className="flex items-center mt-1">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedPO.vendor}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Items
                      </Label>
                      <p className="flex items-center mt-1">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedPO.items}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Status
                      </Label>
                      <div className="mt-1">
                        <Badge className={getStatusColor(selectedPO.status)}>
                          {selectedPO.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Quantity
                      </Label>
                      <p className="text-lg font-semibold">
                        {selectedPO.quantity}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Total Amount
                      </Label>
                      <p className="text-lg font-semibold text-green-600">
                        ${selectedPO.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="border-t pt-4 space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Order Date
                    </Label>
                    <p className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(selectedPO.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Description
                    </Label>
                    <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">
                      {selectedPO.description}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Vendor Contact
                    </Label>
                    <p className="text-sm text-gray-700 mt-1">
                      <Mail className="w-4 h-4 inline mr-2 text-gray-400" />
                      {selectedPO.vendorEmail}
                    </p>
                  </div>
                </div>

                {/* Timeline Information */}
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium text-gray-500">
                    Timeline
                  </Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm">Order Created</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedPO.date).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedPO.status === "Delivered" && (
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Delivered</span>
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                    {selectedPO.status === "Sent to Vendor" && (
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Expected Delivery</span>
                        <span className="text-sm font-medium">
                          {new Date(
                            Date.now() + 7 * 24 * 60 * 60 * 1000,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  selectedPO && handleEmailVendor(selectedPO);
                }}
                className="bg-industrial-warning hover:bg-industrial-warning/90"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Vendor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Vendor Confirmation Modal */}
        <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                Vendor Confirmation
              </DialogTitle>
              <DialogDescription>
                Record vendor confirmation for {selectedPO?.id}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Confirmation Method</Label>
                <Select
                  value={confirmationMethod}
                  onValueChange={(value: any) => setConfirmationMethod(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual Entry</SelectItem>
                    <SelectItem value="Phone">Phone Call</SelectItem>
                    <SelectItem value="Email">Email Reply</SelectItem>
                    <SelectItem value="Portal">Vendor Portal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Vendor Response (Optional)</Label>
                <Textarea
                  value={vendorResponse}
                  onChange={(e) => setVendorResponse(e.target.value)}
                  placeholder="Enter vendor's response or delivery timeline..."
                  className="min-h-[100px]"
                />
              </div>

              {selectedPO && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">
                    Confirming:
                  </h4>
                  <div className="text-sm text-green-700">
                    <p>
                      <strong>{selectedPO.id}</strong> - {selectedPO.vendor}
                    </p>
                    <p>
                      {selectedPO.items} (Qty: {selectedPO.quantity})
                    </p>
                    <p>Amount: ${selectedPO.total.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVendorConfirmation}
                className="bg-industrial-success hover:bg-industrial-success/90"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
