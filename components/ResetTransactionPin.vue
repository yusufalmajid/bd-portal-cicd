<template>
    <div>
        <div class="col-12">
            <div class="card align-items-center mt-1">
                <div class="col-xxl-4 col-md-6">
                    <h5 class="text-center">{{$t("reset_transaction_pin")}}</h5>
                    <DForm @submit="TPwdConfirmModal = true" novalidate>
                        <div class="col-12">
                            <div class="row justify-content-center">
                                <div class="form-group mt-4">
                                    <label class="form-labal">{{$t("username")}}</label>
                                    <input type="text" class="o-input" v-model="userData.username" disabled />
                                    <div class="text-danger" v-if="err.username">{{err.username}}</div>
                                </div>
                                <div class="form-group mt-4">
                                    <label class="form-label">{{$t("transaction_pin")}}</label>
                                    <div class="o-input-wrapper right">
                                        <input :type="showPassword ? 'text' : 'password'" class="o-input right" v-model="password" placeholder=" " name="password" autocomplete="off" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"/>
                                        <div class="o-icon right form-input-icon">
                                            <div @click="showPassword=!showPassword">
                                                <span class="icon is-small is-right">
                                                    <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                                                </span>
                                                <div v-if="showPassword">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                                    </svg>
                                                </div>
                                                <div v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-danger" v-if="err.password">{{err.password}}</div>
                                <div class="form-group mt-4">
                                    <label class="form-label">{{$t("confirm_transaction_pin")}}</label>
                                    <div class="o-input-wrapper right">
                                        <input :type="showConfirmPassword ? 'text' : 'password'" class="o-input right" v-model="confirmPassword" placeholder=" " name="password" autocomplete="off" maxlength="6" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');"/>
                                        <div class="o-icon right form-input-icon">
                                            <div @click="showConfirmPassword=!showConfirmPassword">
                                                <span class="icon is-small is-right">
                                                    <i class="fas" :class="{ 'fa-eye-slash': showConfirmPassword, 'fa-eye': !showConfirmPassword }"></i>
                                                </span>
                                                <div v-if="showConfirmPassword">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                                    </svg>
                                                </div>
                                                <div v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-danger" v-if="err.password_confirmation">{{err.password_confirmation}}</div>
                            </div>
                        </div>
                        <div class="mt-4 text-center">
                            <button type="submit" class="button primary" :disabled="!this.password || !this.confirmPassword">{{$t("update")}}</button>
                        </div> 
                    </DForm>
                </div>
            </div>
        </div>
        <Modal :show="TPwdConfirmModal" md @close="closeResetTPwd">
            <div class="p-3 pt-4 text-center bg-content">
                <h5>{{$t('reset_transaction_pwd_txt1')}}</h5>
                <!-- <span><small>{{$t('reset_transaction_pwd_txt2')}}</small></span> -->
                <div class="mb-3 d-flex justify-content-center" style="margin-top: 30px;">
                    <button class="button outline-primary mx-3" @click="TPwdConfirmModal=false" style="min-width:120px;">{{$t('no')}}</button>
                    <button type="button" class="button primary mx-3" @click.prevent="submitResetTransactionPin" style="min-width:120px;">{{$t('yes')}}</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: ["id", "userData"],
    data() {
        return {
            err: {},
            password:"",
            showPassword: false,
            confirmPassword: "",
            showConfirmPassword: false,
            TPwdConfirmModal: false
        }
    },
    methods: {
        closeResetTPwd(){
            this.TPwdConfirmModal = false
        },
        async submitResetTransactionPin() {
            this.err = {}
            const d = await this.$api('member/reset-user-transaction-pwd', {
                username: this.userData.username,
                password: this.password,
                password_confirmation: this.confirmPassword
            })

            if(d.success) {
                if (d.error) {
                    this.err = this.$formatError(d.error)
                    return
                }

                this.$toast(true, d.message)
                this.$emit("updateUserDetails", {})
                this.password = ''
                this.confirmPassword = ''
                this.closeResetTPwd()
            }else{
                this.$toast(false, d.message)
            }
        },
    },
    mounted() {
        // this.loadData()
    }
}
</script>


<style lang="scss" scoped>
</style>