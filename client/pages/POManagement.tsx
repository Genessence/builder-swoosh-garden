import { FileText } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function POManagement() {
  const features = [
    "Fetch purchase orders from SAP system",
    "Search and filter PO table by vendor, date, status",
    "View detailed PO information in side panel",
    "Email vendors with pre-filled templates",
    "Track PO status and history",
    "Bulk operations for multiple POs"
  ];

  return (
    <PlaceholderPage
      title="PO Management"
      description="Manage purchase orders fetched from SAP, email vendors, and track order statuses with comprehensive filtering and search capabilities."
      icon={<FileText className="w-8 h-8 text-industrial-navy" />}
      features={features}
    />
  );
}
