<template>
  <div class="sponsorcarousel">
    <carousel :items-to-show="1" :wrapAround="true" :autoplay="30000">
      <slide v-for="sponsor in sponsors"  :key="sponsor.name">
        <a :href="sponsor.sponsorlink" target="_blank">
          <img :src="sponsor.imglink" :alt="sponsor.name">
        </a>
      </slide>
    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

export default {
  name: 'sponsorComponent',
  data() {
    return {
      sponsors: [
        {
          name: 'wrath',
          imglink: './sponsor-imgs/wrath-banner.png',
          sponsorlink: 'https://www.drinkwraith.com/collections/energy',
        },
        {
          name: 'exitlag',
          imglink: './sponsor-imgs/exitlag-banner.png',
          sponsorlink: 'https://exitl.ag/scardor',
        },
      ],
    };
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style>
</style>
