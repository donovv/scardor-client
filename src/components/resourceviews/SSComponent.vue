<template>
<dialog class="content resourcedialog" id="resourcedialog">
  <div class="header">
    <h1 class="title">{{ $route.params.title }}</h1>
    <button class="btn closebtn" @click="closeModal">&#10006;</button>
  </div>
  <div class="description"><p>{{ $route.params.description }}</p></div>
  <iframe class="spreadsheet" title="spreasheet" :src='$route.params.link'></iframe>
</dialog>
</template>

<script>
function Handler(thing) {
  thing.$router.back();
}

export default {
  name: 'SpreadSheet',
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
.spreadsheet {
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
