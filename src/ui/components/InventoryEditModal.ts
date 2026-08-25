import { Product, ProductCategory } from '../../core/models/inventory';

export class InventoryEditModalComponent {
  public render(product?: Product): string {
    const isEdit = !!product;
    const title = isEdit ? `Edit Product: ${product.sku}` : 'Add Inventory Product';

    return `
      <div class="modal-overlay" id="inventoryModal">
        <div class="modal-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">${title}</h3>
            <button class="btn btn-secondary btn-sm" onclick="window.closeModal()">✕</button>
          </div>

          <form id="inventoryForm" onsubmit="window.saveProduct(event, '${product ? product.id : ''}')">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1rem;">
              <div class="form-group">
                <label>SKU</label>
                <input class="form-input" id="prodSku" type="text" required value="${product ? product.sku : 'HW-001'}" />
              </div>
              <div class="form-group">
                <label>Product Name</label>
                <input class="form-input" id="prodName" type="text" required value="${product ? product.name : ''}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Category</label>
                <select class="form-select" id="prodCat">
                  <option value="HARDWARE" ${product?.category === ProductCategory.HARDWARE ? 'selected' : ''}>Hardware</option>
                  <option value="SOFTWARE" ${product?.category === ProductCategory.SOFTWARE ? 'selected' : ''}>Software</option>
                  <option value="SERVICES" ${product?.category === ProductCategory.SERVICES ? 'selected' : ''}>Services</option>
                </select>
              </div>
              <div class="form-group">
                <label>Unit Price ($)</label>
                <input class="form-input" id="prodPrice" type="number" step="0.01" value="${product ? product.unitPrice : 500}" />
              </div>
              <div class="form-group">
                <label>Cost Price ($)</label>
                <input class="form-input" id="prodCost" type="number" step="0.01" value="${product ? product.costPrice : 300}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label>Reorder Point (Units)</label>
                <input class="form-input" id="prodReorderPoint" type="number" value="${product ? product.reorderPoint : 15}" />
              </div>
              <div class="form-group">
                <label>Reorder Quantity</label>
                <input class="form-input" id="prodReorderQty" type="number" value="${product ? product.reorderQuantity : 30}" />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Product'}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
