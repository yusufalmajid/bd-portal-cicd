<template>
  <div class="app-page dev" :key="refreshKey">
    <div>
      <div class="nuxt-container">
        <TopBar></TopBar>
        <TopCardMenu class="mt-5 mb-5 px-4" />
        <div class="flex-grow-1 content-page" v-if="isLoaded">
          <Nuxt />
        </div>
      </div>
    </div>
    <Toast></Toast>
    <Loader></Loader>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isLoaded: false,
      refreshKey: 0,
    };
  },
  beforeMount() {
    this.$store.dispatch("sidebar/generateSideBar");
  },
  mounted() {
    this.isLoaded = true;
  },
  watch: {
    "$i18n.locale"() {
      this.refreshKey++;
    },
  },
};
</script>

<style scoped>
.nuxt-container {
  max-width: 90%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}
@media screen and (min-width: 1px) {
  .nuxt-container {
    max-width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
  }
}

@media screen and (min-width: 992px) {
  .nuxt-container {
    max-width: calc(90%);
    margin: auto;
  }

  .nuxt-container.s {
    max-width: calc(100%);
  }
}

.content-page {
  min-height: calc(100vh - 6.4rem);
  min-height: calc(100dvh - 6.4rem);
  overflow-y: auto;
}
</style>
