'use client';

import * as React from 'react';
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/ui/password-field";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  return (
    <form 
      className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 animate-fade-slide-up animate-delay-100"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email / Username</Label>
        <TextField 
          id="email" 
          type="text" 
          placeholder="Masukkan email atau username" 
          prefixIcon={<Mail />} 
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link 
            href="/forgot-password" 
            prefetch={false}
            className="text-xs text-primary hover:underline font-semibold"
          >
            Lupa Password?
          </Link>
        </div>
        <PasswordField 
          id="password" 
          placeholder="••••••••" 
          prefixIcon={<Lock />} 
          required
        />
      </div>

      <div className="flex items-center space-x-2 px-1">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm font-medium cursor-pointer">
          Ingat saya
        </Label>
      </div>

      <Button type="submit" className="w-full h-12 text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]">
        Masuk Sekarang
      </Button>
    </form>
  );
}
