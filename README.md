# IntegraERP - Enterprise Resource Planning & Management Platform

IntegraERP is a comprehensive, modern Enterprise Resource Planning (ERP) platform designed for managing complex organizational workflows, financial ledgers, inventory supply chains, human resources, customer relations, and project dependencies.

## Key Features

- **Core Workflow Engine**: Finite State Machine for stateful task, invoice, and process approvals.
- **Project & Task Engine**: Topological dependency resolver, Critical Path Method (CPM), interactive Kanban, and Gantt charts.
- **Financial Ledger & Accounting Engine**: Double-entry bookkeeping system, automated trial balance, tax calculations, and multi-currency ledgers.
- **Inventory & Supply Chain Engine**: Reorder point optimization, FIFO/LIFO valuation, warehouse multi-node tracking.
- **Human Capital Management (HR)**: Payroll tax calculator, attendance tracking, organogram management, performance scoring.
- **CRM & Sales Pipeline**: Lead tracking, opportunity funnel, contract life cycle management.
- **RBAC & Security System**: Hierarchical permission matrices, audit event logging, JWT verification layer.
- **Analytics & Reporting**: Lead-time metrics, financial forecasting, inventory turnover rates, export services (JSON, CSV, PDF).

## Tech Stack

- **Frontend / UI**: HTML5, TypeScript, Vite, Vanilla CSS (Glassmorphism design tokens, CSS variables, dark theme).
- **Core Engine & Logic**: Modular TypeScript enterprise engines, state machines, graph algorithms.
- **Testing**: Vitest automated unit & integration test suites.

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Build Production Bundle

```bash
npm run build
```

## Architecture Overview

```
src/
├── core/                  # Domain Models, Security, Accounting & Workflow Engines
│   ├── models/            # 25+ Enterprise Domain Entities & Schemas
│   ├── engine/            # State Machines, Topological Sorters, Tax & Ledger Engines
│   ├── security/          # RBAC Engine, Permission Matrix & Audit Logger
│   └── analytics/         # Metric Aggregators & Financial Forecasting
├── services/              # Business Logic & Service Abstraction Layers
├── ui/                    # Premium UI Components, Styling System & Page Layouts
├── data/                  # Large Synthetic Seed Fixtures & Data Generators
└── tests/                 # Vitest Automated Unit & Integration Tests
```

## License

MIT
