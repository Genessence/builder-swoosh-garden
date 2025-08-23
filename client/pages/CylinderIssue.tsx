import { Send } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function CylinderIssue() {
  const features = [
    "Process pending requests from SAP",
    "Department-wise cylinder issuance",
    "RFID scanning for accurate tracking",
    "Equal exchange validation (full vs empty)",
    "Confirmation modals with summary",
    "Automatic inventory updates",
    "Request status tracking",
    "Department-specific exchange rules"
  ];

  return (
    <PlaceholderPage
      title="Cylinder Issue"
      description="Manage cylinder issuance to factory departments with automated validation ensuring equal exchange of full and empty cylinders."
      icon={<Send className="w-8 h-8 text-industrial-navy" />}
      features={features}
    />
  );
}
