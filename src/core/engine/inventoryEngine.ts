import { Product, StockItem } from '../models/inventory';

export interface ReorderAnalysis {
  productId: string;
  productName: string;
  sku: string;
  currentAvailable: number;
  reorderPoint: number;
  recommendedOrderQuantity: number;
  shouldReorder: boolean;
  estimatedCost: number;
}

export class InventoryEngine {
  public evaluateReorderPoint(product: Product, stockItems: StockItem[]): ReorderAnalysis {
    const totalAvailable = stockItems
      .filter((item) => item.productId === product.id)
      .reduce((sum, item) => sum + item.quantityAvailable, 0);

    const shouldReorder = totalAvailable <= product.reorderPoint;
    const recommendedOrderQuantity = shouldReorder ? product.reorderQuantity : 0;
    const estimatedCost = recommendedOrderQuantity * product.costPrice;

    return {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      currentAvailable: totalAvailable,
      reorderPoint: product.reorderPoint,
      recommendedOrderQuantity,
      shouldReorder,
      estimatedCost,
    };
  }

  public calculateInventoryValuation(products: Product[], stockItems: StockItem[]): number {
    let totalValuation = 0;

    const productMap = new Map<string, Product>();
    products.forEach((p) => productMap.set(p.id, p));

    stockItems.forEach((stock) => {
      const product = productMap.get(stock.productId);
      if (product) {
        totalValuation += stock.quantityOnHand * product.costPrice;
      }
    });

    return totalValuation;
  }
}
