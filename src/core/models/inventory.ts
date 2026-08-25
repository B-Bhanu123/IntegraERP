import { BaseEntity, UUID, ISODateString, EntityStatus } from './types';

export enum ProductCategory {
  HARDWARE = 'HARDWARE',
  SOFTWARE = 'SOFTWARE',
  SERVICES = 'SERVICES',
  RAW_MATERIALS = 'RAW_MATERIALS',
  OFFICE_SUPPLIES = 'OFFICE_SUPPLIES',
  CONSUMABLES = 'CONSUMABLES',
}

export interface Product extends BaseEntity {
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  unitPrice: number;
  costPrice: number;
  unitOfMeasure: string;
  reorderPoint: number;
  reorderQuantity: number;
  isBatchTracked: boolean;
  isSerialTracked: boolean;
}

export interface Warehouse extends BaseEntity {
  code: string;
  name: string;
  address: string;
  city: string;
  country: string;
  capacityUnits: number;
  managerId?: UUID;
  isActive: boolean;
}

export interface StockItem extends BaseEntity {
  productId: UUID;
  warehouseId: UUID;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  binLocation?: string;
  batchNumber?: string;
  expirationDate?: ISODateString;
}

export interface StockMovement extends BaseEntity {
  referenceNumber: string;
  productId: UUID;
  sourceWarehouseId?: UUID;
  destinationWarehouseId?: UUID;
  movementType: 'INBOUND' | 'OUTBOUND' | 'TRANSFER' | 'ADJUSTMENT';
  quantity: number;
  performedBy: UUID;
  reason?: string;
}
