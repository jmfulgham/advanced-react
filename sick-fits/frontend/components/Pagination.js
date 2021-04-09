import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import ErrorMessage from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_PRODUCT_COUNT_QUERY = gql`
  query PAGINATION_PRODUCT_COUNT_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

// eslint-disable-next-line react/prop-types
const Pagination = ({ page }) => {
  const { loading, data, error } = useQuery(PAGINATION_PRODUCT_COUNT_QUERY);
  const { count } = data?._allProductsMeta || 0;
  const pageCount = Math.ceil(count / perPage);

  if (loading) return <p>Loading . . . </p>;
  if (error) return <ErrorMessage error={error} />;

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⏮ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Total Items</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>⏭ Next </a>
      </Link>
    </PaginationStyles>
  );
};
export default Pagination;
