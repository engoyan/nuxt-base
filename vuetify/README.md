# Vuetify Layer for Nuxt

This layer provides Vuetify 3 integration for Nuxt applications using a pnpm workspace setup.

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
     extends: ["./nuxt-base/vuetify"],
   });
   ```

3. **Install dependencies**

   From the project root, install all workspace dependencies:

   ```bash
   pnpm install
   ```

   This will install dependencies for both the root project and the Vuetify layer.

4. **Verify installation**

   Start your development server:

   ```bash
   pnpm dev
   ```

   You should now have Vuetify components available throughout your application!

## 🎨 Usage

### Basic Component Usage

Once the layer is extended, you can use Vuetify components directly in your Vue components:

```vue
<template>
  <v-app>
    <v-app-bar title="My App"></v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Hello Vuetify!</v-card-title>
          <v-card-text>
            <v-btn color="primary">Click Me</v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
```

### Available Components

This layer includes:

- **All standard Vuetify components** - Cards, Buttons, Forms, Navigation, etc.
- **Lab components**:
  - `VFileUpload` & `VFileUploadItem`
  - `VStepperVertical` & `VStepperVerticalItem`
  - `VDateInput`

### Icons

Material Design Icons are included via `@mdi/font`. Use icons with the `mdi-` prefix:

```vue
<v-icon>mdi-home</v-icon>
<v-btn prepend-icon="mdi-check">Save</v-btn>
```

## ⚙️ Configuration

### Theme Configuration

Themes can be configured in `app.config.ts`:

```typescript
export default defineAppConfig({
  vuetify: {
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          // ... other colors
        },
      },
    },
  },
});
```

### Plugin Configuration

The Vuetify plugin is configured in `plugins/vuetify.js`. You can customize:

- **Default component props** - Set global defaults for components
- **Theme detection** - Automatically detects system theme preference
- **SSR settings** - Currently set to `ssr: false`

### Nuxt Config

The layer's `nuxt.config.ts` includes:

- **CSS imports** - Material Design Icons and Vuetify styles
- **Build transpilation** - Ensures Vuetify is properly transpiled
- **Vite configuration** - Debug settings and optimizations

## 🎯 Example: VuetifyWelcome Component

Check out the `VuetifyWelcome` component in `app/components/VuetifyWelcome.vue` for a comprehensive example showcasing:

- Cards and layouts
- Buttons with variants
- Chips and badges
- Alerts
- Icons and avatars
- Responsive grid system

## 📚 Resources

- [Vuetify Documentation](https://vuetifyjs.com/)
- [Vuetify Components](https://vuetifyjs.com/en/components/all/)
- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Nuxt Layers Documentation](https://nuxt.com/docs/getting-started/layers)

## 🔧 Troubleshooting

### Styles not loading

Ensure `sass` and `sass-embedded` are installed in the layer's `devDependencies`.

### Components not found

Make sure the layer is properly extended in your root `nuxt.config.ts`:

```typescript
extends: ['./nuxt-base/vuetify']
```

### Workspace dependencies issues

Run `pnpm install` from the project root to ensure all workspace dependencies are linked correctly.

## 📝 Project Structure

```
nuxt-base/
└── vuetify/
    ├── README.md          # This file
    ├── nuxt.config.ts     # Layer configuration
    ├── app.config.ts      # App-level Vuetify config
    ├── package.json       # Layer dependencies
    └── plugins/
        └── vuetify.js     # Vuetify plugin setup
```

## 🚀 Next Steps

1. Customize themes in `app.config.ts`
2. Add more lab components in `plugins/vuetify.js` if needed
3. Create reusable components using Vuetify
4. Explore Vuetify's extensive component library
