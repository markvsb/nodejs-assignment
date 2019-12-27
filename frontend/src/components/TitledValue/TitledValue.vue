<template>
	<div>
		<h2>{{ this.title }}</h2>
		<div class="container">
			<div class="loading" v-if="this.value === null"></div>
		<div v-else>{{ this.value + '&nbsp;' + this.metric }}</div>
	</div>
</div>
</template>

<script>
export default {
	name:  'Bar',
	props: ['value', 'metric', 'title'],
	mounted () {},
}
</script>

<style scoped>
h2 {
  font-size: 12px;
  color:#666;
}
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
