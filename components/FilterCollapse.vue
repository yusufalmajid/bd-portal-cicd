<template>
	<div>
		<div class="d-flex justify-content-between align-items-center flex-wrap cursor-pointer" @click="toggle">
			<div class="text-l">{{ $t("filter") }}</div>
			<div :class="`fillterBoxArrow ${!trigger ? `close` : ``}`">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
				</svg>
			</div>
		</div>
		<div class="collapseBox" ref="collapse">
			<div ref="getbox" class="mt-3">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FillterCollapse",
	data() {
		return {
			trigger: true,
		};
	},
	methods: {
		toggle() {
			if (this.trigger) {
				this.trigger = false;
				this.$refs.collapse.style.maxHeight = "0px";
				this.$refs.collapse.style.overflow = "hidden";
			} else {
				let height = this.$refs.getbox.clientHeight + this.$refs.getbox.offsetTop;
				this.trigger = true;
				this.$refs.collapse.style.overflow = "unset";
				this.$refs.collapse.style.maxHeight = height + "px";
			}
		},
		setMaxHeight() {
			let height = this.$refs.getbox.clientHeight + this.$refs.getbox.offsetTop;
			this.$refs.collapse.style.maxHeight = height + "px";
		},
		resizeHandler() {
			if (this.trigger) {
				this.setMaxHeight()
			}
		}
	},
	mounted() {
		setTimeout(() => {
			this.setMaxHeight()
		}, 50);

		window.addEventListener('resize', this.resizeHandler)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeHandler)
	}
};
</script>

<style scoped>
.collapseBox {
	position: relative;
	transition: all 0.3s;
}
.fillterBoxArrow {
	cursor: pointer;
	position: relative;
	transition: all 0.3s;
	height: 18px;
	display: flex;
	align-content: center;
}
.fillterBoxArrow.close {
	transition: all 0.3s;
	transform: rotate(180deg);
}
</style>