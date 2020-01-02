<template>
	<div class="h1-with-icon"><i class="eva" v-bind:class="this.icon"></i><h1>{{ this.title }}</h1></div>
</template>

<script>
export default {
	name:  'Header',
	props: ['icon', 'title'],
}
</script>

<style scoped></style>
