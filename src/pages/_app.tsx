import { Layout } from "@/components";
import { useCustomTheme } from "@/hooks/use-custom-theme";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import "flowbite";
import { Flowbite } from "flowbite-react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { type AppType } from "next/app";
import NextNProgress from "nextjs-progressbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const customTheme = useCustomTheme();

  return (
    <>
      <NextNProgress options={{ showSpinner: false }} />
      <SessionProvider session={session}>
        <Flowbite theme={customTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Flowbite>
      </SessionProvider>
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
