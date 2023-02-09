import { gql } from "@apollo/client";

export const SYNCED_BLOCK_QUERY = () => {
  return gql`
    query GetOffers {
      _meta {
        block {
          number
        }
      }
    }
  `;
};