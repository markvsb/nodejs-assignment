<template>
<div>
	<h2>{{ this.title }}</h2>
	<div class="loading" v-if="this.value === null"></div>
	<div v-else class="container">
		<div class="progress" v-bind:style="{ width: (this.value) + '%' }"><span>{{ this.value + '&nbsp;' + this.metric }}</span></div>
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
.loading {
	height:24px;
}
.container {
  background:#F3F3F3;
  position: relative;
  box-shadow: 3px 1px 8px rgba(0, 0, 0, 0.15) inset;
}
.container .progress {
  transition: all 0.1s;
  width: 0;
  color: #FFF;
  text-align: center;
  background: #00b700;
  background: linear-gradient(#00ca00, #00b700);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.15), 0 -2px 0 0 rgba(0,0,0,0.15) inset;
  height: 24px;
  text-shadow:0 1px 0 rgba(0,0,0,0.4);
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
}
.container .progress span {
  white-space: nowrap;
}
</style>
