import { Settings as SettingsIcon } from "lucide-react";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function Settings() {
  const features = [
    "SAP system integration configuration",
    "User management and permissions",
    "RFID scanner device settings",
    "Email template customization",
    "Notification preferences",
    "Inventory threshold alerts",
    "Department and vendor management",
    "System backup and maintenance",
    "Audit log retention settings"
  ];

  return (
    <PlaceholderPage
      title="Settings"
      description="System configuration and administration settings for SAP integration, user management, device configuration, and operational preferences."
      icon={<SettingsIcon className="w-8 h-8 text-industrial-navy" />}
      features={features}
    />
  );
}
