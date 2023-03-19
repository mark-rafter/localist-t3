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

  return {
    updateQuery,
    searchTerm: parseQueryParam(router.query.q),
    sortTerm: parseQueryParam(router.query.sort),
  };
}

function parseQueryParam(param: string | string[] | undefined) {
  if (!param) return "";
  if (typeof param === "string") return param;
  return param[0] || "";
}
