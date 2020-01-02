<template>
	<div>
		<div class="h2-with-icon"><i class="eva" v-bind:class="this.icon"></i><h2>{{ this.title }}</h2></div>
		<div class="container">
			<div class="loading" v-if="this.value === null"></div>
		<div v-else>{{ this.value + '&nbsp;' + this.metric }}</div>
	</div>
</div>
</template>

<script>
export default {
	name:  'Bar',
	props: ['value', 'icon', 'metric', 'title'],
	mounted () {},
}
</script>

<style scoped>
.container {
  position: relative;
}
.container div {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
}
</style>
