<template>
  <div
    class="paginationWrapper d-flex flex-column flex-md-row align-items-start align-items-md-center"
    :class="{
      'justify-content-end': onlyRight,
      'justify-content-between': !onlyRight,
      'justify-content-center': makeCenter,
    }"
  >
    <div class="d-flex align-items-center" v-if="!onlyRight">
      <!-- <div class="text-light text-s">{{showingItems}}</div>
            <div v-if="sorting && sorting.order_by" class="ms-3 text-s color-light">
                {{sortingInfo}}
            </div>
            <span v-if="sorting && sorting.order_by" class="text-s text-decoration-underline ms-1 cursor-pointer" @click="clearSorting">{{$t('clear')}}</span> -->
      <div class="d-flex align-items-center mb-3 mb-md-0">
        <span style="font-weight: 100; margin: 0px 10px"
          >{{ totalItems }} result of
        </span>
        <InputSelect
          :options="rowOpt"
          displayKey="display"
          valueKey="value"
          :value.sync="rows_per_page"
          style="width: 5rem"
          @onChange="changeRow"
        ></InputSelect>
        <span class="text-s me-2" style="margin-left: 10px; font-weight: 100">{{
          $t("rows_per_page")
        }}</span>
      </div>
    </div>

    <div class="p-holder admin-pagination" v-if="totalPage > 0">
      <button class="p-btn p-prev" @click="previousPage()">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>
      <button
        class="p-btn"
        v-if="farFromStart"
        @click="toPage(1)"
        :class="{ active: value == 1 }"
      >
        1
      </button>
      <div class="p-dot" v-if="farFromStart">...</div>
      <button
        class="p-btn"
        v-for="n in range()"
        :key="n"
        @click="toPage(n)"
        :class="{ active: value == n }"
      >
        {{ n }}
      </button>
      <div class="p-dot" v-if="farFromEnd">...</div>
      <button
        class="p-btn"
        v-if="farFromEnd"
        @click="toPage(totalPage)"
        :class="{ active: value == totalPage }"
      >
        {{ totalPage }}
      </button>
      <button class="p-btn p-next" @click="nextPage()">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: [
    "totalPage",
    "value",
    "currentPageItems",
    "sorting",
    "totalItems",
    "onlyRight",
    "rowsPerPage",
    "makeCenter",
  ],
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      farFromStart: false,
      farFromEnd: false,
      min: 1,
      max: 1,
      rows_per_page: "",
      rowOpt: [
        {
          display: "10",
          value: 10,
        },
        {
          display: "25",
          value: 25,
        },
        {
          display: "50",
          value: 50,
        },
        {
          display: "100",
          value: 100,
        },
      ],
    };
  },
  computed: {
    showingItems() {
      if (!this.currentPageItems) {
        return "";
      }
      if (
        typeof this.currentPageItems.from == "number" &&
        typeof this.currentPageItems.to == "number"
      ) {
        return this.$t("showing_items", {
          from_to: `${this.currentPageItems.from} - ${this.currentPageItems.to}`,
          total: this.totalItems,
        });
      }
      return "";
    },
    sortingInfo() {
      return this.$t("sorting_by", {
        key: this.sorting.order_by,
        sort_order: this.$t(this.sorting.order_sort),
      });
    },
  },
  methods: {
    range() {
      var array = [],
        j = 0;
      for (var i = this.min; i <= this.max; i++) {
        array[j] = i;
        j++;
      }
      return array;
    },
    nextPage() {
      if (this.value + 1 <= this.totalPage)
        this.$emit("change", this.value + 1);
    },
    previousPage() {
      if (this.value - 1 > 0) this.$emit("change", this.value - 1);
    },
    toPage(p) {
      if (p != this.value) this.$emit("change", p);
    },
    render() {
      if (this.totalPage < 8) {
        this.min = 1;
        this.max = this.totalPage;
        this.farFromStart = false;
        this.farFromEnd = false;
        return;
      }

      if (this.totalPage - (this.value - 2) < 6) {
        this.min = this.totalPage - 4;
        this.max = this.totalPage;
        this.farFromStart = true;
        this.farFromEnd = false;
        return;
      }

      if (this.value < 4) {
        this.min = 1;
        this.max = 5;
        this.farFromStart = false;
        this.farFromEnd = true;
        return;
      }
      let min = this.value - 2;
      if (min <= 3) {
        min = 1;
      }
      let max = this.value + 2;
      if (this.totalPage - max < 3) {
        max = this.totalPage;
      }

      this.min = min;
      this.max = max;
      this.farFromStart = this.value > 5 ? true : false;
      this.farFromEnd = this.totalPage - this.value > 4 ? true : false;
    },
    clearSorting() {
      this.$emit("clearsort");
    },
    changeRow(val) {
      this.$emit("update:rowsPerPage", val);
      this.$emit("changeRow", val);
    },
  },
  mounted() {
    this.rows_per_page = this.rowsPerPage;
    this.render();
  },
  watch: {
    value() {
      this.render();
    },
    totalPage() {
      this.render();
    },
  },
};
</script>

<style scoped>
.paginationWrapper {
  margin: 1rem;
}

.p-holder {
  display: flex;
}
</style>
