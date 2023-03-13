import { HomePageLink } from "@/components/home";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";

export function SetLocationButton({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [hasGeolocation, setGeolocation] = useState(false);
  const { mutate, isLoading } = api.user.updateCoords.useMutation();

  useEffect(() => {
    if ("geolocation" in navigator) {
      setGeolocation(true);
    }
  }, []);

  const setLocation = () => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        mutate({
          lat: coords.latitude,
          long: coords.longitude,
        });
      },
      console.error,
      { timeout: 5000, enableHighAccuracy: false }
    );
  };

  return (
    <HomePageLink
      // todo: if browser geolocation disabled, use custom map selector
      disabled={!hasGeolocation || !isAuthenticated || isLoading}
      onClick={setLocation}
      gradientDuoTone="pinkToOrange"
      icon={HiOutlineMapPin}
    >
      Set your location
    </HomePageLink>
  );
}
