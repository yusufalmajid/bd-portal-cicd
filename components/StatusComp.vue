<template>
    <div class="d-flex flex-lg-wrap flex-lg-row flex-column justify-content-center m-0 break-word">
        <div class="status-background">
            <div class="text-center">
                <img class="logo-img" src="~/assets/img/logo-v.png" width="250">
            </div>
            <div class="mt-3 mt-lg-5 flex-grow-1 d-flex justify-content-center align-content-center">
                <div v-if="status == 'resetProcessing'" class="status-img text-center shadow-sm radius-20">
                    <div class="bold-m text-l40">
                        {{$t('your_reset_password_application_has_been_submitted')}}
                    </div>
                    <div class="text-l2 mt-3">
                        {{$t('reset_longtext_1')}}
                    </div>
                    <div class="my-5">
                        <img src="~/assets/img/status-processing.svg" class="mw-100">
                    </div>
                    <div class="text-l2 mt-2">
                        {{$t('reset_longtext_2')}}
                    </div>
                    <div class="text-l mt-5" v-if="!isIframe">
                        <span>{{$t("any_questions")}}?</span>
                        <a href="mailto:info@setgaji.com" class="text-decoration-none">{{$t("contact_us")}}</a>
                    </div>
                </div>
                <div v-else-if="status == 'processing'" class="status-img text-center shadow-sm radius-20">
                    <div class="bold-m text-l40">
                        {{$t('your_registration_application_has_been_submitted')}}
                    </div>
                    <div class="text-l2 mt-3">
                        {{$t('register_longtext_1')}}
                    </div>
                    <div class="my-5">
                        <img src="~/assets/img/status-processing.svg" class="mw-100">
                    </div>
                    <div class="text-l2 mt-2">
                        {{$t('register_longtext_2')}}
                    </div>
                    <div class="text-l mt-5" v-if="!isIframe">
                        <span>{{$t("any_questions")}}?</span>
                        <a href="mailto:info@setgaji.com" class="text-decoration-none">{{$t("contact_us")}}</a>
                    </div>
                </div>
                <div v-else-if="status == 'rejected'" class="status-img text-center shadow-sm radius-20">
                    <div class="bold-m text-l40">
                        {{$t('application_rejected')}}
                    </div>
                    <div class="text-l2 mt-3">
                        {{$t('sorry_looks_like_your_application_has_been_rejected_during_verification_process')}}
                    </div>
                    <div class="my-5">
                        <img src="~/assets/img/status-rejected.svg" class="mw-100">
                    </div>
                    <!-- <div class="text-l mt-2 text-start reason-wrapper">
                        <div>Reason</div>
                        <div class="text-danger">1.Director ID photo is blue</div>
                        <div class="text-danger">2.Invalid SSM Document</div>     
                    </div> -->
                    <div class="mt-5" v-if="!isIframe">
                        <NuxtLink to="/" class="button primary">{{$t("back_to_sign_up")}}</NuxtLink>
                    </div>
                </div>
                <div v-else-if="status == 'verified'" class="status-img text-center shadow-sm radius-20">
                    <div class="bold-m text-l40">
                        {{$t('congratulations')}}!
                    </div>
                    <div class="text-l2 mt-3">
                        {{$t('your_account_information_has_been_verified')}}.
                    </div>
                    <div class="my-5">
                        <img src="~/assets/img/status-verified.svg" class="mw-100">
                    </div>
                    <div class="text-l2 mt-2">
                        {{$t('you_can_now_reimburse_advance_salary_for_your_fellow_employees')}}.
                    </div>
                    <div class="mt-5" v-if="!isIframe">
                        <NuxtLink to="/" class="button primary">{{$t("continue_to_log_in")}}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center p-2 pb-4 text-l">
            &copy; {{year}} {{$config.TITLE}}. {{$t("all_rights_reserved")}}
        </div>
    </div>
</template>


<script>
export default {
    name: "StatusComp",
    props: {
        status: {
            type: String,
            required: true,
        },
        isIframe: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        year() {
            return new Date().getFullYear()
        },
    },
};
</script>


<style lang="scss" scoped>
    .status-background{
        background: url('~/assets/img/bg-status.svg');
        width: 100%;
        min-height: 100dvh;
        background-position: right center;
        background-size: cover;
        background-repeat: no-repeat;
        vertical-align: top;
        align-content: center;
        justify-content: center;
    }

    .status-img{
        width: fit-content;
        background-color: white;
        padding: 3rem 4rem;

        @media screen and (max-width: 767px) {
            padding: 3rem 1rem;
        }

        @media screen and (min-width: 992px) {
            width: 40%;
        }
    }

    .reason-wrapper{
        background-color: #F8F8F8;
        padding: 2rem;
        border-radius: 5px;
    }
</style>