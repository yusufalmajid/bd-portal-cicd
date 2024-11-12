<template>
  <div class="d-flex justify-content-between p-4">
    <div class="d-flex align-items-center">
      <NuxtLink
        :to="localePath('/')"
        style="width: 10vw; min-width: 100px"
        class="me-3"
      >
        <img
          src="~/assets/img/logo-v.png"
          style="width: 100%; max-width: 180px"
        />
      </NuxtLink>
      <span class="d-flex company-name" v-html="$t('bdp').replace(/<br\/>/g, ' ')"></span>
    </div>

    <div class="d-flex">
      <div class="profile">
        <div class="d-flex w-100 align-items-center">
          <div class="d-flex flex-column text-end me-2">
            <span class="phone_no">{{$store.state.user.data.name || $store.state.user.data.phone_no}}</span>
            <span class="">{{ $t("client_relationship") }}</span>
          </div>
          <div class="icon-right logo">
            <svg id="Group_51791" data-name="Group 51791" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25.853" height="29.671" viewBox="0 0 25.853 29.671">
              <g id="Group_51790" data-name="Group 51790">
                <g id="Group_51789" data-name="Group 51789" transform="translate(0 0)">
                  <g id="Group_51788" data-name="Group 51788">
                    <g id="Group_51787" data-name="Group 51787" transform="translate(0.491 11.3)" opacity="0.5">
                      <g id="Group_51786" data-name="Group 51786">
                        <g id="Group_51785" data-name="Group 51785">
                          <path id="Path_30975" data-name="Path 30975" d="M26.773,38.131a3.317,3.317,0,0,1-3.317,3.317H4.831a3.317,3.317,0,0,1,0-6.634H23.455a3.317,3.317,0,0,1,3.317,3.317" transform="translate(-1.514 -34.814)" fill="#fff"/>
                        </g>
                      </g>
                    </g>
                    <path id="Path_30976" data-name="Path 30976" d="M17.109,1a3.434,3.434,0,0,1,.009,4.855L5.865,17.294A3.433,3.433,0,1,1,1,12.448L12.254,1.01A3.434,3.434,0,0,1,17.109,1" transform="translate(0 0)" fill="#fff"/>
                    <path id="Path_30977" data-name="Path 30977" d="M8.739,41.836a1.914,1.914,0,1,1-1.914-1.914,1.914,1.914,0,0,1,1.914,1.914" transform="translate(-3.317 -26.965)" fill="#283874"/>
                    <path id="Path_30978" data-name="Path 30978" d="M40.942,36.013a3.433,3.433,0,0,1,.011,4.855L29.7,52.309a3.433,3.433,0,0,1-4.865-4.844l11.25-11.441a3.434,3.434,0,0,1,4.855-.01" transform="translate(-16.101 -23.649)" fill="#fff"/>
                    <path id="Path_30979" data-name="Path 30979" d="M66.3,41.836a1.914,1.914,0,1,1-1.914-1.914A1.914,1.914,0,0,1,66.3,41.836" transform="translate(-42.199 -26.965)" fill="#283874"/>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="icon-right logout">
        <button
          @click="logout"
          class="d-flex menu-item justify-content-between align-items-center"
        >
          <svg
            id="Group_22207"
            data-name="Group 22207"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="22.401"
            height="22.401"
            viewBox="0 0 22.401 22.401"
          >
            <g id="Group_22206" data-name="Group 22206">
              <path
                id="Path_21197"
                data-name="Path 21197"
                d="M12.6,9.058,9.319,5.782,7.961,7.14l3.277,3.277ZM9.319,13.693,12.6,10.417,11.237,9.058,7.961,12.335Zm0-7.912A.96.96,0,0,0,7.961,7.14Zm2.6,3.955.68.68a.96.96,0,0,0,0-1.358Zm-3.955,2.6a.96.96,0,0,0,1.358,1.358Z"
                transform="translate(2.15 1.54)"
                fill="currentColor"
              />
              <path
                id="Path_21198"
                data-name="Path 21198"
                d="M.96,9.98H13.978V8.06H.96Zm13.018,0a.96.96,0,0,0,0-1.92ZM.96,8.06a.96.96,0,0,0,0,1.92Z"
                transform="translate(0 2.257)"
                fill="currentColor"
              />
              <path
                id="Path_21199"
                data-name="Path 21199"
                d="M18.24,11.2a9.125,9.125,0,0,1-2.7,6.824A9.424,9.424,0,0,1,8.96,20.481V22.4a11.347,11.347,0,0,0,7.9-2.984,11.038,11.038,0,0,0,3.3-8.217ZM8.96,1.92a9.424,9.424,0,0,1,6.581,2.456,9.125,9.125,0,0,1,2.7,6.824h1.92a11.038,11.038,0,0,0-3.3-8.217A11.347,11.347,0,0,0,8.96,0Zm0,18.561a.96.96,0,1,0,0,1.92ZM8.96,0a.96.96,0,1,0,0,1.92Z"
                transform="translate(2.24)"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  name: "TopBar",
  data() {
    return {
      expandedSection: null,
      showMenuProfile: false,
      showNotifications: false,
    };
  },
  methods: {
    toggleSection(section) {
      this.expandedSection = this.expandedSection === section ? null : section;
    },
    isExpanded(section) {
      return this.expandedSection === section;
    },
    logout() {
      this.$store.dispatch("user/logOut");
    },
    showDropdownMenuNotifications() {
      this.showMenuProfile = false;
    },
    showDropdownMenuProfile() {
      this.showMenuProfile = !this.showMenuProfile;
    },
    gotToPage(path) {
      this.$router.push(this.localePath(path));
    },
    externalClick(event) {
      if (!event.target.classList.contains("menu-item")) {
        this.showMenuProfile = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.menu-bar {
  background-color: #e9e9e9;
  border-bottom: 1px solid #dee2e6;
  border-radius: 50px;
}

.menu-list {
  background-color: white;
  border-radius: 50px;
  transition: width 2s;
  overflow: hidden;
  width: 50px;
  height: 50px;
  margin-right: 5px;

  &.expanded {
    background-color: #4bca9d;
    width: auto;
  }
}
.dropdown {
  position: absolute;
  top: 60px;
  right: 0px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  z-index: 1000;
  min-width: 200px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;

    li {
      padding: 10px;
      &:hover a,
      &:hover button {
        background-color: #f8f9fa;
        color: #4bca9d;
      }

      a,
      button {
        background: transparent;
        display: flex;
        height: 100%;
        width: 100%;
        padding: 10px 16px;
        cursor: pointer;
        color: #666666;
        border-radius: 4px;
        border: none;
        outline: none;
      }
    }

    .devide {
      width: 100%;
      border-top: 1px solid #666666;
      opacity: 0.1;
    }
  }
}
.icon {
  width: 25px;
  height: 25px;
  margin-right: 8px;
}
.icon-right {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666666;
  background-color: white;
  border-radius: 50px;
  margin: 7px;
  a {
    cursor: pointer;
  }

  svg {
    color: #666666;
  }

  &.logout {
    button {
      background: transparent;
      display: flex;
      height: 100%;
      width: 100%;
      padding: 10px 16px;
      cursor: pointer;
      color: #666666;
      border-radius: 4px;
      border: none;
      outline: none;
    }
  }

  &.logo{
    background: var(--primary);
  }
}
.btn-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s, width 5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  width: 0;
}
.dropdown-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-bottom: 0px;
  }
}
.icon-right:has(.nuxt-link-exact-active),
.icon-right:has(.nuxt-link-active) {
  background: var(--secondary);
  svg {
    path {
      fill: white;
    }
  }
}

.company-name {
  color: var(--primary);
  font-weight: 500;
  font-size: 20px;
}

.profile {
  .phone_no {
    color: var(--primary);
    font-weight: 500;
    font-size: 16px;
  }

  span {
    color: #666666;
    font-weight: 200;
  }
}
</style>
