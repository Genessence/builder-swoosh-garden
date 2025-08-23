import { Truck } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function MaterialInward() {
  const features = [
    "Step-by-step inward process workflow",
    "Truck arrival registration and weighing",
    "PO/Invoice tallying and verification",
    "Quality inspection checklist with pass/fail",
    "RFID tagging for cylinders (CO2, Argon, Oxygen)",
    "Camera-based RFID scanning modal",
    "Bulk cylinder processing",
    "Shipment history and audit trail"
  ];

  return (
    <PlaceholderPage
      title="Material Inward"
      description="Streamlined material inward process including truck weighing, PO tallying, quality inspection, and RFID tagging for comprehensive inventory tracking."
      icon={<Truck className="w-8 h-8 text-industrial-navy" />}
      features={features}
    />
  );
}
