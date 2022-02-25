const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }

  async createIfNotExist() {
    let file;
    try {
      file = await fs.promises.readFile(this.file);
    } catch (error) {
      if (error.code == "ENOENT") {
        await fs.promises.writeFile(this.file, "[]").then(() => {
          console.log("No existe products.txt. Archivo creado.");
        });
        file = await fs.promises.readFile(this.file);
      } else {
        console.log("Hubo un error", error);
      }
    }
    return file;
  }

  async save(object) {
    const file = await this.createIfNotExist();
    const parsedFile = JSON.parse(file);
    if (!parsedFile.length) {
      object.id = 1;
    } else {
      object.id = parsedFile.at(-1).id + 1;
    }
    parsedFile.push(object);
    await fs.promises.writeFile(this.file, JSON.stringify(parsedFile, null, 2));
  }

  async getById(number) {
    const file = await this.createIfNotExist();
    return JSON.parse(file).find((e) => e.id === number);
  }

  async getAll() {
    const file = await this.createIfNotExist();
    return JSON.parse(file);
  }

  async deleteById(number) {
    const file = await this.createIfNotExist();
    const parsedAndFilterFile = JSON.parse(file).filter((e) => e.id !== number);
    await fs.promises.writeFile(this.file, JSON.stringify(parsedAndFilterFile));
  }

  async deleteAll() {
    fs.promises.unlink(this.file);
  }
}

const products = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

const containerOne = new Container("./products.txt");
containerOne.save(products[0]);
