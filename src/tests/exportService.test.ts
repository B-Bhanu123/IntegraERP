import { describe, it, expect } from 'vitest';
import { ExportService } from '../services/exportService';

describe('ExportService Tests', () => {
  const sampleData = [
    { id: '1', name: 'Alice', role: 'Admin' },
    { id: '2', name: 'Bob', role: 'User' },
  ];

  it('should serialize object array to valid JSON string', () => {
    const json = ExportService.toJSON(sampleData);
    expect(json).toContain('"name": "Alice"');
    const parsed = JSON.parse(json);
    expect(parsed.length).toBe(2);
  });

  it('should export object array to formatted CSV string', () => {
    const csv = ExportService.toCSV(sampleData);
    expect(csv).toContain('id,name,role');
    expect(csv).toContain('"1","Alice","Admin"');
    expect(csv).toContain('"2","Bob","User"');
  });

  it('should format object array as Markdown table', () => {
    const markdown = ExportService.toMarkdownTable(sampleData);
    expect(markdown).toContain('| id | name | role |');
    expect(markdown).toContain('| Alice |');
  });
});
