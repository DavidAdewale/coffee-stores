import { StoreProvider } from '@/context/StoreContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const year = new Date().getFullYear();
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
