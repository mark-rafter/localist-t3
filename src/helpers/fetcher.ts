export async function postFetcher<TArg, TResult>(
  url: string,
  { arg }: { arg: TArg }
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json() as Promise<TResult>);
}
