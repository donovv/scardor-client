<template>
  <main class="classpicker mt-3">
    <h1>Class Picker</h1>
    <div class="mainlegionselector">
      <label class="btn" for="main">Main:<input @change="reset" type="radio" v-model="mainorlegion" id="main"
          value="main"></label>
      <!-- <label for="legion">Legion:<input @change="reset" type="radio" v-model="mainorlegion" id="legion"
                    value="legion"></label> -->
    </div>
    <div class="buttons">
      <label class="btn" for="casual">Casual:<input type="radio" @change="levelchanged" v-model="levelselector"
          id="casual" value="casual"></label>
      <label class="btn" for="tryhard">Tryhard:<input type="radio" @change="levelchanged" v-model="levelselector"
          id="tryhard" value="tryhard"></label>
      <label class="btn" for="gamer">Ultra Gamer:<input type="radio" @change="levelchanged" v-model="levelselector"
          id="gamer" value="gamer"></label>
    </div>
    <div class="options">
      <draggable :list="searchcriteria" class="dropcontainer" item-key="id" group="searchcriteria">
        <template #item="{ element }">
          <div class="list-group-item btn">
            {{  element.name  }}
          </div>
        </template>
      </draggable>
      <h2>Essentials</h2>
      <draggable :list="options.essentials" class="dropcontainer" item-key="id" group="searchcriteria">
        <template #item="{ element }">
          <div class="list-group-item btn">
            {{  element.name  }}
          </div>
        </template>
      </draggable>
      <h2>Important</h2>
      <draggable :list="options.important" class="dropcontainer" item-key="id" group="searchcriteria">
        <template #item="{ element }">
          <div class="list-group-item btn">
            {{  element.name  }}
          </div>
        </template>
      </draggable>
      <h2>Useful</h2>
      <draggable :list="options.useful" class="dropcontainer" item-key="id" group="searchcriteria">
        <template #item="{ element }">
          <div class="list-group-item btn">
            {{  element.name  }}
          </div>
        </template>
      </draggable>
      <h2>Optional</h2>
      <draggable :list="options.optional" class="dropcontainer" item-key="id" group="searchcriteria">
        <template #item="{ element }">
          <div class="list-group-item btn">
            {{  element.name  }}
          </div>
        </template>
      </draggable>
      <h2>undesireable</h2>
      <draggable :list="options.undesireable" class="dropcontainer" item-key="id" group="searchcriteria">
        <template #item="{ element }">
          <div class="list-group-item btn">
            {{  element.name  }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="buttons">
      <button class="btn" :disabled="loading" @click="findaclass">{{  loading ? 'loading' : 'Submit'  }}</button>
      <button class="btn" @click="reset">Reset</button>
    </div>
    <class-recomendations id="recommendedclass" v-if="visible" :recommendations="classes"></class-recomendations>
  </main>
</template>

<script>
import Draggable from 'vuedraggable';

import classpicker from '../services/classpicker';
import classRecomendations from '../components/classpickercomponents/classRecomendations.vue';

export default {
  name: 'ClassPicker',
  components: {
    Draggable,
    classRecomendations,
  },
  data() {
    return {
      visible: true,
      loading: false,
      classes: null,
      mainorlegion: 'main',
      levelselector: 'casual',
      searchcriteria: [
        { name: 'Key Input Amount', value: 'keyinput' },
        { name: 'Mobility', value: 'mobility' },
        { name: 'Leveling Speed', value: 'levelingspeed' },
        { name: 'Mobbing', value: 'mobbing' },
        { name: 'Bossing', value: ['bossing', 'bossdmg', 'burst', 'offburst'] },
        { name: 'Utility', value: 'bossutil' },
        { name: 'Survivability', value: 'survivability' },
      ],
      options: {
        essentials: [],
        important: [],
        useful: [],
        optional: [],
        undesireable: [],
      },
    };
  },
  methods: {
    reset() {
      this.classes = null;
      this.options = {
        essentials: [],
        important: [],
        useful: [],
        optional: [],
        undesireable: [],
      };
      if (this.levelselector === 'casual') {
        this.searchcriteria = [
          { name: 'key Input Amount', value: 'keyinput' },
          { name: 'Mobility', value: 'mobility' },
          { name: 'Leveling Speed', value: 'levelingspeed' },
          { name: 'Mobbing', value: 'mobbing' },
          { name: 'Bossing', value: ['bossing', 'bossdmg', 'burst', 'offburst'] },
          { name: 'Utility', value: 'bossutil' },
          { name: 'Survivability', value: 'survivability' },
        ];
      }
      if (this.levelselector === 'tryhard' || this.levelselector === 'gamer') {
        this.searchcriteria = [
          { name: 'Mobbing key Input', value: 'mobbing/keyinput' },
          { name: 'Bossing key Input', value: 'bossing/keyinput' },
          // { name: 'key Input Amount', value: 'keyinput' },
          { name: 'Mobility', value: 'mobility' },
          { name: 'Leveling Speed', value: 'levelingspeed' },
          { name: 'Mobbing', value: 'mobbing' },
          { name: 'Bossing', value: ['bossing', 'bossdmg', 'burst', 'offburst'] },
          { name: 'Utility', value: 'bossutil' },
          { name: 'Survivability', value: 'survivability' },
        ];
      }
    },
    levelchanged() {
      this.searchcriteria = this.searchcriteria.filter((criteria) => !criteria.value.includes('keyinput'));
      Object.entries(this.options).forEach((key) => {
        this.options[key[0]] = key[1].filter((criteria) => !criteria.value.includes('keyinput'));
      });
      if (this.levelselector === 'casual') this.searchcriteria.splice(0, 0, { name: 'key Input Amount', value: 'keyinput' });
      if (this.levelselector === 'tryhard' || this.levelselector === 'gamer') {
        this.searchcriteria.splice(
          0,
          0,
          { name: 'Mobbing key Input', value: 'mobbing/keyinput' },
          { name: 'Bossing key Input', value: 'bossing/keyinput' },
        );
      }
    },
    async findaclass() {
      if (Object.values(this.options).every((arr) => arr.length === 0)) return;
      this.loading = true;
      this.classes = null;
      this.visible = false;
      await this.$nextTick();
      this.visible = true;
      await this.$nextTick();
      const classdialog = document.getElementById('recommendedclass');
      const temp = await classpicker(this.mainorlegion, this.levelselector, this.options);
      this.classes = temp.slice(0, 5);
      classdialog.showModal();
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.classpicker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding-bottom: 10em;
}

.buttons {
  display: flex;
  gap: 1em;
}

.dropcontainer {
  display: flex;
  width: 80vw;
  min-height: 3em;
  max-width: 800px;
  background-color: hsl(var(--menu-background-color));
  overflow-x: scroll;
  padding: .5em;
  border-radius: .5em;
  margin-block: .25em;
  box-shadow: 0 0 0 3px #bbb,
    -3px 3px 3px 2px #bbb;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: gainsboro;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--primary-color-dark), .6);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.list-group-item {
  white-space: nowrap;
}
</style>
