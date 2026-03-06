# 🦁 Cologne Zoo Dashboard

Modern full-stack dashboard for exploring animals of the **Cologne Zoo**
Built with **Nuxt 3**, **Vue 3**, **TypeScript** — recovered, cleaned and actively evolving.

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt%203-18181B?logo=nuxt&logoColor=00DC82" alt="Nuxt 3">
  <img src="https://img.shields.io/badge/Vue%203-35495E?logo=vuedotjs&logoColor=4FC08D" alt="Vue 3">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white" alt="pnpm">
</p>

---

## ✨ Features (current & planned)

- 🐾 Browse animals with key information
- 📅 Calculated age display
- 🎨 Clean, responsive Tailwind styling
- 🔐 Full TypeScript (shared types between client & server)
- ⚡ Fast Nuxt 3 development experience with HMR

---

## 🛠 Tech Stack

| Layer              | Technology              |
| ------------------ | ----------------------- |
| Framework          | Nuxt 3                  |
| UI                 | Vue 3 (Composition API) |
| Language           | TypeScript (full-stack) |
| Styling            | Tailwind CSS            |
| Package Manager    | pnpm                    |
| Testing            | Vitest                  |
| Linting/Formatting | ESLint + Prettier       |
| State/Logic        | Vue composables         |

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ **18**
- pnpm (recommended)

```bash
# Install pnpm if you don't have it yet
npm install -g pnpm
```

### Installation & Development

```bash
# 1. Clone & enter directory

git clone https://github.com/YOUR-USERNAME/cologne-zoo-dashboard.git
cd cologne-zoo-dashboard
```

```bash
# 2. Install dependencies

pnpm install
```

```bash
# 3. Start development server

pnpm dev

```

### Other useful commands

```bash
# Build for production
pnpm build
```

```bash
# Preview production build locally
pnpm preview
```

```bash
# Run tests (watch mode)
pnpm test
```

```bash
# Run tests once (good for CI)
pnpm test:run
```

```bash
# Lint & fix
pnpm lint
```

## 📂 Project Structure

```
cologne-zoo-dashboard/
├─ components/ # Reusable Vue components
├─ composables/ # Shared logic & utilities
├─ server/ # API routes & server middleware
├─ utils/ # Pure helper functions
├─ types.ts # Shared TypeScript interfaces & types
├─ fakeData.ts # Temporary mock animal data
├─ app.vue # Root component
├─ nuxt.config.ts # Nuxt configuration
├─ tailwind.config.ts # Tailwind configuration
└─ tests/ # Vitest test files
```
