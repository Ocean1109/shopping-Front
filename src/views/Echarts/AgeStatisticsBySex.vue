<template>
    <div id="main"></div>
</template>

<script>
    import {AgeCom} from "../../http/api"
    export default {
        name: "AgeStatisticsBySex",
        data(){
            return{
                male:[],
                female:[],
                none:[],
                maleChildren:[],
                femaleChildren:[],
                noneChildren:[],
                num:[]
            }
        },
        methods:{
            Draw(){
                AgeCom().then(res=>{
                    // console.log(res)
                    //将数据按照性别进行分类
                    for (let i=0;i<res.length;i++){
                        if (res[i].gender == 0){
                            let Level = res[i].ageRange;
                            this.female[Level] = res[i].count;
                        }
                        else if (res[i].gender == 1){
                            let Level = res[i].ageRange;
                            this.male[Level] = res[i].count;
                        }
                        else if (res[i].gender == 2){
                            let Level = res[i].ageRange;
                            this.none[Level] = res[i].count;
                        }
                    }
                    // console.log(this.female+" "+this.male+" "+this.none)
                    //填0处理
                    //获取最大种类数
                    let MaxNum = Math.max.call(this.female.length,this.male.length,this.none.length)

                    // console.log(MaxNum)
                    for (let i=0;i<MaxNum;i++){
                        if (this.female[i]==null){
                            this.female[i] = 0;
                        }
                        else if (this.male[i]==null){
                            this.male[i] = 0;
                        }
                        else if (this.none[i]==null){
                            this.none[i] = 0;
                        }
                    }
                    // console.log(this.female+" "+this.male+" "+this.none)
                    // 数据整理成children
                    for (let i=0;i<MaxNum;i++){
                        this.femaleChildren[i] = {type:i,value:this.female[i]};
                        this.maleChildren[i] = {type:i,value:this.male[i]};
                        this.noneChildren[i] = {type:i,value:this.none[i]};
                        this.num[i] = i;
                    }

                    console.log(this.femaleChildren)
                    console.log(this.maleChildren)
                    console.log(this.noneChildren)
                    let myEchart = this.$echarts.init(document.getElementById("main"));


                    let option = {
                        title: {
                            text: '年龄对比'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['女', '男', '未知']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: this.num
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '女',
                                type: 'line',
                                stack: '总量',
                                data: this.femaleChildren
                            },
                            {
                                name: '男',
                                type: 'line',
                                stack: '总量',
                                data: this.maleChildren
                            },
                            {
                                name: '未知',
                                type: 'line',
                                stack: '总量',
                                data: this.noneChildren
                            },

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