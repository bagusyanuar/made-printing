"use client";

import * as React from "react";
import {
  Home,
  Database,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Printer,
  Layers,
  Search,
  Bell,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarItem, SidebarItemTree } from "@/components/ui/sidebar";
import { Navbar, UserAccount } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  Pagination
} from "@/components/ui/table";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const dummyOrders = [
  { id: "1", name: "Bagus Yanuar", item: "MMT 3x1 Banner", status: "Printing", total: "Rp 150.000", date: "2024-05-01" },
  { id: "2", name: "John Doe", item: "Sticker Vinyl A3", status: "Done", total: "Rp 85.000", date: "2024-05-02" },
  { id: "3", name: "Jane Smith", item: "Kartu Nama (2 Box)", status: "Pending", total: "Rp 120.000", date: "2024-05-03" },
  { id: "4", name: "Andi Wijaya", item: "Brosur A4 (1 Rim)", status: "Done", total: "Rp 450.000", date: "2024-05-04" },
  { id: "5", name: "Siti Aminah", item: "Poster A3+ Glossy", status: "Printing", total: "Rp 25.000", date: "2024-05-05" },
];

const chartData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default function DashboardSamplePage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        header={
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Printer className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Made</span>
              <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Printing</span>
            </div>
          </div>
        }
        footer={
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">Storage Usage</p>
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-primary rounded-full" />
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">64% of 1GB used</p>
          </div>
        }
      >
        <div className="py-2">
          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Main Menu</p>
          <SidebarItem href="/sample/dashboard" icon={<Home className="size-4" />} active>Dashboard</SidebarItem>
          <SidebarItem href="/sample/orders" icon={<ShoppingCart className="size-4" />}>Orders</SidebarItem>
          <SidebarItem href="/sample/analytics" icon={<BarChart3 className="size-4" />}>Analytics</SidebarItem>
        </div>

        <div className="py-2">
          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Management</p>
          <SidebarItemTree label="Master Data" icon={<Database className="size-4" />}>
            <SidebarItem href="/sample/products" isChild icon={<Layers className="size-4" />}>Products</SidebarItem>
            <SidebarItem href="/sample/categories" isChild icon={<Plus className="size-4" />}>Categories</SidebarItem>
            <SidebarItem href="/sample/materials" isChild icon={<Database className="size-4" />}>Materials</SidebarItem>
          </SidebarItemTree>
          <SidebarItem href="/sample/users" icon={<Users className="size-4" />}>Staff Members</SidebarItem>
        </div>

        <div className="py-2">
          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Settings</p>
          <SidebarItem href="/sample/settings" icon={<Settings className="size-4" />}>General Settings</SidebarItem>
        </div>
      </Sidebar>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <Navbar
          leftContent={
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="h-10 pl-10 pr-4 w-64 bg-zinc-100 dark:bg-zinc-900 rounded-full text-sm border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          }
          rightContent={
            <>
              <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full relative">
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
              </button>
              <UserAccount username="Admin Made" />
            </>
          }
        />

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome Back, Admin!</h1>
                <p className="text-zinc-500 mt-1">Here is what&apos;s happening with your business today.</p>
              </div>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="rounded-xl h-11 px-6 shadow-lg shadow-primary/20"
              >
                <Plus className="mr-2 size-5" /> New Order
              </Button>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Sales", value: "Rp 12.5M", change: "+12.5%", color: "bg-blue-500" },
                { label: "New Orders", value: "48", change: "+5.2%", color: "bg-emerald-500" },
                { label: "Pending Print", value: "12", change: "-2.1%", color: "bg-amber-500" },
                { label: "Active Staff", value: "6", change: "0%", color: "bg-purple-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                  <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={cn("text-xs font-bold px-2 py-1 rounded-lg",
                      stat.change.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CHART SECTION */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">Sales Overview</h3>
                  <p className="text-sm text-zinc-500">Weekly revenue performance</p>
                </div>
                <select className="text-xs bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg p-2 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-zinc-200)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--color-zinc-500)', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--color-zinc-500)', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '12px', 
                        border: '1px solid var(--color-zinc-200)',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                      }}
                      itemStyle={{ color: 'var(--color-primary)', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="var(--color-primary)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DUMMY TABLE */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Recent Orders</h3>
                  <p className="text-sm text-zinc-500">Monitoring transaksi terbaru anda.</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">View All</Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100">{order.name}</TableCell>
                      <TableCell className="text-zinc-500">{order.item}</TableCell>
                      <TableCell className="text-zinc-500">{order.date}</TableCell>
                      <TableCell>
                        <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest", 
                          order.status === "Done" ? "bg-emerald-50 text-emerald-600" : 
                          order.status === "Printing" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                        )}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-bold text-zinc-900 dark:text-zinc-100">{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={12} 
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                  onPageSizeChange={setPageSize}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogOverlay onClick={() => setIsDialogOpen(false)} />
        <DialogContent onClose={() => setIsDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk menambahkan pesanan baru ke sistem.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 space-y-4">
            {/* INI PLACEHOLDER BUAT FORM NANTI */}
            <div className="h-32 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-sm">
              Form Content Area
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
