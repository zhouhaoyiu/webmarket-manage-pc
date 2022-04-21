<template>
  <div>
    <Title>商品统计</Title>
    <el-table :data="Goods" border stripe style="width: 100%">
      <el-table-column align="center" label="商品id" prop="goodId">
      </el-table-column>
      <el-table-column align="center" label="商品名称" prop="goodName">
      </el-table-column>
      <el-table-column align="center" label="访问数量" prop="goodVisitCount">
      </el-table-column>
      <el-table-column align="center" label="销量数量" prop="goodSellCount">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { Title },
})
export default class GoodsStatistics extends Vue {
  mounted(): void {
    //
  }

  public get Goods(): Array<any> {
    return this.$store.getters.getGoodsList;
  }
}
</script>

<style lang="scss" scoped></style>
