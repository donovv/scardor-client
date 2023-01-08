<template>
  <dialog class="classrecomendations">
    <div class="container">
    <div class="header">
      <h1>Class Recommendations</h1>
      <button class="btn" @click="closeClassRecomendationsDialog">&#10006;</button>
      </div>
    <div class="classes">
    <div class="classdisplay"
      @click="currentSelectedClass = recommendation"
      @keydown.enter="currentSelectedClass = recommendation"
      v-for="recommendation in recommendations"
      :key="recommendation._id">
        <div class="info">
        <div class="classname"><h2>{{ recommendation.classname }}</h2></div>
        <div class="classtype"><h3>{{ recommendation.classtype }}</h3></div>
        </div>
        <div class="rating"><h2>{{ recommendation.rating }}</h2></div>
        </div>
    </div>
  <class-preview-page v-if="currentSelectedClass" :currentClass="currentSelectedClass"></class-preview-page>
  </div>
  </dialog>
</template>

<script>
import classPreviewPage from './ClassPreviewPage.vue';

export default {
  name: 'ClassRecomendations',
  props: ['recommendations'],
  components: {
    classPreviewPage,
  },
  data() {
    return {
      firstload: true,
      currentSelectedClass: null,
    };
  },
  methods: {
    closeClassRecomendationsDialog() {
      this.currentSelectedClass = null;
      const element = document.getElementById('recommendedclass');
      element.close();
    },
  },
  created() {
    document.addEventListener('closeClassPreviewWindow', () => {
      this.currentSelectedClass = null;
    });
  },
  updated() {
    if (this.recommendations !== null && this.firstload) [this.currentSelectedClass] = this.recommendations;
    this.firstload = false;
  },
};
</script>

<style scoped>
.classrecomendations {
  position: fixed;
  width: 80vw;
  max-width: 800px;
  height: 90vh;
  max-height: 700px;
  margin-inline: auto;
  top: 50%;
  transform: translateY(-50%);
  border-radius: .5em;
  background-color: hsl(var(--primary-color-dark, .9));
}
.container {
  height: 100%;
    display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 6fr;
}
.classes {
  height: 90%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  padding: .5em;
  gap: .25em;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: .5em;
  grid-column: span 2;
  color: white;
}
.header h1 {
  font-size: clamp(1.5rem, 1.5vw, 2rem);
}
.header button {
  height: min-content;
}
.rating {
  text-align: end;
  padding-right: .5em;
}
.classdisplay {
  height: calc(100%/5);
  min-height: 100px;
  cursor: pointer;
  background-color: hsl(var(--menu-background-color));
  border-radius: .5em;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
}
@media (max-width: 700px) {
  .container {
    display: block;
  }
}
</style>
