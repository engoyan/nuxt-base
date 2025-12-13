<template>
  <v-app>
    <v-app-bar title="404 Music">
      <template #append>
        <v-toolbar-items>
          <v-btn
            to="/"
            prepend-icon="mdi-view-dashboard"
            variant="text"
          >
            Dashboard
          </v-btn>
          <v-btn
            to="/product"
            prepend-icon="mdi-package-variant"
            variant="text"
          >
            Products
          </v-btn>
          <v-btn
            to="/calendar"
            prepend-icon="mdi-calendar"
            variant="text"
          >
            Calendar
          </v-btn>
          <v-btn
            to="/music"
            prepend-icon="mdi-music"
            variant="text"
          >
            Music
          </v-btn>
          <v-btn
            to="/expenses"
            prepend-icon="mdi-chart-pie"
            variant="text"
          >
            Expenses
          </v-btn>
          <v-btn
            to="/messages"
            prepend-icon="mdi-message-text"
            variant="text"
          >
            Messages
          </v-btn>
        </v-toolbar-items>
      </template>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item
          title="Dashboard"
          to="/"
          prepend-icon="mdi-view-dashboard"
          link
        ></v-list-item>
        <v-list-item
          title="Products"
          to="/product"
          prepend-icon="mdi-package-variant"
          link
        ></v-list-item>
        <v-list-item
          title="Calendar"
          to="/calendar"
          prepend-icon="mdi-calendar"
          link
        ></v-list-item>
        <v-list-item
          title="Music"
          to="/music"
          prepend-icon="mdi-music"
          link
        ></v-list-item>
        <v-list-item
          title="Expenses"
          to="/expenses"
          prepend-icon="mdi-chart-pie"
          link
        ></v-list-item>
        <v-list-item
          title="Messages"
          to="/messages"
          prepend-icon="mdi-message-text"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 
    <v-navigation-drawer location="right">
      <v-list nav>
        <v-list-item title="Drawer right" link></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>
