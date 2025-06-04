import React, { useState } from "react";
import { Button } from "./components/button";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
  Filter,
  Plus,
  Search,
  MoreVertical,
} from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  status: "Active" | "Paused" | "Draft";
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
}

const AppContent = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Summer Sale 2025",
      status: "Active",
      budget: 5000,
      spent: 2300,
      startDate: "2025-01-01",
      endDate: "2025-03-31",
    },
    {
      id: 2,
      name: "New Product Launch",
      status: "Draft",
      budget: 3000,
      spent: 0,
      startDate: "2025-02-15",
      endDate: "2025-04-15",
    },
    {
      id: 3,
      name: "Holiday Promotions",
      status: "Paused",
      budget: 7500,
      spent: 3500,
      startDate: "2024-11-01",
      endDate: "2024-12-31",
    },
     {
      id: 4,
      name: "Q2 Marketing Push",
      status: "Active",
      budget: 10000,
      spent: 8500,
      startDate: "2025-04-01",
      endDate: "2025-06-30",
    },
  ]);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300";
      case "Paused":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300";
      case "Draft":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300";
    }
  };


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
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Campaigns</h1>
              <p className="text-sm text-muted-foreground">
                Manage your advertising campaigns efficiently.
              </p>
            </div>
            <Button>
              <Plus size={18} className="mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search campaigns by name..."
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <Button variant="outline">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          <div className="bg-card rounded-lg border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Campaign Name</th>
                    <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Status</th>
                    <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Budget</th>
                    <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Spent</th>
                    <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Duration</th>
                    <th className="text-center p-3 sm:p-4 font-medium text-muted-foreground text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-3 sm:p-4 text-sm font-medium">{campaign.name}</td>
                      <td className="p-3 sm:p-4 text-sm">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-sm">
                        ${campaign.budget.toLocaleString()}
                      </td>
                      <td className="p-3 sm:p-4 text-sm">
                        ${campaign.spent.toLocaleString()}
                      </td>
                      <td className="p-3 sm:p-4 text-sm">
                        {new Date(campaign.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} - 
                        {new Date(campaign.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical size={16} />
                          <span className="sr-only">Campaign actions</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             {campaigns.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                No campaigns found. Get started by creating one!
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
