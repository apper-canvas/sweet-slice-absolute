import { toast } from "react-toastify";

class OrderService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'order_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "customerName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "deliveryDate_c"}},
          {"field": {"Name": "deliveryMethod_c"}},
          {"field": {"Name": "deliveryTime_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "totalAmount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "specialInstructions_c"}},
          {"field": {"Name": "orderId_c"}}
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching orders:", error?.response?.data?.message || error);
      toast.error("Failed to load orders");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "customerName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "deliveryDate_c"}},
          {"field": {"Name": "deliveryMethod_c"}},
          {"field": {"Name": "deliveryTime_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "totalAmount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "specialInstructions_c"}},
          {"field": {"Name": "orderId_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message || "Order not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error?.response?.data?.message || error);
      throw new Error("Order not found");
    }
  }

  async getByOrderId(orderId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "customerName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "deliveryDate_c"}},
          {"field": {"Name": "deliveryMethod_c"}},
          {"field": {"Name": "deliveryTime_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "totalAmount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "specialInstructions_c"}},
          {"field": {"Name": "orderId_c"}}
        ],
        where: [{"FieldName": "orderId_c", "Operator": "EqualTo", "Values": [orderId]}]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message || "Order not found");
      }
      
      if (!response.data || response.data.length === 0) {
        throw new Error("Order not found");
      }
      
      return response.data[0];
    } catch (error) {
      console.error(`Error fetching order by orderId ${orderId}:`, error?.response?.data?.message || error);
      throw new Error("Order not found");
    }
  }

  async create(orderData) {
    try {
      const orderNumber = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
      
      const params = {
        records: [{
          Name: orderData.Name || orderNumber,
          Tags: orderData.Tags || "",
          customerName_c: orderData.customerName,
          email_c: orderData.email,
          phone_c: orderData.phone,
          deliveryDate_c: orderData.deliveryDate,
          deliveryMethod_c: orderData.deliveryMethod,
          deliveryTime_c: orderData.deliveryTime,
          items_c: JSON.stringify(orderData.items),
          totalAmount_c: orderData.totalAmount,
          status_c: "pending",
          specialInstructions_c: orderData.specialInstructions || "",
          orderId_c: orderNumber
        }]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} orders:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error creating order:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, orderData) {
    try {
      const updateFields = {};
      if (orderData.Name !== undefined) updateFields.Name = orderData.Name;
      if (orderData.Tags !== undefined) updateFields.Tags = orderData.Tags;
      if (orderData.customerName !== undefined) updateFields.customerName_c = orderData.customerName;
      if (orderData.email !== undefined) updateFields.email_c = orderData.email;
      if (orderData.phone !== undefined) updateFields.phone_c = orderData.phone;
      if (orderData.deliveryDate !== undefined) updateFields.deliveryDate_c = orderData.deliveryDate;
      if (orderData.deliveryMethod !== undefined) updateFields.deliveryMethod_c = orderData.deliveryMethod;
      if (orderData.deliveryTime !== undefined) updateFields.deliveryTime_c = orderData.deliveryTime;
      if (orderData.items !== undefined) updateFields.items_c = JSON.stringify(orderData.items);
      if (orderData.totalAmount !== undefined) updateFields.totalAmount_c = orderData.totalAmount;
      if (orderData.status !== undefined) updateFields.status_c = orderData.status;
      if (orderData.specialInstructions !== undefined) updateFields.specialInstructions_c = orderData.specialInstructions;
      if (orderData.orderId !== undefined) updateFields.orderId_c = orderData.orderId;
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateFields
        }]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} orders:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error updating order:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = { 
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} orders:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      return false;
    } catch (error) {
      console.error("Error deleting order:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getByCustomer(email) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "customerName_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "deliveryDate_c"}},
          {"field": {"Name": "deliveryMethod_c"}},
          {"field": {"Name": "deliveryTime_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "totalAmount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "specialInstructions_c"}},
          {"field": {"Name": "orderId_c"}}
        ],
        where: [{"FieldName": "email_c", "Operator": "EqualTo", "Values": [email]}]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching orders by customer:", error?.response?.data?.message || error);
      return [];
    }
  }
}

export default new OrderService();