<template>
    <div id="main"></div>
</template>

<script>
    export default {
        name: "AgeStatisticsBySex",
        methods:{
            DrawClick(){
                let myEchart = this.$echarts.init(document.getElementById("main"));
                let data = [{

                    name: '男',

                    children: [{
                        name: 'Uncle Leo',
                        value: 15,
                        children: [{
                            name: 'Cousin Jack',
                            value: 2
                        }, {
                            name: 'Cousin Mary',
                            value: 5,
                            children: [{
                                name: 'Jackson',
                                value: 2
                            }]
                        }, {
                            name: 'Cousin Ben',
                            value: 4
                        }]
                    }, {
                        name: 'Father',
                        value: 10,
                        children: [{
                            name: 'Me',
                            value: 5
                        }, {
                            name: 'Brother Peter',
                            value: 1
                        }]
                    }]
                }, {

                    name: '女',

                    children: [{
                        name: 'Uncle Nike',
                        children: [{
                            name: 'Cousin Betty',
                            value: 1
                        }, {
                            name: 'Cousin Jenny',
                            value: 2
                        }]
                    }]
                }];
                let option = {
                    series: {
                        type: 'sunburst',
                        // emphasis: {
                        //     focus: 'ancestor'
                        // },
                        data: data,
                        radius: [0, '90%'],
                        label: {
                            rotate: 'radial'
                        }
                    }
                };
                myEchart.setOption(option);
            },

        },
        mounted() {
            this.DrawClick();
        }
    }
</script>

<style scoped>
    #main {
        width: 900px;
        height:600px;
        margin: auto;
        margin-top: 50px
    }
</style>