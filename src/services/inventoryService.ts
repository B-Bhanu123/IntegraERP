import { Product, StockItem } from '../core/models/inventory';
import { InventoryEngine, ReorderAnalysis } from '../core/engine/inventoryEngine';
import { UUID } from '../core/models/types';

export class InventoryService {
  private products: Map<UUID, Product> = new Map();
  private stockItems: Map<UUID, StockItem> = new Map();
  private inventoryEngine: InventoryEngine;

  constructor(initialProducts: Product[] = [], initialStock: StockItem[] = []) {
    this.inventoryEngine = new InventoryEngine();
    initialProducts.forEach((p) => this.products.set(p.id, p));
    initialStock.forEach((s) => this.stockItems.set(s.id, s));
  }

  public getAllProducts(): Product[] {
    return Array.from(this.products.values());
  }

  public getStockForProduct(productId: UUID): StockItem[] {
    return Array.from(this.stockItems.values()).filter((s) => s.productId === productId);
  }

  public getReorderAnalysisForProduct(productId: UUID): ReorderAnalysis {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error(`Product ${productId} not found.`);
    }

    const stock = this.getStockForProduct(productId);
    return this.inventoryEngine.evaluateReorderPoint(product, stock);
  }
}
