<template>
    <div id="main">

    </div>
</template>

<script>

    import {BehaviorCom} from '../../http/api'
    export default {
        name: "ConsumerBehavior",
        data(){
            return{
                Type1:0,
                Type2:0,
                Type3:0,
                Type0:0
            }
        },
        methods:{
            //画图
            Draw(){
                BehaviorCom().then(res=>{
                    // console.log(res)
                    for (let i=0;i<res.length;i++){
                        if (res[i].action ==0){
                            this.Type0 = res[i].count;
                        }
                        else if(res[i].action == 1){
                            this.Type1 = res[i].count;
                        }
                        else if(res[i].action == 2){
                            this.Type2 = res[i].count;
                        }
                        else if(res[i].action == 3){
                            this.Type3 = res[i].count;
                        }
                    }
                    // console.log(this.Type0+" "+this.Type1+" "+this.Type2+" "+this.Type3)
                    let myEchart = this.$echarts.init(document.getElementById("main"));
                    let option = {
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            top: '5%',
                            left: 'center'
                        },
                        series: [
                            {
                                name: '买家消费行为',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2
                                },
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: '40',
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    {value: this.Type0, name: '点击'},
                                    {value: this.Type1, name: '加入购物车'},
                                    {value: this.Type2, name: '购买'},
                                    {value: this.Type3, name: '关注商品'}
                                ]
                            }
                        ]
                    };
                    myEchart.setOption(option);
                })
            },

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