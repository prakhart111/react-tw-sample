import React from "react";
import { Button } from "./button";

const Navbar = () => {
  return (
    <header className="h-16 border-b bg-card text-card-foreground px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-muted rounded-full">🔍</button>
        <button className="p-2 hover:bg-muted rounded-full">🔔</button>
        <Button asChild>
          <span className="mr-2">👤</span>
          Profile
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
