import { createStore } from '../storeFunctions/createStore';
import { deleteStore } from '../storeFunctions/deleteStore';
import { getStores } from '../storeFunctions/getStores';
import { getStoreById } from '../storeFunctions/getStoreById';
import { updateStore } from '../storeFunctions/updateStore';

export default async function (req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      const { id } = req.query;
      if (id) {
        await getStoreById(req, res);
      } else {
        await getStores(req, res);
      }
      break;

    // case 'POST':
    //   await createStore(req, res);
    //   break;

    // case 'PATCH':
    //   await updateStore(req, res);
    //   break;

    // case 'DELETE':
    //   await deleteStore(req, res);
    //   break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
