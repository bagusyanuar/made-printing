'use client';

import * as React from 'react';
import Link from "next/link";
import { User, Lock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/ui/password-field";
import { Checkbox } from "@/components/ui/checkbox";

import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import { signInWithUsername } from "@/features/auth/actions";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const result = await signInWithUsername(data);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Login berhasil! Menuju dashboard...");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 animate-fade-slide-up animate-delay-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <TextField 
          {...register("username")}
          id="username" 
          type="text" 
          placeholder="Masukkan username" 
          prefixIcon={<User className="w-4 h-4" />} 
          error={errors.username?.message}
          disabled={isLoading}
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
          {...register("password")}
          id="password" 
          placeholder="••••••••" 
          prefixIcon={<Lock className="w-4 h-4" />} 
          error={errors.password?.message}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-2 px-1">
        <Checkbox id="remember" disabled={isLoading} />
        <Label htmlFor="remember" className="text-sm font-medium cursor-pointer">
          Ingat saya
        </Label>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Memproses...
          </div>
        ) : (
          "Masuk Sekarang"
        )}
      </Button>
    </form>
  );
}

