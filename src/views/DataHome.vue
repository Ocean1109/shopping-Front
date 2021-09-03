<template>
  <div class="DataHome">
    <el-row>
      <el-col>
        <DataSidebar :getDataSideBarChoice="getDataSideBarChoice"></DataSidebar>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import DataSidebar from "./DataSidebar";
export default {
  name: "DataHome",
  components: {DataSidebar},
  data(){
    return{
      dataSideBarChoice:1,
    }
  },
  methods:{
    getDataSideBarChoice(index){
      this.dataSideBarChoice=index;
    },
  }
}
</script>

<style scoped>
.DataHome{
  width: 100%;
  height: 100%;
  position:fixed;
  background-size:100% 100%;
  background-color: #ffeef4;
  background-image: linear-gradient(0deg, #ffeef4 0%, #d1fffc 100%);
  top:0px;
  left: 0px;
  overflow:scroll
}


</style>