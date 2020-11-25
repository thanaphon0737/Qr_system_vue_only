<template>
  <v-container>
    <v-row class="justify-center">
      <v-card style="width:400px;">
        <v-img
          class="white--text align-end"
          src="@/assets/login_header.jpg"
          height="200px"
        >
          <v-card-title primary-title>
            Login
          </v-card-title>
        </v-img>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- Username -->
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
            />

            <!-- Password -->
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="account.password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter
            />

            <v-row class="justify-space-between px-3 pt-5">
              <v-btn text @click.prevent="$router.push('/register')"
                >Register</v-btn
              >
              <v-btn type="submit" color="success">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/stock");
    }
  },
  data() {
    return {
      isShowPassword: false,
      account: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$router.push("/stock");
      this.$store.dispatch({
        type: "doLogin",
        username: this.account.username,
        password: this.account.password
      });
    }
  }
};
</script>

<style></style>
