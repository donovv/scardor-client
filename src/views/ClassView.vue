<template>
  <main v-if="$store.getters['user/isLoggedIn']" class="charpage">
    <div class="classinfo">
      <div class="classname">
        Class Name:
        <input type="text" v-model="char.classname" aria-label="Class Name">
      </div>
      <div class="classtype">
        Class Type:
        <input type="text" v-model="char.classtype" aria-label="Class Type">
      </div>
    </div>
    <div class="classimage">
      <img src="../assets/ilmage.webp" alt="">
      <input type="text" aria-label="Image" v-model="char.classimg" placeholder="updating image coming soon">
    </div>
    <div class="classdescription">
      <textarea placeholder="Add or update Description" aria-label="description" v-model="char.description"></textarea>
    </div>
    <div class="linkskills">
      <div class="linkname">
        <h2>Link Skill:</h2>
        <input type="text" v-model="char.linkskill.name" aria-label="link skill name">
      </div>
      <div class=" linkvalue">
        <input type="text" v-model="char.linkskill.value" aria-label="link skill value">
      </div>
    </div>
    <div class="legionskills">
      <div class="legion">
        <h2>Legion Bonus:</h2>
        <input type="text" v-model="char.legionskill.name" aria-label="legion buff stat">
      </div>
      <div class="linkvalue">
        <input type="text" v-model="char.legionskill.value" aria-label="legion buff values">
      </div>
    </div>
    <div class="pros">
      <h2>Pros:</h2>
      <input type="text" v-model="char.pros.pro1" aria-label="Add a pro here">
      <input type="text" v-model="char.pros.pro2" aria-label="Add a pro here">
    </div>
    <div class="cons">
      <h2>Cons:</h2>
      <input type="text" v-model="char.cons.con1" aria-label="Add a con here">
      <input type="text" v-model="char.cons.con2" aria-label="Add a con here">
    </div>
    <div class="links">
      <a class="showmore">
        <div class="link addlink">
          <input type="text" id="text" placeholder="Link Name" aria-label="add link text here">
          <input type="text" id="link" placeholder="link url" aria-label="Add link url here">
          <button @click="addlink">Add link</button>
        </div>
      </a>
      <a v-for="(link, i) of char.links" style="text-decoration: none;" :key="i" target="_blank">
        <div class="link addlink">
          <input type="text" placeholder="Link Name" v-model="char.links[i].text" aria-label="Edit link">
          <input type="text" placeholder="link url" v-model="char.links[i].link" aria-label="edit link url">
          <button @click.prevent="char.links.splice(i, 1)">Delete Link</button>
        </div>
      </a>
    </div>
    <div class="charstats">
      <div class="early">
        <div class="statheader">Early Game Stats:</div>
        Bossing: <input type="text" v-model="char.early.bossing" aria-label="Bossing">
        Key Input: <input type="text" v-model="char.early.keyinput" aria-label="key input">
        Leveling Speed: <input type="text" v-model="char.early.levelingspeed" aria-label="Leveling Speed">
        Mobbing: <input type="text" v-model="char.early.mobbing" aria-label="Mobbing">
        Mobility: <input type="text" v-model="char.early.mobility" aria-label="Mobility">
        Survivabilty: <input type="text" v-model="char.early.survivability" aria-label="Survivability">
      </div>
      <div class="mid">
        <div class="statheader">Mid Game Stats:</div>
        Boss Damage: <input type="text" v-model="char.mid.bossdmg" aria-label="Boss Damage">
        Boss Utility: <input type="text" v-model="char.mid.bossutil" aria-label="Boss Utility">
        Key Input: <input type="text" v-model="char.mid.keyinput" aria-label="key input">
        Leveling Speed: <input type="text" v-model="char.mid.levelingspeed" aria-label="Leveling Speed">
        Mobbing: <input type="text" v-model="char.mid.mobbing" aria-label="Mobbing">
        Mobility: <input type="text" v-model="char.mid.mobility" aria-label="Mobility">
        Survivabilty: <input type="text" v-model="char.mid.survivability" aria-label="Survivability">
      </div>
      <div class="mobbinglate">
        <div class="statheader">Late Game Mobbing Stats:</div>
        Key Input: <input type="text" v-model="char.mobbing.late.keyinput" aria-label="key input">
        Leveling Speed: <input type="text" v-model="char.mobbing.late.levelingspeed" aria-label="Leveling Speed">
        Mobbing: <input type="text" v-model="char.mobbing.late.mobility" aria-label="Mobbing">
      </div>
      <div class="mobbingend">
        <div class="statheader">End Game Mobbing Stats:</div>
        Key Input: <input type="text" v-model="char.mobbing.end.keyinput" aria-label="key input">
        Leveling Speed: <input type="text" v-model="char.mobbing.end.levelingspeed" aria-label="Leveling Speed">
        Mobbing: <input type="text" v-model="char.mobbing.end.mobility" aria-label="Mobbing">
      </div>
      <div class="bossing">
        <div class="statheader">Late and End game Bossing Stats:</div>
        Boss Utility: <input type="text" v-model="char.bossing.bossutil" aria-label="Boss Utility">
        Burst Damage: <input type="text" v-model="char.bossing.burst" aria-label="Burst Damage">
        Non-Burst Damage: <input type="text" v-model="char.bossing.offburst" aria-label="Non-Burst Damage">
        Key Input: <input type="text" v-model="char.bossing.keyinput" aria-label="key input">
        Survivabilty: <input type="text" v-model="char.bossing.survivability" aria-label="Survivability">
      </div>
    </div>
    <button @click="saveClass" class="savebutton">Update Class</button>
  </main>
  <main v-else class="charpage">
    <div class="classinfo">
      <div class="classname">
        <h1>{{ char?.classname }}</h1>
      </div>
      <div class="classtype">
        <h3>{{ char?.classtype }}</h3>
      </div>
    </div>
    <div class="classimage"><img src="../assets/ilmage.webp" alt=""></div>
    <div class="classdescription"><p>{{ char?.description }}</p></div>
    <div class="linkskills">
      <div class="linkname">
        <h2>Link Skill:</h2>
        <h4>{{ char?.linkskill?.name }}</h4>
      </div>
      <div class=" linkvalue">
        <h4>{{ char?.linkskill?.value }}</h4>
      </div>
    </div>
    <div class="legionskills">
      <div class="legion">
        <h2>Legion Bonus:</h2>
        <h4>{{ char?.legionskill?.name }}</h4>
      </div>
      <div class="linkvalue">
        <h4>{{ char?.legionskill?.value }}</h4>
      </div>
    </div>
    <div class="pros">
      <h2>Pros:</h2>
      <h4>{{ char?.pros?.pro1 }}</h4>
      <h4>{{ char?.pros?.pro2 }}</h4>
    </div>
    <div class="cons">
      <h2>Cons:</h2>
      <h4>{{ char?.cons?.con1 }}</h4>
      <h4>{{ char?.cons?.con2 }}</h4>
    </div>
    <div class="links hidden" id="hidden">
      <a v-if="char?.links?.length > 4 && !showlinks" class="showmore" @click="showlinksmethod"
        @keypress.enter="showlinksmethod">
        <div class="link">Show More</div>
      </a>
      <a v-for="(link, i) of char?.links" style="text-decoration: none;" :key="i" :href=link.link target="_blank">
        <div class="link">{{ link.text }}</div>
      </a>
      <a v-if="showlinks" @click="hidelinksmethod" @keypress.enter="hidelinksmethod">
        <div class="link">Show Less</div>
      </a>
    </div>
  </main>
