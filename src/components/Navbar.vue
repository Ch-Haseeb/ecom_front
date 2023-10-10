<template>
    <v-app-bar app >
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout" text>Logout</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: "NavbarView",
    methods: {
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  