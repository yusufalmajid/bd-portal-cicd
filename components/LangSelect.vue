<template>
  <div class="lang-switcher" @click="toggleLang()" ref="langSwitcher">
    <div class="lang-label d-none d-md-flex">
      <span class="text-uppercase">{{ currentLangName }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.065"
        height="5.854"
        viewBox="0 0 9.065 5.854"
      >
        <path
          d="M4.05,16.395.2,12.541a.677.677,0,0,1,0-.961l.64-.64a.677.677,0,0,1,.961,0l2.732,2.732L7.261,10.94a.677.677,0,0,1,.961,0l.64.64a.677.677,0,0,1,0,.961L5.008,16.395a.674.674,0,0,1-.958,0Z"
          transform="translate(0.004 -10.74)"
          fill="#707070"
        />
      </svg>
    </div>
    <div class="lang-label d-flex d-md-none">
      <i class="bi bi-globe d-flex align-items-center" />
    </div>
    <div class="lang-dropdown shadow-sm" :class="{ show: showLang }">
      <div
        v-for="lang in $i18n.locales"
        :key="lang.code"
        class="lang-option"
        :class="{ selected: $i18n.locale == lang.code }"
        :value="lang.code"
        @click="$store.dispatch('changeLang', lang.code)"
      >
        {{ lang.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LangSelect",
  data() {
    return {
      showLang: false,
    };
  },
  computed: {
    currentLangName() {
      const currentLocale = this.$i18n.locales.find(
        (l) => l.code == this.$i18n.locale
      );
      if (currentLocale) {
        return currentLocale.name;
      }
      return this.$i18n.locale;
    },
  },
  methods: {
    toggleLang() {
      this.showLang = !this.showLang;
    },
    changeLang(e) {
      this.$store.dispatch("changeLang", e.target.value);
    },
    checkClose(e) {
      if (
        this.$refs.langSwitcher &&
        !this.$refs.langSwitcher.contains(e.target)
      ) {
        this.showLang = false;
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.checkClose);
  },
  mounted() {
    document.addEventListener("click", this.checkClose);
  },
};
</script>

<style scoped>
.lang-label {
  /* border: 1px solid #B5B5B5; */
  /* padding: 0.5rem 0.6rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* min-width: 100px; */
}

.lang-label span {
  flex-shrink: 0;
  margin-right: 0.6rem;
}

.lang-switcher {
  cursor: pointer;
  position: relative;
  display: inline-block;
  text-align: left;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  transform: translateY(-30px);
  z-index: 2;
  right: 0;
  background: var(--bg-content);
  width: 140px;
}

.lang-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  padding: 15px;
}

.lang-option:hover {
  color: var(--primary);
}

/* .lang-option.selected {
    background: var(--bg-main);
    color: #fff;
} */
</style>
