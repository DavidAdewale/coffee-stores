import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '@/components/banner';
import Image from 'next/image';
import Card from '@/components/card';
import { fetchCoffeeStores } from '@/lib/coffee-shop';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';

export async function getStaticProps(context) {
  try {
    const stores = await fetchCoffeeStores();
    // const stores = {};

    return {
      props: { stores },
    };
  } catch (err) {
    console.log('Error', err);
  }
}

export default function Home({ stores }) {
  const { state, dispatch } = useStore();
  const { handleTrackLocation, errorMsg } = useGeolocation(dispatch);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { coffeeStores, latLng } = state;

  useEffect(() => {
    async function fetchData() {
      if (latLng) {
        try {
          setIsLoading(true);
          const res = await fetch(
            `/api/coffeeStores?latLng=${latLng}&limit=30`
          );

          const data = await res.json();
          dispatch({ type: 'set/stores', payload: data.stores });
          setError('');
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        }
      }
    }

    fetchData();
  }, [latLng]);

  console.log(state);
  function handleBannerClick() {
    handleTrackLocation();
  }

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <section className={styles.main}>
          <div>
            <Banner
              buttonText={`${isLoading ? 'Loading...' : 'View stores nearby'}`}
              onClick={handleBannerClick}
            />
            {errorMsg && <p>Something went wrong: {errorMsg}</p>}
            {error && <p>Something went wrong: {error}</p>}
          </div>
          <Image
            src="/static/hero-img.png"
            width={600}
            height={550}
            alt="hero-image"
            className={styles.image}
          />
        </section>
      </main>
      {coffeeStores.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.heading2}>Stores near me</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map((store) => (
              <Card
                name={store.name}
                key={store.id}
                href={`/coffee-store/${store.id}`}
                imgUrl={
                  store.imgUrl ||
                  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                }
                alt={store.name}
                className={styles.card}
              />
            ))}
          </div>
        </section>
      )}

      {stores.length && (
        <section className={styles.section}>
          <h2 className={styles.heading2}>V.I Stores</h2>
          <div className={styles.cardLayout}>
            {stores.map((store) => (
              <Card
                name={store.name}
                key={store.id}
                href={`/coffee-store/${store.id}`}
                imgUrl={
                  store.imgUrl ||
                  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                }
                alt={store.name}
                className={styles.card}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
