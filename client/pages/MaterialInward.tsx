import { useState } from "react";
import { 
  Truck, 
  Scale, 
  FileCheck, 
  ClipboardCheck, 
  Zap, 
  CheckCircle2,
  Camera,
  Upload,
  Plus,
  Eye,
  Calendar,
  Package,
  AlertCircle,
  X,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

const steps = [
  { id: 1, title: "Truck Arrival", icon: Truck },
  { id: 2, title: "Weighing", icon: Scale },
  { id: 3, title: "Tally PO/Invoice", icon: FileCheck },
  { id: 4, title: "Quality Inspection", icon: ClipboardCheck },
  { id: 5, title: "RFID Tagging", icon: Zap },
  { id: 6, title: "Complete", icon: CheckCircle2 }
];

const qualityChecks = [
  { id: 1, item: "Cylinder condition (no dents/damage)" },
  { id: 2, item: "Valve integrity and safety checks" },
  { id: 3, item: "Proper labeling and identification" },
  { id: 4, item: "Gas purity verification" },
  { id: 5, item: "Pressure level confirmation" },
  { id: 6, item: "Compliance certification present" }
];

const mockInwardHistory = [
  {
    id: "SI-001",
    vendor: "ABC Industrial Gases",
    weight: "2,500 kg",
    items: "10 CO2 Cylinders",
    status: "Completed",
    date: "2024-01-15",
    poNumber: "PO-2024-001"
  },
  {
    id: "SI-002", 
    vendor: "XYZ Gas Solutions",
    weight: "1,800 kg",
    items: "8 Argon Cylinders",
    status: "In Progress",
    date: "2024-01-16",
    poNumber: "PO-2024-002"
  },
  {
    id: "SI-003",
    vendor: "Industrial Air Supply", 
    weight: "3,200 kg",
    items: "15 Oxygen Cylinders",
    status: "Pending",
    date: "2024-01-17",
    poNumber: "PO-2024-003"
  }
];

interface FormData {
  truckId: string;
  driverName: string;
  arrivalTime: string;
  grossWeight: string;
  tareWeight: string;
  netWeight: string;
  poNumber: string;
  invoiceNumber: string;
  itemCount: string;
  notes: string;
  qualityResults: Record<number, string>;
  rfidTags: string[];
}

export default function MaterialInward() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRfidModalOpen, setIsRfidModalOpen] = useState(false);
  const [isViewInwardModalOpen, setIsViewInwardModalOpen] = useState(false);
  const [selectedInwardRecord, setSelectedInwardRecord] = useState<typeof mockInwardHistory[0] | null>(null);
  const [newRfidTag, setNewRfidTag] = useState("");
  const [formData, setFormData] = useState<FormData>({
    truckId: "",
    driverName: "",
    arrivalTime: "",
    grossWeight: "",
    tareWeight: "",
    netWeight: "",
    poNumber: "",
    invoiceNumber: "",
    itemCount: "",
    notes: "",
    qualityResults: {},
    rfidTags: []
  });

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "active";
    return "upcoming";
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-industrial-success text-white";
      case "active": return "bg-industrial-warning text-white";
      default: return "bg-gray-200 text-gray-500";
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQualityCheck = (checkId: number, result: string) => {
    setFormData(prev => ({
      ...prev,
      qualityResults: { ...prev.qualityResults, [checkId]: result }
    }));
  };

  const handleAddRfidTag = () => {
    if (newRfidTag.trim()) {
      setFormData(prev => ({
        ...prev,
        rfidTags: [...prev.rfidTags, newRfidTag.trim()]
      }));
      setNewRfidTag("");
    }
  };

  const handleRemoveRfidTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rfidTags: prev.rfidTags.filter((_, i) => i !== index)
    }));
  };

  const handleComplete = () => {
    // In real app, would save to database
    console.log("Material inward completed:", formData);
    // Reset form and go back to step 1
    setFormData({
      truckId: "",
      driverName: "",
      arrivalTime: "",
      grossWeight: "",
      tareWeight: "",
      netWeight: "",
      poNumber: "",
      invoiceNumber: "",
      itemCount: "",
      notes: "",
      qualityResults: {},
      rfidTags: []
    });
    setCurrentStep(1);
  };

  const handleViewInwardDetails = (record: typeof mockInwardHistory[0]) => {
    setSelectedInwardRecord(record);
    setIsViewInwardModalOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Truck Arrival Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Truck ID / License Plate</Label>
                  <Input
                    value={formData.truckId}
                    onChange={(e) => handleInputChange("truckId", e.target.value)}
                    placeholder="Enter truck ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Driver Name</Label>
                  <Input
                    value={formData.driverName}
                    onChange={(e) => handleInputChange("driverName", e.target.value)}
                    placeholder="Enter driver name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Arrival Time</Label>
                  <Input
                    type="datetime-local"
                    value={formData.arrivalTime}
                    onChange={(e) => handleInputChange("arrivalTime", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Truck Weighing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Gross Weight (kg)</Label>
                  <Input
                    type="number"
                    value={formData.grossWeight}
                    onChange={(e) => handleInputChange("grossWeight", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tare Weight (kg)</Label>
                  <Input
                    type="number"
                    value={formData.tareWeight}
                    onChange={(e) => handleInputChange("tareWeight", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Net Weight (kg)</Label>
                  <Input
                    type="number"
                    value={formData.netWeight || (
                      formData.grossWeight && formData.tareWeight 
                        ? (parseFloat(formData.grossWeight) - parseFloat(formData.tareWeight)).toString()
                        : ""
                    )}
                    onChange={(e) => handleInputChange("netWeight", e.target.value)}
                    placeholder="Auto-calculated"
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="w-5 h-5 mr-2" />
                Tally PO/Invoice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>PO Number</Label>
                  <Input
                    value={formData.poNumber}
                    onChange={(e) => handleInputChange("poNumber", e.target.value)}
                    placeholder="PO-2024-XXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Invoice Number</Label>
                  <Input
                    value={formData.invoiceNumber}
                    onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                    placeholder="INV-XXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Item Count</Label>
                  <Input
                    type="number"
                    value={formData.itemCount}
                    onChange={(e) => handleInputChange("itemCount", e.target.value)}
                    placeholder="Number of cylinders"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upload Invoice</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  <Button variant="outline" className="mt-2">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardCheck className="w-5 h-5 mr-2" />
                Quality Inspection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {qualityChecks.map((check) => (
                  <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{check.item}</span>
                    <RadioGroup
                      value={formData.qualityResults[check.id] || ""}
                      onValueChange={(value) => handleQualityCheck(check.id, value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pass" id={`pass-${check.id}`} />
                        <Label htmlFor={`pass-${check.id}`} className="text-green-600">Pass</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fail" id={`fail-${check.id}`} />
                        <Label htmlFor={`fail-${check.id}`} className="text-red-600">Fail</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional inspection notes..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                RFID Tagging
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Scan or manually enter RFID tags for each cylinder
                </p>
                <Button onClick={() => setIsRfidModalOpen(true)} className="bg-industrial-warning hover:bg-industrial-warning/90">
                  <Camera className="w-4 h-4 mr-2" />
                  Scan RFID
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>RFID Tags ({formData.rfidTags.length})</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {formData.rfidTags.map((tag, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                      <span className="text-sm font-mono">{tag}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveRfidTag(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                {formData.rfidTags.length === 0 && (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
                    <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No RFID tags added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Complete Material Inward
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Material Inward Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Truck ID:</span>
                    <span className="ml-2 font-medium">{formData.truckId || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Net Weight:</span>
                    <span className="ml-2 font-medium">{formData.netWeight || "N/A"} kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">PO Number:</span>
                    <span className="ml-2 font-medium">{formData.poNumber || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">RFID Tags:</span>
                    <span className="ml-2 font-medium">{formData.rfidTags.length}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleComplete} className="bg-industrial-success hover:bg-industrial-success/90 px-8">
                  <Save className="w-4 h-4 mr-2" />
                  Complete & Save
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-industrial-navy">Material Inward</h1>
          <p className="text-gray-600">Streamlined inward process with quality control and RFID tracking</p>
        </div>

        {/* Stepper */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const status = getStepStatus(step.id);
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepColor(status)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
                    </div>
                    {!isLast && (
                      <div className={`h-1 w-16 mx-2 ${status === 'completed' ? 'bg-industrial-success' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <Progress value={(currentStep / 6) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === 6}
            className="bg-industrial-navy hover:bg-industrial-navy/90"
          >
            Next Step
          </Button>
        </div>

        {/* Past Inward History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Material Inwards</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInwardHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.vendor}</TableCell>
                    <TableCell>{record.weight}</TableCell>
                    <TableCell>{record.items}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewInwardDetails(record)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* RFID Scanning Modal */}
        <Dialog open={isRfidModalOpen} onOpenChange={setIsRfidModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>RFID Scanner</DialogTitle>
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
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRfidModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
