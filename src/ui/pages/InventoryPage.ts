import { InventoryService } from '../../services/inventoryService';
import { ENTERPRISE_WAREHOUSES } from '../../data/fixtures/largeDatasets';

export class InventoryPage {
  private inventoryService: InventoryService;

  constructor(inventoryService: InventoryService) {
    this.inventoryService = inventoryService;
  }

  public render(): string {
    const products = this.inventoryService.getAllProducts();

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Warehouse Nodes Summary -->
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Global Logistics Nodes & Warehouses</h2>
          <div class="metrics-grid">
            ${ENTERPRISE_WAREHOUSES.map(
              (wh) => `
              <div class="glass-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="badge badge-info">${wh.code}</span>
                  <span class="badge badge-success">ACTIVE</span>
                </div>
                <div style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-top: 0.75rem;">${wh.name}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${wh.city}, ${wh.country}</div>
                <div style="margin-top: 1rem; font-size: 0.875rem;">Capacity: <strong>${wh.capacityUnits.toLocaleString()} units</strong></div>
              </div>
            `
            ).join('')}
          </div>
        </div>

        <!-- Product Inventory Catalog Table -->
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Product Inventory & Reorder Point Status</h2>
            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-primary btn-sm" onclick="window.openCreateProductModal()">+ Add Product</button>
              <button class="btn btn-secondary btn-sm" onclick="alert('Restock order generated for all items below reorder threshold!')">📦 Run Auto Reorder</button>
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Cost Price</th>
                <th>Reorder Threshold</th>
                <th>Reorder Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${products
                .map(
                  (prod) => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-secondary);">${prod.sku}</td>
                  <td style="font-weight: 600; color: #fff;">${prod.name}</td>
                  <td><span class="badge badge-info">${prod.category}</span></td>
                  <td style="font-family: var(--font-mono);">$${prod.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td style="font-family: var(--font-mono);">$${prod.costPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td>${prod.reorderPoint} units</td>
                  <td>${prod.reorderQuantity} units</td>
                  <td>
                    <span class="badge ${prod.reorderPoint > 0 ? 'badge-warning' : 'badge-success'}">
                      ${prod.reorderPoint > 0 ? 'REORDER MONITOR' : 'OPTIMAL'}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="window.openEditProductModal('${prod.id}')">✏️ Edit</button>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
