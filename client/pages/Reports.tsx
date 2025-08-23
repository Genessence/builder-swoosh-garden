import { PieChart } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function Reports() {
  const features = [
    "Interactive date range and filter controls",
    "Inventory trend line graphs",
    "PO status distribution pie charts",
    "Expandable accordion-style reports",
    "PO history with vendor details",
    "Material inward logs and analytics",
    "Cylinder issuance tracking by department",
    "Export functionality (PDF/Excel)",
    "Real-time inventory summary reports"
  ];

  return (
    <PlaceholderPage
      title="Reports & Analytics"
      description="Comprehensive reporting dashboard with interactive charts, filterable data views, and export capabilities for operational insights."
      icon={<PieChart className="w-8 h-8 text-industrial-navy" />}
      features={features}
    />
  );
}
