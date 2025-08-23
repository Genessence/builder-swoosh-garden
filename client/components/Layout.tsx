import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  BarChart3,
  FileText,
  Truck,
  Package,
  Send,
  PieChart,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Dropdown components temporarily removed due to React context issue

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/po-management", label: "PO Management", icon: FileText },
  { path: "/material-inward", label: "Material Inward", icon: Truck },
  { path: "/inventory", label: "Inventory Management", icon: Package },
  { path: "/cylinder-issue", label: "Cylinder Issue", icon: Send },
  { path: "/reports", label: "Reports & Analytics", icon: PieChart },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-industrial-panel">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-[200px] bg-industrial-navy border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-700">
            <h1 className="text-white font-bold text-sm">Cylinder Portal</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-industrial-warning text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-[200px]">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-[200px] z-30 h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-industrial-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Profile Button */}
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Admin User</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-[60px] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
