<template>
  <div class="flex justify-center">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form v-if="!confirmPassword" class="flex flex-col items-center" @submit.prevent="signUp">
        <div class="w-full flex flex-col user">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">User Name</label>
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500"
            type="text"
            v-model="username"
            required
            id="username"
          />
        </div>
        <div class="w-full flex flex-col mt-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500"
            type="password"
            id="password"
            required
            v-model="password"
          />
        </div>
        <div class="text-sm text-gray-500 mt-1">
          Your password must be at least 8 characters long.
        </div>
        <div class="w-full flex flex-col mt-2 mb-3">
          <label class="block text-gray-700 text-sm font-bold" for="email">Email</label>
          <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500"
            type="email"
            id="email"
            required
            v-model="email"
          />
          <div class="text-sm text-gray-500 mt-1">
            In the next step, you will be asked to enter the code that has been sent to this email address.
          </div>
        </div>
        <!-- eslint-disable -->
        <button class="btn-blue">Sign Up</button>
      </form>
      <div v-if="error" class="text-red-600">{{ error.message }}</div>
      <div v-if="confirmPassword" class="w-4/12 m-auto">
        <h3>Enter your code. Please check your email</h3>
        <div class="flex flex-col mt-2">
          <label class="block text-gray-700 text-sm font-bold" for="password">Code</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="code"
          />
          <button class="btn-blue" @click="confirmSignUp">Confirm Code</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    username: '',
    password: '',
    email: '',
    error: '',
    confirmPassword: false,
    code: '',
  }),
  methods: {
    ...mapActions({
      signUpVue: 'auth/signUp',
      confirmSignUpVue: 'auth/confirmSignUp',
      loginVue: 'auth/login',
    }),
    async signUp() {
      if (!this.email || !this.password) {
        return;
      }
      try {
        const { username, password, email } = this;
        await this.signUpVue({
          username,
          password,
          email,
        });
        this.confirmPassword = true;
        this.error = '';
      } catch (error) {
        this.error = { message: 'Something went wrong.' };
      }
    },
    async confirmSignUp() {
      if (!this.username || !this.code) {
        return;
      }
      try {
        const { username, password, code } = this;
        await this.confirmSignUpVue({
          username,
          code,
        });
        await this.loginVue({
          username,
          password,
        });
        this.$router.push('/albums');
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
};
</script>
