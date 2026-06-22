import { inject, provide, type InjectionKey, type MaybeRefOrGetter } from "vue";

const SEARCH_QUERY_KEY: InjectionKey<MaybeRefOrGetter<string | undefined>> = Symbol("search-query");
export const useSearchQuery = () => {
  const provideSearchQuery = (searchQuery: MaybeRefOrGetter) => provide(SEARCH_QUERY_KEY, searchQuery);
  const injectSearchQuery = () => inject(SEARCH_QUERY_KEY);

  return { provideSearchQuery, injectSearchQuery };
};
