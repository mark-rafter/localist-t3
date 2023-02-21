export async function postFetcher<TResult>(
  url: string,
  { arg }: { arg: unknown }
) {
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return await (result.json() as Promise<TResult>);
}
