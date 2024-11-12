<template>
    <th @click="sort" class="sort-head cursor-pointer" :class="order">
        <slot></slot>
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="10" fill="currentColor" viewBox="0 0 16 16" class="ms-2 sort-arrow">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" width="12" fill="#6e6e6e" class="bi bi-caret-down-fill sort-arrow" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
    </th>
</template>

<script>
export default {
    props: {
        sorter: Object,
        slug: String
    },
    computed: {
        order() {
            if (this.sorter.sortReq && this.sorter.sortReq.order_by == this.slug) {
                return this.sorter.sortReq.order_sort
            }
            return 'asc'
        }
    },
    methods: {
        sort() {
            if (this.slug && typeof this.sorter.sort == 'function') {
                this.sorter.sort(this.slug)
            }
        }
    }
}
</script>

<style scoped>
.sort-arrow {
    transition: all 0.3s;
}

.sort-head.desc .sort-arrow {
    transform: rotate(180deg);
}
</style>