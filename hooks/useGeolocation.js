import { useState } from 'react';

export function useGeolocation(dispatch) {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    dispatch({
      type: 'set/latLng',
      payload: `${lat},${lng}`,
    });
    setErrorMsg('');
    setIsLoading(false);
  }

  function error() {
    setErrorMsg('Unable to retrieve your location');
    setIsLoading(false);
  }

  function handleTrackLocation() {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return { handleTrackLocation, errorMsg, isLoading };
}
