// DummyJSON cart fetchers.

const BASE = "https://dummyjson.com";

interface DummyJsonCartProduct {
  id: number;
  quantity: number;
  total: number;
  discountedTotal: number;
}

interface DummyJsonCart {
  id: number;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
  products: DummyJsonCartProduct[];
}

interface DummyJsonCartsList {
  carts: DummyJsonCart[];
}

export interface CartItem {
  quantity: number;
  total: number;
  discountedTotal: number;
  productId: number;
}

export interface Cart {
  id: string;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
  products: CartItem[];
}

function shapeCart(raw: DummyJsonCart): Cart {
  return {
    id: String(raw.id),
    total: raw.total,
    discountedTotal: raw.discountedTotal,
    totalProducts: raw.totalProducts,
    totalQuantity: raw.totalQuantity,
    userId: raw.userId,
    products: raw.products.map((item) => ({
      quantity: item.quantity,
      total: item.total,
      discountedTotal: item.discountedTotal,
      productId: item.id,
    })),
  };
}

export async function fetchCart(
  id: string | number
): Promise<Cart | null> {
  const res = await fetch(`${BASE}/carts/${id}`);
  if (!res.ok) return null;
  return shapeCart((await res.json()) as DummyJsonCart);
}

export async function fetchCarts(limit = 30): Promise<Cart[]> {
  const res = await fetch(`${BASE}/carts?limit=${limit}`);
  if (!res.ok) return [];
  const data = (await res.json()) as DummyJsonCartsList;
  return data.carts.map(shapeCart);
}

export async function fetchCartsByUserId(
  userId: string | number
): Promise<Cart[]> {
  const res = await fetch(`${BASE}/carts/user/${userId}`);
  if (!res.ok) return [];
  const data = (await res.json()) as DummyJsonCartsList;
  return data.carts.map(shapeCart);
}
