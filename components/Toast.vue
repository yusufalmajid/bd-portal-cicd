<template>
  <!-- <div class="toast-wrapper">
      <transition-group name="toast" tag="div">
          <div class="toast-item shadow-sm m-3 px-4 pt-3 pb-4" v-for="v in $store.state.toast.items" :key="v.id" :style="v.status ? {backgroundColor: `#0F3355`, border: `1px solid #51D0E1` } : {backgroundColor: `#3A2529`, border: `1px solid #9D1414` }">
              <div class="toast-details">
                  <div class="me-3">
                      <svg v-if="!v.status" class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
                          <g id="Group_518" data-name="Group 518" transform="translate(-1425.359 -853.359)">
                              <circle id="Ellipse_49" data-name="Ellipse 49" cx="17" cy="17" r="17" transform="translate(1425.359 853.359)" fill="#9d1414"/>
                              <g id="Group_25551" data-name="Group 25551" transform="translate(1431.334 870.359) rotate(-45)">
                              <path id="Path_33020" data-name="Path 33020" d="M0,0V15.592" transform="translate(7.797)" fill="none" stroke="#fff" stroke-width="2"/>
                              <path id="Path_33021" data-name="Path 33021" d="M0,0V15.592" transform="translate(15.592 7.795) rotate(90)" fill="none" stroke="#fff" stroke-width="2"/>
                              </g>
                          </g>
                      </svg>
                      <svg v-else class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
                          <g id="Group_518" data-name="Group 518" transform="translate(-1425.359 -853.359)">
                              <circle id="Ellipse_49" data-name="Ellipse 49" cx="17" cy="17" r="17" transform="translate(1425.359 853.359)" fill="#28659e"/>
                              <path id="Path_923" data-name="Path 923" d="M0,0V8.32H16.189" transform="translate(1433.801 869.906) rotate(-45)" fill="none" stroke="#fff" stroke-width="3"/>
                          </g>
                      </svg>
                  </div>

                  <div>
                      <div class="color-white mb-1 text-l bold-l">{{$t( v.status ? "successful" : "error")}}</div>
                      <div class="toast-message color-lightgray" style="word-break: break-word;">
                          {{v.message}}
                      </div>
                  </div>
              </div>
              <div class="toast-close ms-2 color-gray align-self-center" @click="close(v.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14.269" height="14.269" viewBox="0 0 14.269 14.269">
                      <g id="Group_517" data-name="Group 517" transform="translate(7.135 -4.306) rotate(45)">
                          <path id="Path_682" data-name="Path 682" d="M0,0H16.179" transform="translate(0 8.09)" fill="none" stroke="#848484" stroke-linecap="round" stroke-width="2"/>
                          <path id="Path_683" data-name="Path 683" d="M0,0H16.179" transform="translate(8.09 0) rotate(90)" fill="none" stroke="#848484" stroke-linecap="round" stroke-width="2"/>
                      </g>
                  </svg>
              </div>
              <div class="toast-loading" :class="{[v.status] : true}" :style="loadingWidth(v)"></div>
          </div>
      </transition-group>
  </div> -->
  <div>
    <Modal :show="true" md v-for="v in $store.state.toast.items" :key="v.id" :noClose="true" :pvOutside="true">
      <template v-slot:modalTitle></template>
      <template v-slot:modalBody>
        <div>
          <div>
            <template v-if="v.status">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="90" fill="var(--success)" class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg> -->
              <ClientOnly>
                <Lottie :options="successIcon" :width="150"/>
              </ClientOnly>
            </template>
            <template v-else>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="90" fill="var(--danger)" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg> -->
              <ClientOnly>
                <Lottie :options="errorIcon" :width="120"/>
              </ClientOnly>
            </template>
          </div>
          <div class="mb-1 text-l26 bold-m">{{ $t(v.status ? "successful" : "error") }}</div>
          <div class="text-m">{{ v.message }}</div>
          <button v-if="!v.status" class="button secondary mt-3" @click="$store.commit('toast/remove', v.id)">
            {{ $t('try_again') }}
          </button>
        </div>
      </template>
      <template v-slot:modalButton></template>
    </Modal>
  </div>
</template>

<script>
import * as successIconData from "@/assets/json/successIcon.json";
import * as errorIconData from "@/assets/json/errorIcon.json";

export default {
  data() {
    return {
      successIcon: {animationData: successIconData.default, loop: false},
      errorIcon: {animationData: errorIconData.default, loop: false},
    }
  },
  computed: {},
  methods: {
    loadingWidth(v) {
      return {
        animationDuration: `${v.duration / 1000}s`
      }
    },
    close(id) {
      this.$store.commit('toast/remove', id)
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1px) {
  .toast-wrapper {
    max-width: 300px;
  }
}

@media screen and (min-width: 576px) {
  .toast-wrapper {
    max-width: 400px;
  }
}

.toast-wrapper {
  position: fixed;
  bottom: 50px;
  right: 0px;
  width: 100%;
  z-index: 1051;
  color: #222;
}

.toast-item {
  display: flex;
  border-radius: 5px;
  font-size: 16px;
  justify-content: space-between;
  position: relative;
  /* background-color: #fff; */
}

.toast-details {
  display: flex;
}

.toast-icon {
  height: 2em;
  width: 2em;
}

.toast-close {
  cursor: pointer;
}

.toast-close svg {
  width: 20px;
  height: 20px;
  color: #888;
  transition: all 0.3s;
}

.toast-close:hover svg {
  color: #444;
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s;
}

.toast-enter, .toast-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.toast-loading {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  width: 100%;
  border-radius: 3px;
  animation: shrink linear;
  animation-fill-mode: forwards;
}

.toast-loading.true {
  background-color: #51D0E1;
}

.toast-loading.false {
  background-color: #9D1414;
}

@keyframes shrink {
  0% {
    width: 100%;
  }
  100% {
    width: 0%
  }
}
</style>
