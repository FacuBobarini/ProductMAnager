import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 1;
  }

  async #checkProducts() {
    this.products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(this.products);
  }

  async getProducts() {
    return await this.#checkProducts();
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    let codeErr = false;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Completa todos los campos!");
    } else {
      const newProduct = {
        id: this.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.map((result) => {
        if (result.code === newProduct.code) {
          codeErr = true;
        }
      });

      !codeErr && this.id++;

      codeErr === true
        ? console.log("El codigo ya esta en uso")
        : this.products.push(newProduct);

      await fs.writeFile(this.path, JSON.stringify(this.products));
    }
  }

  async getProductById(id) {
    let allproducts = await this.#checkProducts();

    let result = allproducts.find((product) => product.id === id);

    return result;
  }

  async deleteProductById(id) {
    let allproducts = await this.#checkProducts();

    let result = allproducts.find((product) => product.id === id);

    let destroyProduct = allproducts.filter((product) => product.id != id);

    return result
      ? await fs.writeFile(this.path, JSON.stringify(destroyProduct))
      : console.log("ID no valido");
  }

  async updateProducts({ id, ...updateProduct }) {
    await this.deleteProductById(id);

    let otherProducts = await this.#checkProducts();

    let updatedProduct = [{ id, ...updateProduct }, ...otherProducts];

    return await fs.writeFile(this.path, JSON.stringify(updatedProduct));
  }
}

const newProduct = new ProductManager("./products.txt");
/*
newProduct.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

newProduct.addProduct("title2", "description2", 20, "thumbnail2", "code1", 6);

newProduct.addProduct("title3", "description3", 50, "thumbnail3", "code3", 5);

newProduct.addProduct("title4", "description4", 50, "thumbnail4", "code4", 8);

newProduct.addProduct("title5", "description5", 50, "thumbnail5", "code5", 3);

newProduct.addProduct("title6", "description6", 50, "thumbnail6", "code6", 2);

newProduct.addProduct("title6", "description7", 50, "thumbnail7", "code7", 2);

newProduct.addProduct("title6", "description8", 50, "thumbnail8", "code8", 2);

newProduct.addProduct("title6", "description9", 50, "thumbnail9", "code9", 2);

newProduct.addProduct(
  "title6",
  "description10",
  50,
  "thumbnail10",
  "code10",
  2
);*/

export { newProduct };
