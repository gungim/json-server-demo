const faker = require("faker");
const fs = require("fs");
const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (cateforyList, numberOfProduct) => {
  if (numberOfProduct <= 0) return [];
  const productList = [];

  for (let category of cateforyList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnaiUrl: faker.image.imageUrl(400, 400),
        categoryId: category.id,
      };

      productList.push(product);
    });
  }

  return productList;
};

faker.locale = "vi";
(() => {
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("generate success");
  });
})();
