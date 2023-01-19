<template>
  <div class='searchbar'>
    <!-- eslint-disable-next-line -->
    <input
      type='search'
      class='resourcesearch'
      name='resourcesearch'
      id='resourcesearch'
      placeholder='Search Here'
    />
  </div>
  <div class='content grid'>
    <div class='grid-item gameinfo'>
      <h1>Game Info</h1>
      <div
        v-for='(item, i) of resources.gameinfo'
        :key='i'
        class='resource'
        @click='onClickHandler(item)'
        @keypress='console.log(this)'
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div class='grid-item meme'>
      <h1>Meme/joke</h1>
      <div
        v-for='(item, i) of resources.meme'
        :key='i'
        class='resource'
        @click='onClickHandler(item)'
        @keypress='console.log(this)'
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div class='grid-item general'>
      <h1>Awareness/General Info</h1>
      <div
        v-for='(item, i) of resources.general'
        :key='i'
        class='resource'
        @click='onClickHandler(item)'
        @keypress='console.log(this)'
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div class='grid-item stream'>
      <h1>General stream related</h1>
      <div
        v-for='(item, i) of resources.stream'
        :key='i'
        class='resource'
        @click='onClickHandler(item)'
        @keypress='console.log(this)'
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <div class='grid-item sponsor'>
      <h1>Social Media/Sponsor Links</h1>
      <div
        v-for='(item, i) of resources.sponsor'
        :key='i'
        class='resource'
        @click='onClickHandler(item)'
        @keypress='console.log(this)'
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ResourceView',
  data() {
    return {
      resources: {
        gameinfo: [],
        stream: [],
        meme: [],
        general: [],
        sponsor: [],
      },
      resourcesTest: [
        {
          title: '25 star info',
          // eslint-disable-next-line
          description:
            'Video explaining how to get to Meister Accesory Crafter and how the Starforce cap change from 15 to 25 changed the best in slot items.',
          type: 'youtube',
          link: 'https://youtube.com/embed/XQ-M3jj3r4c',
          resourceArea: 'gameinfo',
        },
        {
          title: 'Classes',
          description:
            'Class ranking list based on important characteristics. This will serve as data for Class Picker when it goes live.',
          type: 'spreadsheet',
          resourceArea: 'gameinfo',
          // eslint-disable-next-line
          link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR9XEz4bhy_uG6i-Q1Rhica8w5rA7Sq2vONc_rbxTg7J1oNhlvX8O4Bp10tiZtu3jB-xLv7bZhy_Gu5/pubhtml?widget=true&amp;headers=false',
        },
        {
          title: 'Afterlands',
          description:
            'Afterlands Totem Guide.',
          type: 'reddit',
          resourceArea: 'gameinfo',
          // eslint-disable-next-line
          link: 'r/Maplestory/comments/8fgfty/afterlands_guide_fastest_way_possible_no_bugs',
        },
        {
          title: '2x',
          description:
            'Are 2x and twice and double the same?',
          type: 'youtube',
          resourceArea: 'stream',
          // eslint-disable-next-line
          link: 'r/Maplestory/comments/8fgfty/afterlands_guide_fastest_way_possible_no_bugs',
        },
        {
          title: '5th',
          description:
            'Calculation info regarding Nodes (both skill and boost) and Arcane Symbol maxing.',
          type: 'spreadsheet',
          resourceArea: 'gameinfo',
          // eslint-disable-next-line
          link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRR7LW6nSqbx0Um_fVX1_k6VAPvjuI-b0qxFo7U3TOF32sPHmEXaMtbbu2GZcQX1nYMDwgubrbZNQG8/pubhtml',
        },
      ],
    };
  },
  methods: {
    onClickHandler(item) {
      if (item.type === 'external') window.open(item.link, '_blank');
      this.$router.push({ name: item.type, params: item });
    },
  },
  mounted() {
    // makereq get resources
    this.resourcesTest.forEach((resource) => {
      console.log(resource.resourceArea);
      this.resources[resource.resourceArea].push(resource);
    });
  },
};
</script>

<style scoped>
.grid {
  margin-top: 1rem;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 600px));
  gap: 1rem;
}
.grid-item {
  background: rgb(208, 208, 208);
  background: linear-gradient(0deg, rgba(208, 208, 208, 1) 0%, rgba(255, 255, 255, 1) 100%);
  text-align: center;
  height: fit-content;
  border: 1px solid black;
  border-radius: .5em;
  padding-inline: .2em;
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 1%;
  justify-content: center;
  width: 100%;
}
.grid-item > h1 {
  grid-column: span 2;
}
.searchbar {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
}
.resourcesearch {
  width: 50%;
  height: 2rem;
  font-size: 1.5rem;
  padding: 0.1rem;
}
.resource {
  text-align: start;
  border-radius: .5em;
  margin-block: .5rem;
  cursor: pointer;
  padding: .1rem;
}
.resource > p {
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
  line-height: 1em;
  max-height: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.gameinfo > div {
  background: rgb(164, 255, 177);
  border: 3px solid  #34a853;
  box-shadow: 1px 2px 2px 0 rgba(0, 148, 20, .5);
}
.gameinfo > h1 {
  color: #34a853;
}
.meme > div {
  background: #ffb78ad8;
  border: 3px solid  #ff6301;
  box-shadow: 1px 2px 2px 0 #ff6301;
}
.meme > h1 {
  color: #ff6301;
}
.general > div {
  background: #ffd65b;
  border: 3px solid  #be8f00;
  box-shadow: 1px 2px 2px 0 #fbbc04;
}
.general > h1 {
color: #fbbc04;
}
.stream > div {
  background: #5af1fc;
  border: 3px solid  #46bdc6;
  box-shadow: 1px 2px 2px 0 #46bdc6;
}
.stream > h1 {
  color: #46bdc6;
}
.sponsor > div {
  background: #df8f88;
  border: 3px solid  #ea4335;
  box-shadow: 1px 2px 2px 0 #ea4335;
}
.sponsor > h1 {
  color: #ea4335
}
</style>
