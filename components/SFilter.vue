<template>
  <div class="filter" :class="{ noHide: !mobileHide }">
    <div
      class="filter-backdrop"
      v-if="filterToggle"
      @click="filterToggle = false"
    ></div>
    <input
      type="checkbox"
      class="filterToggle"
      :id="'forFilter' + id"
      v-model="filterToggle"
    />
    <div class="filterWrapper" ref="filter">
      <div class="filterBox" :class="{ small: smallFilterBox }">
        <label class="closeFilter" :for="'forFilter' + id">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </label>
        <div class="d-md-flex justify-content-end align-items-center">
          <div class="bold-m text-l24 mb-3 d-inline-block d-md-none">
            {{ $t("filter") }}
          </div>
        </div>
        <form @submit.prevent="search">
          <div class="row flex-wrap">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SFilter",
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    filterButton: {
      type: Boolean,
      default: true,
    },
    buttonClass: {
      type: [String, Object],
      default: "col",
    },
    mobileHide: {
      type: Boolean,
      default: true,
    },
    refreshFilterHeight: {
      type: Number,
      default: 0,
    },
    defaultFilterToggle: {
      type: Boolean,
      default: true,
    },
    smallFilterBox: {
      type: Boolean,
      default: false,
    },
    disableSearch: {
      type: Boolean,
      default: false,
    },
    hasExportButton: {
      type: Boolean,
      default: false,
    },
    includeAddAction: {
      type: Boolean,
      default: false,
    },
    includeBulkAction: {
      type: Boolean,
      default: false,
    },
    includeAddRole: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: this.$randomId(),
      filterToggle: true,
      height: 0,
      showAddModal: false,
    };
  },
  methods: {
    emitBulkButton() {
      this.$emit("clickBulkButton");
    },
    emitButton() {
      this.$emit("clickButton");
    },
    search() {
      if (this.originalWidth < 768 && !this.mobileHide)
        this.filterToggle = false;
      this.$emit("search");
    },
    reset() {
      if (this.originalWidth < 768 && !this.mobileHide)
        this.filterToggle = false;
      this.$emit("reset");
    },
    resizeHandler() {
      let currentWidth = window.innerWidth || 0;
      if (this.originalWidth > 767 && currentWidth < 768 && this.mobileHide) {
        this.filterToggle = false;
      } else if (currentWidth > 767 || !this.mobileHide) {
        this.filterToggle = true;
      }

      this.originalWidth = currentWidth;
      this.filterHeight();
    },
    filterHeight() {
      if (this.$refs.filter) {
        this.height = this.$refs.filter.scrollHeight;
      }
    },
    toggleAddModal() {
      console.log("button clicked");

      this.showAddModal = true;
    },
  },
  watch: {
    refreshFilterHeight() {
      this.$nextTick(() => {
        this.filterHeight();
      });
    },
  },
  mounted() {
    this.originalWidth = window.innerWidth || 0;
    this.filterToggle =
      (this.originalWidth > 767 || !this.mobileHide) &&
      this.defaultFilterToggle;
    window.addEventListener("resize", this.resizeHandler);

    this.filterHeight();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>

<style scoped lang="scss">
.forFilterWrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  margin: 0 -0.5rem -0.5rem -0.5rem;
  padding: 0.5rem 1rem;

  > * {
    margin: 0 0.5rem 0.5rem 0.5rem;
  }

  .iconBtn {
    overflow: visible;
  }
}

.filterWrapper {
  border-bottom: 1px solid var(--border);
  overflow: hidden;

  .filterBox {
    padding: 1rem 1.6rem;
    position: relative;

    &.small {
      padding: 0.5rem;
    }
  }

  .closeFilter {
    display: none;
  }
}

.btn {
  background-color: #e9e9e9;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-refresh {
  background-color: #4bca9d;
  color: white;
}

.add-user {
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: #4bca9d;
  border-radius: 50px;
  padding: 5px 15px;
  font-size: 15px;
  height: 45px;
  min-width: 160px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 10px transparentize(black, 0.8);
  }
}

.filterToggle {
  display: none;

  & ~ .filterWrapper {
    transition: bottom 0.3s, max-height 0.3s;
  }
}

@media (max-width: 767px) {
  .filter:not(.noHide) {
    .filter-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 3;
    }

    .filterWrapper {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 3;

      .filterBox {
        overflow-y: auto;
        height: 70vh;
        border-radius: 10px 10px 0 0;
        border: 1px solid var(--bg-content-light);
        background-color: var(--bg-content);
        padding: 20px;
      }

      .closeFilter {
        position: absolute;
        top: 25px;
        right: 25px;
        display: inline-block;
      }
    }

    .filterToggle {
      & ~ .filterWrapper {
        bottom: -100%;
        max-height: unset !important;
      }

      &:checked ~ .filterWrapper {
        bottom: 0;
      }
    }
  }
}
</style>
