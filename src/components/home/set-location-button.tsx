import { HomePageLink } from "@/components/home";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";

export function SetLocationButton({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [geolocation, setGeolocation] = useState<Geolocation | undefined>(
    undefined
  );
  const { mutate } = api.user.updateCoords.useMutation();

  useEffect(() => {
    if ("geolocation" in navigator) {
      setGeolocation(navigator.geolocation);
    }
  }, []);

  const setLocation = () => {
    geolocation?.getCurrentPosition(({ coords }) => {
      mutate({
        lat: coords.latitude,
        long: coords.longitude,
      });
    });
  };

  return (
    <HomePageLink
      // todo: if browser geolocation disabled, use custom map selector
      disabled={!geolocation || !isAuthenticated}
      onClick={setLocation}
      gradientDuoTone="pinkToOrange"
      icon={HiOutlineMapPin}
    >
      Set your location
    </HomePageLink>
  );
}
