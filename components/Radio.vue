<template>
    <div class="o-radio-wrapper">
        <div class="o-radio" :class="{checked: value == modelValue}" @click="toggle" :style="radioSize"></div>
        <input type="radio" :value="value" style="display:none;" :required="required" :checked="value == modelValue">
        <label class="form-check-label o-radio-label" @click="toggle"><slot></slot></label>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'modelValue'
    },
    props: {
        modelValue: [String, Number],
        value: [String, Number],
        size: Number,
        required: Boolean
    },
    computed: {
        radioSize() {
            if (typeof this.size == 'number') {
                return {fontSize: `${this.size}px`}
            }
            else {
                return {}
            }
        }
    },
    methods: {
        toggle() {
            this.$emit('input', this.value.toString())
        }      
    }
}
</script>