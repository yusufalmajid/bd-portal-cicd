<template>
    <div class="_df_ErrMsg" :class="$props.class" v-if="errorMsg">{{errorMsg}}</div>
</template>

<script>
import validation from '@/assets/js/validation'

export default {
    name: 'DError',
    inject: ['dogErrors'],
    props: {
        value: [String, Number, Object, Array],
        messages: Object,
        target: String
    },
    data() {
        return {
            errorMsg: '',
            id: Math.random().toString()
        }
    },
    methods: {
        validate() {
            this.errorMsg = ''
            let inputEls = []
            if (this.target) {
                inputEls = document.querySelectorAll(this.target)
                inputEls.forEach(pe => pe.classList.remove('invalid'))
            }
            if (this.value != undefined && this.value != null) {
                if ((!('required' in this.$attrs) || (typeof this.$attrs.required == 'boolean' && !this.$attrs.required)) && (typeof this.value == 'string' || Array.isArray(this.value)) && this.value.length < 1) return {}
                let error = {}
             
                for (let rule in this.$attrs) {
                    let ruleVal = this.$attrs[rule]
                    
                    if (validation[rule]) {
                        error = validation[rule](this.value, ruleVal)
                    }
                    else if (typeof this.$dForm.customRules == 'object' && typeof this.$dForm.customRules[rule] == 'function') {
                        error = this.$dForm.customRules[rule](this.value, ruleVal)
                    }

                    if (error && error.type) {
                        if (this.messages && this.messages[error.type]) {
                            this.errorMsg = this.messages[error.type]
                            break
                        }
                        else {
                            this.errorMsg = this.$dForm.message(error)
                            break
                        }
                    }
                }
                if(error && error.type) {
                    inputEls.forEach(pe => pe.classList.add('invalid'))
                }
                return error
            }
            return {}
        },
        clear() {
            this.errorMsg = ''
            if (this.target) {
                let inputEls = document.querySelectorAll(this.target)
                inputEls.forEach(pe => pe.classList.remove('invalid'))
            }
        }
    },
    mounted() {
        this.dogErrors.push({
            id: this.id,
            validate: this.validate,
            clear: this.clear
        })
    },
    beforeDestroy() {
        const targetIndex = this.dogErrors.findIndex(d => d.id == this.id)
        this.dogErrors.splice(targetIndex, 1)
        this.clear()
    },
    watch: {
        value() {
            this.validate()
        }
    }
}
</script>