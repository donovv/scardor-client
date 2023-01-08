<template>
  <div class="classpage" id="classPreviewPage">
    <div class="closebutton"><button class="btn" @click="closeClassPreviewWindow">&#10006;</button></div>
    <div class="classinfo">
      <div class="headerinfo">
        <div class="classname">
          <h2>{{  currentClass.classname  }}</h2>
        </div>
        <div class="classtype">
          <h3>{{  currentClass?.classtype  }}</h3>
        </div>
      </div>
      <div class="images"><img src="../../assets/ilmage.webp" alt=""></div>
      <div class="rating">
        <h3>Rating</h3>
        <h3>{{ currentClass.rating }}</h3>
      </div>
      <div class="linkskill">
        <h3>link skill:</h3>
        <span>{{ currentClass?.linkskill?.name }}</span>
        <span>{{ currentClass?.linkskill?.value }}</span>
      </div>
      <div class="legionbonus">
        <h3>Legion Bonus:</h3>
        <span>{{ currentClass?.legionskill?.name }}</span>
        <span>{{ currentClass?.legionskill?.value }}</span>
      </div>
      <div class="pros">
        <h3>Pros:</h3>
        <div>{{ currentClass?.pros?.pro1 }}</div>
        <div>{{ currentClass?.pros?.pro2 }}</div>
      </div>
      <div class="cons">
        <h3>Cons:</h3>
        <div> &nbsp;{{ currentClass?.cons?.con1 }}</div>
        <div>{{ currentClass?.cons?.con2 }}</div>
      </div>
      <div class="opendetailedclasspage">
        <button class="btn" @click="$router.push(`/class/${currentClass._id}`)">View All Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassPreviewPage',
  props: ['currentClass'],
  methods: {
    closeClassPreviewWindow() {
      const event = new Event('closeClassPreviewWindow');
      document.dispatchEvent(event);
    },
  },
};
</script>

<style  scoped>
.classpage {
  height: 100%;
  padding: .5em;
}

.classinfo {
  background-color: hsl(var(--menu-background-color));
  border-radius: .5em;
  padding: .25em;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, 1fr);
}

.classinfo .images img {
  width: 100%;
}

.classinfo .images {
  grid-column: 3 / 5;
  grid-row: span 2;
}

.closebutton {
  display: none;
}
.headerinfo,
.legionbonus,
.rating,
.linkskill,
.cons,
.pros {
  grid-column: span 2;
}
.legionbonus,
.linkskill {
  display: flex;
  flex-direction: column;
}
.opendetailedclasspage {
  grid-column: 2 / 4;
  display: grid;
  justify-content: center;
}
@media (max-width: 700px) {
  .classpage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: hsl(var(--primary-color-dark));
  }

  .closebutton {
    display: flex;
    justify-content: flex-end;
    padding-right: .5em;
    padding-top: .5em;
    margin-bottom: .5em;
  }
  .classinfo {
    display: flex;
    flex-direction: column;
  }
}
</style>
