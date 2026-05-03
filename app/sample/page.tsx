import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/ui/password-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Mail, User, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12 bg-background">
      <div className="text-center space-y-4">
        <Image 
          src="/static/images/brand-logo.png" 
          alt="Made Printing Logo" 
          width={80} 
          height={80} 
          className="mx-auto mb-4"
        />
        <Typography variant="h1" className="text-primary">
          Made Printing MMT
        </Typography>
        <Typography variant="lead">
          Custom UI components with Tailwind v4 & Orange Brand
        </Typography>
      </div>

      <div className="w-full max-w-sm space-y-6">
        <Typography variant="h4">Form Components</Typography>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <TextField id="email" placeholder="Enter your email" prefixIcon={<Mail />} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordField id="password" placeholder="Enter your password" prefixIcon={<Lock />} />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <TextField
          placeholder="Search..."
          prefixIcon={<Search />}
        />
        <TextField
          placeholder="Email Address"
          suffixIcon={<Mail />}
          type="email"
        />
        <TextField
          prefixIcon={<User />}
          placeholder="Small Input"
          size="sm"
        />
        <TextField
          placeholder="Large Input"
          size="lg"
        />
        <TextField
          placeholder="Error State"
          variant="error"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Default</span>
          <Button>Primary Action</Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Secondary</span>
          <Button variant="secondary">Secondary Action</Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Outline</span>
          <Button variant="outline">Outline Style</Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Destructive</span>
          <Button variant="destructive">Delete Item</Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Ghost</span>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Sizes</span>
          <div className="flex items-center gap-2">
            <Button size="sm">SM</Button>
            <Button size="lg">LG</Button>
          </div>
        </div>
      </div>

      <footer className="text-sm text-muted-foreground">
        Built with Senior standards by Bosku Agent
      </footer>
    </div>
  );
}
