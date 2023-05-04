import {
  HomePageLink,
  SetLocationButton,
  SignInButtonList,
} from "@/components/home";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { HiOutlineHome, HiOutlinePencilSquare } from "react-icons/hi2";
import styles from "./index.module.css";

export default function HomePage() {
  const { status: sessionStatus } = useSession();
  const [parent] = useAutoAnimate({ duration: 100 });

  return (
    <>
      <Head>
        <title>Home | Localist</title>
      </Head>
      <section className="container mx-auto max-w-md px-4 py-8 text-center">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-6xl">
          Welcome to <span className={styles.title}>Localist</span>!
        </h1>
        <p className="mb-2 font-light text-gray-300 md:text-lg">
          Localist is a free listing board, get started by browsing the feed or
          posting your listing.
        </p>
        <div ref={parent}>
          {sessionStatus !== "authenticated" && (
            <SignInButtonList disabled={sessionStatus === "loading"} />
          )}
          <ul className="mt-2 space-y-4 border-t border-gray-700 pt-4">
            <HomePageLink
              href="/feed"
              gradientDuoTone="purpleToBlue"
              icon={HiOutlineHome}
            >
              Browse the feed
            </HomePageLink>
            <HomePageLink
              disabled={sessionStatus !== "authenticated"}
              href="/newpost"
              gradientDuoTone="greenToBlue"
              icon={HiOutlinePencilSquare}
            >
              Post an item
            </HomePageLink>
            <SetLocationButton
              isAuthenticated={sessionStatus === "authenticated"}
            />
          </ul>
        </div>
      </section>
    </>
  );
}
