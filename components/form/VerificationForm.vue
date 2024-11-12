<template>
  <div>
    <div class="form-heading d-flex align-items-center">
      <button
        @click="goBackToLogin"
        type="button"
        class="arrow-left cursor-pointer position-relative menu-item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-5"
        >
          <path
            fill-rule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="form-title w-100" style="color: #283874; font-weight: 500">
        {{ $t("login_verification") }}
      </div>
    </div>
    <div
      class="mb-2 mb-md-4 text-center text-l"
      style="color: #666666; font-weight: 100"
    >
      <p>
        {{ $t("we_have_sent_one_time_security_code_to") }} <br />
        <span>{{datas.email}}</span>
      </p>
    </div>
    <DForm
      @submit="
        (e) => {
          handleSubmit(e);
        }
      "
      novalidate
    >
      <div class="mb-3">
        <div class="code-input-wrapper">
          <PinInput :length="6" v-model="otp" inputId="pinInput" content="maxWidth"/>
        </div>
      </div>
      <div v-if="$props.datas.otp_debug" class="text-center">{{$props.datas.otp_debug}}</div>
      <div class="text-danger" v-if="err.login_btn">
        {{ err.login_btn }}
      </div>
      <div v-if="$route.query.exp" class="text-danger text-center mt-2 mb-2">
        {{ $t("session_expired") }}
      </div>
      <div
        class="d-flex justify-content-center align-items-center mt-4 mb-3 submit-button"
      >
        <button class="primary w-100 button" type="submit" v-if="!submitting">
          {{ $t("verified_and_log_in") }}
        </button>
        <Spinner v-if="submitting"></Spinner>
      </div>
    </DForm>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
  middleware: ["not-auth"],
  layout: "default",
  props:{
    'datas' : {
      type : Object,
      default : {}
    }
  },
  data() {
    return {
      submitting: false,
      otp: '',
      range: 1,
      err: {},
      phone_no: "",
    };
  },
  methods: {
    goBackToLogin() {
      this.$emit("show-verification");
    },
    async handleSubmit(e) {
      if (!e || !e.isValid) return;

      let param = {
        email: this.$props.datas.email,
        login_type: 'email',
        step: 2,
        otp_code: this.otp
      };

      this.submitting = true;
      const res = await this.$store.dispatch("user/login", param);
      this.submitting = false;

      if (res.status) {
        if (res.error) {
          this.err = this.$formatError(res.error);
          return;
        }
        if(param.step == 2){
          this.$router.push('/lead-submissions')
          return
        }
        return;
      } else {
        this.$toast(false, res.message);
      }
    },
  },
  mounted() {
    if(this.$props?.datas?.otp_debug){
      this.otp = String(this.$props.datas.otp_debug);
    }
  },
  beforeMount() {
    if (this.$route.query.exp) {
      // forced expire session
      this.$store.commit("user/resetUser");
    }
  },
};
</script>

<style scoped lang="scss">
.loginForm {
  align-content: center;
  justify-content: center;
}

.login-form-wrapper {
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 4vw;
  border-radius: 20px;
  min-height: 100vh;
  min-height: 100dvh;
  a {
    color: #4bca9d;
  }
  .country-select {
    display: flex;
    align-self: flex-end;
    flex-direction: column;
    position: relative;
    .flag-icon {
      width: 20px;
      height: auto;
      margin-right: 5px;
    }
    .dropdown-content {
      position: absolute;
      width: 100%;
      left: 0;
      top: 100%;
      z-index: 1000;
      border-radius: 4px;
      div {
        cursor: pointer;
        margin-top: 5px;
      }
    }
    i {
      margin-left: 5px;
    }
  }
  .country-select:hover .dropdown-content {
    display: block;
  }
  .input-section {
    padding: 4rem 3vw;
    .submit-button {
      button {
        padding: 15px 0px;
        border-radius: 50px;
        font-size: 16px;
        background-color: #4bca9d;
        max-width: 11vw;
      }
    }
  }
  .privacy-policy {
    text-align: right;
    a {
      margin-left: 20px;
      color: #525252;
      font-weight: 100;
    }
  }
  .code-input-wrapper {
    min-width: 100%;
    min-width: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .o-input-wrapper {
    input {
      padding: 5px;
      color: black;
      border: none;
      width: 50px;
      height: 60px;
      background: none;
      font-size: 40px;
      text-align: center;
      border: 1px solid var(--border);
      border-radius: var(--o-border-radius);

      &:focus {
        border: 1px solid #4bca9d !important;
        outline: none;
      }
    }

    label {
      color: #c5c5c5;
      font-weight: 100;
    }
  }
  @media (max-width: 767px) {
    padding: 2rem;
  }
}
@media (max-width: 1024px) {
  .login-form-wrapper {
    .input-section {
      padding: 4rem 3vw;
      .submit-button {
        button {
          padding: 10px 0px;
          border-radius: 50px;
          font-size: 16px;
          background-color: #4bca9d;
          max-width: 11vw;
        }
      }
    }
    .password-field {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
}
@media (max-width: 767px) {
  .loginBox {
    padding: 0rem;
    .loginBG {
      grid-template-columns: 2fr 2fr;
      .left-section{
        display: none;
      }
      .loginForm{
        width: 100%;
        margin: auto;
      }
      .login-form-wrapper {
        .input-section {
          padding: 4rem 3vw;
          .submit-button {
            button {
              padding: 10px 0px;
              border-radius: 50px;
              font-size: 16px;
              background-color: #4bca9d;
              max-width: 11vw;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 590px) {
  .loginBox {
    padding: 0rem;
    .loginBG {
      display: flex;
    }
  }
}
// @media screen and (max-width: 915px) and (min-width: 768px) {
//   .loginBox {
//     .loginBody {
//       padding: 0rem;
//     }

//     .bgWrap {
//       .customBg {
//         display: none;
//       }

//       .loginBG {
//         // display: none;
//         background: url("~assets/img/auth-bg.png");
//         background-position: right center;
//         background-size: cover;
//         background-repeat: no-repeat;
//         position: relative;
//         padding: 1rem;
//       }
//     }

//     .loginForm {
//       left: 50%;
//     }
//   }
// }

// .loginSelectWrapper {
//   height: 2.5rem;
//   background: var(--o-bg);
//   border-radius: var(--o-border-radius);
// }
</style>
