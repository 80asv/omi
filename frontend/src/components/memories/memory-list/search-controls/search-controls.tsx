'use client';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch';
import { Fragment } from 'react';
import envConfig from '@/src/constants/envConfig';
import { history } from 'instantsearch.js/es/lib/routers';

const searchClient = algoliasearch(
  envConfig.ALGOLIA_APP_ID,
  envConfig.ALGOLIA_SEARCH_API_KEY,
);

interface SearchControlsProps {
  children: React.ReactNode;
}

const routing = {
  router: history({
    cleanUrlOnDispose: false,
  }),
};

export default function SearchControls({ children }: SearchControlsProps) {
  return (
    <Fragment>
      <InstantSearch
        future={{
          preserveSharedStateOnUnmount: true,
        }}
        searchClient={searchClient}
        indexName={envConfig.ALGOLIA_INDEX_NAME}
        routing={routing}
      >
        <Configure hitsPerPage={20} />
        {children}
      </InstantSearch>
    </Fragment>
  );
}
