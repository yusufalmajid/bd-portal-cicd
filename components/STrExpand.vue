<template>
    <tr class="expandable" :class="{'open': opened}" ref="row">
        <slot></slot>
        <td class="expand cursor-pointer d-block d-md-none" :class="{'open': opened}" @click="toggle" v-if="childCount > 5">
            <svg xmlns='http://www.w3.org/2000/svg' width="16" height="16" viewBox='0 0 16 16' class="mx-auto">
                <path fill-rule='evenodd' stroke='currentColor' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/>
            </svg>
        </td>
    </tr>
</template>

<script>
export default {
    name: "StrExpand",
    data() {
        return {
            childCount: 0,
            opened: false,
        }
    },
    methods: {
        toggle() {
            this.opened = !this.opened
        },
    },
    mounted() {
        this.childCount = this.$refs.row?.children.length || 0
    },
}
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
    .expandable {
        th, td {
            display: none !important;
        }

        th:nth-child(-n + 4), th:last-child,
        td:nth-child(-n + 4), td:last-child {
            display: grid !important;
        }

        &.open {
            th, td {
                display: grid !important;
            }
        }
    }

    .expand {
        svg {
            transition: all 0.3s;
        }

        &.open {
            svg {
                transform: rotate(180deg);
            }
        }
    }
}
</style>