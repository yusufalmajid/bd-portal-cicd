<template>
    <div>
        <div>
            <div class="cdWrap" :class="`${classProp}`">
                <!-- <span>{{cd.day || "00"}}</span>: -->
                <span>{{cd.hr || "00"}}</span>:
                <span>{{cd.min || "00"}}</span>:
                <span>{{cd.sec || "00"}}</span>
            </div>
            <!-- <div class="cdWrap" :class="classProp">
                <div class="cdItem">
                    <div class="num">{{cd.day || "00"}}</div>
                    <div class="label">{{$t('days')}}</div>
                </div>
                <div class="cdSymbol">:</div>
                <div class="cdItem">
                    <div class="num">{{cd.hr || "00"}}</div>
                    <div class="label">{{$t('hours')}}</div>
                </div>
                <div class="cdSymbol">:</div>
                <div class="cdItem">
                    <div class="num">{{cd.min || "00"}}</div>
                    <div class="label">{{$t('minutes')}}</div>
                </div>
                <div class="cdSymbol">:</div>
                <div class="cdItem">
                    <div class="num">{{cd.sec || "00"}}</div>
                    <div class="label">{{$t('secs')}}</div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Countdown',
    props: ['startTime', 'endTime', 'classProp'],
    data() {
        return {
            cd: {},
            countdownRunner: null,
        }
    },
    computed: {
    },
    methods: {
        countdown(startTime = new Date() , endTime = new Date()) {
            var el = this;
            // endTime = new Date()
            var startTimeMilli = new Date(startTime).getTime();
            var endTimeMilli = new Date(endTime).getTime();
            var timeleft = endTimeMilli - startTimeMilli;
            console.log(timeleft)

            if(timeleft > 0){
                // var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

                el.cd = {
                    // day : days < 10? ('0' + days) : days,
                    hr : ('0' + hours).slice(-2),
                    min : ('0' + minutes).slice(-2),
                    sec : ('0' + seconds).slice(-2),
                }
            }
        }
        // init(endTime){
        //     clearInterval(this.countdownRunner);
        //     this.countdownRunner = null
        //     this.countdown(endTime)
        // },
        // countdown(endTime = new Date()){
        //     if(!endTime) return

        //     // var endTimeMilli = Number(endTime)*1000
        //     var endTimeMilli = new Date(endTime).getTime();
        //     var el = this;

        //     this.countdownRunner = setInterval(function() {
        //         var now = new Date().getTime();
        //         var timeleft = endTimeMilli - now;

        //         if(timeleft > 0){
        //             // var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        //             var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //             var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        //             var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    
        //             el.cd = {
        //                 // day : days < 10? ('0' + days) : days,
        //                 hr : ('0' + hours).slice(-2),
        //                 min : ('0' + minutes).slice(-2),
        //                 sec : ('0' + seconds).slice(-2),
        //             }
        //         }else{
        //             clearInterval(el.countdownRunner);
        //             el.countdownRunner = null
        //             el.cd = {}
        //         }
        //     }, 1000)
        // }
    },
    // watch: {
    //     endTime(val){
    //         this.init(val);
    //     }
    // },
    beforeDestroy() {
    },
    mounted() {
        this.countdown(this.startTime,this.endTime)
    }
}
</script>

<style scoped lang="scss">
    .cdWrap {
        display: inline-block;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        padding: 4px 6px;
        border-radius: 4px 6px;
        font-size: .65rem;
        font-weight: 500;
        transition: .3s ease;
        border: none;
        border-radius: .25rem;
        color: #FFF;
        background-color: #6c757d;

        &.expired {
            background-color: #dc3545;
        }
    }

    .cdWrap.animation-blink {
        animation: 0.7s linear infinite condemned_blink_effect;
    }

    @keyframes condemned_blink_effect {
        0% {
            visibility: hidden;
        }
        50% {
            visibility: hidden;
        }
        100% {
            visibility: visible;
        }
    }
</style>