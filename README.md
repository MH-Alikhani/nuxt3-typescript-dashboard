# Cologne Zoo - Dashboard

This **Nuxt 3 + TypeScript** application for managing animals, their feeding schedules, and food consumption summaries.

This project demonstrates clean architecture using composables, server APIs, reusable components, and unit testing.

## 🚀 Features

- 📋 Animal listing with detailed view
- 🐶 Individual animal profile pages
- 🍽 Feeding schedule management
- 📊 Food consumption summary calculator
- 🧮 Age calculation utilities
- 🔁 Reusable composables for business logic
- 🧪 Unit testing with Vitest
- 🎨 Styled using Tailwind CSS
- ⚡ Built with Nuxt 3 and TypeScript

## 🏗 Tech Stack

- **Framework:** Nuxt 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest
- **Package Manager:** pnpm
- **Architecture:** Composable-driven state management

## 📁 Project Structure

```
.
├── components/
│   ├── FeedingScheduleForm.vue
│   ├── FeedingScheduleList.vue
│   ├── FeedingTaskItem.vue
│   ├── FoodSummary.vue
│   └── TheAnimalTable.vue
│
├── composables/
│   ├── useAnimals.ts
│   ├── useFeedingSchedule.ts
│   └── useFoodCalculator.ts
│
├── pages/
│   ├── index.vue
│   ├── animals/[id].vue
│   └── feeding/index.vue
│
├── server/api/
│   └── animals.get.ts
│
├── utils/
│   ├── useCalculateAgeInYears.ts
│   └── useCalculateAgeInYears.test.ts
│
├── test/nuxt/
│   └── component.test.ts
│
├── fakeData.ts
├── types.ts
└── nuxt.config.ts
```

## 🧠 Architecture Overview

### 1️⃣ Components

Reusable UI components responsible for presentation:

- **FeedingScheduleForm** – Add/edit feeding tasks
- **FeedingScheduleList** – Display scheduled feedings
- **FeedingTaskItem** – Individual feeding task
- **FoodSummary** – Displays food consumption summary
- **TheAnimalTable** – Animal overview table

### 2️⃣ Composables

Business logic and state management are handled via composables:

- `useAnimals()` – Fetch and manage animal data
- `useFeedingSchedule()` – Manage feeding tasks
- `useFoodCalculator()` – Calculate food totals

This keeps components clean and focused on UI.

### 3️⃣ Server API

Located in:

```
server/api/animals.get.ts
```

Provides mock API endpoint for retrieving animal data.

### 4️⃣ Utilities

- `useCalculateAgeInYears.ts` – Calculates age based on birthdate
- Fully unit tested

### 5️⃣ Testing

Testing is implemented using **Vitest**.

Test locations:

- `utils/useCalculateAgeInYears.test.ts`
- `test/nuxt/component.test.ts`

Run tests with:

```bash
pnpm test
```

## ⚙️ Installation

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

App will be available at:

```
http://localhost:3000
```

## 📜 Available Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Build for production     |
| `pnpm preview` | Preview production build |
| `pnpm test`    | Run unit tests           |

## 🐶 Application Pages

### `/`

Main dashboard page.

### `/animals`

Displays all animals in a table format.

### `/animals/[id]`

Individual animal detail page.

### `/feeding`

Manage feeding schedules and track food usage.

## 🧮 Food Calculation Logic

The food calculator:

- Aggregates feeding tasks
- Calculates total food consumption
- Summarizes food usage per animal

Logic is isolated inside:

```
composables/useFoodCalculator.ts
```

## 🧪 Testing Strategy

The project includes:

- Utility function testing
- Component testing
- Logic isolation via composables

This ensures:

- Maintainable business logic
- Predictable behavior
- Safer refactoring

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Fully responsive layout
- Clean component-based UI structure

Configuration:

```
tailwind.config.js
```

## 📦 Type Safety

All domain types are centralized in:

```
types.ts
```

This ensures:

- Strong typing across the app
- Clear domain modeling
- Reduced runtime errors

## 🛠 Development Notes

- Uses mock data (`fakeData.ts`)
- API layer structured for easy backend replacement
- Modular composables allow easy scaling
- Clean separation between:
    - UI
    - State logic
    - Utilities
    - API layer

## 👨‍💻 Author

Developed by Mohammad Hossein Alikhani