</template>

<script>
import makeRequest from '@/services/api';

export default {
  name: 'ClassView',
  data() {
    return {
      char: {
        classname: '',
        classtype: '',
        early: {
          keyinput: '',
          mobility: '',
          mobbing: '',
          bossing: '',
          survivability: '',
          levelingspeed: '',
        },
        mid: {
          keyinput: '',
          mobility: '',
          mobbing: '',
          bossdmg: '',
          bossutil: '',
          survivability: '',
          levelingspeed: '',
        },
        mobbing: {
          late: {
            keyinput: '',
            mobility: '',
            levelingspeed: '',
          },
          end: {
            keyinput: '',
            mobility: '',
            levelingspeed: '',
          },
        },
        bossing: {
          keyinput: '',
          bossutil: '',
          burst: '',
          offburst: '',
          survivabilty: '',
        },
        rating: '',
        linkskill: {
          name: '',
          value: '',
        },
        description: '',
        legionskill: {
          name: '',
          value: '',
        },
        pros: {
          pro1: '',
          pro2: '',
        },
        cons: {
          con1: '',
          con2: '',
        },
        links: [{
          text: '',
          link: '',
        }],
      },
      updated: false,
      showlinks: false,
    };
  },
  methods: {
    addlink() {
      const text = document.getElementById('text');
      const link = document.getElementById('link');
      this.char.links.push({ text: text.value, link: link.value });
      text.value = '';
      link.value = '';
    },
    saveClass() {
      this.updated = true;
      // eslint-disable-next-line
      makeRequest(`/maple-classes/${this.char._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.$store.getters['auth/getAccessToken']}`,
        },
        data: this.char,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showlinksmethod() {
      const links = document.getElementById('hidden');
      links.classList.remove('hidden');
      this.showlinks = true;
    },
    hidelinksmethod() {
      const links = document.getElementById('hidden');
      links.classList.add('hidden');
      this.showlinks = false;
    },
  },
  async created() {
    const classInfo = await makeRequest(`/maple-classes/${this.$route.params.id}`);
    this.char = { ...this.char, ...classInfo };
  },
};
</script>

<style scoped>
.charpage {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  grid-auto-flow: row;
}

.classimage {
  grid-column: 3 / 5;
  grid-row: span 2;
  display: grid;
  justify-content: center;
}

.classimage img {
  height: max(10rem, 30vh)
}

.classinfo {
  font-size: clamp(2em, 2vw, 3em);
  grid-column: span 2;
}

.classdescription {
  grid-row: 4;
  grid-column: span 4;
}

.classdescription textarea {
  height: 200%;
  width: 100%;
  grid-row: 4;
  grid-column: span 4;
}

.legionskills {
  grid-row: 3;
  grid-column: 4;
}

.linkskills {
  grid-row: 3;
  grid-column: 3;
}

.pros {
  grid-row: 3;
  grid-column: 1;
}

.cons {
  grid-row: 3;
  grid-column: 2;
}

.pros h5,
.cons h5 {
  margin-left: 1rem;
}

.links {
  grid-column: span 4;
  grid-row: 5;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.hidden {
  max-height: 4em;
  overflow: hidden;
}

.showmore {
  grid-row: 1 /2;
  grid-column: 4 / 5;
}

a .link {
  width: 100%;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: rgb(217, 218, 218, .9);
  border-inline: 1px solid rgba(143, 145, 145, 0.9);
  border-collapse: collapse;
}

a .link {
  text-decoration: none;
}

.addlink {
  display: flex;
  flex-direction: column;
}

.savebutton {
  grid-row: 7;
  grid-column: span 4;
  margin-bottom: 5rem;
}

.charstats {
  grid-row: 6;
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(5, 1fr)
}

.charstats div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.charstats .statheader {
  grid-column: span 2;
}
.charstats div input {
  width: 2em;
  height: 1.25em;
}

@media (max-width: 700px) {
  .charpage {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.classimage {
  width: 100%;
}

.classimage img {
  width: 100%;
  object-fit: contain;
}
}
</style>
