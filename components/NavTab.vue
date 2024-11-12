<template>
    <div class="memberSubMenu" ref="scrollDiv">
        <ul class="list-group mb-4" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
export default {
    name: "NavTab",
    data() {
        return {
        }
    },
    methods: {
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
    mounted() {
    },
}
</script>

<style scoped lang="scss">
</style>