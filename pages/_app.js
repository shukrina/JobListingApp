import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleError = (err) => console.error('Route error:', err);
    router.events.on('routeChangeError', handleError);
    return () => router.events.off('routeChangeError', handleError);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;