import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CampaignsPage from "./pages/CampaignsPage";
import CustomersPage from "./pages/CustomersPage"; // Import the new CustomersPage

const AppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setIsMobileSidebarOpen}
      />
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <Outlet /> {/* This is where routed components will render */}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CampaignsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          {/* Add other routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
