<template>
  <div class="menu">
    <socials-vue class="socials" />
    <nav-vue />
    <login-vue class="login" />
  </div>
</template>

<script>
import socialsVue from './socials.vue';
import loginVue from './login.vue';
import navVue from './nav.vue';

export default {
  name: 'menuVue',
  components: { socialsVue, loginVue, navVue },
};
</script>

<style scoped>
.menu {
  grid-column: 2 / 5;
  grid-row: span 2;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
@media (max-width: 700px) {
.menu {
  position: absolute;
  top: 6rem;
  width: 100%;
  background-color: hsl(var(--menu-background-color));
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-block: 4rem;
  z-index: 2;
}
}
</style>
