<template>
  <div class="p-8">
    <ul class="flex justify-end">
      <template v-if="user">
        <li class="mr-6">
          <div class="font-semibold text-black-500">Welcome {{ user.username }}</div>
        </li>
        <li class="mr-6">
          <router-link to="/albums">
            <div class="text-blue-500 hover:text-blue-800 cursor-pointer">
              Albums
            </div>
          </router-link>
        </li>
        <li class="mr-6">
          <div class="text-blue-500 hover:text-blue-800 cursor-pointer" @click="logout">
            Logout
          </div>
        </li>
      </template>
      <template v-else>
        <li class="mr-6">
          <router-link to="/">
            <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Login</a>
          </router-link>
        </li>
        <li class="mr-6">
          <router-link to="/signup">
            <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Sign Up</a>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions({
      logoutVue: 'auth/logout',
    }),
    async logout() {
      await this.logoutVue();
      this.$router.push('/');
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
};
</script>
<style></style>
