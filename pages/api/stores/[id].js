import {
  deleteStore,
  getStoreById,
  updateStore,
} from '../controllers/storeController';

export default async function (req, res) {
  const { method } = req;
  const { id } = req.query;
  switch (method) {
    case 'GET':
      await getStoreById(req, res, id);
      break;

    case 'PATCH':
      await updateStore(req, res, id);
      break;

    case 'DELETE':
      await deleteStore(req, res, id);
      break;

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
