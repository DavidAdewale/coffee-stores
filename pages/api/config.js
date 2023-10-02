const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

export const table = base('stores');
