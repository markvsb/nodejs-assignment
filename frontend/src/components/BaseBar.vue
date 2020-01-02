<template>
<div>
	<div class="h2-with-icon"><i class="eva" v-bind:class="this.icon"></i><h2>{{ this.title }}</h2></div>
	<div class="loading" v-if="this.value === null"></div>
	<div v-else class="container">
		<div class="progress" v-bind:style="{ width: (this.value) + '%' }">
      <span>{{ this.value + '&nbsp;' + this.metric }}</span>
    </div>
	</div>
</div>
</template>

<script>
export default {
	name:  'Bar',
	props: ['value', 'icon', 'metric', 'title'],
}
</script>

<style scoped>
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
  text-shadow:0 1px 2px rgba(0,0,0,0.4);
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
}
.container .progress span {
  white-space: nowrap;
  padding:0 4px;
}
</style>
