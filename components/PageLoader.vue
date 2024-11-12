<template>
    <div class="loader-bg">
        <div class="pos-loader">
            <Spinner></Spinner>
        </div>
    </div>
</template>

<script>
export default {
    name:'PageLoader'
}
</script>

<style scoped>
.loader-bg {
    position: fixed;
    background-color: rgba(0,0,0,0.6);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1050;
}

.pos-loader {
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
}
</style>