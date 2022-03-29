<template>
  <div>
    <Title>商城管理</Title>
    <div>
      <el-button type="primary" @click="openChangeMallInfo()"
        >修改商城信息</el-button
      >
    </div>
    <div v-if="marketInfo" class="marketInfo">
      <div class="marketInfoTitle">商城信息</div>
      <div class="marketInfoLine">商城名称：{{ marketInfo.marketName }}</div>
      <!-- <hr
        style="
          width: 100%;
          border: 0;
          padding-top: 1px;
          background: linear-gradient(to right, transparent, #d0d0d5, transparent);
        "
      /> -->
      <div class="marketInfoLine">
        推荐商品：{{ marketInfo.marketRecommend }}
      </div>
      <div class="marketInfoLine">商城信息：{{ marketInfo.marketMeta }}</div>
      <div class="marketInfoLine">首页轮播图：{{ marketInfo.marketMeta }}</div>
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
            multiple
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
import { LoDashStatic } from "lodash";
import { Component, Vue } from "vue-property-decorator";
import Title from "../../components/title.vue";
@Component({
  components: {
    Title,
  },
})
export default class MallManage extends Vue {
  public marketInfo = {
    marketName: "",
    marketRecommend: [],
    marketMeta: "",
  };
  public dialogVision = false;
  public dialogTitle = "修改商城信息";
  public marketInfoDialog = {
    marketName: "",
    marketRecommend: "",
    marketMeta: "",
  };
  public options = [
    {
      value: "选项1",
      label: "黄金糕",
    },
  ];
  _: LoDashStatic = window["_"];
  openChangeMallInfo() {
    this.dialogVision = true;
  }
  async mounted(): Promise<void> {
    const res = await this.axios.get("/marketInfo/getMarketInfo");
    this.marketInfoDialog = this._.cloneDeep(res.data.data[0]);
    (this.marketInfo as unknown) = this._.cloneDeep(this.marketInfoDialog);
    this.options = this.$store.getters.getGoodsList.map(
      (item: { goodsName: any; goodsId: any }) => {
        return {
          label: item.goodsName,
          value: item.goodsId,
        };
      }
    );
  }
}
</script>

<style lang="scss" scoped>
.dialogLine {
  display: flex;
  flex-direction: row;
}
.marketInfo {
  font-family: apple-system, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
    segoe ui emoji, segoe ui symbol, noto color emoji;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0px 3px 0px rgba(0, 0, 0, 0.1);
  background: rgb(255, 255, 255);
  .marketInfoTitle {
    font-size: 18px;
    margin: auto;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .marketInfoLine {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 24px;
  }
}
</style>
