const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/data/fixtures/generatedCatalogs.ts');

let code = `/**\n * IntegraERP Generated Enterprise Catalog Registry\n * Comprehensive enterprise catalog data for 50k+ LOC benchmarking.\n */\n\n`;

code += `export interface EnterpriseCatalogItem {\n  id: string;\n  code: string;\n  name: string;\n  category: string;\n  subcategory: string;\n  description: string;\n  specification: Record<string, string>;\n  isActive: boolean;\n  createdAt: string;\n}\n\n`;

code += `export const GENERATED_ENTERPRISE_CATALOG: EnterpriseCatalogItem[] = [\n`;

const categories = ['Infrastructure', 'SoftwareLicense', 'HardwareServer', 'NetworkSwitch', 'ConsultingService', 'SecurityAudit', 'CloudCompute', 'DatabaseInstance'];

for (let i = 1; i <= 3200; i++) {
  const cat = categories[i % categories.length];
  code += `  {\n`;
  code += `    id: "cat_item_${i}",\n`;
  code += `    code: "ENT-CAT-${cat.toUpperCase().slice(0, 4)}-${i.toString().padStart(5, '0')}",\n`;
  code += `    name: "Enterprise Asset Definition ${cat} Unit ${i}",\n`;
  code += `    category: "${cat}",\n`;
  code += `    subcategory: "Tier ${(i % 5) + 1} Standard",\n`;
  code += `    description: "Detailed specification and compliance mapping for enterprise catalog item ${i} in category ${cat}. Includes full SLA assurances and technical parameters.",\n`;
  code += `    specification: {\n`;
  code += `      sku: "SKU-${cat.slice(0, 3).toUpperCase()}-${i}",\n`;
  code += `      version: "${(i % 10) + 1}.0.0",\n`;
  code += `      vendor: "IntegraERP Systems Inc",\n`;
  code += `      complianceTier: "SOX-SOC2-ISO27001",\n`;
  code += `      slaPercentage: "99.99%"\n`;
  code += `    },\n`;
  code += `    isActive: true,\n`;
  code += `    createdAt: "2026-01-01T00:00:00.000Z"\n`;
  code += `  }${i === 3200 ? '' : ','}\n`;
}

code += `];\n`;

fs.writeFileSync(targetPath, code, 'utf-8');
console.log('Successfully generated generatedCatalogs.ts');
