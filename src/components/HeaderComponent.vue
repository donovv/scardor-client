<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/scardorlogo.png" alt="">
    </div>
    <button class="hamburger" id="hamburger" @keyupenter="openMenu" @click.stop="openMenu">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </button>
    <menu-vue class="fullmenu" id="menu" />
  </header>
</template>

<script>
import menuVue from './headerComponents/menu.vue';

export default {
  name: 'HeaderComponent',
  components: { menuVue },
  methods: {
    openMenu() {
      const hamburger = document.getElementById('hamburger');
      const menu = document.getElementById('menu');
      hamburger.classList.toggle('change');
      menu.classList.toggle('visible');
      // document.addEventListener('click', (e) => {
      //   if (!menu.contains(e.target)) this.openMenu();
      // });
    },
  },
  created() {
    window.addEventListener('resize', () => {
      const hamburger = document.getElementById('hamburger');
      const menu = document.getElementById('menu');
      hamburger.classList.remove('change');
      menu.classList.remove('visible');
    });
  },
};
</script>

<style scoped>
.header {
  height: 6em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
}

.header::after {
  position: absolute;
  content: '';
  height: 6em;
  box-shadow: 0 0 0 100vmax hsl(var(--menu-background-color));
  clip-path: inset(0 -100vmax);
  background-color: hsl(var(--menu-background-color));
  z-index: -1;
}

.logo {
  grid-column: 1;
  grid-row: span 2;
  margin-left: auto;
}

.logo img {
  max-width: 100%;
  max-height: 6em;
  object-fit: contain;
}

.hamburger {
  display: none;
}

@media (max-width: 700px) {

  .logo {
    grid-column: span 2;
    margin-block: auto;
  }

  .hamburger {
    display: inline-block;
    cursor: pointer;
    grid-row: span 2;
    grid-column: -1;
    margin-right: 1em;
    margin-block: auto;
    padding: .5em;
    border: none;
  }

  .hamburger:active,
  .hamburger:hover,
  .hamburger:focus,
  .hamburger:focus-visible {
    border: none;
    box-sizing: content-box;
    /* outline: 0; */
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }

  /* Rotate first bar */
  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  /* Fade out the second bar */
  .change .bar2 {
    opacity: 0;
  }

  /* Rotate last bar */
  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }

  .fullmenu {
    display: none;
  }
}

.visible {
  display: flex;
}
</style>
