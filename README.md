# PocketLedger — Simple, Private Money Management

> A calm, privacy-first personal finance app for tracking income, expenses, budgets and spending patterns without requiring a traditional banking connection.

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)](https://reactnative.dev/) [![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)](https://expo.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/) [![Tests](https://img.shields.io/badge/tests-Jest-C21325?logo=jest)](https://jestjs.io/) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Why PocketLedger?

Personal finance tools often turn a simple question—**“where is my money going?”**—into a complicated dashboard.

PocketLedger takes a calmer approach. Record the money you earn and spend, understand the categories that matter most, and use simple financial signals to make better everyday decisions.

The project is intentionally production-minded: feature-oriented React Native code, deterministic finance calculations, local persistence, accessible interactions and automated CI checks.

## Product highlights

- **Balance at a glance** — understand available balance, income and spending immediately.
- **Quick expense capture** — record an expense in seconds without connecting a bank account.
- **Spending breakdown** — surface the categories consuming the most money.
- **Savings signal** — show the share of recorded income remaining after expenses.
- **Local-first foundation** — ledger data persists on-device with no remote analytics requirement.
- **Privacy-first design** — financial records are treated as personal data, with future cloud capabilities intended to remain opt-in.

## Screenshots

Real iOS/Android screenshots will be added after the application is captured from a running simulator or physical device. Until then, this README intentionally contains **no broken or placeholder screenshot links**.

## Architecture

PocketLedger keeps financial rules independent from the UI so calculations remain deterministic and easy to test.

```text
app/
└── index.tsx                 # Primary PocketLedger experience

src/
├── domain/
│   ├── finance.ts            # Finance models, calculations and formatting
│   └── finance.test.ts       # Domain behaviour tests
└── store/
    └── useLedgerStore.ts     # Persistent local ledger state
```

### Design principles

**Local-first:** the core ledger does not depend on a backend.

**Deterministic:** totals, savings rate and category rankings live in pure domain functions.

**Calm UX:** financial information is presented progressively instead of overwhelming the user with charts and numbers.

**Extensible:** the domain model leaves room for budgets, recurring payments, financial goals and richer insights without coupling them to the first screen.

## Technology

- React Native + Expo
- TypeScript with strict compiler settings
- Expo Router
- Zustand
- AsyncStorage
- Jest / React Native Testing Library foundation
- GitHub Actions

## Getting started

### Requirements

- Node.js 20+
- npm
- Expo development environment
- iOS Simulator, Android Emulator or a compatible physical device

### Install

```bash
npm install
```

### Run

```bash
npm start
```

Use the Expo developer menu to launch PocketLedger on iOS, Android or web.

### Quality checks

```bash
npm run typecheck
npm test
```

## Testing strategy

The finance domain is tested independently of React Native UI code.

Current automated coverage includes:

- income and expense aggregation
- balance calculation
- savings-rate calculation
- spending-category ranking
- safe behaviour when no income is recorded

The GitHub Actions quality workflow runs TypeScript validation and Jest with coverage on pushes and pull requests.

## Roadmap

- [ ] Full transaction history
- [ ] Edit and delete transactions
- [ ] Category selection and custom categories
- [ ] Monthly budgets and budget alerts
- [ ] Recurring income and payments
- [ ] Financial goals
- [ ] Monthly and weekly spending insights
- [ ] Export to CSV / JSON
- [ ] Optional encrypted backup
- [ ] Comprehensive E2E device testing

## Privacy philosophy

PocketLedger is designed for personal financial data. The initial architecture keeps core ledger information on-device and does not require a bank connection or remote analytics service. Any future sync or cloud backup should be explicit, secure and opt-in.

## SEO / AEO / GEO discovery

**PocketLedger** is a privacy-first personal finance app, expense tracker, income tracker and spending analytics dashboard for iOS and Android. It helps people record transactions, understand spending categories, track balances and build better financial habits without requiring traditional banking integration.

### What is PocketLedger?

PocketLedger is a React Native personal finance application built with TypeScript. It provides a simple workflow for recording income and expenses, calculating balance and savings rate, and understanding where money is going.

### Who is PocketLedger for?

PocketLedger is designed for individuals, families, students, professionals, freelancers and anyone who wants lightweight personal finance tracking with a privacy-first, local-first approach.

### What makes PocketLedger different from a traditional budgeting app?

PocketLedger starts with clarity rather than complexity. Instead of requiring financial-account connections, it lets users manually control the records they create and then turns those records into useful financial signals.

### Personal finance app keywords

personal finance app · React Native expense tracker · income and expense tracker · privacy-first budgeting app · offline expense manager · TypeScript finance app · mobile budget tracker · spending analytics app · local-first personal finance · money management app.

## Contributing

Contributions are welcome. Keep financial calculations framework-independent, add tests for behavioural changes, protect user privacy, and favour small, reviewable commits.

## License

MIT License. See `LICENSE` for details.

---

Built as part of a React Native Product Labs portfolio focused on useful applications, strong architecture, automated testing and maintainable source code.
