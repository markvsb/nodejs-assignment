<template>
  <div>
    <h2>{{ this.title }}</h2>
    <div class="container">
      <div v-bind:style="{ width: (this.value || 0) + '%' }"><span>{{ this.value }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: ['value', 'title'],
  mounted () {}
}
</script>

<style scoped>
h2 {
  font-size: 12px;
  color:#666;
}
.container {
  transition: all 1s;
  background:#F3F3F3;
  position: relative;
  box-shadow: 3px 1px 8px rgba(0, 0, 0, 0.15) inset;
}
.container div {
  width: 0;
  color: #FFF;
  background: green;
  height: 24px;
  line-height: 24px;
}
</style>
