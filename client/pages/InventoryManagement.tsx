import { Package } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function InventoryManagement() {
  const features = [
    "Real-time inventory tracking by cylinder type",
    "RFID-based cylinder identification",
    "Status tracking (Full/Empty/In Use)",
    "Location-based inventory organization",
    "Stock level gauges and alerts",
    "Color-coded inventory status display",
    "Audit log with detailed transaction history",
    "Automated inventory updates"
  ];

  return (
    <PlaceholderPage
      title="Inventory Management"
      description="Comprehensive real-time inventory management with RFID tracking, status monitoring, and automated audit logging for all cylinder operations."
      icon={<Package className="w-8 h-8 text-industrial-navy" />}
      features={features}
    />
  );
}
