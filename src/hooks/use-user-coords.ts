import { getCookieOrDefault } from "@/helpers/cookie";
import { useSession } from "next-auth/react";

export function useUserCoords() {
  const { data } = useSession();

  const userCoords = {
    lat: data?.user.lat ?? getCookieOrDefault("x-vercel-ip-latitude", 51.5),
    long: data?.user.long ?? getCookieOrDefault("x-vercel-ip-longitude", 0.0),
  };

  return userCoords;
}
