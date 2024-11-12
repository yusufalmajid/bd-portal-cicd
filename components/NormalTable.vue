<template>
	<div>
		<ClientOnly>
			<!-- <div class="mb-3">
				<Pagination
					v-if="list && list.length"
					:totalPage="total_pages"
					:totalItems="total_items"
					:currentPageItems="current_page_items"
					v-model="page"
					@change="paginate"
					:onlyRight="true"
				></Pagination>
			</div> -->

			<div class="d-flex flex-md-row flex-column justify-content-between align-items-start align-items-md-center mt-md-4">
				<div><slot name="pageTitle"></slot></div>
				<div class="flex-grow-1 d-flex flex-wrap justify-content-end align-items-center tableBtn w-100 w-md-auto">
					<slot name="tableBtn"></slot>
				</div>
			</div>

			<div class="d-flex flex-wrap justify-content-start align-items-center">
				<slot name="tableSummary"></slot>
			</div>

			<div class="d-flex flex-wrap justify-content-start align-items-center">
				<slot name="tableSummary"></slot>
			</div>

			<div class="table-second-scroll-track" ref="secondScrollWrapper" @scroll.passive='handleScroll2'>
				<div class="table-second-scroll-width" ref="secondScroll"></div>
			</div>
			<div class="table-wrapper" ref="tableWrapper" @scroll.passive='handleScroll1'>
				<table class="table admin-table table-striped responsive" ref="table" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
					<thead v-if="customTh">
						<slot name="customTh"></slot>
					</thead>
					<thead v-else>
						<tr>
							<slot name="head"></slot>
						</tr>
					</thead>
					<tbody v-if="loaded">
						<template v-if="isMobile && $scopedSlots.mobileBody">
							<slot name="mobileBody" v-bind:rows="list"></slot>
						</template>
						<template v-else>
							<slot name="body" v-bind:rows="list"></slot>
						</template>
						<tr :class="{'expandable': expand}" v-if="!list || list.length < 1">
							<slot name="noResult">
								<td colspan="100" class="text-center p-3" :class="{'expand': expand}">
									{{ $t("no_data_available") }}
								</td>
							</slot>
						</tr>
						<slot v-else-if="!isMobile" name="grandTotal"></slot>
					</tbody>
					<tbody v-else>
						<tr :class="{'expandable': expand}">
							<td colspan="100" :class="{'expand': expand}">
								<Spinner class="spinner"></Spinner>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="mt-2">
				<Pagination
					v-if="list && list.length && showPagination"
					:totalPage="total_pages"
					:totalItems="total_items"
					:currentPageItems="current_page_items"
					:rowsPerPage="rows_per_page"
					v-model="page"
					@change="paginate"
					@changeRow="(e) => getData(1, e)"
				></Pagination>
			</div>
			<div class="tableDetail" v-if="![null, undefined, ''].includes(toggleDetail)">
				<div class="col-12">
					<div class="d-flex justify-content-start mx-3 mt-3">
						<div class="backBtn listDetail" @click="$emit('update:toggleDetail', null)">
							<fa :icon="['fas', 'chevron-circle-left']" size="3x"/>
						</div>
					</div>
					<div class="row">
						<div class="text-l26 bold-xl mx-3 mt-3">
							<slot name="detailTitle"></slot>
						</div>
					</div>
				</div>
				<div style="overflow-y: auto;">
					<table class="table admin-table responsive">
						<tbody>
							<slot name="body" v-bind:rows="list.slice().splice(toggleDetail, 1)"></slot>
						</tbody>
					</table>
				</div>
			</div>
			<!--  -->
		</ClientOnly>
	</div>
</template>

<script>
export default {
	name: "NormalTable",
	props: {
		loaded: {
			type: Boolean,
			default: false,
		},
		customTh: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Array,
			default() {
				return []
			},
		},
		showPagination: {
			type: Boolean,
			default: true,
		},
		pagination: {
			type: Object,
			default() {
				return {
					current_page: 1,
					last_page: 1,
					total: 0,
					from: 1,
					to: 1,
				}
			},
		},
		toggleDetail: {
			type: [Object, Number, Boolean],
			default() {
				return undefined
			},
		},
	},
	data() {
		return {
			page: 1,
			total_pages: 1,
			total_items: 0,
			current_page_items: {
				from: 1,
				to: 1,
			},
			rows_per_page: 10,
			expand: true,
			isMobile: false,
		};
	},
	methods: {
		mouseDown(e) {
            this.isMouseDown = true;

			if(this.$refs.tableWrapper) {

				this.pos = {
					// The current scroll
					left: this.$refs.tableWrapper.scrollLeft,
					top: this.$refs.tableWrapper.scrollTop,
					// Get the current mouse position
					x: e.clientX,
					y: e.clientY,
				};
				this.$refs.tableWrapper.style.removeProperty('user-select');

			}

            // this.$refs.tableWrapper.scrollLeft = 200;
            // console.log(this.$refs.tableWrapper.scrollLeft)

        },
        mouseMove(e) {
            if(this.isMouseDown) {

				if(this.$refs.tableWrapper) {
					this.$refs.tableWrapper.style.userSelect = 'none';
					
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

			if(this.$refs.tableWrapper) {
            	this.$refs.tableWrapper.style.removeProperty('user-select');
			}
        },
        mouseLeave() {
            this.isMouseDown = false;

			if(this.$refs.tableWrapper) {
            	this.$refs.tableWrapper.style.removeProperty('user-select');
			}
        },
		handleScroll1() {
			if(this.scrolling) {
				this.scrolling = false;
			return;
			}
			this.scrolling = true;
			this.$refs["secondScrollWrapper"].scrollLeft = this.$refs["tableWrapper"].scrollLeft;
		},
		handleScroll2() {
			if(this.scrolling) {
				this.scrolling = false;
				return;
			}
			this.scrolling = true;
			this.$refs["tableWrapper"].scrollLeft = this.$refs["secondScrollWrapper"].scrollLeft;
		},
		buildPagination() {
			this.page = Number(this.pagination?.current_page) || 1
			this.total_pages = Number(this.pagination?.last_page) || 1
			this.total_items = Number(this.pagination?.total) || 0
			this.current_page_items = {
				from: Number(this.pagination?.from) || 1,
				to: Number(this.pagination?.to) || 1,
			}
			this.rows_per_page = Number(this.pagination?.per_page) || 10
		},
		async paginate(page = 1) {
			await this.getData(page)
		},
		async getData(page = 1, rows = this.rows_per_page) {
			this.$emit('loadData', page, rows)
		},
		resizeHandler() {
			if (this.$refs["secondScroll"] && this.$refs["table"]) {
				this.$refs["secondScroll"].style.width = this.$refs["table"].clientWidth+"px";
			}
			let w = window.innerWidth
			this.isMobile = w < 450 ? true : false
		}
	},
	watch: {
		pagination: {
			handler() {
				this.buildPagination()
			},
			deep: true,
		},
	},
	async mounted() {
		this.buildPagination()
		this.resizeHandler()
		window.addEventListener('resize', this.resizeHandler)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeHandler)
	}
};
</script>
