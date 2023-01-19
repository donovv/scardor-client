<template>
<dialog class="content resourcedialog" id="resourcedialog">
  <div class="header">
    <h1 class="title">{{ $route.params.title }}</h1>
    <button class="btn closebtn" @click="closeModal">&#10006;</button>
  </div>
  <div class="description"><p>{{ $route.params.description }}</p></div>
  <!-- eslint-disable-next-line -->
  <iframe class="reddit" title="reddit" :src="`https://www.redditmedia.com/${$route.params.link}/?ref_source=embed&amp;ref=share&amp;embed=true`" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
</dialog>
</template>

<script>
function Handler(thing) {
  thing.$router.back();
}

export default {
  name: 'RedditViewer',
  methods: {
    closeModal() {
      document.getElementById('resourcedialog').close();
    },
  },
  mounted() {
    document.getElementById('resourcedialog').showModal();
    document.getElementById('resourcedialog').addEventListener('close', () => { Handler(this); });
  },
  beforeUnmount() {
    document.getElementById('resourcedialog').removeEventListener('close', () => { Handler(this); });
  },
};
</script>

<style scoped>
.reddit {
  display: block;
  margin-inline: auto;
  width: 99%;
  height: 80%;
}
.resourcedialog {
  position: relative;
  width: 80%;
  height: 80vh;
  margin-block: auto;
  /* overflow: hidden; */
}

.closebtn {
  margin-right: 1rem;
  opacity: .7;
  font-size: clamp(.8em, .7vw, 5em);
}
.header {
  display: flex;
  justify-content: space-between;
  padding-block: .2rem 1rem;
}
</style>
