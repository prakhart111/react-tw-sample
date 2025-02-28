import React, { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: "🎯", label: "Campaigns" },
    { icon: "👥", label: "Customers" },
    { icon: "📝", label: "Reports" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside
      className={`border-r bg-card text-card-foreground transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <h2
          className={`font-semibold transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          DualiteX
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-muted"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors"
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
