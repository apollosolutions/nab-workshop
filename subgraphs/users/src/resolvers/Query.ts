import { fetchUser, fetchUsers } from "./usersSource";

export const Query = {
  Query: {
    user: async (_parent: unknown, { id }: { id: string }) => {
      return fetchUser(id);
    },
    users: async () => {
      return fetchUsers();
    },
  },
  User: {
    __resolveReference: async (reference: { id: string }) => {
      return fetchUser(reference.id);
    },
  },
};
