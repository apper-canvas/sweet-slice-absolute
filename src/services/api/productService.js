import { toast } from "react-toastify";

class ProductService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'product_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "basePrice_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "customizable_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "name_c"}}
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
      console.error("Error fetching products:", error?.response?.data?.message || error);
      toast.error("Failed to load products");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "basePrice_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "customizable_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "name_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message || "Product not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      throw new Error("Product not found");
    }
  }

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "basePrice_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "customizable_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "name_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getFeatured(limit = 6) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "basePrice_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "customizable_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "name_c"}}
        ],
        pagingInfo: {"limit": limit, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async search(query) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "basePrice_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "customizable_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "name_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [{"fieldName": "name_c", "operator": "Contains", "values": [query]}], "operator": ""},
            {"conditions": [{"fieldName": "description_c", "operator": "Contains", "values": [query]}], "operator": ""},
            {"conditions": [{"fieldName": "category_c", "operator": "Contains", "values": [query]}], "operator": ""}
          ]
        }]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async create(product) {
    try {
      const params = {
        records: [{
          Tags: product.Tags || "",
          Name: product.Name,
          basePrice_c: product.basePrice_c,
          category_c: product.category_c,
          customizable_c: product.customizable_c || false,
          description_c: product.description_c,
          name_c: product.name_c
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
          console.error(`Failed to create ${failed.length} products:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error creating product:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, productData) {
    try {
      const updateFields = {};
      if (productData.Tags !== undefined) updateFields.Tags = productData.Tags;
      if (productData.Name !== undefined) updateFields.Name = productData.Name;
      if (productData.basePrice_c !== undefined) updateFields.basePrice_c = productData.basePrice_c;
      if (productData.category_c !== undefined) updateFields.category_c = productData.category_c;
      if (productData.customizable_c !== undefined) updateFields.customizable_c = productData.customizable_c;
      if (productData.description_c !== undefined) updateFields.description_c = productData.description_c;
      if (productData.name_c !== undefined) updateFields.name_c = productData.name_c;
      
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
          console.error(`Failed to update ${failed.length} products:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }
    } catch (error) {
      console.error("Error updating product:", error?.response?.data?.message || error);
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
          console.error(`Failed to delete ${failed.length} products:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      return false;
    } catch (error) {
      console.error("Error deleting product:", error?.response?.data?.message || error);
      throw error;
    }
  }
}
export default new ProductService();