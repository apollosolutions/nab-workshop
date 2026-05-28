// DummyJSON product fetcher. Replaces the hardcoded productsSource array
// with live calls to https://dummyjson.com/products.

const BASE = "https://dummyjson.com";

export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  sku: string;
  thumbnail: string;
}

export async function fetchProduct(
  id: string | number
): Promise<DummyJsonProduct | null> {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) return null;
  return (await res.json()) as DummyJsonProduct;
}

export async function fetchProducts(
  limit = 30
): Promise<DummyJsonProduct[]> {
  const res = await fetch(`${BASE}/products?limit=${limit}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { products: DummyJsonProduct[] };
  return data.products;
}
