<template>
  <div>
    <Title>顾客管理</Title>
    <div>
      <el-table :data="customer">
        <el-table-column align="center" label="顾客姓名" prop="username"></el-table-column>
        <el-table-column align="center" label="顾客性别" prop="gender"></el-table-column>
        <el-table-column align="center" label="顾客电话" prop="phonenumber"></el-table-column>
        <el-table-column align="center" label="顾客id" prop="useruuid"></el-table-column>
        <el-table-column align="center" label="顾客地址" prop="address"></el-table-column>
        <el-table-column align="center" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-button
                @click="deleteCustomer(scope.row)"
                type="text"
                size="small"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Title from "../../components/title.vue";
@Component({
  components: {
    Title,
  },
})
export default class CustomersManage extends Vue {
  public customer = [];
  _ = window._;

  async mounted(): Promise<void> {
    await this.getCustomers();
  }
  async getCustomers(): Promise<void> {
    const res = await this.axios.get("/user/allUsers");
    console.log(res);
    this.customer = this._.cloneDeep(res.data.data);
  }

  deleteCustomer(row: any) {
    console.log(row);
  }
}
</script>

<style lang="scss" scoped></style>
