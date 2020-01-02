<template>
	<div>
		<div class="h2-with-icon"><i class="eva" v-bind:class="this.icon"></i><h2>{{ this.title }}</h2></div>
		<div style="height: 200px;">
			<canvas ref="myLine"></canvas>
		</div>
	</div>
</template>

<script>
import Chart from 'chart.js'
export default {
	props: ['chartId', 'title', 'icon', 'graph', 'label', 'color'],
	data () {
		return {
			chart: null,
		}
	},
	mounted () {
		this.createChart()
	},
	methods: {
		createChart: function () {
			const ctx  = this.$refs.myLine
			this.chart = new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [
						{
							label:           this.label,
							backgroundColor: 'transparent',
							borderColor:     this.color,
							data:            this.graph,
						},
					],
				},
				options: {
					elements: {
						point: {
							radius: 0,
						},
					},
					scales: {
						yAxes: [
							{
								ticks: {
									fontSize: 12,
								},
							},
						],
						xAxes: [
							{
								ticks: {
									fontSize: 10,
								},
								type: 'time',
								time: {
									stepSize:       20,
									unit:           'second',
									displayFormats: {
										second: 'h:mm:ss a',
									},
								},
								scaleLabel: {
									display:     true,
									labelString: 'Time',
								},
							},
						],
					},
					legend: {
						display: false,
					},
					tooltips: {
						enabled: false,
					},
					responsive:          true,
					maintainAspectRatio: false,
				},
			})
		},
	},
	watch: {
		graph: function () {
			this.chart.data.datasets[0].data = this.graph
			this.chart.update(0)
		},
	},
}
</script>

<style>
</style>
