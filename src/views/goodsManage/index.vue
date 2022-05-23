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
        ref="addGoodsForm"
        :model="addGoodsForm"
        label-position="left"
        label-width="120px"
        style="padding: 0 30px"
      >
        <el-form-item label="商品名称">
          <el-input v-model="addGoodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select
            v-model="addGoodsForm.classification"
            placeholder="请选择商品分类"
          >
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
            v-model="addGoodsForm.price"
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
            v-model="addGoodsForm.stock"
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
      <el-table-column align="center" label="商品图片">
        <template v-slot="scope">
          <div
            style="display: flex; flex-direction: row; justify-content: center"
            v-if="scope.row.goodImages"
          >
            <div
              v-for="image in scope.row.goodImages.split(',')"
              :key="image"
              style="margin: 0px 10px"
            >
              <img
                width="40px"
                height="40px"
                :src="`http://localhost:8090/images/${image}`"
                alt="商品图片"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="goodDescribeImages"
        label="商品描述图片"
        width="200px"
      >
        <template v-slot="scope">
          <div
            style="display: flex; flex-direction: row; justify-content: center"
            v-if="scope.row.goodDescribeImages"
          >
            <div
              v-for="image in scope.row.goodDescribeImages.split(',')"
              :key="image"
              style="margin: 0px 10px"
            >
              <img
                width="40px"
                height="40px"
                :src="`http://localhost:8090/images/${image}`"
                alt="商品描述图片"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作"
        ><template v-slot="scope">
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <el-button
              type="primary"
              size="small"
              @click="
                editGoodsDescribeVisble = true;
                editGoodsDescribeIndex = scope.row.$index;
              "
              >编辑信息</el-button
            >
            <el-button
              type="danger"
              circle
              size="small"
              @click="deleteGoods(scope.row.goodId)"
              ><svg
                focusable="false"
                data-prefix="fas"
                data-icon="trash"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style="width: 10px; height: 10px"
              >
                <path
                  data-v-11241ba2=""
                  fill="currentColor"
                  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                  class=""
                ></path></svg
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import { addAdminLog } from "@/utils/addAdminLog";
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {
    Title,
  },
})
export default class GoodsManage extends Vue {
  public addGoodsForm = {
    name: "",
    classification: "",
    price: 0,
    stock: 0,
  }; // 新增商品表单数据
  public goodsList = []; // 商品列表

  public goodsImageList = []; // 商品图片列表
  public goodsDescribeImageList = []; // 商品描述图片列表

  public sendGoodsImageList = []; // 发送使用的商品图片列表
  public sendGoodsImageDescribeList = []; // 发送使用的商品描述图片列表

  public addGoodsVisble = false; // 新增商品弹窗状态
  public previewImage = ""; // 预览图片地址

  public previewVisible = false; // 预览图片弹窗状态

  public sendBtn = false; // 发送按钮状态

  public editGoodsDescribeVisble = false; // 编辑商品描述弹窗状态
  public editGoodsDescribeIndex = 0; // 编辑商品描述弹窗索引

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
      goodName: this.addGoodsForm.name,
      goodClassification: this.addGoodsForm.classification,
      goodPrice: this.addGoodsForm.price,
      goodCount: this.addGoodsForm.stock,
      goodImages: this.sendGoodsImageList.toString(),
      goodDescribeImages: this.sendGoodsImageDescribeList.toString(),
    };

    const res = await this.axios.post("/goods/addGoods", data);

    if (res.data.code === 0) {
      this.$message.success("添加成功");
      await addAdminLog("添加商品", this.addGoodsForm.name);
      this.resetData();
      this.addGoodsVisble = false;
      this.$router.go(0);
    } else {
      this.$message.error("添加失败");
    }
  }
  /**
   * 初始化数据
   */
  public resetData() {
    this.addGoodsForm = {
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
  }
  public handleGoodsDescribeSuccess(res: any, file: any, fileList: any) {
    (this.sendGoodsImageDescribeList as Array<string>).push(res.data);
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
  public async deleteGoods(goodId: number): Promise<void> {
    const res = await this.axios.get("/goods/deleteGoodsById", {
      params: {
        id: goodId,
      },
    });
    if (res.data.code === 0) {
      this.$message.success("删除成功");
      await addAdminLog("删除商品", goodId.toString());
      this.$router.go(0);
    } else {
      this.$message.error("删除失败");
    }
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
