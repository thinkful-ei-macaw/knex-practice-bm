/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

// ======================================================
// queries

function searchByName(searchTerm) {
  return knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
      return result;
    });
}

function getItemsByPage(pageNumber) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (pageNumber - 1);
  return knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
      return result;
    });
}

function getItemsAddedAfterDate(daysAgo) {
  return knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      // eslint-disable-next-line quotes
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result);
      return result;
    });
}

function getCategoryCosts() {
  return knexInstance
    .select('category')
    .sum('price AS total_price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
      return result;
    });
}

getCategoryCosts();