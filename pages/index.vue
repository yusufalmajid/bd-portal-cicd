<template>
  <div>
    <div class="loginBox">
      <div class="overlay-2"></div>
      <div class="loginBG">
        <div class="textlg-start left-section">
          <div class="logo-section">
            <img src="~/assets/img/logo-v-white.png" />
          </div>
          <div>
            <h1 class="mb-lg-2 main-title" v-html="$t('bdp')">
            </h1>
          </div>
          <div class="text-s copyright-text">
            &copy; {{ year }} {{ $config.TITLE }}.{{
              $t("all_rights_reserved")
            }}
          </div>
        </div>
        <div class="loginForm">
          <div class="loginBody">
            <div class="login-form-wrapper">
              <div class="dropdown country-select">
                <LangSelect />
              </div>
              <div class="input-section">
                <LoginForm
                  v-if="!isVerification"
                  @show-verification="showVerification"
                />
                <VerificationForm
                  v-else
                  @show-verification="showVerification"
                  :datas="data"
                />
              </div>
              <div class="privacy-policy">
<!--                <a @click="openPrivacyPolicy">{{ $t("privacy_policy") }}</a>-->
<!--                <a @click="openTermsAndConditions">{{-->
<!--                  $t("terms_n_conditions")-->
<!--                }}</a>-->
                {{$t('internal_use_only_pnc')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: `${this.$config.TITLE} | ${this.$t("login")}`,
    };
  },
  name: "Index",
  middleware: ["not-auth"],
  layout: "default",
  components: {
    LoginForm: () => import("../components/form/LoginForm.vue"),
    VerificationForm: () => import("../components/form/VerificationForm.vue"),
  },
  data() {
    return {
      range: 1,
      err: {},
      showDropdown: false,
      selectedCountry: "SG",
      selectedFlag: require("~/assets/img/sgd-icon.png"),
      selectedLanguage: "English",
      countries: [
        {
          code: "SG",
          flag: require("~/assets/img/sgd-icon.png"),
          language: "English",
        },
        {
          code: "TH",
          flag: require("~/assets/img/thb-icon.png"),
          language: "Tagalog",
        },
      ],
      isVerification: false,
      data: {},
    };
  },
  methods: {
    showVerification(d) {
      this.data = d;
      this.isVerification = !this.isVerification;
    },
    openPrivacyPolicy() {
      console.log("Opening Privacy Policy");
    },
    openTermsAndConditions() {
      console.log("Opening Terms and Conditions");
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectCountry(country) {
      this.selectedCountry = country.code;
      this.selectedFlag = country.flag;
      this.selectedLanguage = country.language;
      this.showDropdown = false;
    },
  },
  mounted() {
    this.selectedCountry = "ID";
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },

  beforeMount() {
    if (this.$route.query.exp) {
      // forced expire session
      this.$store.commit("user/resetUser");
    }

    var uname = localStorage.getItem("uname");
    if (uname) {
      this.email = uname;
      this.rememberMe = true;
    }
  },
};
</script>

<style scoped lang="scss">
.loginBox {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  word-break: break-word;
  .loginBG {
    //background: linear-gradient(
    //    to bottom,
    //    rgba(17, 34, 93, 0.7) 0%,
    //    rgba(81, 226, 176, 0.3) 100%
    //),
    //url("~/assets/img/login-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -30vw 0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: auto;
    padding: 0rem 0rem 0rem 0rem;
    .left-section {
      background: linear-gradient(
          130deg,
          rgba(17, 34, 93, 0.56) 0%,
          rgba(35, 69, 124, 0.56) 30%,
          rgba(15, 130, 159, 0.56) 70%,
          rgba(79, 223, 175, 0.56) 120%
        ),
        url("~/assets/img/login-bg.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
      padding: 2vw 2vw;
      width: 60%;
      .logo-section img {
        width: 150px;
      }
      .main-title {
        color: white;
        font-size: 80px;
        font-weight: 100;
      }
      .copyright-text {
        position: relative;
        color: white;
        width: 100%;
        text-align: left;
        font-weight: 100;
      }
    }
  }

  .loginForm {
    align-content: center;
    justify-content: center;
    margin-left: -20px;
    width: calc(40% + 30px);
  }
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
  .o-input-wrapper {
    input {
      border-radius: 15px;
      color: black;
      border: var(--border-global-setting);
    }
    label {
      color: #c5c5c5;
      font-weight: 100;
    }
  }
  .password-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
</style>
