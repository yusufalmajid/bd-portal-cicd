<template>
    <div v-bind:class="removeJustify">
        <input type="number" v-for="p in pinLength" :key="p" :class="maxWidth" class="o-input o-2 mx-2  o-number " :id="inputId" autocomplete="off" @keyup="handleKeyUp" @input="handleInput" :data-index="p - 1" ref="pins">
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        length: Number,
        inputId : String,
        content : String,
    },
    data() {
        return {
            pinLength: 6
        }
    },
    computed : {
        removeJustify : function() {
            return this.content == 'noJustify' ? `d-flex` : `d-flex justify-content-center`
        },
        maxWidth : function() {
            return this.content == 'maxWidth' ? `pin-input-2` : `pin-input`
        }
        
    },
    methods: {
        handleKeyUp(e) {
            const index = e.target.dataset.index;
            if (e.code == 'Backspace' || e.key == 'Backspace') {
                if (e.target.value.length < 1 && index > 0) {
                    this.$refs.pins[parseInt(index) - 1].focus()
                }
            }
        },
        handleInput(e) {
            const targ = e.target
            targ.value = targ.value.trim();
            const index = targ.dataset.index;
            if (targ.value.length > 1) {
                if (index < this.$refs.pins.length - 1) {
                    var lastC = targ.value.charAt(targ.value.length - 1);
                    targ.value = targ.value.charAt(0);
                    this.$refs.pins[parseInt(index) + 1].value = lastC;
                    this.$refs.pins[parseInt(index) + 1].focus();
                }
                else {
                    targ.value = targ.value.charAt(targ.value.length - 1);
                }
            }
            setTimeout(() => {
                let temp = ''
                for (let n = 0; n < this.$refs.pins.length; n++) {
                    temp += this.$refs.pins[n].value;
                }
                if (targ.value.length > 0) {
                    if (index < this.$refs.pins.length - 1) {
                        this.$refs.pins[parseInt(index) + 1].focus();
                    }
                    if (temp.length >= this.pinLength) {
                        targ.blur();
                        this.$emit('complete', temp)
                    }
                }
                else if (index > 0) {
                    this.$refs.pins[parseInt(index) - 1].focus();
                }
                this.$emit('input', temp)
            }, 50)
        },
        clearInput() {
            for (let n = 0; n < this.$refs.pins.length; n++) {
                this.$refs.pins[n].value = ''
            }
            this.$refs.pins[0].focus()
        }
    },
    beforeMount() {
        if (typeof this.length == 'number') {
            this.pinLength = this.length
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.pins[0].focus()
        }, 300)
    },
    watch: {
        length() {
            this.pinLength = this.length
        }
    }
}
</script>

<style lang="scss" scoped>
.pin-input {
  width: 45px !important;
  padding: 0 !important;
  text-align: center !important;
  background: var(--bg-content) !important;
  height: 55px;
}


.pin-input-2 {
    //max-width: 5.85em !important;
    //width: 100%;
    //padding: 2.4em 1em !important;
    //text-align: center !important;
    //background: var(--bg-content) !important;
}

.o-input{
  font-size: 20px;
  font-weight: 500;
  padding: 0;
  text-align: center;
  border-radius: 10px;
  border: 2px solid var(--secondary);
  width: 45px;
  height: 55px;
}
</style>