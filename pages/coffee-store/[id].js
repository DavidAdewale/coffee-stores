import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BiSolidMap, BiSolidPin, BiSolidStar } from 'react-icons/bi';

import coffeeStoreData from '../../data/coffee-store.json';

import styles from '../../styles/coffee-store.module.css';
import Image from 'next/image';
import { fetchCoffeeStores } from '@/lib/coffee-shop';
import { useStore } from '@/context/StoreContext';
import { useEffect, useState } from 'react';
import { isObjectEmpty } from '@/utilities/helpers';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findStores = coffeeStores.find(
    (store) => store.id.toString() === params.id
  );
  return {
    props: {
      coffeestore: findStores ? findStores : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
function CoffeeStore({ coffeestore }) {
  const [store, setStore] = useState(coffeestore);
  const router = useRouter();
  // const { address, name, neighbourhood, imgUrl } = coffeestore;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const id = router.query.id;
  const {
    state: { coffeeStores },
  } = useStore();

  useEffect(() => {
    if (isObjectEmpty(coffeestore)) {
      if (coffeeStores.length > 0) {
        const currentStore = coffeeStores.find((store) => store.id === id);
        setStore(currentStore);
      }
    }
  }, [id]);

  // store = coffeestore;

  const { name, imgUrl, address } = store;

  function handleUpvote() {
    console.log('handle upvote');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/" className={styles.link}>
        &larr; Back to home
      </Link>
      <div className={styles.layout}>
        <div className={styles.col1}>
          <div className={styles.content}>
            <h1 className={styles.title}>{name}</h1>
            <Image
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              alt={name}
              width={600}
              height={360}
              className={styles.storeImg}
            />
          </div>
        </div>
        <div className={styles.col2}>
          <p>
            <BiSolidMap /> <span>{address}</span>
          </p>
          {/* <p>
            <BiSolidPin /> <span>{region}</span>
          </p> */}
          <p>
            <BiSolidStar /> <span> X Upvotes </span>
          </p>
          <button className={styles.button} onClick={handleUpvote}>
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
