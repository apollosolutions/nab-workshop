// DummyJSON-backed review fetchers.
//
// Reviews are nested inside product responses, so we fetch by product and
// synthesize an id of the form "{productId}-{index}".

const BASE = "https://dummyjson.com";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface DummyJsonReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface DummyJsonProductWithReviews {
  id: number;
  reviews?: DummyJsonReview[];
}

interface DummyJsonProductsList {
  products: DummyJsonProductWithReviews[];
}

interface DummyJsonUser {
  id: number;
  email: string;
}

function shape(productId: string | number, index: number, r: DummyJsonReview): Review {
  return {
    id: `${productId}-${index}`,
    rating: r.rating,
    comment: r.comment,
    date: r.date,
    reviewerName: r.reviewerName,
    reviewerEmail: r.reviewerEmail,
  };
}

export async function fetchReviewsForProduct(
  productId: string | number
): Promise<Review[]> {
  const res = await fetch(`${BASE}/products/${productId}`);
  if (!res.ok) return [];
  const product = (await res.json()) as DummyJsonProductWithReviews;
  return (product.reviews ?? []).map((r, i) => shape(productId, i, r));
}

export async function fetchReviewById(id: string): Promise<Review | null> {
  // id format: "{productId}-{index}"
  const match = id.match(/^(\d+)-(\d+)$/);
  if (!match) return null;
  const [, productId, indexStr] = match;
  const reviews = await fetchReviewsForProduct(productId);
  const index = Number.parseInt(indexStr, 10);
  return reviews[index] ?? null;
}

export async function fetchReviewsByUserId(
  userId: string | number,
  productLimit = 30
): Promise<Review[]> {
  // Naive: fetch the user's email, then scan products for matching
  // reviewerEmail. A production system would index this differently.
  const userRes = await fetch(`${BASE}/users/${userId}`);
  if (!userRes.ok) return [];
  const user = (await userRes.json()) as DummyJsonUser;

  const productsRes = await fetch(`${BASE}/products?limit=${productLimit}`);
  if (!productsRes.ok) return [];
  const productsData = (await productsRes.json()) as DummyJsonProductsList;

  const matches: Review[] = [];
  for (const product of productsData.products) {
    (product.reviews ?? []).forEach((r, i) => {
      if (r.reviewerEmail === user.email) {
        matches.push(shape(product.id, i, r));
      }
    });
  }
  return matches;
}
