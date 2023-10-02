import { table } from '../config';

export async function createStore(req, res) {
  try {
    const { id } = req.query;
    console.log(req.body);
    // find record
    const store = await table
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage();

    console.log(store);

    if (store.length !== 0) {
      const record = store.at(0).fields;
      return res.status(200).json({ data: record });
    } else {
      //create record
      const newRecord = req.body;
      const data = await table.create([{ fields: newRecord }]);

      const record = data.at(0).fields;
      return res.status(201).json({ data: record });
    }
  } catch (err) {
    console.error('Something went wrong', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
