<template>
    <div id="main">

    </div>
</template>

<script>
    import {SexCom} from '../../http/api'
    export default {
        name: "SexStatistics",
        data(){
          return{
              Sex0:0,
              Sex1:0,
              Sex2:0
          }
        },
        methods:{
            Draw(){
                SexCom().then(res=>{
                    // console.log(res)
                    for (let i=0;i<res.length;i++){
                        if (res[i].gender == 0){
                            this.Sex0 = res[i].count;
                        }
                        else if (res[i].gender == 1){
                            this.Sex1 = res[i].count;
                        }
                        else if (res[i].gender == 2){
                            this.Sex2 = res[i].count;
                        }
                    }
                    console.log(this.Sex0+" "+this.Sex1+" "+this.Sex2)
                    let myEchart = this.$echarts.init(document.getElementById("main"));
                    let option = {
                        title: {
                            text: '买家性别对比'
                        },
                        tooltip: {  //提示悬浮窗的位置
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}"  //{a}系列名  {b}类别 {c}数值
                        },
                        toolbox: {
                            feature: {
                                dataView: {readOnly: false},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        legend: {  //图例
                            data: ['男','女','未知']

                        },

                        series: [
                            {
                                name:'性别对比',
                                type:'funnel',
                                left: '10%',
                                top: 60,

                                bottom: 60,
                                width: '80%',

                                min: 0,
                                max: 100,
                                minSize: '0%',
                                maxSize: '100%',
                                sort: 'descending',
                                gap: 2,
                                label: {
                                    show: true,
                                    position: 'inside'
                                },
                                labelLine: {
                                    length: 10,
                                    lineStyle: {
                                        width: 1,
                                        type: 'solid'
                                    }
                                },
                                itemStyle: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                },
                                emphasis: {
                                    label: {
                                        fontSize: 20
                                    }
                                },
                                data: [
                                    {value: this.Sex1, name: '男'},
                                    {value: this.Sex0, name: '女'},
                                    {value: this.Sex2, name: '未知'}
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