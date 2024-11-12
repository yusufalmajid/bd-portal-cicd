<template>
  <div class="px-2">
    <template>
      <STableNew
        api="application/list"
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
              <h5>{{ $t("application_submission_lists") }}</h5>
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
              <fa :icon="['fas', 'user-plus']" />
              <span class="d-none d-md-inline ms-2">{{
                $t("create_new")
              }}</span>
            </button>
          </div>
        </template>

        <template v-slot:head>
          <th>{{ $t("created_at") }}</th>
          <th v-if="role == 1" >{{$t('staff_in_charge')}}</th>
          <th>{{ $t("company_name") }}</th>
          <th>{{ $t("person_in_charge") }}</th>
          <th>{{ $t("phone_no") }}</th>
          <th>{{ $t("email") }}</th>
          <th>{{ $t("business_card") }}</th>
          <th>{{ $t("documents") }}</th>
          <th class="actionTD">{{ $t("action") }}</th>
        </template>
        <template v-slot:body="body">
          <STrExpand v-for="(v, k) in body.rows" :key="'list' + k">
            <td :data-header="$t('created_at')">{{ v.created_at || "-" }}</td>
            <td v-if="role == 1" :data-header="$t('staff_in_charge')">{{ v.bd_name || "-" }}</td>
            <td :data-header="$t('company_name')">{{ v.company_name || "-" }}</td>
            <td :data-header="$t('person_in_charge')">{{ v.pic || "-" }}</td>
            <td :data-header="$t('phone_no')">{{ v.phone_no || "-" }}</td>
            <td :data-header="$t('email')">{{ v.email || "-" }}</td>
            <td class="text-center" :data-header="$t('total_cash_out')">
              <img :src="v.business_card" style="max-height: 60px; max-width: 120px" @click="showImage(v)">
            </td>
            <td class="text-center">{{ v.documents || "-" }}</td>
            <td style="width: 100px" class="actionTD"  :data-header="$t('action')">
              <div class="action-button-wrapper">
                <div class="infoBtn white cursor-pointer" @click="viewApllication(v)" >
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18.233" height="13.67" viewBox="0 0 18.233 13.67">
                    <g id="Group_22368" data-name="Group 22368">
                      <path id="Path_21854" data-name="Path 21854" d="M18.209,6.679a9.967,9.967,0,0,0-1.188-2.467,8.956,8.956,0,0,0-2.037-2.167A12.922,12.922,0,0,0,12.991.864,9.074,9.074,0,0,0,6.9.28,9.352,9.352,0,0,0,.026,6.673.544.544,0,0,0,.024,7,9.988,9.988,0,0,0,1.212,9.469,9.032,9.032,0,0,0,3.205,11.6a15.726,15.726,0,0,0,1.511.964,9.1,9.1,0,0,0,6.182.912,9.389,9.389,0,0,0,7.309-6.47.537.537,0,0,0,0-.328m-1.45.4a8.034,8.034,0,0,1-6.543,5.137,7.9,7.9,0,0,1-4.438-.6c-.037-.016-.086-.041-.125-.061h0l-.074-.037L5.5,11.48l0,0A9.4,9.4,0,0,1,4,10.522L4,10.508A7.822,7.822,0,0,1,2.844,9.384,7.872,7.872,0,0,1,1.464,7a.46.46,0,0,1-.005-.3,8,8,0,0,1,6.58-5.234,7.77,7.77,0,0,1,4.353.613c.078.034.145.072.211.108l.007,0a8.141,8.141,0,0,1,1.35.83l0,0,.1.082c.143.107.235.182.235.182l0,0c.026.021.056.043.083.065a8.082,8.082,0,0,1,2.376,3.379.528.528,0,0,1,0,.357" transform="translate(0 0)" fill="#fff"/>
                      <path id="Path_21855" data-name="Path 21855" d="M6.4,1.706a.312.312,0,0,1-.025-.086c-.005,0-.011,0-.016,0a4.165,4.165,0,0,0-1.15-1.1A3.407,3.407,0,0,0,.52,5.217,3.78,3.78,0,0,0,1.7,6.3l.052.031A3.394,3.394,0,0,0,6.4,1.706M5.05,4.643c-.021.026-.046.047-.068.072a1.951,1.951,0,0,1-.146.155c-.029.026-.059.049-.089.074a2.075,2.075,0,1,1,.32-.331c-.007.009-.01.022-.017.031" transform="translate(5.686 3.476)" fill="#fff"/>
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
        <ApplicationSubmissionForm
          :title="selected_id ? $t('view_application') : $t('create_new_application')"
          @close="close"
          :id="selected_id"
        />
      </template>
    </ModalsAddModal>
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
      title: `${this.$config.TITLE} | ${this.$t("application_submission")}`,
    };
  },
  // middleware: ["auth"],
  layout: "app",
  name: "ApplicationSubmission",
  data() {
    return {
      disableSearch: false,
      refreshKey: 0,
      listPayload: {
        paginate: 10,
        sort: "id,desc",
        dropdown: ["withdrawal_list_status"],
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
      form: {
        closing_bill_id: "",
        receipt_name: "",
        receipt_type: "",
      },
      showAddModal: false,
      selected_id: false,
      role:2,
      showBusinessCard : false,
      selectedImg : false,
    };
  },
  created() {
    this.$store.commit("setPageName", "application_submission");
    this.$store.commit("setBreadcrumb", [{ l: "dashboard", d: "home" }]);
    this.selected_id = false;
  },
  methods: {
    close(refresh) {
      this.showAddModal = false;
      this.$store.commit("setOpenCreateNewModal", this.showAddModal);
      this.selected_id = false;
      if(refresh){
        this.refreshKey++
      }
    },
    apply() {
      this.close();
    },
    getData(d) {
      // this.statusOpt = d.dropdown?.withdrawal_list_status || [];
    },
    resetFilter() {
      this.filter = {
        status: "",
      };
      this.date = [null, null];
      this.refreshKey++;
    },
    viewApllication(v){
      this.showAddModal = true;
      this.$store.commit("setOpenCreateNewModal", this.showAddModal);
      this.selected_id = v.id;
    },
    async exportDataToCSV() {
      const data = await this.$api("report/download-export-report", {
        id: 1,
      });
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