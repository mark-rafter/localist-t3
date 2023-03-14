import { HomePageLink } from "@/components/home";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    const getPositionPromise = new Promise(
      (resolve: PositionCallback, reject: PositionErrorCallback) => {
        navigator.geolocation?.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          enableHighAccuracy: false,
        });
      }
    );

    toast
      .promise(getPositionPromise, {
        loading: "Updating location",
        success: "Location updated!",
        error: (err: PositionErrorCallback) =>
          `Could not update location ${err.toString()}`,
      })
      .catch(console.error);

    getPositionPromise.then(
      ({ coords }) =>
        mutate({
          lat: coords.latitude,
          long: coords.longitude,
        }),
      console.error
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
