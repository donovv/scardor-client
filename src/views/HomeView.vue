<template>
  <main class="mt-3 homepage">
    <twitch-component class="twitch"></twitch-component>
    <video-component class="video"></video-component>
    <sponsor-component />
  </main>
</template>

<script>
import twitchComponent from '@/components/homepagecomponents/twitchcomponent.vue';
import videoComponent from '@/components/homepagecomponents/videocomponent.vue';
import sponsorComponent from '@/components/homepagecomponents/sponsorcomponent.vue';

export default {
  name: 'HomeView',
  components: {
    videoComponent,
    twitchComponent,
    sponsorComponent,
  },
};
</script>

<style scoped>
.homepage {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.video {
  grid-row: span 2;
  grid-column: 1;
}

.twitch {
  grid-row: 1;
  grid-column: 2;
}
@media (max-width: 700px) {
  .homepage {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
