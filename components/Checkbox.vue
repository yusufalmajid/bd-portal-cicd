<template>
  <div class="o-checkbox-wrapper" :class="{'justify-content-end': right}">
    <div class="o-checkbox" :class="{'o-switch': $props.switch, checked: value, 'cursor-auto': disabled}"
         @click="toggle" :style="{fontSize: `${size || 16}px`}"></div>
    <input type="checkbox" :checked="value" style="display:none;" :disabled="disabled" :required="required">
    <label class="form-check-label o-checkbox-label" :class="{'cursor-auto': disabled}" @click="toggle">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    switch: Boolean,
    disabled: Boolean,
    required: Boolean,
    size: Number,
    right: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {}
  },
  methods: {
    toggle() {
      if (this.disabled) return
      this.$emit('input', !this.value)
    }
  }
}
</script>
