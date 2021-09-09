<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
          mode="vertical"
          :default-active="1"
          class="el-menu-vertical-demo"
          background-color="#c6e6e8"
          active-text-color="#126e82"
          @select="handleSelect">

        <el-menu-item :index="1">
          <i class="el-icon-menu"></i>
          <span>所有买家各消费行为对比</span>
        </el-menu-item>
        <el-menu-item :index="2">
          <i class="el-icon-menu"></i>
          <span>男女买家交易对比</span>
        </el-menu-item>
        <el-menu-item :index="3">
          <i class="el-icon-menu"></i>
          <template #title>男女买家各个年龄段交易对比</template>
        </el-menu-item>
        <el-menu-item :index="4">
          <i class="el-icon-menu"></i>
          <template #title>商品类别交易额对比</template>
        </el-menu-item>
        <el-menu-item :index="5">
          <i class="el-icon-menu"></i>
          <template #title>各省份的销量对比</template>
        </el-menu-item>
        <el-menu-item :index="6">
          <i class="el-icon-menu"></i>
          <template #title>数据上传</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "DataSidebar",
  props:['getDataSideBarChoice'],
  methods:{
    handleSelect(key) {
      this.getDataSideBarChoice(key)
    }
  }

}
</script>

<style scoped>
.tac{
  height: 100%;
}
.el-menu-vertical-demo{
  height: 100%;
  width: 250px;
  text-align: left;
}



</style>