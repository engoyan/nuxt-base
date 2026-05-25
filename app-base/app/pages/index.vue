<template>
  <div class="hero-page">
    <div class="hero-content">
      <div class="hero-icon-ring">
        <v-icon size="64" color="primary">mdi-rocket-launch</v-icon>
      </div>

      <h1 class="hero-title">
        Ship <span class="gradient-text">faster</span>
      </h1>

      <p class="hero-subtitle">
        A complete app foundation — authentication, data sync,
        beautiful UI — all wired up and ready to build on.
      </p>

      <div class="hero-stack">
        <div class="stack-pill" v-for="item in stack" :key="item.label">
          <v-icon :icon="item.icon" size="18" />
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="hero-actions">
        <v-btn
          size="x-large"
          color="primary"
          variant="flat"
          rounded="xl"
          to="/login"
          class="hero-btn"
        >
          Get Started
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <div class="hero-footer">
        <v-icon size="14" class="me-1">mdi-github</v-icon>
        <span class="text-caption text-medium-emphasis">engoyan/nuxt-base</span>
      </div>
    </div>

    <div class="hero-glow" />
    <div class="hero-grid" />
  </div>
</template>

<script setup>
const stack = [
  { icon: "mdi-vuetify", label: "Vuetify" },
  { icon: "mdi-database-cog", label: "Pinia ORM" },
  { icon: "mdi-database", label: "PocketBase" },
  { icon: "mdi-shield-check", label: "Auth" },
  { icon: "mdi-sync", label: "Realtime" },
];
</script>

<style scoped>
.hero-page {
  height: calc(100dvh - var(--v-layout-top, 0px) - var(--v-layout-bottom, 0px));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 560px;
}

.hero-icon-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  background: radial-gradient(circle, rgba(var(--v-theme-primary), 0.12) 0%, transparent 70%);
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  animation: pulse-ring 3s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.6;
  opacity: 0.75;
  max-width: 440px;
  margin: 0 auto 2rem;
}

.hero-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.stack-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(var(--v-theme-on-surface), 0.06);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  transition: transform 0.2s, background 0.2s;
}

.stack-pill:hover {
  transform: translateY(-2px);
  background: rgba(var(--v-theme-primary), 0.1);
}

.hero-actions {
  margin-bottom: 3rem;
}

.hero-btn {
  letter-spacing: 0.3px;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-primary), 0.3);
}

.hero-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
}

.hero-glow {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--v-theme-primary), 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(var(--v-theme-on-surface), 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(var(--v-theme-on-surface), 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

@keyframes pulse-ring {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.15);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(var(--v-theme-primary), 0);
  }
}
</style>
