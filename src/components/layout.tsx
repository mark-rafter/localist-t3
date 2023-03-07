import Head from "next/head";
import { Sidebar } from "./sidebar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Localist - the free listing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <main className="p-2 sm:ml-56">{children}</main>
    </>
  );
}
