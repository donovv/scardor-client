<template>
  <dialog class="content resourcedialog" id="resourcedialog">
    <div class="header">
    <h1 class="title">{{ $route.params.title }}</h1>
    <button class="btn closebtn" @click="closeModal">&#10006;</button>
  </div>
  <div class="description"><p>{{ $route.params.description }}</p></div>
    <iframe class="youtube" title="youtube" :src="$route.params.link"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
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
    document.getElementById('resourcedialog').addEventListener('close', () => {
      Handler(this);
    });
  },
  beforeUnmount() {
    document.getElementById('resourcedialog').removeEventListener('close', () => {
      Handler(this);
    });
  },
};
</script>

<style scoped>
.resourcedialog {
  position: relative;
  width: 80%;
  height: 80vh;
  margin-block: auto;
  overflow: hidden;
}

.closebtn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  opacity: 0.7;
  font-size: clamp(0.8em, 0.7vw, 5em);
}
.youtube {
  width: 100%;
  aspect-ratio: 16/9;
}
</style>
