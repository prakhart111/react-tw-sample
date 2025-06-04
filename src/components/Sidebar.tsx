import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Briefcase,
  X,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface SidebarProps {
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Campaigns", href: "/" },
    { icon: Users, label: "Customers", href: "/customers" },
    { icon: BarChart3, label: "Reports", href: "/reports" }, // Added placeholder for Reports
    { icon: Settings, label: "Settings", href: "/settings" }, // Added placeholder for Settings
  ];

  return (
    <aside
      className={cn(
        "border-r bg-card text-card-foreground transition-all duration-300 ease-in-out flex flex-col",
        "fixed inset-y-0 left-0 z-50 w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0",
        isCollapsed ? "md:w-20" : "md:w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4 shrink-0">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Briefcase className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="transition-opacity duration-300 delay-150 md:block hidden">
              DualiteX
            </span>
          )}
          {isCollapsed && (
            <span className="sr-only">DualiteX</span>
          )}
          {!isMobileOpen && (
            <span className="transition-opacity duration-300 delay-150 md:hidden">
              DualiteX
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(false)}
          className="ml-auto rounded-full md:hidden"
        >
          <X size={20} />
          <span className="sr-only">Close sidebar</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("ml-auto rounded-full hidden md:flex", isCollapsed ? "" : "mr-[-8px]")}
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          <span className="sr-only">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
        </Button>
      </div>
      <nav className="flex-grow p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={() => { if (isMobileOpen) setMobileOpen(false);}} // Close mobile sidebar on nav item click
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              isCollapsed && "justify-center md:justify-center",
              !isCollapsed && "justify-start"
            )}
          >
            <item.icon size={isCollapsed ? 22 : 18} />
            {!isCollapsed && (
              <span className="transition-opacity duration-300 delay-100">
                {item.label}
              </span>
            )}
            {isCollapsed && <span className="sr-only">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
