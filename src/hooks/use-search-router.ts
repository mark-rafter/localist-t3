import { useRouter } from "next/router";
import type { ParsedUrlQueryInput } from "querystring";

export function useSearchRouter() {
  const router = useRouter();

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

  return { updateQuery, searchTerm: inferSearchTerm(router.query.q) };
}

function inferSearchTerm(searchTerm: string | string[] | undefined) {
  if (!searchTerm) return "";
  if (typeof searchTerm === "string") return searchTerm;
  return searchTerm[0] || "";
}
