import { getCookieOrDefault } from "@/helpers/cookie";
import { Coordinates } from "@/helpers/distance";
import { useSession } from "next-auth/react";

export function useUserCoords(): Coordinates {
  const { data } = useSession();

  return {
    lat: data?.user.lat ?? getCookieOrDefault("x-vercel-ip-latitude", 51.5),
    long: data?.user.long ?? getCookieOrDefault("x-vercel-ip-longitude", 0.0),
  };
}
