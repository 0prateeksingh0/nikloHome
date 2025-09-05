export interface Property {
  id: string;
  name: string;
  location: string;
  brochure?: string;
  image?: string;
  model3d?: string;
  availableApartments: number;
  status: 'available' | 'in_process' | 'sold';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyData {
  name: string;
  location: string;
  brochure?: string;
  image?: string;
  model3d?: string;
  availableApartments?: number;
  status?: 'available' | 'in_process' | 'sold';
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {}
