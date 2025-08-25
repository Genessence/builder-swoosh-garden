import { ReactNode, useState } from "react";
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
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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

// Detailed notifications for bell icon dropdown
const detailedNotifications = [
  {
    id: 1,
    title: "New PO Requires Confirmation",
    message: "PO #PO-2024-002 from XYZ Gas Solutions needs vendor confirmation",
    type: "po",
    timestamp: "5 minutes ago",
    priority: "high",
    unread: true,
  },
  {
    id: 2,
    title: "Quality Inspection Pending",
    message: "Shipment #SI-002 waiting for quality inspection completion",
    type: "quality",
    timestamp: "15 minutes ago",
    priority: "medium",
    unread: true,
  },
  {
    id: 3,
    title: "Low Stock Alert",
    message: "Argon cylinder inventory below threshold (8 remaining)",
    type: "inventory",
    timestamp: "1 hour ago",
    priority: "high",
    unread: true,
  },
  {
    id: 4,
    title: "SAP System Connected",
    message: "Successfully established connection with SAP server",
    type: "system",
    timestamp: "2 hours ago",
    priority: "low",
    unread: false,
  },
  {
    id: 5,
    title: "Maintenance Scheduled",
    message: "System maintenance scheduled for tonight at 2:00 AM",
    type: "maintenance",
    timestamp: "3 hours ago",
    priority: "medium",
    unread: false,
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(detailedNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "po":
        return <FileText className="w-4 h-4" />;
      case "quality":
        return <Settings className="w-4 h-4" />;
      case "inventory":
        return <Package className="w-4 h-4" />;
      case "system":
        return <Settings className="w-4 h-4" />;
      case "maintenance":
        return <Settings className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-green-500 bg-green-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

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
            <Popover
              open={isNotificationOpen}
              onOpenChange={setIsNotificationOpen}
            >
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-industrial-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>

                  <ScrollArea className="h-80">
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${getPriorityColor(
                            notification.priority,
                          )} ${notification.unread ? "bg-opacity-100" : "bg-opacity-50"}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    notification.unread
                                      ? "text-gray-900"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                {notification.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                                )}
                              </div>
                              <p
                                className={`text-xs mt-1 ${
                                  notification.unread
                                    ? "text-gray-700"
                                    : "text-gray-500"
                                }`}
                              >
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {notifications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

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
        <main className="pt-[60px] p-6">{children}</main>
      </div>
    </div>
  );
}
