<template>
  <div>
    <Title>商城管理</Title>
    <div>
      <el-button type="primary" @click="openChangeMallInfo()"
        >修改商城信息</el-button
      >
    </div>
    <div v-if="marketInfo">
      <div>商城名称：{{ marketInfo.marketName }}</div>
      <div>推荐商品：{{ marketInfo.marketRecommend }}</div>
      <div>商城信息：{{ marketInfo.marketMeta }}</div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVision"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        ref="form"
        :model="marketInfoDialog"
        label-position="left"
        label-width="120px"
        style="padding: 0 30px"
      >
        <el-form-item label="商城名称">
          <el-input v-model="marketInfoDialog.marketName"></el-input>
        </el-form-item>
        <el-form-item label="推荐商品">
          <el-select
            v-model="marketInfoDialog.marketRecommend"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商城信息">
          <el-input v-model="marketInfoDialog.marketMeta"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVision = false">取 消</el-button>
        <el-button type="primary" @click="dialogVision = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "../../components/title.vue";
@Component({
  components: {
    Title,
  },
})
export default class MallManage extends Vue {
  private marketInfo = null;
  private dialogVision = false;
  private dialogTitle = "修改商城信息";
  private marketInfoDialog = {
    marketName: "",
    marketRecommend: "",
    marketMeta: "",
  };
  openChangeMallInfo() {
    this.dialogVision = true;
  }
  async mounted(): Promise<void> {
    const res = await this.axios.get("/marketInfo/getMarketInfo");
    this.marketInfoDialog = this._.cloneDeep(res.data.data[0]);
    this.marketInfo = this._.cloneDeep(this.marketInfoDialog);
  }
}
</script>

<style lang="scss" scoped>
.dialogLine {
  display: flex;
  flex-direction: row;
}
</style>
