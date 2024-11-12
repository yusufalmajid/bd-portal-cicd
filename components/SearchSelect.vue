<template>
	<div class="yk-select-box" :class="{'yk-select-opened': open}">
		<input class="o-input select" :class="inputClass" ref="select" :value="displayText" @input="inputHandler" :disabled="disabled" :placeholder="placeholder">
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: [String, Number]
		},
		inputClass: String,
		optionsClass: String,
		api: String,
		searchStart: {
			type: Number,
			default: 1,
		},
		searchKey: String,
		setDisplay: String,
		setValue: {
			type: String,
			default: 'id',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		params: Object,
		defaultDisplay: {
			type: [String, Number]
		},
		searchWhenEmpty: {
			type: Boolean,
			default: false,
		},
        placeholder: {
            type: String
        },
        inputKey: {
            type: Number,
            default: 0
        }
	},
	data() {
		return {
			options: [],
			optionsWrapper: null,
			open: false,
			toggling: false,
			yPos: 'bottom',
			input: '',
			countdownTimer: -1,
			countdownRunner: null,
		}
	},
	computed: {
		displayText() {
			const selectedOption = this.options.find(o => o.id == this.value)
			if (selectedOption && !this.open) {
				return selectedOption[this.setDisplay] || selectedOption[this.searchKey] || ""
			}
			return this.input || ""
		}
	},
	methods: {
		posDropdown(isResize) {
			const selectRect = this.$refs.select.getBoundingClientRect()
			const optionsRect = this.optionsWrapper.getBoundingClientRect()
			const newStyle = {
				position: 'absolute',
				width: selectRect.width + 'px'
			}

			if (selectRect.x + (optionsRect.width / 2) < window.innerWidth) { // have space on right
				newStyle.left = `${selectRect.left}px`
			}
			else {
				newStyle.right = `${selectRect.right}px`
			}

			if (selectRect.bottom + optionsRect.height < window.innerHeight || selectRect.y - optionsRect.height < 0) { // have space on bottom
				newStyle.top = `${selectRect.bottom + window.scrollY - 2}px`
				if (!isResize) newStyle.transform = 'translateY(-25px)'
				this.yPos = 'bottom'
				
			}
			else {
				newStyle.top = `${selectRect.y - optionsRect.height + window.scrollY - 2}px`
				if (!isResize) newStyle.transform = 'translateY(25px)'
				this.yPos = 'top'
			}

			Object.assign(this.optionsWrapper.style, newStyle)
		},
		clearInput() {
			this.input = ''
			this.$emit('input', '')
			this.closeSelections()
		},
		selectOption(val) {
			if (this.toggling) return
			this.$emit('input', val)
			this.closeSelections()
		},
		openSelections() {
		   if (this.optionsWrapper || this.toggling) return
		  
			this.open = true
			this.optionsWrapper = document.createElement('div')
			if (window.innerWidth < 768) {
				this.toggling = true
				this.optionsWrapper.classList.add('yk-select-backdrop')
				this.optionsWrapper.innerHTML = `
					<div class="yk-select-options-container ${this.optionsClass ? this.optionsClass : ''}">
						<div class="yk-select-body"></div>
					</div>
				`

				const container = this.optionsWrapper.querySelector('.yk-select-body')
				this.options.forEach(o => {
					let opt = document.createElement('div')
					opt.classList.add('yk-select-option-sm')
					// if (o[this.setValue] == this.value) opt.classList.add('selected')
					opt.innerHTML = o[this.setDisplay] || o[this.searchKey] || ""
					opt.onclick = () => this.selectOption(o[this.setValue])
					container.appendChild(opt)
				})

				document.body.appendChild(this.optionsWrapper)
				setTimeout(() => {
					Object.assign(this.optionsWrapper.style, {
						transition: 'opacity 0.3s',
						visibility: 'visible',
						opacity: '1',
					})
					this.toggling = false
				}, 50)
			}
			else {
				this.optionsWrapper.classList.add('yk-select-options-wrapper')
				if (this.optionsClass) {
					this.optionsWrapper.classList.add(this.optionsClass)
				}
				const innerContainer = document.createElement('div')
				innerContainer.classList.add('yk-options-inner-container')
				this.optionsWrapper.appendChild(innerContainer)
				this.options.forEach(o => {
					let opt = document.createElement('div')
					opt.classList.add('yk-select-option')
					// if (o[this.setValue] == this.value) opt.classList.add('selected')
					opt.innerHTML = o[this.setDisplay] || o[this.searchKey] || ""
					opt.onclick = () => this.selectOption(o[this.setValue])
					innerContainer.appendChild(opt)
				})

				document.body.appendChild(this.optionsWrapper)
				this.posDropdown()
				setTimeout(() => {
					Object.assign(this.optionsWrapper.style, {
						// transition: 'all 0.3s',
						visibility: 'visible',
						opacity: '1',
						transform: `translateY(0)`
					})
					this.posDropdown(true)
					this.toggling = false
				}, 50)
			}
		},
		closeSelections() {
			if (!this.optionsWrapper || this.toggling) return
			this.toggling = true
			this.open = false
			Object.assign(this.optionsWrapper.style, {
				visibility: 'hidden',
				opacity: '0',
				transform: this.yPos == 'bottom' ? `translateY(-25px)` : `translateY(25px)`
			})
			// setTimeout(() => {
				this.optionsWrapper.remove()
				this.optionsWrapper = null
				this.toggling = false
			// }, 350)
		},
		async inputHandler(e) {
			this.$emit('input', '')
			this.input = e.target.value
			
			this.options = []
			this.closeSelections()
			if (!this.searchWhenEmpty && this.input.length == 0 && this.input.length < this.searchStart) return
			if (!this.api || !this.searchKey || this.input.length < this.searchStart) return

			this.startTimer()
		},
		startTimer() {
			if (this.countdownRunner) {
				this.clearTimer()
			}
			this.countdownTimer = 150
			this.countdownRunner = setInterval(() => {
				--this.countdownTimer
			}, 1)
		},
		clearTimer() {
			clearInterval(this.countdownRunner)
			this.countdownTimer = -1
		},
		async search() {
			let searchParams = { ...this.params, limit: 1000 }
			if (this.input != "") searchParams[this.searchKey] = this.input
			const d = await this.$api(this.api, searchParams)
			if (d.success && d.data && d.data?.list.length) {
				this.options = d.data?.list
				this.openSelections()
			} else {
				this.options = []
			}
		},
		clickHander(e) {
			if (this.toggling) return
			if (this.$refs.select.contains(e.target)) {
				this.options.length ? this.openSelections() : this.closeSelections()
			} else {
				this.closeSelections()
			}
		},
		windowResize() {
			if (this.optionsWrapper?.classList.contains('yk-select-options-wrapper')) {
				this.posDropdown(true)
			}
		},
	},
	watch: {
		defaultDisplay(value) {
			this.input = value
		},
		countdownTimer(value) {
			if (value == 0) {
				this.clearTimer()
				this.search()
			}
		},
        inputKey(value) {
            this.clearInput()
        }
	},
	mounted() {
		// document.addEventListener('click', this.clickHander)
		window.addEventListener('resize', this.windowResize)
		window.addEventListener('wheel', this.windowResize)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.windowResize)
		window.removeEventListener('wheel', this.windowResize)
		// document.removeEventListener('click', this.clickHander)
		if (this.optionsWrapper) this.optionsWrapper.remove()
		this.optionsWrapper = null
	}
   
}
</script>

