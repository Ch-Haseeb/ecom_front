<template>
    <v-app>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login Form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" @submit.prevent="loginform">
                    <v-text-field
                      v-model="form.email"
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Email"
                      required
                      :rules="emailRules"
                    />
  
                    <v-text-field
                      v-model="form.password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Password"
                      required
                    />
  
                    <v-row justify="center">
                      <v-btn
                        type="submit"
                        class="mt-4"
                        color="primary"
                        value="Login"
                        :loading="loading"
                      >
                        Login
                      </v-btn>
                    </v-row>
                  </v-form>
                </v-card-text>
  
                <v-row justify="center" class="mt-1">
                  <v-btn text class="mt-2" @click="$router.push('/register')">
                    Register
                  </v-btn>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
  
          <v-snackbar v-model="errorSnackbar" color="error" top timeout="6000">
            {{ errorMessage }}
          </v-snackbar>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { loginUser } from "../services/AuthAPI.JS";
  export default {
    data: () => ({
      form: {
        email: "",
        password: "",
      },
  
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      errorSnackbar: false,
      errorMessage: "",
      loading: false, 
    }),
  
    methods: {
      async loginform() {
        const isValid = await this.$refs.form.validate();
  
        if (isValid) {
          this.loading = true;
  
          try {
            const response = await loginUser(this.form);
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
         
         
            setTimeout(() => {
                this.form = "";
            this.$router.push("/");
          }, 2000); 

          } catch (error) {
            this.errorMessage = error.response.data.message;
            this.errorSnackbar = true;
          } 
        //   finally {
        //     this.loading = false;
        //   }
        }
      },
    },
  };
  </script>
  