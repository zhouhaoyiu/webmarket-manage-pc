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
        <el-form-item label="商品分类">
          <el-select v-model="form.classification" placeholder="请选择商品分类">
            <el-option
              v-for="(i, index) in GoodsClassifactionFilterList"
              :key="index"
              :label="i.classificationName"
              :value="i.classificationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number
            v-model="form.price"
            :precision="2"
            :step="0.01"
            step-strictly
            :min="0"
            :max="10000000"
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
        <el-form-item v-if="!sendBtn" label="商品图片">
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
            :file-list="goodsImageList"
            multiple
          >
            <i class="el-icon-plus avatar"></i>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="!sendBtn" label="商品描述图片">
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
            :file-list="goodsDescribeImageList"
            multiple
          >
            <i class="el-icon-plus avatar"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitImage()">提交图片</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button :disabled="!sendBtn" type="primary" @click="submitForm()"
          >提交</el-button
        >
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
    <el-table :data="Goods" border stripe style="width: 100%">
      <el-table-column
        align="center"
        prop="goodName"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="goodClassification"
        label="商品分类"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="goodPrice"
        label="商品价格"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="goodCount"
        label="商品库存"
      ></el-table-column>
      <el-table-column align="center" label="商品图片"
        ><template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="
                editGoodsDescribeVisble = true;
                editGoodsDescribeIndex = scope.row.$index;
              "
              >查看图片</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="goodDescribeImages"
        label="商品描述图片"
        width="200px"
      ></el-table-column>
      <el-table-column align="center" label="商品描述"
        ><template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="small"
              @click="
                editGoodsDescribeVisble = true;
                editGoodsDescribeIndex = scope.row.$index;
              "
              >编辑信息</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import App from "../../App.vue";
@Component({
  components: {
    Title,
  },
})
export default class GoodsManage extends Vue {
  public form = {
    name: "",
    classification: "",
    price: 0,
    stock: 0,
  };
  public goodsList = [];

  public goodsImageList = [];
  public goodsDescribeImageList = [];

  public sendGoodsImageList = [];
  public sendGoodsImageDescribeList = [];

  public addGoodsVisble = false;
  public previewImage = "";

  public previewVisible = false;

  public sendBtn = false;

  public editGoodsDescribeVisble = false;
  public editGoodsDescribeIndex = 0;

  /**
   * @event 商品图片上传
   */
  submitImage() {
    (this.$refs.goodsListUpload! as any).submit();
    (this.$refs.goodsDescUpload! as any).submit();
    this.sendBtn = true;
  }
  /**
   * @event 上传商品图片成功后上传商品信息
   */
  async submitForm() {
    const data = {
      goodName: this.form.name,
      goodClassification: this.form.classification,
      goodPrice: this.form.price,
      goodCount: this.form.stock,
      goodImages: this.sendGoodsImageList.toString(),
      goodDescribeImages: this.sendGoodsImageDescribeList.toString(),
    };
    // console.log(data);
    const res = await this.axios.post("/goods/addGoods", data);
    // console.log(res);
    if (res.data.code === 0) {
      this.$message.success("添加成功");
      this.resetData();
      this.addGoodsVisble = false;
    } else {
      this.$message.error("添加失败");
    }
  }
  /**
   * 初始化数据
   */
  public resetData() {
    this.form = {
      name: "",
      classification: "",
      price: 0,
      stock: 0,
    };
    this.goodsImageList = [];
    this.goodsDescribeImageList = [];
    this.sendGoodsImageList = [];
    this.sendGoodsImageDescribeList = [];
    this.sendBtn = false;
  }

  /**
   * 商品图片上传成功的钩子
   * @param file  文件
   * @param res  图片上传返回的数据
   * @param fileList  图片列表
   * @event 上传成功后的事件
   */
  public handleGoodsListSuccess(res: { data: any }, file: any, fileList: any) {
    (this.sendGoodsImageList as Array<string>).push(res.data);
    // console.log(this.sendGoodsImageList);
    // this.goodsImageList = [];
  }
  public handleGoodsDescribeSuccess(res: any, file: any, fileList: any) {
    (this.sendGoodsImageDescribeList as Array<string>).push(res.data);
    // console.log(this.sendGoodsImageDescribeList);
    // this.goodsDescribeImageList = [];
  }

  /**
   * 商品图片上传之前的钩子
   * @param file  文件
   * @event 图片上传之前的事件判断图片大小
   */
  public checkFile(file: { type: string; size: number }) {
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

  /**
   * @event 商品图片上传之前的钩子
   * @param file 文件
   */
  public beforeGoodsListUpload(file: any) {
    if (this.checkFile(file)) {
      (this.goodsImageList as Array<File>).push(file);
    } else {
      return false;
    }
  }
  public beforeGoodsDescribeListUpload(file: any) {
    if (this.checkFile(file)) {
      (this.goodsDescribeImageList as Array<File>).push(file);
    } else {
      return false;
    }
  }

  /**
   * @event 商品图片上传之前的钩子
   * @param file
   */
  public handlePictureCardPreview(file: any) {
    // console.log(file);
    this.previewImage = file.url;
    this.previewVisible = true;
  }

  public handleRemove(file: any, fileList: any) {
    this.goodsImageList = this.goodsImageList.filter(
      (item: any) => item.uid !== file.uid
    );
    
  }
  /**
   * @event 选择商品分类
   * @param 
   */
  public get GoodsClassifactionFilterList() {
    return this.$store.getters.getGoodsClassificationList.filter(
      (item: any) => item.parentId !== -1
    );
  }

  public get Goods() {
    return this.$store.getters.getGoodsList;
  }

  public cancel() {
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
