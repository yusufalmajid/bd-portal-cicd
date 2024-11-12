<template>
  <div class="heightWrapper">
    <ClientOnly>
      <!-- vsselect-no-search -->
      <div
        class="vSelectWrapper float left"
        :class="[multiple && 'multiple', classProp]"
        style="font-weight: 100"
      >
        <v-select
          :append-to-body="this.appendToBody"
          :calculate-position="withPopper"
          :disabled="disabled"
          :options="optionList"
          :label="displayKey"
          v-model="selectedValue"
          :clearable="false"
          :reduce="(v) => v[valueKey]"
          @input="select"
          :searchable="searchable"
          :placeholder="inputPlaceholder"
          :multiple="multiple"
          :inputIcon="inputIcon"
        >
          <template v-if="currDisplay" v-slot:selected-option-container>
            <span class="vs__selected" style="font-weight: 100">{{
              currDisplay
            }}</span>
          </template>
          <template
            v-else-if="!multiple"
            v-slot:selected-option-container="option"
          >
            <span class="vs__selected" style="font-weight: 100"
              ><slot
                name="selected-option-container"
                v-bind="option['option']"
                >{{ option["option"][displayKey] }}</slot
              ></span
            >
          </template>
          <template v-slot:option="option">
            <span :class="{ multipleOpt: multiple }" style="font-weight: 100"
              ><slot name="option" v-bind="option">{{
                option[displayKey]
              }}</slot></span
            >
          </template>
          <template #open-indicator="{ attributes }">
            <span class="d-flex" v-bind="attributes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                fill="#000"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </span>
          </template>
        </v-select>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
export default {
  name: "InputSelect",
  props: {
    inputPlaceholder: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    action: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    valueKey: {
      type: [String, Number],
      required: true,
    },
    displayKey: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: [String, Number, Array],
      default: "",
    },
    currDisplay: {
      type: [String, Number],
      default: null,
    },
    defPlacement: {
      type: [String],
      default: "bottom-end",
    },
    classProp: {
      type: [String],
      default: "",
    },
    inputIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      optionList: [],
      selectedValue: "",
      displayText: null,
    };
  },
  computed: {
    // selectedDisplay() {
    //     const display = this.optionList.find(i => String(i[this.valueKey]) === String(this.selectedValue))
    //     if (display) {
    //         return display[this.displayKey] || ""
    //     }
    //     return this.currDisplay
    // }
  },
  methods: {
    loadOption() {
      if (this.placeholder) {
        let allOption = {};
        allOption[this.displayKey] = this.$t(this.placeholder);
        allOption[this.valueKey] = "";

        var newArray = [].concat(allOption, this.optionList);
        this.optionList = newArray;
      }
    },
    select(val) {
      this.$emit("update:currDisplay", null);
      this.$emit("update:value", val);
      this.$emit("onChange", val);
    },
    withPopper(dropdownList, component, { width }) {
      // https://vue-select.org/guide/positioning.html#calculated

      dropdownList.style.width = width;

      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.defPlacement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -1],
            },
          },
          {
            name: "toggleClass",
            enabled: true,
            phase: "write",
            fn({ state }) {
              component.$el.classList.toggle(
                "drop-up",
                state.placement === "top-end"
              );
            },
          },
        ],
      });
      return () => popper.destroy();
    },
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        this.optionList = newValue;
        this.loadOption();
      },
      deep: true,
    },
    value(newValue) {
      this.selectedValue = newValue;
    },
    selectedValue(newValue) {
      if (!this.action) {
        this.$emit("update:value", newValue);
      } else {
        this.selectedValue = this.value;
      }
    },
  },
  beforeDestroy() {},
  mounted() {
    this.optionList = this.options;
    this.selectedValue = this.value;
    this.loadOption();
  },
};
</script>
<style scoped>
::v-deep .vSelectWrapper .v-select .vs__dropdown-toggle {
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}
</style>
