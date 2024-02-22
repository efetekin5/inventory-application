const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, numberInStock) {
  const itemdetail = { name: name, description: description, category: category, price: price, numberInStock: numberInStock };

  const item = new Item(itemdetail);

  await item.save();
  item[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Men's Clothing", "Men's clothing refers to garments designed for men, including shirts, t-shirts, trousers, jeans, suits, jackets, and more."),
    categoryCreate(1, "Women's Cloting", "Women's clothing encompasses a vast array of styles, designs, and materials tailored to suit various preferences, occasions, and body types."),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, "Mens Cotton Jacket", "great outerwear jackets for Spring, Autumn, Winter and suitable for many occasions,", categories[0], 75.97, 11),
    itemCreate(1, "Opna Women's Short Sleeve Moisture", "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit", categories[1], 25.97, 32),
  ]);
}