<template>
    <div class="EchartPractice">
        <div id="main"></div>
        <div id="test"></div>
    </div>

</template>

<script>
    export default {
        name: "test",
        methods:{
            drawChart() {
                var chartDom = document.getElementById('main');
                var myChart =  this.$echarts.init(chartDom);
                var option;

                option = {
                    series: [{
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                            overlap: false,
                            roundCap: true,
                            clip: false,
                            itemStyle: {
                                borderWidth: 1,
                                borderColor: '#464646'
                            }
                        },
                        axisLine: {

                            lineStyle: {
                                width: 40
                            }
                        },
                        splitLine: {
                            show: false,
                            distance: 0,
                            length: 10
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            distance: 50
                        },
                        data: [{
                            value: 20,
                            name: 'Perfect',
                            title: {
                                offsetCenter: ['0%', '-30%']
                            },
                            detail: {
                                valueAnimation: true,
                                offsetCenter: ['0%', '-20%']
                            }
                        },
                            {
                                value: 40,
                                name: 'Good',
                                title: {
                                    offsetCenter: ['0%', '0%']
                                },
                                detail: {
                                    valueAnimation: true,
                                    offsetCenter: ['0%', '10%']
                                }
                            },
                            {
                                value: 60,
                                name: 'Commonly',
                                title: {
                                    offsetCenter: ['0%', '30%']
                                },
                                detail: {
                                    valueAnimation: true,
                                    offsetCenter: ['0%', '40%']
                                }
                            }
                        ],
                        title: {
                            fontSize: 14
                        },
                        detail: {
                            width: 50,
                            height: 14,
                            fontSize: 14,
                            color: 'auto',
                            borderColor: 'auto',
                            borderRadius: 20,
                            borderWidth: 1,
                            formatter: '{value}%'
                        }
                    }]
                };

                setInterval(function () {
                    option.series[0].pointer.show = false;
                    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    option.series[0].data[1].value = (Math.random() * 100).toFixed(2) - 0;
                    option.series[0].data[2].value = (Math.random() * 100).toFixed(2) - 0;
                    myChart.setOption(option, true);
                }, 2000);

                option && myChart.setOption(option);

            },
            drawTest(){
                let myEchart = this.$echarts.init(document.getElementById("test"));
                let option = {
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [{
                        name: 'Pressure',
                        type: 'gauge',
                        progress: {
                            show: true
                        },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value}'
                        },
                        data: [{
                            value: 24,
                            name: 'SCORE'
                        }]
                    }]
                };
                myEchart.setOption(option);
            }

        },
        mounted() {
            this.drawChart();
            this.drawTest()
        }
    }
</script>

<style scoped>
    #main {
        width: 800px;
        height:800px;
        margin: auto;
        margin-top: 50px
    }
    #test {
        width: 400px;
        height:300px;
        margin: auto;
        margin-top: 50px
    }
</style>