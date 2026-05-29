// Static fixtures aligned with DummyJSON (same source as the users/cart subgraphs).
// Keeps workshop demos consistent: names and cart totals match what learners see live.

export interface MockCart {
  id: string;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  carts: MockCart[];
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    firstName: "Emily",
    lastName: "Johnson",
    username: "emilys",
    email: "emily.johnson@x.dummyjson.com",
    image: "https://dummyjson.com/icon/emilys/128",
    carts: [
      {
        id: "1",
        total: 13037.88,
        discountedTotal: 11510.81,
        totalProducts: 4,
        totalQuantity: 12,
      },
    ],
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Williams",
    username: "michaelw",
    email: "michael.williams@x.dummyjson.com",
    image: "https://dummyjson.com/icon/michaelw/128",
    carts: [
      {
        id: "2",
        total: 139.93,
        discountedTotal: 127.26,
        totalProducts: 2,
        totalQuantity: 7,
      },
    ],
  },
  {
    id: "3",
    firstName: "Sophia",
    lastName: "Brown",
    username: "sophiab",
    email: "sophia.brown@x.dummyjson.com",
    image: "https://dummyjson.com/icon/sophiab/128",
    carts: [
      {
        id: "3",
        total: 1794.85,
        discountedTotal: 1590.62,
        totalProducts: 6,
        totalQuantity: 15,
      },
    ],
  },
  {
    id: "5",
    firstName: "Emma",
    lastName: "Miller",
    username: "emmaj",
    email: "emma.miller@x.dummyjson.com",
    image: "https://dummyjson.com/icon/emmaj/128",
    carts: [
      {
        id: "5",
        total: 1467.88,
        discountedTotal: 1298.44,
        totalProducts: 3,
        totalQuantity: 12,
      },
    ],
  },
  {
    id: "9",
    firstName: "Ethan",
    lastName: "Martinez",
    username: "ethanm",
    email: "ethan.martinez@x.dummyjson.com",
    image: "https://dummyjson.com/icon/ethanm/128",
    carts: [
      {
        id: "9",
        total: 29709.9,
        discountedTotal: 26412.24,
        totalProducts: 4,
        totalQuantity: 10,
      },
    ],
  },
];
