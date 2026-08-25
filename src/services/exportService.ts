export class ExportService {
  public static toJSON<T>(data: T, pretty = true): string {
    return JSON.stringify(data, null, pretty ? 2 : 0);
  }

  public static toCSV<T extends Record<string, unknown>>(data: T[]): string {
    if (!data || data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);
    const csvRows: string[] = [];

    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header];
        const stringVal = val === null || val === undefined ? '' : String(val);
        const escaped = stringVal.replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  public static toMarkdownTable<T extends Record<string, unknown>>(data: T[]): string {
    if (!data || data.length === 0) {
      return '*No records available*';
    }

    const headers = Object.keys(data[0]);
    const headerLine = `| ${headers.join(' | ')} |`;
    const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;

    const rows = data.map((row) => {
      const values = headers.map((h) => String(row[h] ?? ''));
      return `| ${values.join(' | ')} |`;
    });

    return [headerLine, separatorLine, ...rows].join('\n');
  }
}
