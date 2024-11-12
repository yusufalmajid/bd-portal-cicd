<template>
  <div>
    <div>
      <div
        style="
          display: grid;
          grid-template-columns: 1fr 5fr;
          align-items: center;
          justify-content: space-between;
        "
      >
        <a
          class="btn"
          @click.prevent="showLoginForm"
          style="color: #283874; cursor: pointer"
          ><i class="bi bi-arrow-left"></i
        ></a>
        <div>
          <div
            class="text-start text-l24"
            style="color: #283874; font-weight: 500"
          >
            {{ $t("forgot_password_question") }}
          </div>
          <div
            class="mb-2 mb-md-4 text-start text-m"
            style="color: #666666; font-weight: 100"
          >
            {{ $t("forgot_password_desc") }}
          </div>
        </div>
      </div>
      <DForm
        @submit="
          (e) => {
            handleSubmit(e);
          }
        "
        novalidate
      >
<!--        <div class="mb-3">-->
<!--          <div class="o-input-wrapper float">-->
<!--            <input-->
<!--              id="company_id"-->
<!--              type="text"-->
<!--              class="o-input login-input login"-->
<!--              :placeholder="$t('company_id')"-->
<!--              name="company_id"-->
<!--              autocomplete="off"-->
<!--              v-model="company_id"-->
<!--            />-->
<!--            <label for="company_id" class="floating-label">{{-->
<!--              $t("company_id")-->
<!--            }}</label>-->
<!--          </div>-->
<!--          <div class="text-danger" v-if="err.company_id">-->
<!--            {{ err.company_id }}-->
<!--          </div>-->
<!--          <DError v-model="company_id" required target="input#company_id" />-->
<!--        </div>-->

        <div class="mb-3">
          <div class="o-input-wrapper float">
            <input
              id="email"
              type="text"
              class="o-input login-input login"
              :placeholder="$t('email')"
              name="email"
              autocomplete="off"
              v-model="email"
            />
            <label for="email" class="floating-label">{{ $t("email") }}</label>
          </div>
          <div class="text-danger" v-if="err.email">
            {{ err.email }}
          </div>
          <DError
            v-model="email"
            number
            required
            maxlength="50"
            target="input#email"
          />
        </div>

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
            {{ $t("submit") }}
          </button>
          <Spinner v-if="submitting"></Spinner>
        </div>
      </DForm>
    </div>
    <div v-if="step2">
      <div
        class="text-start text-l24 text-center"
        style="color: #283874; font-weight: 500"
      >
        {{ $t("register_successfull") }}
      </div>
      <div
        class="mb-2 mb-md-4 text-start text-l text-center"
        style="color: #666666; font-weight: 100"
      >
        {{ $t("register_successfull_detail") }}
      </div>
      <div
        class="d-flex justify-content-center align-items-center mt-4 mb-3 submit-button"
      >
        <button class="primary w-100 button" @click="backToLogin">
          {{ $t("back_to_login") }}
        </button>
        <Spinner v-if="submitting"></Spinner>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ForgotForm",
  middleware: ["not-auth"],
  layout: "default",
  data() {
    return {
      email: "",
      company_id: "",
      submitting: false,
      err: {},
    };
  },
  methods: {
    async handleSubmit(r) {
      if (!r || !r.isValid) return;
      let param = {
        email: this.email,
        // company_id: this.company_id,
      };

      this.submitting = true;
      const res = await this.$store.dispatch("user/forgot", param);
      this.submitting = false;

      if (res.status) {
        if (res.error) {
          this.err = this.$formatError(res.error);
          return;
        }
        if (res.message === "Granted.") {
          this.step1 = false;
          this.step2 = true;
        }
        this.$router.push("/");
        return;
      } else {
        this.$toast(false, res.message);
      }
    },
    async showLoginForm() {
      this.$emit("showLoginForm");
    },
    openPrivacyPolicy() {
      console.log("Opening Privacy Policy");
    },
    openTermsAndConditions() {
      console.log("Opening Terms and Conditions");
    },
  },

  beforeMount() {
    if (this.$route.query.exp) {
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
.btn {
  border-radius: 50px;
  margin: 0;
  padding: 0;
  display: block;
  background-color: white;
  margin: 0;
  padding: 0;
  border-radius: 50px;
  height: 2.8vw;
  width: 2.8vw;

  i {
    color: #283874;
    position: relative;
    border-radius: 50px;
    height: 18px;
    font-size: 1.5vw;
    top: 8px;
    left: 1px;
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
        font-size: 1.2vw;
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
      border:var(--border-global-setting);
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
          font-size: 1.4vw;
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
      .login-form-wrapper {
        .input-section {
          padding: 4rem 3vw;
          .submit-button {
            button {
              padding: 10px 0px;
              border-radius: 50px;
              font-size: 1.6vw;
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
