<template>
  <div class="card">
    <ClientOnly>
      <div v-if="hasFilter">
        <SFilter
          :header="SFilterHeader"
          :filterButton="SFilterFilterButton"
          :buttonClass="SFilterButtonClass"
          :mobileHide="SFilterMobileHide"
          :defaultFilterToggle="SFilterDefaultFilterToggle"
          :smallFilterBox="SFilterSmallFilterBox"
          :disableSearch="SFilterDisableSearch"
          :hasExportButton="SFilterHasExportButton"
          @search="$emit('search')"
          @reset="$emit('reset')"
          @export="$emit('export')"
          @clickBulkButton="$emit('clickBulkButton')"
          @clickButton="$emit('clickButton')"
          :includeAddAction="includeAddAction"
          :includeBulkAction="includeBulkAction"
          :includeAddRole="includeAddRole"
        >
          <template v-slot:pageTitle>
            <slot name="pageTitle"></slot>
          </template>
          <template>
            <slot name="filterBody"></slot>
          </template>
          <template v-slot:tableBtn>
            <slot name="tableBtn"></slot>
          </template>
        </SFilter>
      </div>
      <div
        class="d-flex flex-md-row flex-column justify-content-between align-items-start align-items-md-center mt-md-4"
        v-else-if="
          this.$slots.pageTitle ||
          this.$slots.tableBtn ||
          ($checkPerm('perm-export-list') &&
            (export_data || report == 'customReport'))
        "
      >
        <div><slot name="pageTitle"></slot></div>
        <div
          class="flex-grow-1 d-flex flex-wrap justify-content-end align-items-center tableBtn w-100 w-md-auto"
        >
          <template v-if="$checkPerm('perm-export-list')">
            <!-- <button
              v-if="export_data || report == 'customReport'"
              type="button"
              :disabled="!loaded || !hasData || exporting"
              class="button export filter"
              @click="exportToCSV(1)"
            >
              <fa :icon="['fas', 'file-csv']" />
              <span class="d-none d-md-inline ms-1">{{ $t("export") }}</span>
            </button> -->
          </template>
          <slot name="tableBtn"></slot>
        </div>
      </div>

      <div class="d-flex flex-wrap justify-content-start align-items-center">
        <slot name="tableSummary"></slot>
      </div>

      <!-- <div class="table-second-scroll-track" ref="secondScrollWrapper" @scroll.passive='handleScroll2'>
				<div class="table-second-scroll-width" ref="secondScroll"></div>
			</div> -->

      <div
        class="table-wrapper mt-0"
        ref="tableWrapper"
        @scroll.passive="handleScroll1"
      >
        <table
          class="table admin-table table-striped responsive"
          ref="table"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="mouseUp"
          @mouseleave="mouseLeave"
          :class="{ rowExpandable: isRowExpandable }"
        >
          <!-- <table class="table admin-table table-striped responsive" ref="table" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave"> -->
          <thead v-if="customTh">
            <slot
              name="customTh"
              v-bind:sort="sort"
              v-bind:sortReq="sortReq"
            ></slot>
          </thead>
          <thead v-else>
            <tr>
              <slot
                name="head"
                v-bind:sort="sort"
                v-bind:sortReq="sortReq"
              ></slot>
            </tr>
          </thead>
          <tbody v-if="loaded">
            <template v-if="isMobile && $scopedSlots.mobileBody">
              <slot name="mobileBody" v-bind:rows="pages[page]"></slot>
            </template>
            <template v-else>
              <slot name="body" v-bind:rows="pages[page]"></slot>
            </template>
            <tr
              :class="{ expandable: expand }"
              v-if="!pages[page] || pages[page].length < 1"
            >
              <td
                colspan="100"
                class="text-center p-3 no-data"
                :class="{ expand: expand }"
              >
                {{ $t("no_data_available") }}
              </td>
            </tr>
            <slot v-else-if="!isMobile" name="grandTotal"></slot>
          </tbody>
          <!-- <tbody v-if="loaded">
						<slot name="body" v-bind:rows="pages[page]"></slot>
						<tr v-if="pages[page].length < 1">
							<td colspan="100" class="text-center p-3">
								{{ $t("no_data_available") }}
							</td>
						</tr>
					</tbody> -->
          <tbody v-else>
            <tr :class="{ expandable: expand }">
              <td colspan="100" :class="{ expand: expand }">
                <Spinner class="spinner"></Spinner>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3">
        <Pagination
          v-if="hasData && !hidePagination"
          :totalPage="total_pages"
          :totalItems="total_items"
          :currentPageItems="current_page_items"
          v-model="page"
          :sorting="sortReq"
          @change="paginate"
          @clearsort="sort()"
          :rowsPerPage.sync="rows_per_page"
          @changeRow="getData"
        ></Pagination>
      </div>
      <div class="tableDetail" v-if="toggleDetail != null">
        <div class="col-12">
          <div class="d-flex justify-content-start mx-3 mt-3">
            <div
              class="backBtn listDetail"
              @click="$emit('update:toggleDetail', null)"
            >
              <fa :icon="['fas', 'chevron-circle-left']" size="3x" />
            </div>
          </div>
          <div class="row">
            <div class="text-l26 bold-xl mx-3 mt-3">
              <slot name="detailTitle"></slot>
            </div>
          </div>
        </div>
        <div style="overflow-y: auto">
          <table class="table admin-table responsive">
            <tbody>
              <slot
                name="body"
                v-bind:rows="pages[page].slice().splice(toggleDetail, 1)"
              ></slot>
            </tbody>
          </table>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: "STable",
  // props: ["api", "payload", "customTh", "exportSetting", "exportName", "flag", "report", "customHeader", "expand"],
  // props: ["api", "payload", "customTh", "export_data", "exportName", "flag", "report", "customHeader", "hidePagination", "hasFilter"],
  props: {
    api: {
      type: String,
      default: "",
    },
    payload: {
      type: Object,
      default() {
        return {};
      },
    },
    customTh: {
      type: Boolean,
      default: false,
    },
    export_data: {
      type: Object,
      default() {
        return undefined;
      },
    },
    exportName: {
      type: String,
      default: "",
    },
    flag: {
      type: String,
      default: undefined,
    },
    report: {
      type: String,
      default: undefined,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    hasFilter: {
      type: Boolean,
      default: true,
    },
    toggleDetail: {
      type: [Object, Number, Boolean],
      default() {
        return undefined;
      },
    },
    refreshKey: {
      type: Number,
      default: 0,
    },
    SFilterHeader: {
      type: Boolean,
      default: undefined,
    },
    SFilterFilterButton: {
      type: Boolean,
      default: undefined,
    },
    SFilterButtonClass: {
      type: [String, Object],
      default: undefined,
    },
    SFilterMobileHide: {
      type: Boolean,
      default: undefined,
    },
    SFilterDefaultFilterToggle: {
      type: Boolean,
      default: undefined,
    },
    SFilterSmallFilterBox: {
      type: Boolean,
      default: undefined,
    },
    SFilterDisableSearch: {
      type: Boolean,
      default: undefined,
    },
    isRowExpandable: {
      type: Boolean,
      default: false,
    },
    SFilterHasExportButton: {
      type: Boolean,
      default: false,
    },
    includeAddAction: {
      type: Boolean,
      default: false,
    },
    includeBulkAction: {
      type: Boolean,
      default: false,
    },
    includeAddRole: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1,
      pages: [],
      total_pages: 1,
      total_items: 0,
      current_page_items: {},
      rows_per_page: 10,
      loaded: false,
      sorts: {},
      hasData: true,
      previousRequest: {},
      sortReq: {},
      exporting: false,
      exportingModal: false,
      expand: true,
      isMobile: false,
    };
  },
  methods: {
    mouseDown(e) {
      this.isMouseDown = true;

      if (this.$refs.tableWrapper) {
        this.pos = {
          // The current scroll
          left: this.$refs.tableWrapper.scrollLeft,
          top: this.$refs.tableWrapper.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };
        this.$refs.tableWrapper.style.removeProperty("user-select");
      }

      // this.$refs.tableWrapper.scrollLeft = 200;
      // console.log(this.$refs.tableWrapper.scrollLeft)
    },
    mouseMove(e) {
      if (this.isMouseDown) {
        if (this.$refs.tableWrapper) {
          this.$refs.tableWrapper.style.userSelect = "none";

          const dx = e.clientX - this.pos.x;
          const dy = e.clientY - this.pos.y;

          // Scroll the element
          this.$refs.tableWrapper.scrollTop = this.pos.top - dy;
          this.$refs.tableWrapper.scrollLeft = this.pos.left - dx;

          window.getSelection().removeAllRanges();
        }
      }
    },
    mouseUp() {
      this.isMouseDown = false;

      if (this.$refs.tableWrapper) {
        this.$refs.tableWrapper.style.removeProperty("user-select");
      }
    },
    mouseLeave() {
      this.isMouseDown = false;

      if (this.$refs.tableWrapper) {
        this.$refs.tableWrapper.style.removeProperty("user-select");
      }
    },
    handleScroll1() {
      if (this.scrolling) {
        this.scrolling = false;
        return;
      }
      this.scrolling = true;
      if (this.$refs["secondScrollWrapper"])
        this.$refs["secondScrollWrapper"].scrollLeft =
          this.$refs["tableWrapper"].scrollLeft;
    },
    handleScroll2() {
      if (this.scrolling) {
        this.scrolling = false;
        return;
      }
      this.scrolling = true;
      if (this.$refs["secondScrollWrapper"])
        this.$refs["tableWrapper"].scrollLeft =
          this.$refs["secondScrollWrapper"].scrollLeft;
    },
    sort(key) {
      // sorting thru api, this will clear all data and back to page 1
      this.page = 1;
      this.loaded = false;
      this.pages = [];
      this.previousRequest = {};
      if (key) {
        let newSorting = {
          order_by: key,
          order_sort:
            this.sortReq.order_by == key
              ? this.sortReq.order_sort == "asc"
                ? "desc"
                : "asc"
              : "desc",
        };
        this.sortReq = newSorting;
      } else {
        this.sortReq = {};
      }

      this.getData();

      // sorting locally on the same page//
      /*  this.loaded = false
            if (this.sorts[key] == 1) {
                this.pages[this.page].sort((a, b) => (a[key] < b[key]) ? 1 : -1)
                this.sorts[key] = -1
            }
            else {
                this.pages[this.page].sort((a, b) => (a[key] > b[key]) ? 1 : -1)
                this.sorts[key] = 1
            }
            this.loaded = true */
    },
    async paginate(e) {
      // if (!this.pages[this.page]) {
      await this.getData();
      // }
      this.emitEvent();
    },
    async getData(force, page = this.page) {
      this.page = page;

      // copy object, because we cannot modify prop
      let reqPayload = {};
      reqPayload.page = page;
      reqPayload.limit = this.rows_per_page;
      Object.keys(this.payload).forEach((v, k) => {
        if (this.payload[v] || this.payload[v] == 0) {
          if (String(this.payload[v]) != "") reqPayload[v] = this.payload[v];
        }
      });
      if (this.sortReq.order_by && this.sortReq.order_sort) {
        // reqPayload.sort = `${this.sortReq.order_by},${this.sortReq.order_sort}`
        reqPayload.order_sort = this.sortReq.order_sort;
        reqPayload.order_by = this.sortReq.order_by;
      }

      // don't request if payload is same as before
      if (!force) {
        let hasDifference = false;
        for (let k in reqPayload) {
          if (this.previousRequest[k] != reqPayload[k]) hasDifference = true;
        }
        for (let o in this.previousRequest) {
          if (this.previousRequest[o] != reqPayload[o]) hasDifference = true;
        }
        if (!hasDifference) return;
      }

      this.previousRequest = reqPayload;
      this.loaded = false;
      const d = await this.$api(this.api, reqPayload);
      var pagination = null;
      if (!this.hidePagination) {
        if (this.flag) {
          pagination =
            d.pagination ||
            d[this.flag]?.pagination ||
            d.data[this.flag]?.pagination
              ? d.pagination ||
                d[this.flag]?.pagination ||
                d.data[this.flag]?.pagination
              : null;
        } else {
          pagination =
            d.pagination || d.data?.pagination
              ? d.pagination || d.data?.pagination
              : null;
        }
      }
      if (d.success && !d.error) {
        this.$emit("getData", d);
      }
      if (d.success && (this.hidePagination || pagination)) {
        if (pagination) {
          this.total_pages = pagination.last_page;
          this.total_items = pagination.total;
          this.current_page_items = {
            from: pagination.from,
            to: pagination.to,
          };
        }

        let dataList = [];
        if (this.flag) {
          dataList = d.list || d[this.flag]?.list || d.data[this.flag]?.list;
        } else {
          dataList = d.list || d.data.list;
        }

        this.pages[this.page] = dataList;
        this.loaded = true;
        // if totally no data, hide pagination
        if (this.page == 1 && this.pages[1]?.length < 1) {
          this.hasData = false;
          return;
        }
        this.hasData = true;
        this.$nextTick(() => {
          this.resizeHandler();
        });
        return;
      }

      // handle error here
      // this.$toast(false, d.message)
      if (d.error) this.$formatError(d.error, true);
      this.loaded = true;
    },
    emitEvent() {
      //Emit event
      this.$emit("update", {
        currentPage: this.page,
        pageData: this.pages,
        totalPage: this.total_pages,
      });
    },
    resizeHandler() {
      if (this.$refs["secondScroll"] && this.$refs["table"]) {
        this.$refs["secondScroll"].style.width =
          this.$refs["table"].clientWidth + "px";
      }
      let w = window.innerWidth;
      this.isMobile = w < 450 ? true : false;
    },
    async exportToCSV(exportTrue) {
      this.exporting = true;
      let export_data = this.export_data || undefined;

      let reqPayload = {
        see_all: 1,
        export_data: export_data,
        list_key: "list",
        file_name: this.exportName,
        export: exportTrue,
      };

      reqPayload.page = this.page;
      Object.keys(this.payload).forEach((v, k) => {
        if (this.payload[v] || this.payload[v] == 0) {
          if (String(this.payload[v]) != "") reqPayload[v] = this.payload[v];
        }
      });
      const d = await this.$api(this.api, reqPayload);
      this.exporting = false;

      // handle error here
      if (d.success && !d.error) {
        this.$toast(true, d.message);
        this.$store.commit("updateLoader", true);
        setTimeout(() => {
          this.$store.commit("updateLoader", false);
          this.$router.push("/export-list");
        }, [5000]);
      } else {
        this.$toast(false, d.message);
      }
    },
    async call(force) {
      if (!this.api) return;
      await this.getData(force, 1);
      this.emitEvent();
    },
  },
  watch: {
    refreshKey() {
      this.call(1);
    },
  },
  async mounted() {
    await this.call();
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>