<style lang="scss">
.yk-select-box {
	position: relative;
}
@media screen and (min-width: 768px) {
	.yk-select-box.yk-select-opened .o-input.select {
		border-bottom-color: transparent;
		border-radius: var(--o-border-radius) var(--o-border-radius) 0 0;
	}
}

.o-display-text {
	display: flex;
	align-items: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-right: 0.5rem;
	img {
		height: 1.6rem;
		margin-right: 1rem;
	}
}

.yk-select-backdrop {
	position: fixed;
	opacity: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	visibility: hidden;
	transition: all 0.3s;
	background-color: #00000066;
	top: 0;
	left: 0;
	padding: 1.5rem;
	z-index: 3000;
	&.show {
		opacity: 1;
		visibility: visible;
	}
}

.yk-select-options-wrapper {
	visibility: hidden;
	position: absolute;
	top: calc(100% - 2px);
	width: 100%;
	display: inline-block;
	background: #FFF;
	border-top: var(--o-text-highlight);
	z-index: 9000;
	border-radius: var(--o-select-options-radius);
	border: 1px solid var(--border);
	overflow: hidden;
	border-radius: 0px 0px var(--o-border-radius) var(--o-border-radius);
	border-top: 0;
}

.yk-options-inner-container {
	height: 100%;
	overflow: auto;
	max-height: calc(100vh - 20rem);
	// min-height: 200px;
}

.yk-options-inner-container::-webkit-scrollbar-thumb {
	width: 8px;
	background-color: var(--border);
	border-radius: 5px;
}

.yk-options-inner-container::-webkit-scrollbar {
	width: 8px;
}

.yk-select-option {
	padding: var(--o-padding);
	color: var(--o-text);
	cursor: pointer;
	text-align: left;
	display: flex;
	align-items: center;

	&:hover:not(.selected) {
		color: var(--o-bg-highlight);
		// background-color: var(--o-bg-hover);
	}
	&.selected {
		background-color: var(--o-bg-highlight);
		color: var(--o-text-highlight);
		// color: rgb(53, 131, 53);
	}
	&:first-child {
		border-top-left-radius: var(--o-select-options-radius);
		border-top-right-radius: var(--o-select-options-radius);
	}
	&:last-child {
		border-bottom-left-radius: var(--o-select-options-radius);
		border-bottom-right-radius: var(--o-select-options-radius);
	}
	img {
		height: 1.6rem;
		margin-right: 1rem;
	}
}

.yk-select-options-container {
	border-radius: var(--o-border-radius);
	width: 100%;
	max-height: 100%;
	max-width: 450px;
	overflow: hidden;
	background: #FFF ;
}

.yk-select-header {
	padding: var(--o-padding);
	background-color: var(--o-bg);
	color: var(--o-text);
	border-radius: 8px 8px 0 0;
	border-bottom: 1px solid var(--o-text-highlight);
}

.yk-select-body {
	max-height: calc(100% - 40px);
	overflow: auto;
}

.yk-select-option-sm {
	// padding: 0.5rem 2.25rem 0.5rem 0.5rem;
	// background: var(--o-bg);
	padding: var(--o-padding);
	position: relative;
	display: flex;
	align-items: center;

	&.selected {
		background-color: var(--o-bg-highlight);
		color: var(--o-text-highlight);
		&::after {
			content: "";
			position: absolute;
			right: 0.5rem;
			width: 1.25rem;
			height: 1.25rem;
			top: 50%;
			transform: translateY(-50%);
			background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 16 16'%3e%3cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3e%3c/svg%3e");
			
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}

	img {
		height: 1.6rem;
		margin-right: 1rem;
	}
}
</style>