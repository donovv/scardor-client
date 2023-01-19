<template>
  <dialog class="content resourcedialog" id="resourcedialog">
  <div class="header">
    <h1 class="title">{{ $route.params.title || 'Hello World' }}</h1>
    <button class="btn closebtn" @click="closeModal">&#10006;</button>
  </div>
  <div class="description"><p>This is a short description of what this resource is.</p></div>
  <button @click="showQuillEditor">view Preview</button>
  <div id='content' ref="quilleditor"></div>
</dialog>
</template>

<script>
import 'quill/dist/quill.snow.css';
import Quill from 'quill';

const TOOLBAROPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'video', 'image'],
  // ['clean'],  remove formatting button]
];

function Handler(thing) {
  thing.$router.back();
}

export default {
  name: 'ResourceAdd',
  data() {
    return {
      quill: null,
      content: 'hello world',
      shown: true,
    };
  },
  methods: {
    showContent() {
      const delta = this.quill.getContents();
      console.log(delta);
      this.$router.push({ name: 'ShowContent', params: { delta: JSON.stringify(delta.ops) } });
    },
    showQuillEditor() {
      this.quill = new Quill('#content', {
        theme: 'snow',
        modules: {
          toolbar: TOOLBAROPTIONS,
        },
      });
    },
  },
  mounted() {
    document.getElementById('resourcedialog').showModal();
    document.getElementById('resourcedialog').addEventListener('close', () => { Handler(this); });
    // eslint-disable-next-line
  },
  beforeUnmount() {
    document.getElementById('resourcedialog').removeEventListener('close', () => { Handler(this); });
  },
};
</script>

<style scoped>
#content {
  display: block;
  margin-inline: auto;
  width: 99%;
  height: 80%;
}
.resourcedialog {
  position: relative;
  width: 80%;
  /* height: 80vh; */
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
