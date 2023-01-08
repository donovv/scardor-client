<template>
  <div class="twitchcard">
    <div class="twitchstatus">
      <h1>Scardor is currently:</h1>
      <h1 class="currentstatus">{{ twitch?.type || "Offline" }}</h1>
    </div>
    <img src="@/assets/twitch-icon.white.svg" alt="Twitch Logo" />
  </div>
</template>

<script>
import makeRequest from '@/services/api';

export default {
  name: 'twitchComponent',
  data() {
    return {
      twitch: null,
    };
  },
  mounted() {
    makeRequest('/twitch')
      .then((res) => { [this.twitch] = res; });
  },
};
</script>

<style scoped>
.twitchcard {
  width: max(40%, 350px);
  height: 5em;
  Background-color: rgb(48, 63, 66, .9);
  color: white;
  padding: .5em;
  border-radius: 10px;
  justify-self: center;
  display: flex;
  justify-content: space-between;
  margin-inline: auto;
}

.twitchcard>img {
  height: 100%;
}

.currentstatus {
  text-transform: capitalize;
}

.twitchstatus h1 {
  width: 100%;
  font-size: clamp(1.5em, 1.5vw, 1.5em);
}
</style>
