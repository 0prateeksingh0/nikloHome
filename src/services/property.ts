import api from './api';
import type { Property, CreatePropertyData, UpdatePropertyData } from '../types/property';

// Re-export types for backward compatibility
export type { Property, CreatePropertyData, UpdatePropertyData } from '../types/property';

export const propertyService = {
  async createProperty(data: CreatePropertyData): Promise<{ message: string; property: Property }> {
    const response = await api.post('/properties', data);
    return response.data;
  },

  async getProperties(): Promise<{ properties: Property[] }> {
    const response = await api.get('/properties');
    return response.data;
  },

  async getProperty(id: string): Promise<{ property: Property }> {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  async updateProperty(id: string, data: UpdatePropertyData): Promise<{ message: string; property: Property }> {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  async deleteProperty(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }
};
