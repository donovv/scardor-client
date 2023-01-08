<template>
  <nav class="mainnavigation">
    <ul class="navitems">
      <li class="navitem">
        <router-link class="navlink" to="/"><h1>Home</h1></router-link>
      </li>
      <li class="navitem">
        <router-link class="navlink" to="/classpicker"><h1>Class Picker</h1></router-link>
      </li>
      <li class="navitem">
        <router-link class="navlink" to="/resources"><h1>Resources</h1></router-link>
      </li>
      <!-- <li class="navitem">
        <router-link class="navlink" to="/"><h1>Sponsors</h1></router-link>
      </li> -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'navVue',
};
</script>

<style scoped>
.mainnavigation {
  grid-column: span 2;
  grid-row: 2;
}
.navitems {
  width: 100%;
  height: 100%;
  display:flex;
  list-style: none;
  flex-grow: 1;
}
.navitem {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navlink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  text-decoration: none;
  color: black;
  border-inline: 1px solid hsl(var(--primary-color));
}
li:first-child .navlink{
  border-left: none;
}
li:last-child .navlink{
  border-right: none;
}
.navlink a:active,
.navlink a:hover,
.navlink a:visited {
  color: black;
}
.router-link-exact-active {
  color: hsl(var(--primary-color-light));
}
@media (max-width: 700px) {
  .navitems {
    flex-direction: column;
  }
  .navitem {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-block: 1px solid hsl(var(--primary-color));
}
.navlink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  text-decoration: none;
  color: black;
  border-inline: none;
}
li:first-child {
  border-top-width: 2px;
}
li:last-child {
  border-bottom-width: 2px;
}
.router-link-exact-active {
  color: hsl(var(--primary-color-light));
}
}
</style>
