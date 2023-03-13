import { Layout } from "@/components";
import { useCustomTheme } from "@/hooks/use-custom-theme";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import "flowbite";
import { Flowbite } from "flowbite-react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

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

export default api.withTRPC(MyApp);
