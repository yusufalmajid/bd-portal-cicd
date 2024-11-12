<template>
  <transition name="slide-up">
    <div v-if="show" class="modal-overlay" :class="{'no-doc-scroll' : show}" @click="close">
      <div class="modal-container" @click.stop>
        <button class="close-button" @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="44.913"
            height="44.913"
            viewBox="0 0 44.913 44.913"
          >
            <g
              id="Group_22113"
              data-name="Group 22113"
              transform="translate(0 74.603)"
            >
              <g
                id="Group_22112"
                data-name="Group 22112"
                transform="translate(0 -74.603)"
              >
                <path
                  id="Path_21024"
                  data-name="Path 21024"
                  d="M0,22.457A22.519,22.519,0,0,0,22.457,44.913V41.78A19.384,19.384,0,0,1,3.133,22.457ZM22.457,0A22.519,22.519,0,0,0,0,22.457H3.133A19.384,19.384,0,0,1,22.457,3.133ZM44.913,22.457A22.519,22.519,0,0,0,22.457,0V3.133A19.384,19.384,0,0,1,41.78,22.457ZM22.457,44.913A22.519,22.519,0,0,0,44.913,22.457H41.78A19.384,19.384,0,0,1,22.457,41.78Z"
                  fill="#fff"
                />
                <path
                  id="Path_21025"
                  data-name="Path 21025"
                  d="M9.845,21.669,21.668,9.846,19.452,7.629,7.628,19.453ZM21.668,9.846a1.567,1.567,0,1,0-2.216-2.216ZM7.628,19.453a1.567,1.567,0,0,0,2.216,2.216Z"
                  transform="translate(7.807 7.808)"
                  fill="#fff"
                />
                <path
                  id="Path_21026"
                  data-name="Path 21026"
                  d="M21.669,19.452,9.846,7.628,7.629,9.845,19.453,21.668ZM9.846,7.628A1.567,1.567,0,0,0,7.629,9.845Zm9.607,14.04a1.567,1.567,0,1,0,2.216-2.216Z"
                  transform="translate(7.808 7.807)"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
        </button>

        <slot name="modalBody" />
      </div>
    </div>
  </transition>
</template>
  
  <script>
export default {
  name: "AddStaff",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    setup: String,
    id: String,
  },
  methods: {
    done() {
      this.$emit("close");
      this.$emit("refreshKeyNow");
    },
    close() {
      this.$emit("close");
    },
    apply() {
      this.close();
    },
  },
};
</script>
  
<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 9;
}

.modal-container {
  background: white;
  width: 50%;
  height: 100%;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: absolute;
  right: 0;
}

.close-button {
  position: relative;
  top: -80px;
  left: 0;
  right: 0;
  border: none;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  background: transparent;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.language-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.apply-button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.apply-button:hover {
  background: #218838;
}

.checkmark {
  color: green;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translatex(80%);
  opacity: 0;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
    font-size: 16px;
    color: #333;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #4caf50;
    }
  }
}

.select-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
    font-size: 16px;
    color: #333;
  }

  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #4caf50;
    }
  }
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    width: 48%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.cancel {
      background-color: #f5f5f5;
      color: #333;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    &.create {
      background-color: #4caf50;
      color: #fff;

      &:hover {
        background-color: #45a049;
      }
    }
  }
}
</style>
  