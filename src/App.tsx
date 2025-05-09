import React, { useState } from "react";
import { Button } from "./components/button";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
  Target,
  Users,
  Filter,
  Plus,
  Search,
  MoreVertical,
} from "lucide-react";
import Alpha from './alpha-square.png'

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
      name: "Summer Sale 2024",
      status: "Active",
      budget: 5000,
      spent: 2300,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
    },
    {
      id: 2,
      name: "New Product Launch",
      status: "Draft",
      budget: 3000,
      spent: 0,
      startDate: "2024-02-15",
      endDate: "2024-04-15",
    },
  ]);

  return (
    <div className="flex h-screen bg-background">
      <img src={Alpha} />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Campaigns</h1>
              <p className="text-muted-foreground">
                Manage your advertising campaigns
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create Campaign
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </div>

          <div className="bg-card rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Campaign Name</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Budget</th>
                    <th className="text-left p-4 font-medium">Spent</th>
                    <th className="text-left p-4 font-medium">Duration</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="p-4">{campaign.name}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs
                          ${
                            campaign.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : campaign.status === "Paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="p-4">
                        ${campaign.budget.toLocaleString()}
                      </td>
                      <td className="p-4">
                        ${campaign.spent.toLocaleString()}
                      </td>
                      <td className="p-4">
                        {new Date(campaign.startDate).toLocaleDateString()} -
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button className="p-2 hover:bg-muted rounded-full">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
