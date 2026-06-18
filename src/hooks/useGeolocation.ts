import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const detect = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        setLoading(false);
      },
      () => {
        setError('Could not detect location. Please enter manually.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sos') === '1') return;
  }, []);

  return { location, setLocation, detect, loading, error };
}
