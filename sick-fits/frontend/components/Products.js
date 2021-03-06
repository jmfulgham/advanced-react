import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import {perPage} from "../config";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

// eslint-disable-next-line react/prop-types
export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { first: perPage, skip: page * perPage - perPage },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
