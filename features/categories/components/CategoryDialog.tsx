"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { categorySchema, type CategoryInput } from "../schemas";
import { createCategory } from "../actions";

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryDialog({ isOpen, onClose }: CategoryDialogProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Kategori berhasil dibuat");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        reset();
        onClose();
      } else {
        toast.error(res.error || "Gagal membuat kategori");
      }
    },
    onError: () => {
      toast.error("Terjadi kesalahan sistem");
    },
  });

  const onSubmit = (data: CategoryInput) => {
    mutate(data);
  };

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogOverlay onClick={onClose} />
      <DialogContent onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Buat kategori baru untuk mengelompokkan produk percetakan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <TextField 
                {...register("name")}
                placeholder="e.g. MMT / Spanduk" 
              />
              {errors.name && (
                <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>
              )}
              <p className="text-[11px] text-zinc-500 mt-1">Nama kategori akan muncul di form order.</p>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea 
                {...register("description")}
                placeholder="Optional description..."
                className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.description && (
                <p className="text-[11px] text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Save Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
