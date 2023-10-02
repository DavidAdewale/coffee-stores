import { table } from '../airtable';
import { catchAsync } from '@/utilities/catchAsync';

import AppError from '@/utilities/AppError';

export const createStore = catchAsync(async function (req, res) {
  const { id } = req.query;
  // console.log(req.body);
  // find record
  const store = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  // console.log(store);

  if (store.length !== 0) {
    const record = store.at(0).fields;
    return res.status(200).json({ data: record });
  } else {
    //create record
    const newRecord = req.body;
    const { id, name } = newRecord;

    if (!id && !name) {
      throw new AppError('Each store must have a name', 400);
    }
    const data = await table.create([{ fields: newRecord }]);

    const record = data.at(0).fields;
    return res.status(201).json({ data: record });
  }
});
