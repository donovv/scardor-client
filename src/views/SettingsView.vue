<template>
  {{ id }}
</template>

<script>
export default {
  name: 'SettingsView',
  props: ['id'],
  data() {
    return {
      userSettings: null,
    };
  },
  async mounted() {
    this.userSettings = await this.$store.dispatch('user/getUserInfo', this.id);
  },
};
</script>

<style scoped>
</style>
