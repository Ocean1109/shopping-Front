<template>
    <div class="com-container">
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>

<script>
    import MAP from '../../../public/china'
    import {MapCom} from "../../http/api";

    export default {
        data(){
            return{
                chartInstance:null,
                allData:null
            }
        },
        methods:{
            initChart(){
                MapCom().then(res=>{
                    // console.log(res)
                    //对数据进行整理
                    // let province = []
                    let provinceData = []
                    for (let i=0;i<res.length;i++){
                        if (res[i].province.slice(2,3) == "市"){
                            res[i].province = res[i].province.slice(0,2)
                        }
                        provinceData[i] = {name:res[i].province,value:res[i].count}
                    }
                    console.log(provinceData)

                    this.chartInstance = this.$echarts.init(this.$refs.map_ref)
                    let chinadata = MAP
                    console.log(chinadata)
                    this.$echarts.registerMap('china',chinadata)
                    const initOption = {
                        // geo:{
                        //     type:'map',
                        //     map:'china'
                        // },
                        tooltip: {  //提示悬浮窗的位置
                            trigger: 'item',
                            formatter: "{b} : {c}"  //{b}省份 {c}数值
                        },
                        visualMap: {
                          min: 1000,
                          max: 2000,
                          text:['High','Low'],
                          realtime: false,
                          calculable: true,
                          inRange: {
                            color: ['#e0ffff', '#1781b5']
                          }
                        },
                        series:[
                            {
                                type: "map",
                                mapType: "china",
                                roam: false,
                                zoom:1.1,//默认地图在容器中显示zoom:1,可根据需求放大缩小地图
                                itemStyle:{
                                    areaColor:'#AAD5FF',//地图区域背景颜色
                                    borderColor:'#fff'//地图边界颜色
                                },
                                emphasis:{//高亮时的设置
                                    itemStyle:{
                                        areaColor:'#eea2a4',//高亮时地图区域背景颜色
                                    },
                                    label:{//文字颜色，样式在此处
                                        color:'rgb(230, 102, 18)',
                                        fontSize:'15'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true
                                    },

                                },
                                data:[
                                    // provinceData,
                                    {name: provinceData[0].name,value:provinceData[0].value},
                                    {name: provinceData[1].name,value:provinceData[1].value},
                                    {name: provinceData[2].name,value:provinceData[2].value},
                                    {name: provinceData[3].name,value:provinceData[3].value},
                                    {name: provinceData[4].name,value:provinceData[4].value},
                                    {name: provinceData[5].name,value:provinceData[5].value},
                                    {name: provinceData[6].name,value:provinceData[6].value},
                                    {name: provinceData[7].name,value:provinceData[7].value},
                                    {name: provinceData[8].name,value:provinceData[8].value},
                                    {name: provinceData[9].name,value:provinceData[9].value},
                                    {name: provinceData[10].name,value:provinceData[10].value},
                                    {name: provinceData[11].name,value:provinceData[11].value},
                                    {name: provinceData[12].name,value:provinceData[12].value},
                                    {name: provinceData[13].name,value:provinceData[13].value},
                                    {name: provinceData[14].name,value:provinceData[14].value},
                                    {name: provinceData[15].name,value:provinceData[15].value},
                                    {name: provinceData[16].name,value:provinceData[16].value},
                                    {name: provinceData[17].name,value:provinceData[17].value},
                                    {name: provinceData[18].name,value:provinceData[18].value},
                                    {name: provinceData[19].name,value:provinceData[19].value},
                                    {name: provinceData[20].name,value:provinceData[20].value},
                                    {name: provinceData[21].name,value:provinceData[21].value},
                                    {name: provinceData[22].name,value:provinceData[22].value},
                                    {name: provinceData[23].name,value:provinceData[23].value},
                                    {name: provinceData[24].name,value:provinceData[24].value},
                                    {name: provinceData[25].name,value:provinceData[25].value},
                                    {name: provinceData[26].name,value:provinceData[26].value},
                                    {name: provinceData[27].name,value:provinceData[27].value},
                                    {name: provinceData[28].name,value:provinceData[28].value},
                                    {name: provinceData[29].name,value:provinceData[29].value},
                                    {name: provinceData[30].name,value:provinceData[30].value},
                                    {name: provinceData[31].name,value:provinceData[31].value},
                                    {name: provinceData[32].name,value:provinceData[32].value},
                                    {name: provinceData[33].name,value:provinceData[33].value},

                                ]
                            }
                        ]

                    }
                    this.chartInstance.setOption(initOption)
                })

            }
        },
        mounted() {
            this.initChart()
        }
    }
</script>

<style>
.com-chart{
    width: 1000px;
    height: 800px;
}
</style>

