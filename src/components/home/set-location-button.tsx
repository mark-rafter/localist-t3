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
    console.log(navigator.geolocation);

    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        console.log("coords", coords);
        const result = mutate({
          lat: coords.latitude,
          long: coords.longitude,
        });
        console.log("mutate result", result);
      },
      console.error,
      { timeout: 3000, enableHighAccuracy: false }
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
