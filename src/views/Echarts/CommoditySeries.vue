<template>
    <div id="main"></div>
</template>

<script>
    import {CategoryCom} from "../../http/api"
    export default {
        name: "CommoditySeries",
        data(){
            return{
                Product:[],
                num:[]
            }
        },
        methods:{
            Draw(){
                CategoryCom().then(res=>{
                    // console.log(res)
                    for (let i=0;i<res.length;i++){
                        this.Product[i] = res[i].catId;
                        this.num[i] = res[i].count;
                    }
                    // console.log(this.Product)
                    // console.log(this.num)
                    let myEchart = this.$echarts.init(document.getElementById("main"));
                    let option = {
                        xAxis: {
                            type: 'category',  //类目轴
                            data: this.Product
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: this.num,
                            color:'#b1eb83',
                            type: 'bar',
                            showBackground: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: 'black',
                                            fontSize: 14
                                        }
                                    }
                                }
                            }

                        }]

                    };

                    myEchart.setOption(option);
                })


            }
        },
        mounted() {
            this.Draw();
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