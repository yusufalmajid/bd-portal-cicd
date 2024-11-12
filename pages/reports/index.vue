<template>
  <div class="px-2">
    <template>
      <STableNew
        api="report"
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
              <h5>{{ $t("report_lists") }}</h5>
            </div>

            <div class="d-flex align-items-center gap-2">
              <div class="o-input-wrapper float">
                <input
                  type="text"
                  class="o-input border"
                  :placeholder="$t('search_here')"
                  v-model="filter.staff_name"
                />
                <label class="floating-label">{{ $t("search") }}</label>
              </div>
              <button type="submit" class="btn">
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
          </div>
        </template>

        <template v-slot:head>
          <th>{{ $t("id") }}</th>
          <th>{{ $t("company_name") }}</th>
          <th>{{ $t("person_in_charge") }}</th>
          <th>{{ $t("employee_count") }}</th>
          <th>{{ $t("credit_limit") }}</th>
          <th>{{ $t("credit_balance") }}</th>
          <th>{{ $t("status") }}</th>
        </template>
        <template v-slot:body="body">
          <STrExpand v-for="(v, k) in body.rows" :key="'list' + k">
            <td>{{ v.id || "-" }}</td>
            <td>{{ v.name || "-" }}</td>
            <td>{{ v.username || "-" }}</td>
            <td>{{ v.employee_count || "-" }}</td>
            <td>{{ v.credit_limit ? $fn(v.credit_limit) : "-" }}</td>
            <td>{{ v.credit_balance ? $fn(v.credit_balance) : "-" }}</td>
            <td>{{v.status}}</td>
          </STrExpand>
        </template>
      </STableNew>
    </template>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$config.TITLE} | ${this.$t("report_lists")}`,
    };
  },
  // middleware: ["auth"],
  layout: "app",
  name: "Billing",
  data() {
    return {
      showAddModal: false,
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
      // sample data
      billings: [
        {
          user_id: 1000082,
          month_year: "May 2024",
          month: 5,
          year: 2024,
          name: "Jane",
          email: "jane@mickey.com",
          credit_limit: "0.000000",
          collected_salary: "452.790000",
          advanced_salary: "0.000000",
          total_cash_out: "452.790000",
        },
        {
          user_id: 1000079,
          month: 5,
          year: 2024,
          name: "Test 12",
          email: "test12@email.com",
          credit_limit: "0.000000",
          collected_salary: "609.680000",
          advanced_salary: "2540.320000",
          total_cash_out: "3150.000000",
        },
        {
          user_id: 1000077,
          month: 5,
          year: 2024,
          name: "Test 10",
          email: "test10@email.com",
          credit_limit: "0.000000",
          collected_salary: "304.840000",
          advanced_salary: "0.000000",
          total_cash_out: "304.840000",
        },
        {
          user_id: 1000055,
          month: 4,
          year: 2024,
          name: "Goofy",
          email: "goofy@mickey.com",
          credit_limit: "0.000000",
          collected_salary: "249.190000",
          advanced_salary: "0.000000",
          total_cash_out: "249.190000",
        },
        {
          user_id: 1000051,
          month: 4,
          year: 2024,
          name: "Oswald",
          email: "aswald@mickey.com",
          credit_limit: "0.000000",
          collected_salary: "900.000000",
          advanced_salary: "0.000000",
          total_cash_out: "900.000000",
        },
        {
          user_id: 1000013,
          month: 4,
          year: 2024,
          name: "Minnie",
          email: "minnie@mickey.com",
          credit_limit: "0.000000",
          collected_salary: "452.150000",
          advanced_salary: "0.000000",
          total_cash_out: "452.150000",
        },
      ],
    };
  },
  created() {
    this.$store.commit("setPageName", "billing");
    this.$store.commit("setBreadcrumb", [{ l: "dashboard", d: "home" }]);
  },
  methods: {
    close() {
      this.showAddModal = false;
      this.$store.commit("setOpenCreateNewModal", this.showAddModal);
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
    async exportDataToCSV() {
      const data = await this.$api("report/download-export-report", {
        id: 1,
      });

      console.log(data);
    },
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
  },

  watch: {
    "$store.state.open_create_new_modal": function () {
      if (
        this.$store.state.open_create_new_modal.open &&
        this.$store.state.open_create_new_modal.name.includes(this.$route.path)
      ) {
        this.showAddModal = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.infoBtn {
  border-radius: 100%;
  background: #283874;
  color: white;
  height: 44px;
  width: 44px;
  padding: 10px;
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
</style>