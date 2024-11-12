<template>
	<div></div>
</template>

<script>
export default {
	middleware: ['auth'],
	layout: 'app',
	name: 'Redirect',
	data() {
		return { }
	},
	methods: {
		redirectPage() {
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.redirectPage()
		})
	},
}
</script>

<style scoped lang="scss">
</style>