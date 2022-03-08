<template>
  <div class="goodsManage">
    <Title>商品管理</Title>
    <div class="top-buttons">
      <el-button @click="addGoodsVisble = true" type="primary"
        >新增商品</el-button
      >
    </div>

    <el-dialog
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      title="新增商品信息"
      :visible.sync="addGoodsVisble"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="120px"
        style="padding: 0 30px"
      >
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="form.type" placeholder="请选择商品类型">
            <el-option label="类型1" value="1"></el-option>
            <el-option label="类型2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number
            v-model="form.price"
            :precision="2"
            :step="0.01"
            step-strictly
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input-number
            :step="1"
            step-strictly
            v-model="form.stock"
            :min="0"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="upload-demo"
            action="http://localhost:8090/goods/upload/image"
            ref="goodsListUpload"
            list-type="picture-card"
            :auto-upload="false"
            name="picture"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleGoodsListSuccess"
            :before-upload="beforeGoodsListUpload"
            :file-list="goodsList"
            multiple
          >
            <i class="el-icon-plus avatar"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述图片">
          <el-upload
            class="upload-demo"
            ref="goodsDescUpload"
            action="http://localhost:8090/goods/upload/image"
            list-type="picture-card"
            :auto-upload="false"
            name="picture"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleGoodsDescribeSuccess"
            :before-upload="beforeGoodsDescribeListUpload"
            :file-list="goodsDescribeList"
            multiple
          >
            <i class="el-icon-plus avatar"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :center="true"
      :visible.sync="previewVisible"
    >
      <img width="100%" :src="previewImage" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import { Form } from "element-ui";
import { ElementUIComponent } from "element-ui/types/component";
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {
    Title,
  },
})
export default class GoodsManage extends Vue {
  form = {
    name: "",
    type: "",
    price: 0,
    stock: 0,
    goodsList: [],
    goodsDescribeList: [],
  };
  goodsList = [];
  goodsDescribeList = [];

  addGoodsVisble = false;
  previewImage = "";
  previewVisible = false;

  async submitForm() {
    (this.$refs.goodsListUpload! as any).submit();
    (this.$refs.goodsDescUpload! as any).submit();
    const res = await this.axios.post("/goods/addGoods", this.form);
    {
      if (res.data.code === 0) {
        this.$message.success("添加成功");
        this.addGoodsVisble = false;
        this.form = {
          name: "",
          type: "",
          price: 0,
          stock: 0,
          goodsList: [],
          goodsDescribeList: [],
        };
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }

  handleGoodsListSuccess(res: { data: any }, file: any, fileList: any) {
    (this.form.goodsList as Array<string>).push(res.data);
    this.goodsList = [];
  }
  handleGoodsDescribeSuccess(res: any, file: any, fileList: any) {
    (this.form.goodsDescribeList as Array<string>).push(res.data);
    this.goodsDescribeList = [];
  }

  checkFile(file: { type: string; size: number }) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }

  beforeGoodsListUpload(file: any) {
    if (this.checkFile(file)) {
      (this.goodsList as Array<File>).push(file);
    } else {
      return false;
    }
  }
  beforeGoodsDescribeListUpload(file: any) {
    if (this.checkFile(file)) {
      (this.goodsDescribeList as Array<File>).push(file);
    } else {
      return false;
    }
  }

  handlePictureCardPreview(file: any) {
    console.log(file);
    this.previewImage = file.url;
    this.previewVisible = true;
  }

  handleRemove(file: any, fileList: any) {
    console.log(fileList);
    // this.goodsList = this.goodsList.filter(
    //   (item: any) => item.uid !== file.uid
    // );
  }

  cancel() {
    this.addGoodsVisble = false;
  }
}
</script>

<style lang="scss" scoped>
.goodsManage {
  padding: 20px;
  .top-buttons {
    margin-bottom: 20px;
    .el-button {
      margin-right: 20px;
    }
  }
}
</style>
