<template>
  <div class="goodsClassificationManage">
    <Title>商品分类管理</Title>
    <div class="addClassificication">
      <el-button type="primary" @click="addGoodsClassificationVisible = true">
        添加分类
      </el-button>
      <el-button
        type="primary"
        @click="deleteGoodsClassifacitionVisible = true"
      >
        删除分类
      </el-button>
      <el-dialog title="商品分类信息" :visible="addGoodsClassificationVisible">
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
      <el-dialog
        title="删除商品分类"
        :visible="deleteGoodsClassifacitionVisible"
        center
        width="400px"
      >
        <el-form :model="form" ref="deleteForm">
          <el-form-item label="请选择删除的分类">
            <el-select v-model="deleteClassificationId">
              <el-option
                v-for="(i, index) in goodsClassificationList"
                :key="index"
                :label="i.classificationName"
                :value="i.classificationId"
              >
              </el-option>
            </el-select>
            <div
              style="
                font-size: 12px;
                color: grey;
                text-align: center;
                margin-top: 30px;
              "
            >
              <span>提示：</span>
              <span>删除分类会删除所有子分类</span>
            </div>
          </el-form-item>
        </el-form>
        <!--提示会删除子分类 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteGoodsClassifacitionVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="deleteGoodsClassifacition()">
            确定
          </el-button>
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
import { addAdminLog } from "@/utils/addAdminLog";

@Component({
  components: {
    Title,
  },
})
export default class GoodsClassificationManage extends Vue {
  public addGoodsClassificationVisible = false;
  public deleteGoodsClassifacitionVisible = false;
  public form = {
    classificationName: "",
    parentId: "",
  };
  public deleteClassificationId = -1;

  public cancel() {
    this.addGoodsClassificationVisible = false;
  }
  public defaultProps = {
    children: "children",
    label: "classificationName",
  };
  public handleNodeClick(data: any) {
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
    
    if (res.data.code === 0) {
      this.$message.success("添加成功");
      await getGoodsClassification();
      await addAdminLog("添加商品分类", this.form.classificationName);
      this.$router.go(0);
    } else {
      this.$message.error(res.data.msg);
    }
  }

  public async deleteGoodsClassifacition() {
    const res = await this.axios.get(
      "/goodsClassification/deleteClassification",
      {
        params: {
          classificationId: this.deleteClassificationId,
        },
      }
    );
  }

  mounted(): void {
    getGoodsClassification();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body,
.el-dialog--center .el-dialog__body {
  padding: 30px 20px 0px 20px;
}
.goodsClassificationManage {
  height: 100%;
  width: 100%;
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
