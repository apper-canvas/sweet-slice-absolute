import productsData from "@/services/mockData/products.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async getAll() {
    await delay(300);
    return [...this.products];
  }

  async getById(id) {
    await delay(200);
    const product = this.products.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  }

  async getByCategory(category) {
    await delay(250);
    return this.products.filter(p => p.category === category).map(p => ({ ...p }));
  }

  async getFeatured(limit = 6) {
    await delay(200);
    return this.products.slice(0, limit).map(p => ({ ...p }));
  }

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    ).map(p => ({ ...p }));
  }

  async create(product) {
    await delay(400);
    const newId = Math.max(...this.products.map(p => p.Id)) + 1;
    const newProduct = {
      ...product,
      Id: newId
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, productData) {
    await delay(350);
    const index = this.products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.products[index] = { ...this.products[index], ...productData };
    return { ...this.products[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    const deleted = this.products.splice(index, 1)[0];
    return { ...deleted };
  }
}

export default new ProductService();