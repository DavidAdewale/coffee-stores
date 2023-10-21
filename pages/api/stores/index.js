import { createStore, getStores } from '../controllers/storeController';

export default async function (req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      await getStores(req, res);
      break;

    case 'POST':
      await createStore(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
