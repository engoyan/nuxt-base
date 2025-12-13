# ORM Layer for Nuxt

This layer provides ORM integration for Nuxt applications using a pnpm workspace setup.

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup Steps

1. **Create a pnpm workspace** (if not already set up)

   Create a `pnpm-workspace.yaml` file in your project root:

   ```yaml
   packages:
     - "nuxt-base/**"
   ```

2. **Extend the layer in your Nuxt app**

   In your main `nuxt.config.ts` file, extend the Vuetify layer:

   ```typescript
   // nuxt.config.ts
   export default defineNuxtConfig({
     compatibilityDate: "2025-07-15",
     devtools: { enabled: true },
     extends: ["./nuxt-base/orm"],
   });
   ```

3. **Install dependencies**

   From the project root, install all workspace dependencies:

   ```bash
   pnpm install
   ```

   This will install dependencies for both the root project and the ORM layer.

## 🎨 Usage

### Basic Component Usage

```typescript
// nuxt.config.ts
imports: {
    dirs: [
      // // Add core services
      // 'core/services',
      // // Add specific files in core composables in subfolders
      // 'core/composables/**/*.{ts,js,mjs,mts}',
      // // Autoload all stores in all layers
      // '**/stores'
      "models",
    ],
  },
```
