<template>
  <div class="goodsClassificationManage">
    <Title>商品分类管理</Title>
    <div class="addClassificication">
      <el-button type="primary" @click="addGoodsClassificationVisble = true">
        添加分类
      </el-button>
      <el-button type="primary" @click="deleteGoodsClassifacition = true">
        删除分类
      </el-button>
      <el-dialog title="商品分类信息" :visible="addGoodsClassificationVisble">
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="分类名称">
            <el-input
              v-model="form.classificationName"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级分类">
            <el-select v-model="form.parentId" placeholder="请选择">
              <el-option
                v-for="(i, index) in goodsClassificationList"
                :key="index"
                :label="i.classificationName"
                :value="i.classificationId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="goodsClassficationTree">
      <el-tree
        :data="goodsClassificationTree"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :defaultExpandAll="true"
      ></el-tree>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Title from "../../components/title.vue";
import getGoodsClassification from "@/utils/getGoodsClassifacation";

@Component({
  components: {
    Title,
  },
})
export default class GoodsClassificationManage extends Vue {
  public addGoodsClassificationVisble = false;
  public deleteGoodsClassifacition = false;
  public form = {
    classificationName: "",
    parentId: "",
  };

  cancel() {
    this.addGoodsClassificationVisble = false;
  }
  defaultProps = {
    children: "children",
    label: "classificationName",
  };
  handleNodeClick(data: any) {
    console.log(data);
  }

  get goodsClassificationTree() {
    return this.$store.getters.getGoodsClassificationTree;
  }

  get goodsClassificationList() {
    return this.$store.getters.getGoodsClassificationList;
  }

  async submitForm() {
    const res = await this.axios.get("/goodsClassification/addClassification", {
      params: {
        classificationName: this.form.classificationName,
        parentId: this.form.parentId || -1,
      },
    });
    console.log(res.data);
    if (res.data.code === 0) {
      this.$message.success("添加成功");
      getGoodsClassification();
    } else {
      this.$message.error(res.data.msg);
    }
  }

  mounted(): void {
    getGoodsClassification();
  }
}
</script>

<style lang="scss" scoped>
.goodsClassificationManage {
  height: 100%;
  width: 100%;
  background: red;
  .addClassificication {
    margin-bottom: 20px;
  }
  .goodsClassficationTree {
    background: white;
    padding: 20px;
    box-shadow: 0px 0px 20px 10px #eee;
  }
}
</style>
