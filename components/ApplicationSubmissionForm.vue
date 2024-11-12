<template>
  <form
    @submit.prevent="submitHandler"
    style="height: 95%"
    class="position-relative"
  >
    <div class="container h-100 pb-5">
      <div class="form-heading d-flex align-items-center">
        <button
          @click="$emit('close')"
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
        <div class="form-title">
          {{ title }}
        </div>
      </div>

      <div class="row my-5">
        <div class="col-12">
          <div class="mb-4">
            <div class="o-input-wrapper float">
              <input
                type="text"
                autocomplete="off"
                class="o-input border"
                :placeholder="$t('company_name')"
                v-model="form.company_name"
                :disabled="$props.id"
              />
              <label class="floating-label">{{ $t("company_name") }}</label>
            </div>
            <div class="text-danger error-text" v-if="err.company_name">
              {{ err.company_name }}
            </div>
          </div>
          <div class="mb-4">
            <div class="o-input-wrapper float">
              <input
                type="text"
                autocomplete="off"
                class="o-input border"
                :placeholder="$t('person_in_charge')"
                v-model="form.person_in_charge"
                :disabled="$props.id"
              />
              <label class="floating-label">{{ $t("person_in_charge") }}</label>
            </div>
            <div class="text-danger error-text" v-if="err.person_in_charge">
              {{ err.person_in_charge }}
            </div>
          </div>
        </div>

        <div
          class="col-12 d-flex justify-content-between align-items-center gap-4"
        >
          <div class="mb-4 w-100">
            <div class="o-input-wrapper">
              <div class="phone-input-wrapper" :class="{disabled : $props.id}">
                <div class="code-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                  >
                    <defs>
                      <pattern
                        id="pattern"
                        preserveAspectRatio="xMidYMid slice"
                        width="100%"
                        height="100%"
                        viewBox="0 0 800 533"
                      >
                        <image
                          width="800"
                          height="533"
                          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAIVAgMAAABU3nNRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACVBMVEX/AAD/f3////9miK+BAAAAAWJLR0QCZgt8ZAAAAAd0SU1FB+cEExYvH/cGNXEAAAEjSURBVHja7c9BDQAACASgK2lJUxrCh5uDBiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAQj2RfkJERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERE5MQAkIpKn1AohK8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDQtMTlUMjI6NDc6MzErMDA6MDB9nhaHAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA0LTE5VDIyOjQ3OjMxKzAwOjAwDMOuOwAAAABJRU5ErkJggg=="
                        />
                      </pattern>
                    </defs>
                    <g
                      id="Flag_of_Indonesia.svg"
                      stroke="#e9e9e9"
                      stroke-width="0.5"
                      fill="url(#pattern)"
                    >
                      <circle cx="15.5" cy="15.5" r="15.5" stroke="none" />
                      <circle cx="15.5" cy="15.5" r="15.25" fill="none" />
                    </g>
                  </svg>
                  +62
                </div>
                <div class="o-input-wrapper float flex-grow-1 phone-group">
                  <input
                    type="text"
                    autocomplete="off"
                    class="o-input"
                    v-model="form.phone_no"
                    :placeholder="$t('phone_no')"
                    @input="form.phone_no = $numInput(form.phone_no)"
                    :disabled="$props.id"
                  />
                  <label class="floating-label">{{ $t("phone_no") }}</label>
                </div>
              </div>
            </div>
            <div class="text-danger error-text" v-if="err.phone_no">
              {{ err.phone_no }}
            </div>
          </div>
          <div class="mb-4 w-100">
            <div class="o-input-wrapper float">
              <input
                type="text"
                autocomplete="off"
                class="o-input border"
                :placeholder="$t('email')"
                v-model="form.email"
                :disabled="$props.id"
              />
              <label class="floating-label">{{ $t("email") }}</label>
            </div>
            <div class="text-danger error-text" v-if="err.email">
              {{ err.email }}
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="file-input-container">
            <div class="file-input-label" v-if="!$props.id">{{ fileName || defaultLabel }}</div>
            <a class="file-input-label" :href="bcLink" target="_blank" v-else>{{ $t('business_card') }}</a>

            <label class="file-input-button" v-if="!$props.id">
              {{$t('attach')}}
              <input type="file" accept="image/*" @change="handleFileChange" />
            </label>
          </div>
        </div>
        <div class="col-12 mt-4" v-if="!$props.id">
          <div class="file-input-container" >
            <div class="file-input-label">{{ defaultDocumentLabel }}</div>

            <label class="file-input-button" for="documents" >
              {{$t('attach')}}
              <input type="file" id="documents" @change="handleDocumentChange" />
            </label>
          </div>
          <div class="mt-3" style="max-height: 100px;overflow: auto;">
            <div v-for="(file,index) of documents" class="file-list">
              <div>{{file.name}}</div>
              <div class="delete" @click="removeFile(index)">{{$t('delete')}}</div>
            </div>
          </div>
        </div>
        <div v-else class="col-12 mt-4">
          <div class="" style="text-align: left">{{$t('documents')}}</div>
          <ol class="mt-3" style="max-height: 100px;overflow: auto;">
            <li v-for="(file,index) of documents" class="file-input-label">
              <a :href="file.link" target="_blank">{{file.file_name.split('/')[file.file_name.split('/').length-1]}}</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button type="button" class="button outline" @click="$emit('close')">
        {{ $t("cancel") }}
      </button>
      <button type="submit" class="button secondary" v-if="!$props.id">
        {{ $t("create") }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    setup: {
      type: String,
      default: "add",
    },
    id: {
      type : [String, Number, Boolean],
      default : false
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    const defaultFormValue = {
      company_name: "",
      email: "",
      phone_no: "",
      person_in_charge: "",
    };
    return {
      countryOptions: [],
      err: "",
      defaultFormValue: { ...defaultFormValue },
      form: { ...defaultFormValue },
      submitting: false,
      fileName: "",
      documents: [],
      defaultLabel: this.$t('attach_business_card'),
      defaultDocumentLabel: this.$t('attach_document'),
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.fileName = file ? file.name : "";
      this.file = file;
    },
    handleDocumentChange(e){
      this.documents.push(e.target.files[0]);
    },
    resetInpput() {
      this.err = {};
      this.form = {
        company_name: "",
        email: "",
        phone_no: "",
        person_in_charge: "",
      };
    },
    async loadDropdown() {
      const d = await this.$api("country/get", {
        dropdown: ["bank_list", "employment_type"],
      });

      if (d.success) {
        if (d.error) {
          this.err = this.$formatError(d.error);
          return;
        } else {
          if (d.data) {
            this.countryOptions = d.data || [];
            if (d.data && d.data.length) {
              // this.form.dial_code = d.data?.[0]?.dial_code || ""
              this.form.dial_code = "62";
            }
          }

          this.bankOptions = d?.dropdown?.bank_list || [];
          this.typeOptions = d.dropdown?.employment_type || [];
        }
      } else {
        this.$toast(false, d.message);
      }
    },
    async submitHandler(e) {
      if(!e.isValid && this.submitting){
        return false;
      }
      this.submitting = true;
      let params = {
        company_name: this.form.company_name,
        email: this.form.email,
        phone_no: `62-${this.form.phone_no}`,
        pic: this.form.person_in_charge,
        business_card:this.form.business_card,
        documents: [],
      };
      let company_name_file = params['company_name'].replace(/ /g, "_").toLowerCase();
      var uploadAction = false;
      if(this.file){
        var getType = this.file.type.split("/");
        var fileName = `${this.$store.state.user.data.id}_${new Date().getTime()}_${company_name_file}_bc.${getType[1]}`;
        var compressFile = await this.$compress(this.file);
        var base64toFile = await this.dataURLtoFile(compressFile, fileName);
        uploadAction = await this.$upload(base64toFile, 0);
        if (!uploadAction.status) {
          // this.$toast(false, `${this.$t("upload_failed")} ID : ${uploadSelfie?.data?.report_id}`);
          this.report_id = uploadAction?.data?.report_id
          this.failedUploadModal = true;
          this.submitting = false;
          return false;
        }
        params.business_card = uploadAction.data.key;
      }

      if(this.documents){
        for(let fi in this.documents){
          let f = this.documents[fi];
          var getType = f.type.split("/");
          // var fileName = `${this.$store.state.user.data.id}_${new Date().getTime()}_${f.name.replace(/ /g, '_')}.${getType[1]}`;
          // var compressFile = await this.$compress(f);
          // var base64toFile = await this.dataURLtoFile(f, fileName);
          uploadAction = await this.$upload(f, 0);
          if (!uploadAction.status) {
            // this.$toast(false, `${this.$t("upload_failed")} ID : ${uploadSelfie?.data?.report_id}`);
            this.report_id = uploadAction?.data?.report_id
            this.failedUploadModal = true;
            this.submitting = false;
            return false;
          }
          params.documents.push(uploadAction.data.key);
          // params.documents.push({
          //   file_name : f.name,
          //   link : uploadAction.data.key
          // });
        }
      }
      let api = 'application/new';
      if(this.$props.id){
        api = 'application/update';
        params['id'] = this.$props.id;
      }
      let d = await this.$api(api, params);
      this.submitting = false

      if (d.success) {
        if (d.error) {
          this.err = this.$formatError(d.error)
          return
        }
        this.$toast(true, d.message);
        this.$emit('close', true)
        this.$store.dispatch('updateApplicationTotals');
      } else {
        this.$toast(false, d.message);
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, {type: mime});
    },
    mapCountries () {
      return this.countries.map(c => ({
        id: c.id,
        // icon: `https://bjexpub.s3.ap-southeast-1.amazonaws.com/frontend/country_flag/${c.id}.png`,
        value: c.phone_prefix_code,
        text: c.name + " " + c.phone_prefix_code,
        // iso: c.iso,
      }))
    },
    removeFile(index){
      if (index > -1) {
        this.documents.splice(index, 1);
      }
    },
    async getData(){
      this.submitting = true;
      let d = await this.$api('application/details', {
        id: this.$props.id
      });
      this.submitting = false

      if (d.success) {
        if (d.error) {
          this.err = this.$formatError(d.error)
          return
        }
        this.form = {
          company_name: d.data.company_name,
          email: d.data.email,
          phone_no: d.data.phone_no,
          person_in_charge: d.data.pic,
          business_card: d.data.business_card
        };
        this.bcLink = d.data.business_card;
        this.documents = d.data.documents;
      } else {

      }
    }
  },
  mounted() {
    if(this.$props.id){
      this.getData();
    }
  },
};
</script>

