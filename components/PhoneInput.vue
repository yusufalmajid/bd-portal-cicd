<template>
  <div class="d-flex">
    <div class="flex-shrink-0">
      <FilterSelect isSelectModal :options="codes" v-model="code" search :minWidth="320" labelValue
                    :disabled="disabled"/>
    </div>
    <div class="flex-grow-1 ms-3">
      <input ref="input" type="number" class="o-input o-number" autocomplete="off" @keydown="$filterNumberInput"
             :placeholder="placeholder" :id="inputId" :name="name" :disabled="disabled" v-model="number">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    name: String,
    inputId: String,
    placeholder: String,
    codes: Array,
    disabled: Boolean,
    defaultCode: String,
  },
  data() {
    return {
      number: '',
      code: '60',
    }
  },
  methods: {
    dataChange() {
      this.$emit('input', `${this.code}-${this.number}`)
    },
    setDefaultCode() {
      if (this.$store.state.country) {
        const target = this.codes.find(c => c.iso == this.$store.state.country)
        if (target) {
          this.code = target.value
        }
      }
    },
    clearInput() {
      this.$refs.input.value = "";
      this.$emit('input', `${this.code}-`)
    }
  },
  computed: {
    getNumber() {
      return this.value.split('-')[1];
    }
  },
  watch: {
    defaultCode(){
      this.code = this.defaultCode;
    },
    code() {
      this.dataChange()
    },
    number() {
      this.dataChange()
    },
    value() {
      this.number = this.value ? this.value.split('-')[1] : ''
      this.code = this.value ? this.value.split('-')[0] : ''
    },
    codes() {
      if (this.codes.length > 0) {
        this.setDefaultCode()
      }
    }
  }
}
</script>

<style scoped>

</style>