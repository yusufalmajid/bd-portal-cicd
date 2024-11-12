<template>
  <div>
    <div class="text-center text-l24" style="color: #283874; font-weight: 500">
      {{ $t("welcome_back") }}
    </div>
    <div
      class="mb-2 mb-md-4 text-center text-l"
      style="color: #666666; font-weight: 100"
    >
      {{ $t("enter_your_setlary_email") }}
    </div>
    <DForm
      @submit="
        (e) => {
          handleSubmit(e);
        }
      "
      novalidate
    >
<!--      <div class="mb-3">-->
<!--        <div class="o-input-wrapper">-->
<!--          <div class="phone-input-wrapper">-->
<!--            <div class="code-input">-->
<!--              <svg-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--                xmlns:xlink="http://www.w3.org/1999/xlink"-->
<!--                width="31"-->
<!--                height="31"-->
<!--                viewBox="0 0 31 31"-->
<!--              >-->
<!--                <defs>-->
<!--                  <pattern-->
<!--                    id="pattern"-->
<!--                    preserveAspectRatio="xMidYMid slice"-->
<!--                    width="100%"-->
<!--                    height="100%"-->
<!--                    viewBox="0 0 800 533"-->
<!--                  >-->
<!--                    <image-->
<!--                      width="800"-->
<!--                      height="533"-->
<!--                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAIVAgMAAABU3nNRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX/AAD/f3////9miK+BAAAAAWJLR0QCZgt8ZAAAAAd0SU1FB+cEExYvH/cGNXEAAAEjSURBVHja7c9BDQAACASgK2lJUxrCh5uDBiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAQj2RfkJERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE5MQAkIpKn1AohK8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDQtMTlUMjI6NDc6MzErMDA6MDB9nhaHAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA0LTE5VDIyOjQ3OjMxKzAwOjAwDMOuOwAAAABJRU5ErkJggg=="-->
<!--                    />-->
<!--                  </pattern>-->
<!--                </defs>-->
<!--                <g-->
<!--                  id="Flag_of_Indonesia.svg"-->
<!--                  stroke="#e9e9e9"-->
<!--                  stroke-width="0.5"-->
<!--                  fill="url(#pattern)"-->
<!--                >-->
<!--                  <circle cx="15.5" cy="15.5" r="15.5" stroke="none" />-->
<!--                  <circle cx="15.5" cy="15.5" r="15.25" fill="none" />-->
<!--                </g>-->
<!--              </svg>-->
<!--              +62-->
<!--            </div>-->
<!--            <div class="o-input-wrapper flex-grow-1">-->
<!--              <input-->
<!--                type="text"-->
<!--                autocomplete="off"-->
<!--                v-model="phone_no"-->
<!--                :placeholder="$t('phone_no')"-->
<!--              />-->
<!--            </div>-->
<!--            &lt;!&ndash; @input="form.phone_no = $numInput(form.phone_no)" &ndash;&gt;-->
<!--          </div>-->
<!--          <div class="text-danger fw-lighter text-center mt-2" v-if='err.phone_no'>{{err.phone_no}}</div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="mb-3">
        <div class="o-input-wrapper float">
          <input
            id="name"
            type="text"
            class="o-input login-input login"
            :placeholder="$t('email_address')"
            name="name"
            autocomplete="off"
            v-model="email"
          />
          <label for="name" class="floating-label">{{
              $t("email_address")
            }}</label>
        </div>
        <div class="text-danger" v-if="err.email">
          {{ err.email }}
        </div>
        <DError
          v-model="email"
          validemail
          required
          maxlength="50"
          target="input#username"
        />
      </div>
      <div class="text-danger" v-if="err.login_btn">
        {{ err.login_btn }}
      </div>
      <div class="text-danger" v-if="err['otp-code']">
        {{ err['otp-code'] }}
      </div>
      <div v-if="$route.query.exp" class="text-danger text-center mt-2 mb-2">
        {{ $t("session_expired") }}
      </div>
      <div
        class="d-flex justify-content-center align-items-center mt-4 mb-3 submit-button"
      >
        <button class="primary w-100 button" type="submit" v-if="!submitting">
          {{ $t("continue") }}
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
  data() {
    return {
      submitting: false,
      range: 1,
      err: {},
      phone_no: "",
      email: "",
    };
  },

  methods: {
    async handleSubmit(e) {
      if (!e || !e.isValid) return;

      // let param = {
      //   phone_no: `62-${this.phone_no}`,
      //   login_type: 'phone_no',
      //   step: 1
      // };

      let param = {
        email: this.email,
        login_type: 'email',
        step: 1
      };

      this.submitting = true;
      const res = await this.$store.dispatch("user/login", param);
      this.submitting = false;

      if (res.status) {
        if (res.error) {
          this.err = this.$formatError(res.error);
          return;
        }
        this.$emit("show-verification", {
          otp_debug : res.otp_debug,
          ...res.data
        });
        return;
      } else {
        this.$toast(false, res.message);
      }
    },
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
.login-input{
  border: 1px solid var(--border);
}
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
  .o-input-wrapper {
    input {
      // border-radius: 15px;
      color: black;
      //border: none;
      width: 100%;
      background: none;
      height: 56px;

      &:focus {
        //border: none;
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
