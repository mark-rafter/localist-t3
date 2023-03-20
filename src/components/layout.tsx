import { BottomNav } from "@/components/bottom-nav";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "./sidebar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Localist - the free listing app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "rgb(30 41 59)",
            color: "#fff",
          },
        }}
      />
      <Sidebar />
      <BottomNav />
      <main className="p-2 sm:ml-56">{children}</main>
    </>
  );
}
