<template>
  <div id="nav">
    <Nav />
  </div>
  <router-view />
</template>

<script>
import Nav from '@/components/Nav.vue';
import { mapActions } from 'vuex';
export default {
  mounted() {
    this.authAction();
  },
  components: {
    Nav,
  },
  methods: {
    ...mapActions('auth', ['authAction']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
