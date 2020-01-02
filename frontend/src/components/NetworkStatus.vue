<template>
	<div>
		<div class="nw-status" v-bind:class="this.status ? 'online' : 'offline'">
			{{ this.status ? 'online' : 'offline' }}
		</div>
	</div>
</template>

<script>
export default {
	name:  'Bar',
	props: ['status'],
}
</script>

<style scoped>
.nw-status {
	font-size: 13px;
	font-weight: bold;
	color:#555;
	position: relative;
}
.nw-status:before {
	content:"";
	border-radius: 50%;
	position: absolute;
	width: 7px;
	height: 7px;
	border: 2px solid #FFF;
	background: #999;
	box-shadow: 0 0 0 1px #999;
	left: -18px;
	top:2px;
}
.nw-status.online:before {
	background: rgb(109, 204, 24);
	box-shadow: 0 0 0 1px rgb(109, 204, 24);
}
</style>
