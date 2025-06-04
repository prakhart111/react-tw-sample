import React from "react";
import { Button } from "./button";
import { Bell, UserCircle, Settings, Menu } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  return (
    <header className="h-16 border-b bg-card text-card-foreground px-4 md:px-6 flex items-center justify-between shrink-0">
      {/* Left side - hamburger menu for mobile */}
      <div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>

      {/* Right side - actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="ghost" className="flex items-center gap-2 px-3 rounded-full">
          <UserCircle className="h-6 w-6" />
          <span className="hidden sm:inline">Profile</span>
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
