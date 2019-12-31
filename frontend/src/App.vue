<template>
  <div id="app" style="margin:25px auto 0; max-width:600px;">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
@import '~eva-icons/style/eva-icons.css';

html, body {
	padding: 0;
	margin: 0;
	background: #F3F3F3;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
	padding:10px 25px;
	background: #FFF;
	box-shadow: 0 5px 10px -5px rgba(0,0,0,0.5);
	border-radius: 2px;
}

h1 {
	font-size: 24px;
	color:#000;
	padding-left: 36px;
	border-bottom: 1px solid #CCC;
	padding-bottom: 10px;
}

h2 {
	font-size: 14px;
	color:#333;
}

.h1-with-icon > i {
	font-size: 26px;
	color: #555;
	position: absolute;
}

.h1-with-icon > h1 {
	padding-left:36px;
}

.h2-with-icon > i {
	font-size: 16px;
	color: green;
	position: absolute;
}
.h2-with-icon > h2 {
	padding-left:22px;
}

h3 {
	margin: 40px 0 0;
}

.margin-default {
	margin-top:20px;
}

.loading {
	background: linear-gradient(115deg, rgb(250,250,250) 30%, rgb(200,200,200) 50%, rgb(250,250,250) 70%);
	background-size: 400% 400%;
	animation: animatedbg 1.5s ease infinite;
	filter:grayscale(90%)
}

@keyframes animatedbg {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
