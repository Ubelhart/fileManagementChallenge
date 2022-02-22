const fs = require("fs");

let products;

try {
  products = JSON.parse(fs.readFileSync("./products.txt"));
} catch (error) {
  products = [];
  fs.writeFileSync("./products.txt", JSON.stringify(products));
  console.log("No existe products.txt. Archivo creado", error);
}

class Container {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
  save(object) {
    object.id = products.length + 1;

    products.push(object);

    fs.writeFileSync("./products.txt", JSON.stringify(products));
  }

  getById(number) {
    return products.find((e) => {
      return e.id === number;
    });
  }

  getAll() {
    return products;
  }

  deleteById(number) {
    products = products.filter((e) => {
      return e.id !== number;
    });

    fs.writeFileSync("./products.txt", JSON.stringify(products));
  }

  deleteAll() {
    fs.unlinkSync("./products.txt");
  }
}

const productOne = new Container(
  "Escuadra",
  123.45,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
);

const productTwo = new Container(
  "Calculadora",
  234.56,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
);

const productThree = new Container(
  "Globo Terráqueo",
  345.67,
  "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
);

productOne.save(productOne);
