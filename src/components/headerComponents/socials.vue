<template>
  <div class="socials">
    <ul>
      <li><a href="https://twitch.tv/scardor/"><img src="@/assets/twitch-icon.black.svg" alt="twitch link" /></a></li>
      <li><a href="https://www.youtube.com/scardor"><img src="@/assets/youtube-icon.svg" alt="youtube link" /></a></li>
      <li><a href="https://discord.com/invite/n9MywuN"><img src="@/assets/discord-icon.svg" alt="discord link" /></a></li>
      <li><a href="https://twitter.com/ScardorGaming"><img src="@/assets/twitter-icon.svg" alt="twitter Link" /></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'socialsVue',
};
</script>

<style>
.socials {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}

.socials > ul {
    display: flex;
    gap: .5em;
    list-style: none;
}
.socials a {
    display: block;
    height: 2rem;
    aspect-ratio: 1/1;
}
.socials a img {
    object-fit: contain;
    height: 100%;
    color: red;
}

</style>
