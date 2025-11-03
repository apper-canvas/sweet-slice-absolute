import ordersData from "@/services/mockData/orders.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    this.orders = [...ordersData];
  }

  async getAll() {
    await delay(300);
    return [...this.orders];
  }

  async getById(id) {
    await delay(200);
    const order = this.orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  }

  async getByOrderId(orderId) {
    await delay(200);
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  }

  async create(orderData) {
    await delay(500);
    const newId = Math.max(...this.orders.map(o => o.Id)) + 1;
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`;
    
    const newOrder = {
      ...orderData,
      Id: newId,
      orderId: orderNumber,
      status: "pending"
    };
    
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async update(id, orderData) {
    await delay(350);
    const index = this.orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    this.orders[index] = { ...this.orders[index], ...orderData };
    return { ...this.orders[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Order not found");
    }
    const deleted = this.orders.splice(index, 1)[0];
    return { ...deleted };
  }

  async getByCustomer(email) {
    await delay(250);
    return this.orders.filter(o => o.email === email).map(o => ({ ...o }));
  }
}

export default new OrderService();