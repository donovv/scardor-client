<template>
  <div class="content">
    <HeaderComponent />
    <router-view />
    <login-form />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import loginForm from './components/loginform.vue';

export default {
  created() {
    this.$store.dispatch('auth/reAuthenticate');
  },
  components: { HeaderComponent, loginForm },
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
:root {
  --primary-color-light: 187, 48%, 75%;
  --primary-color: 187, 48%, 50%;
  --primary-color-dark: 187, 48%, 25%;
  --menu-background-color: 180, 1%, 95%;
}

.content {
  height: 100vh;
  min-width: 300px;
  max-width: 1280px;
  margin-inline: auto;
}
.btn {
  font-size: 1rem;
  background-color: hsl(190, 16%, 22%);
  padding: .5em 1em;
  border-radius: .5em;
  color: white;
  cursor: pointer;
  box-shadow: -1px 1px 1px 2px hsl(190, 16%, 40%, .8);
}
.btn:hover,
.btn:focus {
  background-color: hsl(190, 16%, 35%);
}

.mt-3 {
  margin-top: 3rem;
}
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}
</style>
