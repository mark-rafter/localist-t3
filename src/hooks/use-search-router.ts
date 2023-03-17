import { useRouter } from "next/router";
import type { ParsedUrlQueryInput } from "querystring";

function getSearchTerm(searchTerm: string | string[] | undefined) {
  if (!searchTerm) return "";
  if (typeof searchTerm === "string") return searchTerm;
  return searchTerm[0] || "";
}

export function useSearchRouter() {
  const router = useRouter();
  const { q } = router.query;

  async function updateQuery(query: ParsedUrlQueryInput) {
    return await router.push(
      {
        pathname: "/search",
        query: { ...query },
      },
      undefined,
      { shallow: true }
    );
  }

  return { updateQuery, searchTerm: getSearchTerm(q) };
}
