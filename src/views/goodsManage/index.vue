<template>
  <div class="goodsManage">
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
      :center="true"
      title="新增商品信息"
      :visible.sync="addGoodsVisble"
    >
      <el-form ref="form" :model="form" label-width="80px">
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
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="goodsList"
          >
            <i class="el-icon-plus avatar"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="goodsDescribeList"
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {},
})
export default class GoodsManage extends Vue {
  form = {
    name: "",
    type: "",
    price: 0,
    stock: 0,
    image: "",
  };
  goodsList = [];
  goodsDescribeList = [];

  addGoodsVisble = false;
  previewImage = "";
  previewVisible = false;

  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        console.log(this.form);
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  handleAvatarSuccess(res: any, file: any) {
    this.form.image = res.url;
    this.goodsList = [];
  }

  beforeAvatarUpload(file: any) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }

  handlePictureCardPreview(file: any) {
    this.previewImage = file.url;
    this.previewVisible = true;
  }

  handleRemove(file: any) {
    this.goodsList = this.goodsList.filter((item: any) => item.uid !== file.uid);
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
