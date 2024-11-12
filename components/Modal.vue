<template>
  <transition name="modal-fade">
    <div class="p-modal" v-show="show" :class="{...classObj, 'no-doc-scroll' : show}" @click.self="closeHere">
      <div class="p-modal-dialog">
        <div type="button" class="modalClose" @click="$emit('close')" v-if="!noClose">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44.913"
               height="44.913" viewBox="0 0 44.913 44.913">
            <g id="Group_22113" data-name="Group 22113" transform="translate(0 74.603)">
              <g id="Group_22112" data-name="Group 22112" transform="translate(0 -74.603)">
                <path id="Path_21024" data-name="Path 21024"
                      d="M0,22.457A22.519,22.519,0,0,0,22.457,44.913V41.78A19.384,19.384,0,0,1,3.133,22.457ZM22.457,0A22.519,22.519,0,0,0,0,22.457H3.133A19.384,19.384,0,0,1,22.457,3.133ZM44.913,22.457A22.519,22.519,0,0,0,22.457,0V3.133A19.384,19.384,0,0,1,41.78,22.457ZM22.457,44.913A22.519,22.519,0,0,0,44.913,22.457H41.78A19.384,19.384,0,0,1,22.457,41.78Z"
                      fill="#fff"/>
                <path id="Path_21025" data-name="Path 21025"
                      d="M9.845,21.669,21.668,9.846,19.452,7.629,7.628,19.453ZM21.668,9.846a1.567,1.567,0,1,0-2.216-2.216ZM7.628,19.453a1.567,1.567,0,0,0,2.216,2.216Z"
                      transform="translate(7.807 7.808)" fill="#fff"/>
                <path id="Path_21026" data-name="Path 21026"
                      d="M21.669,19.452,9.846,7.628,7.629,9.845,19.453,21.668ZM9.846,7.628A1.567,1.567,0,0,0,7.629,9.845Zm9.607,14.04a1.567,1.567,0,1,0,2.216-2.216Z"
                      transform="translate(7.808 7.807)" fill="#fff"/>
              </g>
            </g>
          </svg>
        </div>
        <div class="modal-contents text-center">
          <div class="modal-title">
            <slot name="modalTitle"></slot>
          </div>
          <div class="modal-body">
            <slot name="modalBody"></slot>
          </div>
          <div class="modal-button">
            <slot name="modalButton"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    lg: Boolean,
    xl: Boolean,
    md: Boolean,
    sm: Boolean,
    show: Boolean,
    holderClass: String,
    pvOutside: {
      type: Boolean,
      default: false
    },
    noClose: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      classObj: {}
    }
  },
  methods: {
    closeHere() {
      if (!this.pvOutside) {
        this.$emit('close')
      }
    },
    detectClose(e) {
      if (e.key == 'Escape' && !this.pvOutside) {
        this.$emit('close')
      }
    }
  },
  beforeMount() {
    this.classObj = {
      lg: this.lg,
      xl: this.xl,
      md: this.md,
      sm: this.sm
    }

    if (this.holderClass) {
      this.classObj[this.holderClass] = true
    }
  },
  watch: {
    show() {
      if (this.show) {
        document.addEventListener('keyup', this.detectClose)
      } else {
        document.removeEventListener('keyup', this.detectClose)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.p-modal {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  width: 100 dvw;
  height: 100vh;
  height: 100 dvh;
  bottom: 0;
  left: 0;
  z-index: 1050;
}

.p-modal-dialog {
  width: 100%;
  position: fixed;
  bottom: 0rem;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 50%);
  color: var(--text);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(150px);
}

.modalClose {
  position: absolute;
  background: transparent;
  border: 0;
  top: -100px;
  right: 0;
  left: 0;
  width: 50px;
  z-index: 1062;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
}

.modal-contents {
  border-radius: 30px 30px 0 0;
  background: white;
}

.modal-title{
  padding: 50px 0 20px 0;
  color: var(--primary-dark);
  position: sticky;
  top: 0;
  z-index: 2;
  background: transparent;
}

.modal-body{
  padding: 0 0 50px 0;
  font-weight: 100;
  overflow: auto;
}

.modal-button{
  border-top: 1px solid var(--border);
  padding: 20px 0 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.modal-close-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
