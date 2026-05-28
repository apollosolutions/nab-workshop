import {
  fetchReviewsForProduct,
  fetchReviewById,
  fetchReviewsByUserId,
} from "./reviewsSource";

export const Query = {
  Review: {
    __resolveReference: async (reference: { id: string }) => {
      return fetchReviewById(reference.id);
    },
  },
  Product: {
    reviews: async (parent: { id: string }) => {
      return fetchReviewsForProduct(parent.id);
    },
  },
  User: {
    writtenReviews: async (parent: { id: string }) => {
      return fetchReviewsByUserId(parent.id);
    },
  },
};
