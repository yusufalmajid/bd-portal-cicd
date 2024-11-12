<template>
    <div class="dateRangeWrap" ref="scrollDiv">
        <div class="rangeGroup" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
            <template v-for="v in rangeOpt">
                <label :key="v" class="rangeItem"><input type="radio" name="dateRange" :value="v" v-model="range" @input="(e) => change(e.target.value)">{{$t(v)}}</label>
            </template>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data(){
        return {
            rangeOpt: ['today', 'yesterday', 'this_week', 'last_week', 'this_month', 'last_month'],
            range: '',
        }
    },
    props: {
        value: Array,
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    computed: {
    },
    methods: {
        change(e) {
            let a = null;
            let b = null;
            if (e == 'today') {
                a = b = moment().format('YYYY-MM-DD');
            } else if (e == 'yesterday') {
                a = b = moment().subtract(1, 'days').format('YYYY-MM-DD');
            } else if (e == 'this_week') {
                a = moment().startOf('week').format('YYYY-MM-DD');
                b = moment().endOf('week').format('YYYY-MM-DD');
            } else if (e == 'last_week') {
                a = moment().startOf('week').subtract(1, 'weeks').format('YYYY-MM-DD');
                b = moment().endOf('week').subtract(1, 'weeks').format('YYYY-MM-DD');
            } else if (e == 'this_month') {
                a = moment().startOf('month').format('YYYY-MM-DD');
                b = moment().endOf('month').format('YYYY-MM-DD');
            } else if (e == 'last_month') {
                a = moment().startOf('month').subtract(1, 'months').format('YYYY-MM-DD');
                b = moment().endOf('month').subtract(1, 'months').format('YYYY-MM-DD');
            }
            this.$emit('change', [a,b]);
        },
        mouseDown(e) {
            this.isMouseDown = true;

            if(this.$refs.scrollDiv){
                this.pos = {
                    // The current scroll
                    left: this.$refs.scrollDiv.scrollLeft,
                    top: this.$refs.scrollDiv.scrollTop,
                    // Get the current mouse position
                    x: e.clientX,
                    y: e.clientY,
                };
                this.$refs.scrollDiv.style.userSelect = 'none';
            }
        },
        mouseMove(e) {
            if(this.isMouseDown) {
                if(this.$refs.scrollDiv){
                    this.$refs.scrollDiv.style.userSelect = 'none';
                    
                    const dx = e.clientX - this.pos.x;
                    const dy = e.clientY - this.pos.y;
    
                    // Scroll the element
                    this.$refs.scrollDiv.scrollTop = this.pos.top - dy;
                    this.$refs.scrollDiv.scrollLeft = this.pos.left - dx;
    
                    window.getSelection().removeAllRanges();
                }
            }
        },
        mouseUp() {
            this.isMouseDown = false;
            this.$refs.scrollDiv && this.$refs.scrollDiv.style.removeProperty('user-select');
        },
        mouseLeave() {
            this.isMouseDown = false;
            this.$refs.scrollDiv && this.$refs.scrollDiv.style.removeProperty('user-select');
        },
    },
    watch: {
        value: {
             handler(){
               this.range = ''
             },
             deep: true
        }
    }
}
</script>

<style scoped lang="scss">
.dateRangeWrap {
    overflow-x: auto;
    width: 100%;
    // -ms-overflow-style: none;  /* IE and Edge */
    // scrollbar-width: none;

    // &::-webkit-scrollbar {
    //     display: none;
    // }

    .rangeGroup {
        display: inline-flex;
        flex-direction: row;
        min-width: 100%;
        padding-bottom: .5rem;

        .rangeItem {
            background-color: transparent;
            padding: .5rem 1rem;
            border: 1px solid var(--border);
            color: #6e6e6e;
            white-space: nowrap;
            position: relative;
            cursor: pointer;
            font-weight: 400;

            input {
                display: none;
            }

            &:not(:first-child) {
                border-left: 0;
            }

            &:first-child {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }

            &:last-child {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            &:hover {
                background-color: #005cff1a;
            }
        }

        .rangeItem:has(input:checked) {
            margin-top: 0;
            background-color: var(--primary);
            color: #fff;
        }
    }
}
</style>