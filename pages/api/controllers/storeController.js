import { table } from '../airtable';
import { catchAsync } from '@/utilities/catchAsync';

import AppError from '@/utilities/AppError';

export const getStores = catchAsync(async (req, res) => {
  const stores = await table.select().all();
  res.json({ message: stores.at(0) });
});

export const getStoreById = catchAsync(async (req, res, id) => {
  const store = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (store.length === 0) {
    throw new AppError('This store does not exist', 404);
  }

  const record = store.at(0).fields;
  res.status(200).json({ data: record });
});

export const createStore = catchAsync(async function (req, res) {
  const newRecord = req.body;
  const { id, name } = newRecord;

  if (!id && !name) {
    throw new AppError('Each store must have a name', 400);
  }
  const data = await table.create([{ fields: newRecord }]);

  const record = data.at(0).fields;
  return res.status(201).json({ data: record });
});

export const updateStore = catchAsync(async (req, res, id) => {
  res.json({ message: 'update a store' });
});

export const deleteStore = catchAsync(async (req, res, id) => {
  res.json({ message: 'deleting a store' });
});
