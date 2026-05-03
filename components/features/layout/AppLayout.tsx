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
  Plus
} from "lucide-react";
import { Sidebar, SidebarItem, SidebarItemTree } from "@/components/ui/sidebar";
import { Navbar, UserAccount } from "@/components/ui/navbar";

interface AppLayoutProps {
  children: React.ReactNode;
  username: string;
}

export function AppLayout({ children, username }: AppLayoutProps) {
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
      >
        <div className="py-2">
          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Main Menu</p>
          <SidebarItem href="/dashboard" icon={<Home className="size-4" />}>Dashboard</SidebarItem>
          <SidebarItem href="/orders" icon={<ShoppingCart className="size-4" />}>Orders</SidebarItem>
          <SidebarItem href="/analytics" icon={<BarChart3 className="size-4" />}>Analytics</SidebarItem>
        </div>

        <div className="py-2">
          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Management</p>
          <SidebarItemTree label="Master Data" icon={<Database className="size-4" />}>
            <SidebarItem href="/products" isChild icon={<Layers className="size-4" />}>Products</SidebarItem>
            <SidebarItem href="/categories" isChild icon={<Plus className="size-4" />}>Categories</SidebarItem>
          </SidebarItemTree>
          <SidebarItem href="/users" icon={<Users className="size-4" />}>Staff Members</SidebarItem>
        </div>

        <div className="py-2">
          <p className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Settings</p>
          <SidebarItem href="/settings" icon={<Settings className="size-4" />}>General Settings</SidebarItem>
        </div>
      </Sidebar>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <Navbar 
          rightContent={<UserAccount username={username} />}
        />

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
