import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "flowbite";
import { Layout } from "@/components/layout";
import { Flowbite } from "flowbite-react";
import { useCustomTheme } from "@/hooks/use-custom-theme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const customTheme = useCustomTheme();

  return (
    <SessionProvider session={session}>
      <Flowbite theme={customTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Flowbite>
    </SessionProvider>
  );
};

export default MyApp;
