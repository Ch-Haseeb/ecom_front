<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card id="sea" class="elevation-12" width="800">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register Form</v-toolbar-title>
            </v-toolbar>
            <v-form ref="form" @submit.prevent="registerform">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.name"
                      label="Name"
                      type="text"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      :rules="emailRules"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="form.password"
                      label="Password"
                      name="password"
                      type="password"
                      :rules="passwordRules"
                    />
                  </v-col>
                
                  <v-col cols="12" sm="12" md="12" class="text-center">
                    <v-btn color="primary" type="submit">Register</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-form>
            <v-snackbar
              v-model="errorSnackbar"
              color="error"
              top
              timeout="6000"
            >
              {{ errorMessage }}
            </v-snackbar>
            <div class="text-center">
              <v-btn text color="primary" :to="`/login`">Login</v-btn>
            </div>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { registerUser } from "../services/AuthAPI.JS";
export default {
  data: () => ({
    form: {
      name: "",
      email: "",
      password: "",
    },
    emailRules: [
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ],
    errorSnackbar: false,
    errorMessage: "",
  }),
  methods: {
    async registerform() {
      const isValid = await this.$refs.form.validate();
      
      if (isValid) {
        try {
          const response = await registerUser(this.form);
          console.log(response.data.token)
          localStorage.setItem('token', response.data.token);
          this.form = ''
          this.$router.push('/')


        } catch (error) {
          this.errorMessage = error.response.data.message;
          this.errorSnackbar = true;
        }
      }
    },
  },
};
</script>
