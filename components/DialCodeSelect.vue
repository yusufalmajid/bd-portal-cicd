<template>
    <ClientOnly>
        <div class="vSelectWrapper dialCode">
            <v-select :options="options" v-model="selectedValue" :reduce="v => v.dial_code" :clearable="false" :disabled="options.length < 2" :searchable="searchable"  :placeholder="inputPlaceholder">
                <template v-slot:selected-option-container="{option}">
                    <div class="countryOption">
                        <!-- <span class="me-3"><country-flag :country='option.iso_code' size='normal'/> </span> -->
                        <span>+{{option.dial_code}}</span>
                    </div>
                </template>
                <template v-slot:option="option">
                    <div class="countryOption">
                        <!-- <span class="me-3"><country-flag :country='option.iso_code' size='normal'/> </span> -->
                        <span>+{{option.dial_code}}</span>
                    </div>
                </template>
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="var(--primary)" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                  </span>
                </template>
            </v-select>
        </div>
    </ClientOnly>
</template>

<script>
export default {
    name: 'DialCodeSelect',
    props: {
        inputPlaceholder: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        searchable: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            required: true,
        },
        value: {
            type: [String, Number],
            default: "",
        },
    },
    data() {
        return {
            selectedValue: '',
        }
    },
    computed: {
    },
    methods: {
    },
    watch: {
        value(newValue) {
            this.selectedValue = newValue
        },
        selectedValue(newValue) {
            this.$emit('update:value', newValue)
        },
    },
    beforeDestroy() {
    },
    mounted() {
        this.selectedValue = this.value
    },
}
</script>

<style lang="scss">
    .vSelectWrapper.dialCode {
        .vs__dropdown-menu {
            min-width: unset;
        }
    }
</style>