<template>
  <div class="top-bar">
    <div
      v-for="item in menuItems"
      :key="item.title"
      class="menu-item"
      @click="activateItem(item)"
    >
      <div class="item" :class="item.active ? 'icon-active' : 'icon'">
        <!-- <i :class="`${item.icon} icon-class`"></i> -->
        <img :src="item.srcOff" class="icon-class" v-if="!item.active" />
        <img :src="item.src" class="icon-class" v-if="item.active" />
        <p class="menu-title" v-if="item.active">{{ item.title }}</p>
      </div>
      <transition name="slide" v-if="item.active && showSubMenu">
        <div v-if="item.subMenu" class="dropdown" @click.stop>
          <div
            class="dropdown-option"
            v-for="subItem in item.subMenu"
            :key="subItem.title"
            @click="navigateTo(subItem.path)"
          >
            <p>{{ subItem.title }}</p>
            <p>></p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import DashboardIcon from "assets/img/topbar-dashboard-white.png";
import DashboardIconOff from "assets/img/topbar-dashboard.png";
import EmployerIcon from "assets/img/topbar-employer-white.png";
import EmployerIconOff from "assets/img/topbar-employer.png";
import StaffIcon from "assets/img/topbar-staff-white.png";
import StaffIconOff from "assets/img/topbar-staff.png";
import BillingIcon from "assets/img/topbar-billing-white.png";
import BillingIconOff from "assets/img/topbar-billing.png";
import WalletIcon from "assets/img/topbar-wallet-white.png";
import WalletIconOff from "assets/img/topbar-wallet.png";
import ReportIcon from "assets/img/topbar-report-white.png";
import ReportIconOff from "assets/img/topbar-report.png";

export default {
  data() {
    return {
      menuItems: [
        {
          title: this.$t('dashboard'),
          src: DashboardIcon,
          srcOff: DashboardIconOff,
          path: "/dashboard",
          active: false,
        },
        // {
        //   title: this.$t('employer'),
        //
        //   src: EmployerIcon,
        //   srcOff: EmployerIconOff,
        //   subMenu: [
        //     { title: "Employer List", path: "/employer-list" },
        //     { title: "Role List", path: "/role-list" },
        //   ],
        //   active: false,
        // },
        {
          title: this.$t('staff'),
          src: StaffIcon,
          srcOff: StaffIconOff,
          path: "/staff",
          active: false,
        },
        // {
        //   title: this.$t('billing'),
        //   src: BillingIcon,
        //   srcOff: BillingIconOff,
        //   path: "/billing",
        //   active: false,
        // },
        {
          title: this.$t('payment'),
          src: WalletIcon,
          srcOff: WalletIconOff,
          path: "/payment",
          active: false,
        },
        // {
        //   title: "Report",
        //   src: ReportIcon,
        //   srcOff: ReportIconOff,
        //   subMenu: [
        //     { title: "Import List", path: "/import-list" },
        //     { title: "Export List", path: "/export-list" },
        //   ],
        //   active: false,
        // },
      ],
      showSubMenu: false
    };
  },
  methods: {
    activateItem(item) {
      this.menuItems.forEach(
        (it) => (it.active = it === item ? !it.active : false)
      );
      this.showSubMenu = true
      if (!item.subMenu) this.navigateTo(item.path);
    },
    navigateTo(path) {
      this.$router.push(this.localePath(path));
      this.showSubMenu = false
    },
  },
  mounted() {
    this.$nextTick(() =>{
      this.menuItems.forEach((v) => {
        v.active = this.$router.currentRoute.path == v.path;
      })
    })
  },
  watch: {
    '$route.path': {
      handler: function(path) {
        if(path.includes('settings') || path.includes('notifications')){
          this.menuItems.forEach(
            (it) => it.active =false
          );
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 30px;
  padding: 10px;
}
.menu-item {
  position: relative;
  cursor: pointer;
  margin: 0px 4px;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.icon {
  font-size: 18px;
  background-color: white;
  padding: 10px;
  border-radius: 30px;
  height: 40px;
  width: 40px;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  img {
    width: 100%;
  }
}
.icon-active {
  font-size: 18px;
  background-color: var(--secondary);
  padding: 10px 18px;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.menu-title {
  background-color: var(--secondary);
  color: white;
  border-radius: 30px;
}
.dropdown {
  position: absolute;
  background-color: white;
  color: #4bca9d;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
  width: 150px;
  top: 100%;
  left: 0;
  z-index: 10;
  margin-top: 10px;
}
.dropdown div {
  padding: 8px;
  cursor: pointer;
  text-align: left;
}
.dropdown div:hover {
  background-color: #f0f0f0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.dropdown-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-bottom: 0px;
  }
}
.icon-class {
  display: flex;
  align-items: center;
}
.menu-title {
  margin-bottom: 0;
  margin-left: 12px;
  color: white;
  font-size: 14px;
}
</style>
