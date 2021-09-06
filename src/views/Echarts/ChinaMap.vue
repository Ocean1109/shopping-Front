<template>
    <div ></div>
</template>

<script>
    export default {
        name: "ChinaMap",
        methods:{
            async initChart(){
                this.chartInstance = this.$echarts.init(this.$refs.mapRef)
                // const ret = await axios.get('http://localhost:8080/')
            }
        }
    }
</script>

<style scoped>

</style>