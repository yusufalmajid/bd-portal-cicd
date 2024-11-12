<template>
	<div class="dropdown-switcher" @click="toggleLang()" ref="dropdownSwitcher">
		<div class="dropdown-label">
			<slot>
				<span class="text-uppercase">{{currentDisplay}}</span>
			</slot>
			<svg xmlns="http://www.w3.org/2000/svg" width="9.065" height="5.854" viewBox="0 0 9.065 5.854" v-if="arrow">
				<path d="M4.05,16.395.2,12.541a.677.677,0,0,1,0-.961l.64-.64a.677.677,0,0,1,.961,0l2.732,2.732L7.261,10.94a.677.677,0,0,1,.961,0l.64.64a.677.677,0,0,1,0,.961L5.008,16.395a.674.674,0,0,1-.958,0Z" transform="translate(0.004 -10.74)" fill="#707070"/>
			</svg>
		</div>
		<div class="dropdown-option-wrapper shadow-sm" :class="{'show': showDropdown}">
			<div v-for="(v, k) in options" :key="'option'+k" class="dropdown-option" :class="{'selected': selectedOptionValue == v[selectedOptionKey]}" :value="v[selectedOptionKey]" @click="$emit('dropdownSelect', v[selectedOptionKey])">
				{{v[optionDisplay]}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LangSelect',
	props: {
		arrow: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Array,
			required: true,
		},
		optionDisplay: {
			type: [String, Number],
			required: true,
		},
		selectedOptionKey: {
			type: [String, Number],
			required: true,
		},
		selectedOptionValue: {
			type: [String, Number],
			default: "",
		},
	},
	data() {
		return {
			showDropdown: false,
		}
	},
	computed: {
		currentDisplay() {
			const display = this.options.find(i => i[this.selectedOptionKey] == this.selectedOptionValue)
			if (display) {
				return display[this.optionDisplay] || ""
			}
			return ""
		}
	},
	methods: {
		toggleLang() {
			this.showDropdown = !this.showDropdown
		},
		checkClose(e) {
			if (this.$refs.dropdownSwitcher && !this.$refs.dropdownSwitcher.contains(e.target)) {
				this.showDropdown = false
			}
		}
	},
	beforeDestroy() {
		document.removeEventListener('click', this.checkClose)
	},
	mounted() {
		document.addEventListener('click', this.checkClose)
	}
}
</script>

<style scoped>
.dropdown-label {
	background-color: var(--bg-content);
	/* border: 1px solid #B5B5B5; */
	/* padding: 0.5rem 0.6rem; */
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* min-width: 100px; */
}

.dropdown-label span {
	flex-shrink: 0;
	/* margin-right: 0.6rem; */
}

.dropdown-switcher {
	cursor: pointer;
	position: relative;
	display: inline-block;
	text-align: left;
}

.dropdown-option-wrapper {
	position: absolute;
	top: 100%;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
	transform: translateY(-30px);
	z-index: 2;
	right: 0;
	background: var(--bg-content);
	width: 150px;
}

.dropdown-option-wrapper.show {
	opacity: 1;
	visibility: visible;
	transform: translateY(0)
}

.dropdown-option {
	padding: 15px;
	word-break: break-word;
}

.dropdown-option:hover {
	color: var(--primary);
}

.dropdown-option.selected {
	background: var(--bg-main);
	color: #fff;
}
</style>