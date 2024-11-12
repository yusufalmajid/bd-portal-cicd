<template>
  <div class="px-2">
    <template>
      <STableNew
        api="leads/list"
        :payload="{ ...listPayload, ...filter }"
        :refreshKey="refreshKey"
        @search="refreshKey++"
        @reset="resetFilter"
        :hasFilter="true"
        :isRowExpandable="false"
        :SFilterHasExportButton="true"
        @getData="getData"
      >
        <template v-slot:filterBody>
          <div class="d-flex justify-content-between align-items-center">
            <div class="table-title">
              <h5>{{ $t("lead_submission_lists") }}</h5>
            </div>

            <div class="d-flex align-items-center gap-2">
              <div class="o-input-wrapper float">
                <input
                  type="text"
                  class="o-input border"
                  :placeholder="$t('search_here')"
                  v-model="filter.search"
                />
                <label class="floating-label">{{ $t("search") }}</label>
              </div>
              <div class="o-input-wrapper float">
                <div class="o-input range border">
                  <DatePicker class="o-input" v-model="filter.created_at" format="DD/MM/YYYY" value-type="YYYY-MM-DD" lang="en" type="date" :placeholder="$t('date')">
                    <template v-slot:icon-calendar>
                      <img src="~/assets/img/calendar-icon.svg" width="20">
                    </template>
                  </DatePicker>
                </div>
                <label for="floating-label">{{$t("date")}}</label>
              </div>
              <button type="submit" class="btn" :disabled="disableSearch">
                <svg
                  id="Group_24844"
                  data-name="Group 24844"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="22.059"
                  height="22.059"
                  viewBox="0 0 22.059 22.059"
                >
                  <g
                    id="Group_24843"
                    data-name="Group 24843"
                    clip-path="url(#clip-path)"
                  >
                    <path
                      id="Path_22771"
                      data-name="Path 22771"
                      d="M10.517,1.539a8.978,8.978,0,0,1,8.978,8.978h1.539A10.517,10.517,0,0,0,10.517,0ZM1.539,10.517a8.978,8.978,0,0,1,8.978-8.978V0A10.517,10.517,0,0,0,0,10.517Zm8.978,8.978a8.977,8.977,0,0,1-8.978-8.978H0A10.517,10.517,0,0,0,10.517,21.033Zm8.978-8.978a8.978,8.978,0,0,1-8.978,8.978v1.539A10.517,10.517,0,0,0,21.033,10.517Z"
                      fill="#525252"
                    />
                    <path
                      id="Path_22772"
                      data-name="Path 22772"
                      d="M21.366,20.277l-2.052-2.052-1.089,1.089,2.052,2.052Zm-2.052-2.052a.77.77,0,1,0-1.089,1.089Zm.963,3.141a.77.77,0,1,0,1.089-1.089Z"
                      transform="translate(0.468 0.468)"
                      fill="#525252"
                    />
                  </g>
                </svg>
              </button>
            </div>

            <button
              type="button"
              @click="showAddModal = true"
              class="button secondary filter"
            >
              <svg id="Group_51778" data-name="Group 51778" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23.22" height="23.22" viewBox="0 0 23.22 23.22">
                <defs>
                  <clipPath id="clip-path">
                    <rect id="Rectangle_13478" data-name="Rectangle 13478" width="23.22" height="23.22" fill="#fff"/>
                  </clipPath>
                </defs>
                <g id="Group_51777" data-name="Group 51777" clip-path="url(#clip-path)">
                  <path id="Path_30968" data-name="Path 30968" d="M6.81,11.62h8.64V10H6.81Zm8.64,0a.81.81,0,0,0,0-1.62ZM6.81,10a.81.81,0,1,0,0,1.62Z" transform="translate(0.48 0.8)" fill="#fff"/>
                  <path id="Path_30969" data-name="Path 30969" d="M11.62,6.81H10v8.64h1.62Zm0,0a.81.81,0,1,0-1.62,0ZM10,15.45a.81.81,0,0,0,1.62,0Z" transform="translate(0.8 0.48)" fill="#fff"/>
                  <path id="Path_30970" data-name="Path 30970" d="M0,14.85c0,2.78.551,4.937,1.992,6.378S5.59,23.22,8.37,23.22V21.6c-2.62,0-4.243-.529-5.233-1.517S1.62,17.47,1.62,14.85Zm0,0H1.62V8.37H0ZM8.37,0C5.59,0,3.433.551,1.992,1.993S0,5.59,0,8.37H1.62c0-2.62.529-4.243,1.517-5.233S5.75,1.62,8.37,1.62Zm6.48,0H8.37V1.62h6.48Zm8.37,8.37c0-2.78-.551-4.937-1.993-6.378S17.63,0,14.85,0V1.62c2.62,0,4.243.529,5.232,1.517S21.6,5.75,21.6,8.37Zm0,0H21.6v6.48h1.62ZM14.85,23.22c2.78,0,4.937-.551,6.378-1.993s1.993-3.6,1.993-6.378H21.6c0,2.62-.529,4.243-1.519,5.233S17.47,21.6,14.85,21.6Zm-6.48,0h6.48V21.6H8.37Z" fill="#fff"/>
                </g>
              </svg>
              <span class="d-none d-md-inline ms-2">{{ $t("create_new") }}</span>
            </button>
          </div>
        </template>

        <template v-slot:head>
          <th>{{ $t("created_at") }}</th>
          <th v-if="role == 1" >{{ $t("staff_in_charge") }}</th>
          <th>{{ $t("company_name") }}</th>
          <th>{{ $t("person_in_charge") }}</th>
          <th>{{ $t("phone_no") }}</th>
          <th>{{ $t("email") }}</th>
          <th class="text-center">{{ $t("business_card") }}</th>
          <th class="actionTD">{{ $t("action") }}</th>
        </template>
        <template v-slot:body="body">
          <STrExpand v-for="(v, k) in body.rows" :key="'list' + k">
            <td :data-header="$t('created_at')" >{{ v.created_at }}</td>
            <td :data-header="$t('staff_in_charge')"  v-if="role == 1">{{ v.bd_name || "-" }}</td>
            <td :data-header="$t('company_name')" >{{ v.company_name || "-" }}</td>
            <td :data-header="$t('person_in_charge')" >{{ v.pic || "-" }}</td>
            <td :data-header="$t('phone_no')" >{{ v.phone_no || "-" }}</td>
            <td :data-header="$t('email')" >{{ v.email || "-" }}</td>
            <td :data-header="$t('business_card')"  class="text-center">
              <img :src="v.business_card" style="max-height: 60px; max-width: 120px" @click="showImage(v)">
            </td>
            <td style="width: 100px" class="actionTD"  :data-header="$t('action')">
              <div class="action-button-wrapper">
                <div class="infoBtn white cursor-pointer" @click="editLeads(v)" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14.913" height="16.32" viewBox="0 0 14.913 16.32">
                    <g id="Group_24961" data-name="Group 24961">
                      <path id="Path_22825" data-name="Path 22825" d="M13.093,1.134A3.343,3.343,0,0,0,10.381.02a3.7,3.7,0,0,0-2.143,1.26l.834.789a2.587,2.587,0,0,1,1.455-.911,2.232,2.232,0,0,1,1.78.811ZM13.232,6a3.685,3.685,0,0,0,1.139-2.212,3.35,3.35,0,0,0-1.276-2.653l-.788.834a2.243,2.243,0,0,1,.92,1.739,2.576,2.576,0,0,1-.828,1.5ZM6.953,12.645,13.232,6,12.4,5.211,6.119,11.857Zm-1.38.744a2.587,2.587,0,0,0,.742-.271,2.439,2.439,0,0,0,.645-.481l-.847-.772a1.367,1.367,0,0,1-.338.242,1.517,1.517,0,0,1-.4.154Zm-2.466.421L5.57,13.39l-.193-1.13-2.463.421Zm-2.1-1.982a1.816,1.816,0,0,0,.52,1.549,1.8,1.8,0,0,0,1.577.433l-.2-1.13a.668.668,0,0,1-.593-.135.681.681,0,0,1-.17-.59Zm.283-2.479-.283,2.478,1.14.13.283-2.478Zm.664-1.421a2.594,2.594,0,0,0-.43.662,2.729,2.729,0,0,0-.233.748l1.137.151a1.577,1.577,0,0,1,.136-.415,1.47,1.47,0,0,1,.226-.362ZM8.238,1.28,1.959,7.926l.834.788L9.071,2.068Zm4.462.271.394-.417h0ZM12.815,5.6,12.4,5.21h0ZM6.536,12.251l-.417-.394-.007.008Zm-1.063.574.1.565h0Zm-2.463.421-.1-.565h0Zm-1.43-1.354-.57-.065v0Zm.283-2.478-.569-.076v.011ZM2.376,8.32l-.417-.394,0,0ZM8.655,1.674l-.417-.395h0Z" transform="translate(-0.235 0)" fill="#fff"/>
                      <path id="Path_22826" data-name="Path 22826" d="M8.9,3.55a5.259,5.259,0,0,0,4.677,4.421l.115-1.142A4.111,4.111,0,0,1,10.03,3.374Zm4.677,4.421a.574.574,0,0,0,.115-1.142Zm-3.544-4.6A.574.574,0,1,0,8.9,3.55Z" transform="translate(-2.091 -0.679)" fill="#fff"/>
                      <path id="Path_22827" data-name="Path 22827" d="M.574,20.986H14.34V19.839H.574Zm13.766,0a.574.574,0,1,0,0-1.147ZM.574,19.839a.574.574,0,1,0,0,1.147Z" transform="translate(0 -4.667)" fill="#fff"/>
                    </g>
                  </svg>
                </div>
                <div class="removeBtn white cursor-pointer" @click="showConfirmRemoveLead(v)">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16.559" height="15.712" viewBox="0 0 16.559 15.712">
                    <g id="Group_51783" data-name="Group 51783" transform="translate(0 0)">
                      <g id="Group_51782" data-name="Group 51782" transform="translate(0 0)">
                        <path id="Path_30972" data-name="Path 30972" d="M2.512,2.533.844,2.695l.181,1.859,1.668-.162ZM7.445,2.28a49.018,49.018,0,0,0-4.937.254L2.7,4.392a47.249,47.249,0,0,1,4.749-.244ZM15.72,2.7A82.4,82.4,0,0,0,7.445,2.28V4.148a80.848,80.848,0,0,1,8.087.406Zm-14.876,0a.934.934,0,0,0,.181,1.859ZM2.6,3.463l.091.929h0Zm12.93,1.091A.934.934,0,1,0,15.72,2.7Z" transform="translate(0 0.559)" fill="#fff"/>
                        <path id="Path_30973" data-name="Path 30973" d="M9.149,2.443,9.324,3.5l1.843-.3L10.992,2.14Zm-.685-.575a1.215,1.215,0,0,1,.569.077.314.314,0,0,1,.034.087,3.371,3.371,0,0,1,.082.413l1.843-.308A2.75,2.75,0,0,0,10.446.721,2.481,2.481,0,0,0,8.465,0Zm-2.141,0H8.465V0H6.323ZM5.64,2.44a3.364,3.364,0,0,1,.082-.421c.025-.085.041-.093.029-.08a1.509,1.509,0,0,1,.573-.072V0A2.49,2.49,0,0,0,4.347.707,2.739,2.739,0,0,0,3.8,2.143ZM5.465,3.512,5.64,2.442,3.8,2.141,3.621,3.212ZM9.324,3.5a.934.934,0,1,0,1.843-.3Zm.747-1.21.921-.151v0Zm-5.354,0,.923.151h0Zm-1.1.921a.934.934,0,1,0,1.844.3Z" transform="translate(0.884 0)" fill="#fff"/>
                        <path id="Path_30974" data-name="Path 30974" d="M3.8,11.781,3.266,3.564,1.4,3.685,1.938,11.9Zm1.508,1.4c-1.045,0-1.255-.234-1.3-.293a.816.816,0,0,1-.126-.339,6.463,6.463,0,0,1-.081-.777L1.938,11.9a7.9,7.9,0,0,0,.115,1.017,2.632,2.632,0,0,0,.476,1.108,3.275,3.275,0,0,0,2.781,1.023Zm5.243,0H5.311v1.868h5.242Zm1.508-1.408a6.463,6.463,0,0,1-.081.777.816.816,0,0,1-.126.339c-.046.059-.256.293-1.3.293v1.868a3.275,3.275,0,0,0,2.781-1.023,2.635,2.635,0,0,0,.477-1.108,8.116,8.116,0,0,0,.113-1.017ZM12.6,3.564l-.535,8.217,1.864.121.535-8.217Zm-9.329,0A.934.934,0,1,0,1.4,3.685Zm-.4,8.277-.933.061v0Zm10.122,0,.931.063v0Zm1.467-8.156A.934.934,0,1,0,12.6,3.564Z" transform="translate(0.343 0.659)" fill="#fff"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </td>
          </STrExpand>
        </template>
      </STableNew>
    </template>

    <ModalsAddModal :show="showAddModal" @close="close">
      <template #modalBody>
        <LeadSubmissionForm
          :title="selected_id ? $t('update_lead') : $t('create_new_lead')"
          @close="close"
          :id="selected_id"
          :leadData="selected_data"
        />
      </template>
    </ModalsAddModal>
    <Modal :show="removeModal" md @close="removeModal = false">
      <template v-slot:modalTitle>
        <p class="modal-title text-l2 bold-l">{{ $t("delete_leads") }}</p>
      </template>
      <template v-slot:modalBody>
        <div class="container" style="max-width: 600px">
          <div class="" style="padding: 40px 0; font-weight: 500">
            <p>{{ $t("are_you_sure_want_to_remove_lead") }}</p>
            <p class="text-center">{{selected_data.company_name}}</p>
          </div>
        </div>
      </template>
      <template v-slot:modalButton>
        <div class="button outline" @click="removeModal = false">
          {{ $t("cancel") }}
        </div>
        <button
          class="button secondary"
          style="background-color: #ff8787"
          @click="removeLead"
        >
          {{ $t("delete") }}
        </button>
      </template>
    </Modal>
    <div class="businessCardModal" v-show="showBusinessCard">
      <div class="bc-body">
        <div class="close-btn" @click="showBusinessCard = false">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44.913"
               height="44.913" viewBox="0 0 44.913 44.913">
            <g id="Group_22113" data-name="Group 22113" transform="translate(0 74.603)">
              <g id="Group_22112" data-name="Group 22112" transform="translate(0 -74.603)">
                <path id="Path_21024" data-name="Path 21024"
                      d="M0,22.457A22.519,22.519,0,0,0,22.457,44.913V41.78A19.384,19.384,0,0,1,3.133,22.457ZM22.457,0A22.519,22.519,0,0,0,0,22.457H3.133A19.384,19.384,0,0,1,22.457,3.133ZM44.913,22.457A22.519,22.519,0,0,0,22.457,0V3.133A19.384,19.384,0,0,1,41.78,22.457ZM22.457,44.913A22.519,22.519,0,0,0,44.913,22.457H41.78A19.384,19.384,0,0,1,22.457,41.78Z"
                      fill="#666666"/>
                <path id="Path_21025" data-name="Path 21025"
                      d="M9.845,21.669,21.668,9.846,19.452,7.629,7.628,19.453ZM21.668,9.846a1.567,1.567,0,1,0-2.216-2.216ZM7.628,19.453a1.567,1.567,0,0,0,2.216,2.216Z"
                      transform="translate(7.807 7.808)" fill="#666666"/>
                <path id="Path_21026" data-name="Path 21026"
                      d="M21.669,19.452,9.846,7.628,7.629,9.845,19.453,21.668ZM9.846,7.628A1.567,1.567,0,0,0,7.629,9.845Zm9.607,14.04a1.567,1.567,0,1,0,2.216-2.216Z"
                      transform="translate(7.808 7.807)" fill="#666666"/>
              </g>
            </g>
          </svg>
        </div>
        <img v-if="selectedImg" :src="selectedImg"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$config.TITLE} | ${this.$t("lead_submission")}`,
    };
  },
  middleware: ["auth"],
  layout: "app",
  name: "LeadSubmission",
  data() {
    return {
      disableSearch: false,
      showAddModal: false,
      refreshKey: 0,
      listPayload: {
        paginate: 10,
        sort: "id,desc",
        dropdown: [],
      },
      filter: {
        status: "",
      },
      statusOpt: [],
      date: [null, null],
      //Updoad Invoice Function
      err: {},
      uploadInvModal: false,
      isSubmitted: false,
      selected_id: false,
      selected_data: false,
      form: {
        closing_bill_id: "",
        receipt_name: "",
        receipt_type: "",
      },
      removeModal: false,
      role : 2,
      showBusinessCard : false,
      selectedImg : false,
    };
  },
  created() {
  },
  methods: {
    close(refresh) {
      this.showAddModal = false;
      this.$store.commit("setOpenCreateNewModal", this.showAddModal);
      this.selected_id= false;
      this.selected_data= false;
      if(refresh){
        this.refreshKey++;
      }
    },
    editLeads(d) {
      this.selected_id = d.id;
      this.selected_data = d;
      this.showAddModal = true;
      this.$store.commit("setOpenCreateNewModal", this.showAddModal);
    },

    async removeLead(){
      if(this.isSubmitted) return false;
      this.isSubmitted = true;
      let d = await this.$api('leads/remove', {
        id : this.selected_id
      })
      if (d.success) {
        if (d.error) {
          this.err = this.$formatError(d.error)
          return
        }
        this.$toast(true, d.message);
        this.refreshKey++;
        this.closeConfirmRemoveLead();
        this.$store.dispatch('updateLeadTotals');
      } else {
        this.$toast(false, d.message);
      }
    },
    showConfirmRemoveLead(d) {
      this.selected_id = d.id;
      this.selected_data = d;
      this.removeModal = true;
    },
    closeConfirmRemoveLead() {
      this.selected_id = false;
      this.selected_data = false;
      this.removeModal = false;
    },
    getData(d) {

    },
    resetFilter() {
      this.filter = {
        status: "",
      };
      this.date = [null, null];
      this.refreshKey++;
    },

    showImage(v){
      this.showBusinessCard = true;
      this.selectedImg = v.business_card;
    }
  },
  watch: {
    date(value) {
      delete this.filter.from_date;
      delete this.filter.to_date;

      let hasValue =
        value
          .map((i) => {
            return i ? true : false;
          })
          .indexOf(false) < 0;
      if (hasValue) {
        this.filter = {
          ...this.filter,
          from_date: value[0] || "",
          to_date: value[1] || "",
        };
      }
    },
    "$store.state.open_create_new_modal": function () {
      if (
        this.$store.state.open_create_new_modal.open &&
        this.$store.state.open_create_new_modal.name.includes(this.$route.path)
      ) {
        this.showAddModal = true;
      }
    },
  },
  mounted() {
    if(this.$store.state?.user?.data?.role_id){
      this.role = this.$store.state?.user?.data?.role_id;
    }
  }
};
</script>

<style lang="scss" scoped>
.action-button-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.infoBtn {
  border-radius: 100%;
  background: #283874;
  color: white;
  height: 42px;
  width: 42px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #283874;
  &:hover{
    background: white;
    svg{
      path{
        fill: #283874;
      }
    }
  }
}

.removeBtn{
  border-radius: 100%;
  background: #FF8787;
  color: white;
  height: 42px;
  width: 42px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #FF8787;
  &:hover{
    background: white;
    svg{
      path{
        fill: #FF8787;
      }
    }
  }
}

td {
  color: #666666;
  font-weight: 100;
}

.text-green {
  color: #4bca9d;
  font-weight: 500;
}

.table-title {
  color: #283874;
  font-weight: 500;
}

.o-input-wrapper {
  width: 300px;
}

.businessCardModal{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  z-index: 99;
  margin: auto;
  background: transparentize(black, .9);
  display: flex;
  justify-content: center;
  align-items: center;
  .bc-body{
    height: 80%;
    width: 80%;
    position: relative;
    background: white;
    text-align: center;
    padding: 20px;
    border-radius: 15px;
    .close-btn{
      position: absolute;
      right: 10px;
      top: 10px;
      background: transparentize(#fff, 0.2);
      border-radius: 99px;
      padding: 5px;
    }
  }
  img{
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }
}
</style>