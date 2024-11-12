<template>
    <div class="loaderBg" v-if="$store.state.isLoading">
        <!-- <div class="loaderIcon">
            <ClientOnly>
                <Lottie :options="loader"/>
            </ClientOnly>
        </div> -->
        <!-- <div class="loader-spin">
            <svg xmlns="http://www.w3.org/2000/svg" height="3rem" viewBox="0 0 512 512">
                <style>svg{fill:#ffffff}</style>
                <path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"/>
            </svg>
        </div> -->
        <div class="loaderImg">
            <img src="~/assets/img/loader.svg" />
        </div>
    </div>
</template>

<script>
// import * as loaderData from "@/assets/json/loader.json";
export default {
    data() {
        return {
            // loader: { animationData: loaderData.default },
        }
    },
}
</script>

<style lang="scss" scoped>
    .loaderBg {
        position: fixed;
        top: 0;
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        width: 100dvw;
        background: rgba(109, 109, 109, 0.6);
        z-index: 1051;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .loaderIcon {
        width: 15%;   
    }

    @media screen and (max-width: 1024px) {
        .loaderIcon {
            width: 25%;   
        }
    }

    @media screen and (max-width: 992px) {
        .loaderIcon {
            width: 40%;   
        }
    }

    .loader-spin {
        color: #fff;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .loaderImg {
        max-width: 20vw;
        width: 100%;

        img {
            width: 100%;
            object-fit: contain;
            object-position: center;
        }
    }
</style>
