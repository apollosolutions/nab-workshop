// DummyJSON user fetcher.

const BASE = "https://dummyjson.com";

export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
}

export async function fetchUser(
  id: string | number
): Promise<DummyJsonUser | null> {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) return null;
  return (await res.json()) as DummyJsonUser;
}

export async function fetchUsers(limit = 30): Promise<DummyJsonUser[]> {
  const res = await fetch(`${BASE}/users?limit=${limit}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { users: DummyJsonUser[] };
  return data.users;
}
