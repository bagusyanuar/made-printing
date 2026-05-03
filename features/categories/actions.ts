"use server";

import { db } from "@/db";
import { categories } from "@/db/schemas/categories";
import { categorySchema, type CategoryInput } from "./schemas";
import { eq, and, isNull, desc, ilike, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Get all categories with Pagination & Search
 */
export async function getCategories({
  search = "",
  page = 1,
  pageSize = 10,
}: {
  search?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  try {
    const offset = (page - 1) * pageSize;

    // 1. Get Data
    const dataQuery = db.select()
      .from(categories)
      .where(
        and(
          isNull(categories.deletedAt),
          search ? ilike(categories.name, `%${search}%`) : undefined
        )
      )
      .limit(pageSize)
      .offset(offset)
      .orderBy(desc(categories.createdAt));

    // 2. Get Total Count for Pagination
    const countQuery = db.select({ total: count() })
      .from(categories)
      .where(
        and(
          isNull(categories.deletedAt),
          search ? ilike(categories.name, `%${search}%`) : undefined
        )
      );

    const [data, [totalRes]] = await Promise.all([dataQuery, countQuery]);
    const totalItems = totalRes?.total || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  } catch (error) {
    console.error("Get categories error:", error);
    return {
      data: [],
      meta: { totalItems: 0, totalPages: 0, currentPage: page, pageSize },
    };
  }
}

/**
 * Create Category
 */
export async function createCategory(data: CategoryInput) {
  try {
    const validated = categorySchema.parse(data);

    // Simple slug generator
    const slug = validated.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const [newCategory] = await db.insert(categories).values({
      ...validated,
      slug,
    }).returning();

    revalidatePath("/categories");
    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Create category error:", error);
    const message = error instanceof Error ? error.message : "Gagal membuat kategori";
    return { error: message };
  }
}

/**
 * Update Category
 */
export async function updateCategory(id: string, data: CategoryInput) {
  try {
    const validated = categorySchema.parse(data);
    const slug = validated.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const [updated] = await db.update(categories)
      .set({
        ...validated,
        slug,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    revalidatePath("/categories");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Update category error:", error);
    const message = error instanceof Error ? error.message : "Gagal memperbarui kategori";
    return { error: message };
  }
}

/**
 * Delete Category (Soft Delete)
 */
export async function deleteCategory(id: string) {
  try {
    await db.update(categories)
      .set({ deletedAt: new Date() })
      .where(eq(categories.id, id));

    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return { error: "Gagal menghapus kategori" };
  }
}
