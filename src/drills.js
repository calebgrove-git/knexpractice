require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
});

function getItemsWithText(searchTerm) {
  knexInstance
    .from('shopping_list')
    .select('name', 'price', 'category')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((results) => {
      console.log(results);
    });
}

function getItemsPaginated(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pagenumber - 1);
  knexInstance
    .from('shopping_list')
    .select('name', 'price', 'category')
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

function getItemsAddedAfterDate(daysAgo) {
  knexInstance
    .from('shopping_list')
    .select('name', 'price', 'category', 'date_added')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .orderBy([{ column: 'date_added', order: 'DESC' }])
    .then((results) => {
      console.log(results);
    });
}
function getTotalCostCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then((result) => {
      console.log('COST PER CATEGORY');
      console.log(result);
    });
}
