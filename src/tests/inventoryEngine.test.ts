import { describe, it, expect } from 'vitest';
import { InventoryEngine } from '../core/engine/inventoryEngine';
import { Product, StockItem, ProductCategory } from '../core/models/inventory';

describe('InventoryEngine Tests', () => {
  const engine = new InventoryEngine();

  const mockProduct: Product = {
    id: 'prod_1',
    sku: 'SKU-100',
    name: 'Enterprise Router',
    description: 'Hardware router',
    category: ProductCategory.HARDWARE,
    unitPrice: 500,
    costPrice: 300,
    unitOfMeasure: 'UNIT',
    reorderPoint: 10,
    reorderQuantity: 25,
    isBatchTracked: false,
    isSerialTracked: true,
    createdAt: '',
    updatedAt: '',
  };

  it('should trigger reorder warning when available stock <= reorder point', () => {
    const stockItems: StockItem[] = [
      { id: 's1', productId: 'prod_1', warehouseId: 'w1', quantityOnHand: 8, quantityReserved: 0, quantityAvailable: 8, createdAt: '', updatedAt: '' },
    ];

    const analysis = engine.evaluateReorderPoint(mockProduct, stockItems);
    expect(analysis.shouldReorder).toBe(true);
    expect(analysis.recommendedOrderQuantity).toBe(25);
    expect(analysis.estimatedCost).toBe(7500); // 25 * 300
  });

  it('should not reorder when stock is sufficient', () => {
    const stockItems: StockItem[] = [
      { id: 's1', productId: 'prod_1', warehouseId: 'w1', quantityOnHand: 50, quantityReserved: 0, quantityAvailable: 50, createdAt: '', updatedAt: '' },
    ];

    const analysis = engine.evaluateReorderPoint(mockProduct, stockItems);
    expect(analysis.shouldReorder).toBe(false);
  });
});
