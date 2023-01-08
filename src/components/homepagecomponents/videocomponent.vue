<template>
  <div class="videos">
    <iframe class="videoplayer" id="iframe" allowfullscreen title="videoplayer" />
    <carousel v-if="latestVideos" class="videocarousel" snapAlign="center" :items-to-show="3">
      <slide v-for="video in latestVideos" :key="video.guid">
        <div class="card">
          <button class="cardbutton" @click="loadVideoToIframe($event, video)">
            <div class="card-img" :style="{ 'background-image': `url(${video.thumbnail})` }"></div>
            <div class="card-title">{{ video.title }}</div>
          </button>
        </div>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import makeRequest from '@/services/api';

export default {
  name: 'videoComponent',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      latestVideos: null,
    };
  },
  methods: {
    loadVideoToIframe(event, video) {
      const iframe = document.getElementById('iframe');
      if (video.link) iframe.setAttribute('src', `https://www.youtube.com/embed/${video.link.split('=')[1]}`);
      const cards = document.getElementsByClassName('cardbutton');
      [...cards].forEach((card, i) => {
        card.classList.remove('active');
        if (event === null && i === 0) card.classList.add('active');
        if (card.contains(event?.target)) card.classList.add('active');
      });
    },
  },
  created() {
    makeRequest('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCQJmDq0tvGVUvySF1HbfS5Q')
      .then((res) => {
        this.latestVideos = res.items;
        this.$nextTick(() => this.loadVideoToIframe(null, this.latestVideos[0]));
      });
  },
};
</script>

<style scoped>
.videos {
  width: 90vw;
  max-width: 600px;
}

.videoplayer {
  width: 100%;
  aspect-ratio: 16/9;
}

.card {
  width: 30vw;
  max-width: 200px;
  aspect-ratio: 4/3;
}

.cardbutton {
  position: relative;
  height: 100%;
  width: 100%;
}

.card-title {
  font-size: clamp(.6rem, 2vw, 1.2rem);
  z-index: 3;
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.card-img {
  top: 0;
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
}

.card-img::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, .6);
  z-index: 1;
}
.active .card-img::after {
  background-color: rgb(100%, 100%, 100%, .6);
}

.active .card-title {
  color: black;
  font-weight: bold;
}

@media (max-width: 700px) {
  .videos {
    margin-inline: auto;
  }
}
</style>
