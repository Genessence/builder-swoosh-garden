import { useState } from "react";
import { 
  Send, 
  Camera, 
  Zap,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Building,
  Package,
  Clock,
  RefreshCw,
  ArrowRightLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/Layout";

interface CylinderRequest {
  id: string;
  department: string;
  itemsNeeded: string;
  quantity: number;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  requestDate: string;
  requester: string;
  priority: "Low" | "Medium" | "High";
  notes?: string;
}

interface IssuanceForm {
  fullCylindersIssued: number;
  emptyCylindersReceived: number;
  issuedRfidTags: string[];
  receivedRfidTags: string[];
  notes: string;
}

const mockRequests: CylinderRequest[] = [
  {
    id: "REQ-2024-001",
    department: "Manufacturing",
    itemsNeeded: "CO2 Cylinders",
    quantity: 3,
    status: "Pending",
    requestDate: "2024-01-17T09:00:00",
    requester: "John Smith",
    priority: "High"
  },
  {
    id: "REQ-2024-002", 
    department: "Welding",
    itemsNeeded: "Argon Cylinders",
    quantity: 2,
    status: "Pending",
    requestDate: "2024-01-17T10:30:00",
    requester: "Mike Wilson",
    priority: "Medium"
  },
  {
    id: "REQ-2024-003",
    department: "Quality Control",
    itemsNeeded: "Oxygen Cylinders",
    quantity: 1,
    status: "In Progress",
    requestDate: "2024-01-17T08:15:00",
    requester: "Sarah Johnson",
    priority: "Low"
  },
  {
    id: "REQ-2024-004",
    department: "Research & Development",
    itemsNeeded: "Mixed Gas Package",
    quantity: 4,
    status: "Pending", 
    requestDate: "2024-01-17T11:45:00",
    requester: "Dr. Emily Brown",
    priority: "Medium",
    notes: "Specific gas mixture required for testing"
  },
  {
    id: "REQ-2024-005",
    department: "Manufacturing",
    itemsNeeded: "CO2 Cylinders",
    quantity: 5,
    status: "Completed",
    requestDate: "2024-01-16T14:20:00",
    requester: "Tom Anderson",
    priority: "High"
  }
];

export default function CylinderIssue() {
  const [requests, setRequests] = useState<CylinderRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<CylinderRequest | null>(null);
  const [isRfidModalOpen, setIsRfidModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [rfidScanMode, setRfidScanMode] = useState<"issued" | "received">("issued");
  const [newRfidTag, setNewRfidTag] = useState("");
  const [issuanceForm, setIssuanceForm] = useState<IssuanceForm>({
    fullCylindersIssued: 0,
    emptyCylindersReceived: 0,
    issuedRfidTags: [],
    receivedRfidTags: [],
    notes: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const handleSelectRequest = (request: CylinderRequest) => {
    setSelectedRequest(request);
    // Reset form when selecting new request
    setIssuanceForm({
      fullCylindersIssued: 0,
      emptyCylindersReceived: 0,
      issuedRfidTags: [],
      receivedRfidTags: [],
      notes: ""
    });
  };

  const handleRfidScan = (mode: "issued" | "received") => {
    setRfidScanMode(mode);
    setIsRfidModalOpen(true);
  };

  const handleAddRfidTag = () => {
    if (!newRfidTag.trim()) return;

    const targetArray = rfidScanMode === "issued" ? "issuedRfidTags" : "receivedRfidTags";
    setIssuanceForm(prev => ({
      ...prev,
      [targetArray]: [...prev[targetArray], newRfidTag.trim()]
    }));
    setNewRfidTag("");
  };

  const handleRemoveRfidTag = (index: number, mode: "issued" | "received") => {
    const targetArray = mode === "issued" ? "issuedRfidTags" : "receivedRfidTags";
    setIssuanceForm(prev => ({
      ...prev,
      [targetArray]: prev[targetArray].filter((_, i) => i !== index)
    }));
  };

  const validateExchange = () => {
    if (!selectedRequest) return false;
    
    // For departments, full and empty must be equal
    // For vendors, no validation required
    const isDepartment = selectedRequest.department !== "Vendor";
    
    if (isDepartment) {
      return issuanceForm.fullCylindersIssued === issuanceForm.emptyCylindersReceived &&
             issuanceForm.fullCylindersIssued > 0;
    }
    
    return issuanceForm.fullCylindersIssued > 0;
  };

  const handleIssue = () => {
    if (!validateExchange()) return;
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmIssue = () => {
    if (!selectedRequest) return;

    // Update request status
    setRequests(prev => 
      prev.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: "Completed" as const }
          : req
      )
    );

    // Reset form and close modals
    setIssuanceForm({
      fullCylindersIssued: 0,
      emptyCylindersReceived: 0,
      issuedRfidTags: [],
      receivedRfidTags: [],
      notes: ""
    });
    setIsConfirmationModalOpen(false);
    setSelectedRequest(null);
  };

  const isValidExchange = validateExchange();
  const pendingRequests = requests.filter(req => req.status === "Pending" || req.status === "In Progress");

  return (
    <TooltipProvider>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-industrial-navy">Cylinder Issue</h1>
              <p className="text-gray-600">Process department requests with automated exchange validation</p>
            </div>
            <Button className="bg-industrial-success hover:bg-industrial-success/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              Fetch New Requests
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests ({pendingRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow 
                        key={request.id}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedRequest?.id === request.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                        onClick={() => handleSelectRequest(request)}
                      >
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building className="w-3 h-3 mr-1 text-gray-400" />
                            {request.department}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Package className="w-3 h-3 mr-1 text-gray-400" />
                            {request.itemsNeeded}
                          </div>
                        </TableCell>
                        <TableCell>{request.quantity}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                            <span className={`text-xs ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {pendingRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No pending requests found</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Issue Form */}
            <Card>
              <CardHeader>
                <CardTitle>Process Request</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRequest ? (
                  <div className="space-y-6">
                    {/* Request Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Request Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Request ID:</span>
                          <p className="font-medium">{selectedRequest.id}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Department:</span>
                          <p className="font-medium">{selectedRequest.department}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Items Needed:</span>
                          <p className="font-medium">{selectedRequest.itemsNeeded}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity:</span>
                          <p className="font-medium">{selectedRequest.quantity}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Requester:</span>
                          <p className="font-medium">{selectedRequest.requester}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <p className="font-medium">{new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {selectedRequest.notes && (
                        <div className="mt-2">
                          <span className="text-gray-600">Notes:</span>
                          <p className="text-sm">{selectedRequest.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Exchange Validation Alert */}
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="underline cursor-help">
                              For departments: Full cylinders issued must equal empty cylinders received
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Exchange rule applies to departments only. Vendors can receive 
                              cylinders without equal exchange requirements.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </AlertDescription>
                    </Alert>

                    {/* Issuance Form */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Cylinders Issued</Label>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIssuanceForm(prev => ({ 
                                ...prev, 
                                fullCylindersIssued: Math.max(0, prev.fullCylindersIssued - 1) 
                              }))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={issuanceForm.fullCylindersIssued}
                              onChange={(e) => setIssuanceForm(prev => ({ 
                                ...prev, 
                                fullCylindersIssued: Math.max(0, parseInt(e.target.value) || 0) 
                              }))}
                              className="text-center"
                              min="0"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIssuanceForm(prev => ({ 
                                ...prev, 
                                fullCylindersIssued: prev.fullCylindersIssued + 1 
                              }))}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRfidScan("issued")}
                            className="w-full"
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Scan RFID ({issuanceForm.issuedRfidTags.length})
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label>Empty Cylinders Received</Label>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIssuanceForm(prev => ({ 
                                ...prev, 
                                emptyCylindersReceived: Math.max(0, prev.emptyCylindersReceived - 1) 
                              }))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={issuanceForm.emptyCylindersReceived}
                              onChange={(e) => setIssuanceForm(prev => ({ 
                                ...prev, 
                                emptyCylindersReceived: Math.max(0, parseInt(e.target.value) || 0) 
                              }))}
                              className="text-center"
                              min="0"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIssuanceForm(prev => ({ 
                                ...prev, 
                                emptyCylindersReceived: prev.emptyCylindersReceived + 1 
                              }))}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRfidScan("received")}
                            className="w-full"
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Scan RFID ({issuanceForm.receivedRfidTags.length})
                          </Button>
                        </div>
                      </div>

                      {/* Exchange Status */}
                      <div className={`p-3 rounded-lg border ${
                        isValidExchange 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center space-x-2">
                          {isValidExchange ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${
                            isValidExchange ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {isValidExchange 
                              ? 'Exchange validation passed' 
                              : 'Exchange validation failed'
                            }
                          </span>
                        </div>
                        {!isValidExchange && (
                          <p className="text-xs text-red-600 mt-1">
                            Full cylinders issued must equal empty cylinders received and be greater than 0
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Notes (Optional)</Label>
                        <Textarea
                          value={issuanceForm.notes}
                          onChange={(e) => setIssuanceForm(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Additional notes about this issuance..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <Button
                        onClick={handleIssue}
                        disabled={!isValidExchange}
                        className="w-full bg-industrial-success hover:bg-industrial-success/90"
                      >
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        Issue Cylinders
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Send className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Select a Request</h3>
                    <p>Choose a pending request from the table to begin processing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RFID Scanning Modal */}
          <Dialog open={isRfidModalOpen} onOpenChange={setIsRfidModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Scan RFID - {rfidScanMode === "issued" ? "Issued Cylinders" : "Received Cylinders"}
                </DialogTitle>
                <DialogDescription>
                  Use device camera or enter RFID manually
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-4">Position RFID tag in camera view</p>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Start Camera
                  </Button>
                </div>
                
                <div className="text-center text-gray-500">or</div>
                
                <div className="space-y-2">
                  <Label>Enter RFID Manually</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newRfidTag}
                      onChange={(e) => setNewRfidTag(e.target.value)}
                      placeholder="RFID tag number"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddRfidTag()}
                    />
                    <Button onClick={handleAddRfidTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Current RFID Tags */}
                <div className="space-y-2">
                  <Label>Current Tags ({
                    rfidScanMode === "issued" 
                      ? issuanceForm.issuedRfidTags.length 
                      : issuanceForm.receivedRfidTags.length
                  })</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {(rfidScanMode === "issued" ? issuanceForm.issuedRfidTags : issuanceForm.receivedRfidTags)
                      .map((tag, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                        <span className="text-sm font-mono">{tag}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveRfidTag(index, rfidScanMode)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRfidModalOpen(false)}>
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Confirmation Modal */}
          <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirm Cylinder Issuance
                </DialogTitle>
                <DialogDescription>
                  Please review the exchange details before confirming
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Exchange Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Request:</span>
                      <p className="font-medium">{selectedRequest?.id}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Department:</span>
                      <p className="font-medium">{selectedRequest?.department}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Full Cylinders Issued:</span>
                      <p className="font-medium text-red-600">-{issuanceForm.fullCylindersIssued}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Empty Cylinders Received:</span>
                      <p className="font-medium text-green-600">+{issuanceForm.emptyCylindersReceived}</p>
                    </div>
                  </div>
                  {issuanceForm.notes && (
                    <div className="mt-3">
                      <span className="text-gray-600">Notes:</span>
                      <p className="text-sm">{issuanceForm.notes}</p>
                    </div>
                  )}
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Inventory will be automatically updated upon confirmation
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfirmationModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmIssue} className="bg-industrial-success hover:bg-industrial-success/90">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm & Update Inventory
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Layout>
    </TooltipProvider>
  );
}
