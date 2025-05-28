import React, { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Briefcase, // Using Briefcase for DualiteX logo placeholder
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Campaigns", href: "#", active: true },
    { icon: Users, label: "Customers", href: "#" },
    { icon: BarChart3, label: "Reports", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <aside
      className={cn(
        "border-r bg-card text-card-foreground transition-all duration-300 ease-in-out flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4 shrink-0">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <Briefcase className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="transition-opacity duration-300 delay-150">
              DualiteX
            </span>
          )}
        </a>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("ml-auto rounded-full", isCollapsed ? "" : "mr-[-8px]")} // Adjust margin for better alignment
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          <span className="sr-only">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
        </Button>
      </div>
      <nav className="flex-grow p-4 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon size={isCollapsed ? 22 : 18} />
            {!isCollapsed && (
              <span className="transition-opacity duration-300 delay-100">
                {item.label}
              </span>
            )}
            {isCollapsed && <span className="sr-only">{item.label}</span>}
          </a>
        ))}
      </nav>
      {/* Optional: Footer section for sidebar */}
      {/* <div className="mt-auto p-4 border-t">
        {!isCollapsed && <p className="text-xs text-muted-foreground">&copy; 2025 DualiteX</p>}
      </div> */}
    </aside>
  );
};

export default Sidebar;
