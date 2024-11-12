<template>
  <div class="rowExpandWrapper" :class="{ open: toggle }">
    <tr>
      <slot name="row" :toggle="toggle"></slot>
      <td class="no-header actionTD">
        <div class="expanbBtnWrapper">
          <slot name="actionBtn"></slot>
          <div @click="toggle = !toggle">
            <slot name="expandBtn" :toggle="toggle"></slot>
          </div>
        </div>
      </td>
    </tr>
    <tr class="trExpand" v-if="toggle">
      <td colspan="100">
        <div class="d-md-none">
          <span
            class="color-primary-dark cursor-pointer me-2"
            @click="toggle = !toggle"
          >
            <i class="bi bi-chevron-left"></i>
          </span>
          <span class="text-l">{{ $t("details") }}</span>
        </div>
        <div>
          <table class="table expandedTable mb-0">
            <slot name="expandedData" :closeExpand="() => {toggle = false}"></slot>
            <!-- <thead>
                            <tr>
                                <slot name="expandedHead"></slot>
                            </tr>
                        </thead>
                        <tbody>
                            <slot name="expandedRow"></slot>
                        </tbody> -->
          </table>
        </div>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  props: [""],
  name: "TrExpand",
  data() {
    return {
      toggle: false,
    };
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
// .tblExpandArrow {
//     cursor: pointer;
//     transition: all .3s;
//     color: #FFF;
//     background: #1C86C6;
//     padding: 0.9em;
//     border-radius: 5px;
//     line-height: 1;
//     text-align: center;
//     display: inline-block;
//     height: 35px;

//     &:hover {
//         background: var(--primary-dark);
//     }

//     &.active {
//         background: var(--secondary)
//     }
// }

.tblDetailTitle {
  text-align: left;
  padding: 1.5rem 0 1rem 0;
  font-size: 1.6rem;
  font-weight: 600;
  background: var(--bg-body);
  position: sticky;
  top: 0;
  z-index: 1;
}

.expanbBtnWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin: -0.25rem -0.25rem 0 -0.25rem;

  > * {
    margin: 0.25rem 0.25rem 0 0.25rem;
  }

  @media (max-width: 767px) {
    justify-content: flex-end;
  }
}

.table.expandedTable {
  th,
  td {
    padding: 1rem;
  }

  tr {
    border: none;
    border-top: 1px solid var(--border);
  }

  th,
  td {
    border: none;
  }

  tbody {
    tr:first-child {
      border: none;
    }
  }

  thead {
    th {
      color: var(--primary);
    }
  }

  .expend-wrap {
    position: relative;

    &:has(.expend-box):not(:last-child) {
      .expend-box:last-child {
        @media (min-width: 768px) {
          &::before {
            content: "";
            position: absolute;
            border-right: 1px solid #d2f3ff;
            width: 0;
            height: 100%;
            top: 0;
            right: calc(calc(1.5rem / 2) - 0.5rem);
          }
        }
      }
    }

    .expand-detail-title {
      color: #196240;
      position: relative;
      display: flex;
      // flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      word-break: break-word;
      white-space: normal;

      &::after {
        content: "";
        position: relative;
        width: auto;
        height: 0;
        border-bottom: 1px solid #d2f3ff;
        flex-grow: 1;
        margin-left: 1rem;
      }
    }

    .expend-box {
      position: relative;
      padding: 0.25rem 0.85rem;

      @media (max-width: 767px) {
        padding-top: 0;
        padding-bottom: 0;
      }

      &:not(:last-child) {
        @media (min-width: 768px) {
          &::before {
            content: "";
            position: absolute;
            border-right: 1px solid #d2f3ff;
            width: 0;
            height: 100%;
            top: 0;
            right: 0;
          }
        }
      }

      .expend-detail {
        color: var(--primary-dark);
        margin-bottom: 0.25rem;
      }
    }
  }

  @media (max-width: 767px) {
    border-collapse: separate;
    border-spacing: 0 20px;

    tbody {
      tr {
        td:not(.no-data),
        th:not(.no-data) {
          grid-template-columns: 100%;
          text-align: left !important;

          &:not(.no-header)::before {
            color: var(--primary);
          }
        }
      }
    }
  }
}
</style>
