# App Base Layer for Nuxt

This layer provides the base configuration for Nuxt applications using a pnpm workspace setup.

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

   In your main `nuxt.config.ts` file, extend the App Base layer:

   ```typescript
   // nuxt.config.ts
   export default defineNuxtConfig({
     compatibilityDate: "2025-07-15",
     devtools: { enabled: true },
     extends: ["./nuxt-base/app-base"],
   });
   ```

3. **Install dependencies**

   From the project root, install all workspace dependencies:

   ```bash
   pnpm install
   ```

   This will install dependencies for both the root project and the App Base layer.

4. **Verify installation**

   Start your development server:

   ```bash
   pnpm dev
   ```

   You should now have App Base components available throughout your application!

## 🎨 Usage
