import { safeParseFloat } from "@/helpers/parse";
import { getCookie } from "cookies-next";

export function getCookieOrDefault(key: string, defaultValue: number) {
  return safeParseFloat(getCookie(key), defaultValue);
}
