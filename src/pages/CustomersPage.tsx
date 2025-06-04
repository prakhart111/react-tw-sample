import React, { useState, useMemo } from "react";
import { Button } from "@/components/button";
import { faker } from "@faker-js/faker";
import {
  Filter,
  Plus,
  Search,
  MoreVertical,
  UserCircle,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  joinDate: Date;
  status: "Active" | "Inactive" | "Pending";
  totalSpent: number;
}

const generateDummyCustomers = (count: number): Customer[] => {
  const customers: Customer[] = [];
  for (let i = 0; i < count; i++) {
    customers.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarLegacy(),
      company: faker.company.name(),
      joinDate: faker.date.past({ years: 3 }),
      status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
      totalSpent: parseFloat(faker.finance.amount(0, 10000, 2)),
    });
  }
  return customers;
};

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>(() => generateDummyCustomers(25));

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300";
      case "Inactive":
        return "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300";
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your customer base.
          </p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search customers by name, email, or company..."
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Customer</th>
                <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Company</th>
                <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Status</th>
                <th className="text-left p-3 sm:p-4 font-medium text-muted-foreground text-sm">Join Date</th>
                <th className="text-right p-3 sm:p-4 font-medium text-muted-foreground text-sm">Total Spent</th>
                <th className="text-center p-3 sm:p-4 font-medium text-muted-foreground text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="p-3 sm:p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => (e.currentTarget.src = "https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40/E0E0E0/B0B0B0?text=?")} // Fallback for broken avatar links
                      />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-sm">{customer.company}</td>
                  <td className="p-3 sm:p-4 text-sm">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-sm">
                    {new Date(customer.joinDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-3 sm:p-4 text-sm text-right">
                    ${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 sm:p-4 text-center">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical size={16} />
                      <span className="sr-only">Customer actions</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            {searchTerm ? `No customers found for "${searchTerm}".` : "No customers found. Try adding some!"}
          </div>
        )}
      </div>
    </main>
  );
};

export default CustomersPage;
