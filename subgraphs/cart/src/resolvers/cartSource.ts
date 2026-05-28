// DummyJSON-backed cart fetchers. Pre-built for the workshop so resolvers
// can call these without writing the HTTP plumbing.

const BASE = "https://dummyjson.com";

interface DummyJsonCartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

interface DummyJsonCart {
  id: number;
  products: DummyJsonCartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface Cart {
  id: string;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId: string;
  products: DummyJsonCartItem[];
}

function shape(cart: DummyJsonCart): Cart {
  return {
    id: String(cart.id),
    total: cart.total,
    discountedTotal: cart.discountedTotal,
    totalProducts: cart.totalProducts,
    totalQuantity: cart.totalQuantity,
    userId: String(cart.userId),
    products: cart.products,
  };
}

export async function fetchCartById(id: string | number): Promise<Cart | null> {
  const res = await fetch(`${BASE}/carts/${id}`);
  if (!res.ok) return null;
  const cart = (await res.json()) as DummyJsonCart;
  return shape(cart);
}

export async function fetchCarts(limit = 30): Promise<Cart[]> {
  const res = await fetch(`${BASE}/carts?limit=${limit}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { carts: DummyJsonCart[] };
  return data.carts.map(shape);
}

export async function fetchCartsByUserId(
  userId: string | number
): Promise<Cart[]> {
  const res = await fetch(`${BASE}/carts/user/${userId}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { carts: DummyJsonCart[] };
  return data.carts.map(shape);
}
