<template>
  <div class="login" v-if="!$store.getters['user/isLoggedIn']">
    <button class="btn" @click="openLoginForm">Login</button>
    <button class="btn">Sign-up</button>
  </div>
  <div class="login" v-else>
   <div class="user"><button class="btn"
   @click.stop="openUserMenu">{{ user.screenname }}</button></div>
    <div class="loginmenu" id="usermenu">
      <button class="btn" @click="$router.push(`/settings/${user._id}`)">settings</button>
      <button class="btn" @click="logout">LogOut</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'loginVue',
  methods: {
    openLoginForm() {
      document.getElementById('loginform').showModal();
    },
    openUserMenu() {
      const userMenu = document.getElementById('usermenu');
      userMenu.classList.add('visible');
      document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) userMenu.classList.remove('visible');
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') userMenu.classList.remove('visible');
        // TODO make custom function and remove even listners
      });
    },
    ...mapActions('auth', { logout: 'logOut' }),
  },
  computed: {
    ...mapState('user', { user: 'user' }),
  },
};
</script>

<style scoped>
.login {
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: center;
  position: relative;

}
.loginmenu {
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  display: none;
  flex-direction: column;
  background-color: hsl(var(--menu-background-color));
  padding: 2em;
  gap:1em;
  border-radius: .5em;
  border: 2px solid hsl(var(--primary-color-dark))
}
.visible {
  display: flex;
}

@media (max-width: 700px) {
  .loginmenu {
    display: flex;
    flex-direction: row;
    padding: 0;
    border: none;

  }
  .user {
    display: none;
  }
}
</style>
