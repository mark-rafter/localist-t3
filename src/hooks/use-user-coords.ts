import { type Coordinates } from "@/helpers/distance";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function useUserCoords() {
  const [get, setCookie] = useCookies(["user-coords"]);

  const userCoordsCookies = get["user-coords"] as Coordinates;

  useEffect(() => {
    if (!userCoordsCookies) {
      setCookie("user-coords", {
        lat: 51.5,
        long: 0.0,
      });
    }
  }, [userCoordsCookies, setCookie]);

  const getUserCoords = () => get["user-coords"] as Coordinates;
  const setUserCoords = (value: Coordinates) =>
    setCookie("user-coords", value, { path: "/" });

  return { getUserCoords, setUserCoords };
}
