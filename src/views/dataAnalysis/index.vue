<template>
  <div>
    <Title>数据分析</Title>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import Vue from "vue";
import Component from "vue-class-component";

import * as echarts from "echarts";
import dayjs from "dayjs";

@Component({
  components: { Title },
})
export default class DataAnalysis extends Vue {
  public radio1 = "上海";
  mounted(): void {
    console.log(123);
    //
  }
}
</script>
