import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

function getApiUrl(latlng, query, limit) {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlng}&limit=${limit}`;
}

async function getCoffeeStorePhotos() {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40,
  });

  const photoResults = photos.response.results;

  return photoResults.map((result) => result.urls.small);
}

export async function fetchCoffeeStores(
  latLng = '6.43018533157696%2C3.4215868879949665',
  limit = 6
) {
  try {
    const photos = await getCoffeeStorePhotos();
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    };

    const res = await fetch(getApiUrl(latLng, 'coffee', limit), options);
    const data = await res.json();

    return data.results.map((result, index) => {
      return {
        id: result.fsq_id,
        name: result.name,
        address: result.location.formatted_address,
        // region: result.location.region,
        imgUrl: photos.length > 0 ? photos.at(index) : null,
      };
    });
  } catch (err) {
    console.log('Error', err);
  }
}
