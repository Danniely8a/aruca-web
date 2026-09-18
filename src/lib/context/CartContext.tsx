"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  quantity: number;
  price?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getCartKey(userId?: string | null): string {
  return userId ? `aruca-cart-${userId}` : "aruca-cart";
}

async function saveCartToSupabase(userId: string, items: CartItem[]) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("user_carts")
      .upsert(
        { user_id: userId, items, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    if (error) {
      console.warn("Error guardando carrito en Supabase:", error.message);
    }
  } catch {
    // Silently fail - localStorage is the fallback
  }
}

async function loadCartFromSupabase(userId: string): Promise<CartItem[] | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_carts")
      .select("items")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;
    return Array.isArray(data.items) ? data.items : null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      const uid = session?.user?.id || null;
      setUserId(uid);

      const key = getCartKey(uid);
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          setItems(JSON.parse(saved));
        } catch {
          setItems([]);
        }
      }

      if (uid) {
        loadCartFromSupabase(uid).then((serverCart) => {
          if (serverCart && serverCart.length > 0) {
            setItems((prev) => {
              if (prev.length === 0) return serverCart;
              const merged = [...prev];
              for (const serverItem of serverCart) {
                const existing = merged.find((i) => i.id === serverItem.id);
                if (existing) {
                  existing.quantity = Math.max(existing.quantity, serverItem.quantity);
                } else {
                  merged.push(serverItem);
                }
              }
              return merged;
            });
          }
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id || null;
      setUserId(uid);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (mounted) {
      const key = getCartKey(userId);
      localStorage.setItem(key, JSON.stringify(items));

      if (userId && items.length > 0) {
        saveCartToSupabase(userId, items);
      }
    }
  }, [items, mounted, userId]);

  const addItem = useCallback((product: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
