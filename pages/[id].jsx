import Head from 'next/head';

function PageContent() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>{id}</title>
      </Head>
      <p>{id}</p>
    </div>
  );
}

export default PageContent;
