<template>
  <div class="row mb-4 menus">
    <div
      :class="[
        'card card-menu',
        `bg-${menu.bgColor}`,
        `text-${menu.textColor}`,
        {
          selected: selectedMenu === menu.path,
          unselected: selectedMenu && selectedMenu !== menu.path,
        },
      ]"
      v-for="(menu, index) in menus"
      :key="menu.id"
      @click="goToPage($event, menu)"
    >
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div class="card-title">
            <p class="card-text mb-2">{{ $t(menu.title) }}</p>
            <h4 class="card-text-amout">{{ menu.amount }}</h4>
          </div>
          <div v-if="index != 2" class="action-box">
            <button
              type="button"
              :id="`action-add-${menu.title}`"
              @click="handleAction($event, menu, index)"
              class="action"
              :class="
                menu.title === 'total_application_submission' ? 'bg-light' : ''
              "
            >
              <svg
                :id="`action-icon-${menu.title}`"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5"
              >
                <path
                  d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "CashRebates",
  props: {
    containerClass: String,
  },
  data() {
    return {
      menus: [
        {
          id: 1,
          title: "total_leads_submission",
          amount: this.$store.state.total_leads || 0,
          path: "/lead-submissions",
          bgColor: "blue",
          textColor: "white",
        },
        {
          id: 2,
          title: "total_application_submission",
          amount: this.$store.state.total_application || 0,
          path: "/application-submissions",
          bgColor: "white",
          textColor: "blue",
        },
        {
          id: 3,
          title: "total_report_lists",
          amount: this.$store.state.total_report || 0,
          path: "/reports",
          bgColor: "green",
          textColor: "white",
        },
      ],
      selectedMenu: "",
    };
  },
  methods: {
    cekElementId(event) {
      let target = event.target;
      if (
        target.id.includes("action-add-total_application_submission") ||
        target.id.includes("action-add-total_leads_submission") ||
        target.id.includes("action-icon-total_leads_submission") ||
        target.id.includes("action-icon-total_application_submission")
      ) {
        return false;
      }

      return true;
    },
    goToPage(event, menu) {
      const isRouter = this.cekElementId(event);
      if (!isRouter) return;

      this.selectedMenu = menu.path;

      this.$router.push(`${menu.path}`);
    },
    handleAction(event, menu, index) {
      const isRouter = this.cekElementId(event);
      if (!isRouter) {
        this.$store.commit("setOpenCreateNewModal", {
          name: menu.path,
          open: true,
        });
      }
    },
    async getData(){
      this.$store.dispatch('updateLeadTotals');
      this.$store.dispatch('updateApplicationTotals');
    }
  },
  watch: {
    "$route.path": {
      handler: function (path) {
        this.selectedMenu = path;
      },
      deep: true,
      immediate: true,
    },
    "$store.state.total_leads": {
      handler: function(v){
        this.menus[0].amount = v || 0;
      },
      deep: true,
      immediate: true,
    },
    "$store.state.total_application": {
      handler: function(v){
        this.menus[1].amount = v || 0;
      },
      deep: true,
      immediate: true,
    },
    "$store.state.total_report": {
      handler: function(v){
        this.menus[2].amount = v || 0;
      },
      deep: true,
      immediate: true,
    }
  },
  mounted() {
    this.getData();
  },
};
</script>
    
<style scoped lang="scss">
.menus {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  .card-menu {
    background: none;
    position: relative;
    overflow: hidden;
    z-index: 2;
    cursor: pointer;
    width: 100%;
    height: 148px;
    transition: all 0.3s ease-in-out;
    display: flex;

    .card-title {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    &.bg-blue {
      background: #283874;
    }

    &.bg-white {
      background: #fff;
    }
    &.bg-green {
      background: #4bca9d;
    }

    &.text-blue {
      color: #283874;
    }

    &.text-white {
      color: #fff;
    }

    .card-body {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: auto;
      position: relative;

      .card-text {
        font-size: 16px;
        font-weight: 200;
      }

      .card-text-amout {
        font-weight: 600;
        font-size: 40px;
      }

      .action-box {
        position: absolute;
        right: 8px;
      }

      .action {
        background: white;
        border-radius: 100%;
        padding: 4px;
        height: 44px;
        width: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 7px;
        outline: none;
        border: none;

        &.bg-light {
          background: #f9f9f9;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .menus {
    flex-direction: row;

    .card-menu {
      &.selected {
        flex: 2;
      }

      &.unselected {
        flex: 1;
      }

      .card-body {
        padding: 4px;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .menus {
    .card-menu {
      .card-body {
        padding: 20px 20px 10px 20px;
      }
    }
  }
}
</style>
    