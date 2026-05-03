import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-zinc-100 dark:border-white/10 animate-zoom-fade-in">
        <Image 
          src="/static/images/brand-logo.png" 
          alt="Made Digital Printing" 
          width={64} 
          height={64} 
          className="object-contain"
          priority
        />
      </div>
      <div className="space-y-1">
        <Typography variant="h3" className="font-extrabold tracking-tight">
          Made Digital Printing
        </Typography>
        <Typography variant="muted" className="text-sm">
          Silakan login untuk mengelola transaksi percetakan
        </Typography>
      </div>
    </div>
  );
}
