<template>
    <div class="o-range-track" ref="track" :style="trackStyle" @mousedown="mouseDown" @touchstart="touchDown">
        <div class="o-range-bar" :style="barStyle"></div>
        <div class="o-range-thumb" :class="{'active': activeThumb == 0}" :style="thumbStyle1" ref="thumb1">
            <div style="position:relative;"><div class="o-range-value">{{this.range ? this.value[0] : this.value}}</div></div>
        </div>
        <div class="o-range-thumb" :class="{'active': activeThumb == 1}" :style="thumbStyle2" v-if="range" ref="thumb2">
            <div style="position:relative;"><div class="o-range-value">{{this.value[1]}}</div></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: [Number, Array],
        min: Number,
        max: Number,
        step: Number,
        range: Boolean,
        disabled: Boolean,
        trackHeight: Number,
        thumbSize: Number
    },
    data() {
        return {
            localMin: 0,
            localMax: 100,
            localStep: 1,
            rangeValue: 100,
            bounding: null,
            activeThumb: 0
        }
    },
    computed: {
        trackStyle() {
            if (this.trackHeight > 0) {
                return {
                    fontSize: `${this.trackHeight}px`
                }
            }
            return {}
        },
        thumbStyle1() {
            let val = this.value
            if (this.range && Array.isArray(this.value) && typeof this.value[0] == 'number') {
                val = this.value[0]
            }
            const xPercent = (val - this.localMin) / this.rangeValue * 100
            let newStyle = {
                left: `${xPercent}%`
            }
            if (this.thumbSize > 0) {
                newStyle.fontSize = `${this.thumbSize}px`
            }
            return newStyle
        },
        thumbStyle2() {
            if (Array.isArray(this.value) && typeof this.value[1] == 'number') {
                const xPercent = (this.value[1] - this.localMin) / this.rangeValue * 100
                let newStyle = {
                    left: `${xPercent}%`
                }
                if (this.thumbSize > 0) {
                    newStyle.fontSize = `${this.thumbSize}px`
                }
                return newStyle
            }
        },
        barStyle() {
            if (typeof this.value == 'number') {
                const xPercent = (this.value - this.localMin) / this.rangeValue * 100
                return {
                    width: `${xPercent}%`
                }
            }
            else if (Array.isArray(this.value) && typeof this.value[0] == 'number' &&  typeof this.value[1] == 'number') {
                const xPercent = (this.value[0] - this.localMin) / this.rangeValue * 100
                const wPercent = (this.value[1] - this.localMin) / this.rangeValue * 100 - xPercent
                return {
                    left: `${xPercent}%`,
                    width: `${wPercent}%`
                }
            }
        }
    },
    methods: {
        setDefaults() {
            if (typeof this.min != 'undefined') {
                this.localMin = this.min
            }
            if (typeof this.max != 'undefined') {
                this.localMax = this.max
            }
            if (typeof this.step != 'undefined') {
                this.localStep = this.step
            }
            this.rangeValue = this.localMax - this.localMin
        },
        mouseDown(e) {
            if (this.disabled) return
            this.bounding = this.$refs.track.getBoundingClientRect()
            if (!this.range) {
                this.activeThumb = 0
            }
            else {
                this.activeThumb = this.getClosestThumb(e.clientX)
            }
            this.moveAction(e)
            document.addEventListener('mousemove', this.moveAction)
            document.addEventListener('mouseup', this.upAction)

        },
        touchDown(e) {
            if (this.disabled) return
            this.bounding = this.$refs.track.getBoundingClientRect()
             if (!this.range) {
                this.activeThumb = 0
            }
            else {
                this.activeThumb = this.getClosestThumb(e.touches[0].clientX)
            }
            this.moveAction(e)
            document.addEventListener('touchmove', this.moveAction)
            document.addEventListener('touchend', this.upAction)
            window.addEventListener('touchmove', this.disableScroll, {passive: false})
        },
        disableScroll(e) {
            e.preventDefault()
        },
        moveAction(e) {
            window.getSelection().removeAllRanges()
            let xpos = 0
            if (e.type == 'mousedown' || e.type == 'mousemove') {
                xpos = e.clientX
            }
            else if (e.type== 'touchstart' || e.type == 'touchmove') {
                xpos = e.touches[0].clientX
            }

            let offset = xpos - this.bounding.x
            if (offset < 0) offset = 0
            if (offset > this.bounding.width) offset = this.bounding.width
            let xFraction = offset / this.bounding.width

            const newVal = Math.round(xFraction * this.rangeValue / this.localStep) * this.localStep + this.localMin
            if (!this.range) {
                if (this.value == newVal) return
                this.$emit('input', newVal)
                return
            }

            // range
            if (this.activeThumb == 0) {
                if (this.value[0] == newVal || this.value[1] <= newVal) return
                this.$emit('input', [newVal, this.value[1]])
            }
            else if (this.activeThumb == 1) {
                if (this.value[1] == newVal || this.value[0] >= newVal) return
                this.$emit('input', [this.value[0], newVal])
            }
        },
        upAction(e) {
            document.removeEventListener('touchmove', this.moveAction)
            document.removeEventListener('touchend', this.upAction)
            document.removeEventListener('mousemove', this.moveAction)
            document.removeEventListener('mouseup', this.upAction)
            window.removeEventListener('touchmove', this.disableScroll)
            this.activeThumb = -1
        },
        getClosestThumb(mousePos) {
            const minThumbX = Math.abs(mousePos - this.$refs.thumb1.getBoundingClientRect().x)
            const maxThumbX = Math.abs(mousePos -  this.$refs.thumb2.getBoundingClientRect().x)
            return (minThumbX < maxThumbX) ? 0 : 1
        }
    },
    beforeMount() {
        this.setDefaults()
    },
    watch: {
        step() {
            this.setDefaults()
        },
        min() {
            this.setDefaults()
        },
        max() {
            this.setDefaults()
        }
    }
}
</script>