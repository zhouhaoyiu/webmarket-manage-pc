<template>
  <div class="adminsInfo">
    <div><button>新增管理员</button></div>
    <el-table :data="adminInfoArray" stripe style="width: 800px">
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column prop="phoneNumber" label="电话号码"> </el-table-column>
      <el-table-column label="用户身份">
        <template slot-scope="scope">
          <span>
            {{ scope.row.adminRole === 0 ? "超级管理员" : "管理员" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <button @click="sendEmail(scope.row.emailAddress)">发送邮件</button>
          <button @click="deleteAdmin(scope.row.adminUUid)">删除</button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class adminsManage extends Vue {
  private adminInfoArray = [];

  sendEmail(emailAddress: string): void {
    const url = `mailto:${emailAddress}`;
    window.open(url, "_blank");
  }

  async deleteAdmin(adminUUid: string): Promise<void> {
    const res = await this.axios.get("/admin/deleteAdmin", {
      params: {
        adminUUid: adminUUid,
      },
    });
    if (res.data.code === "0") {
      this.adminInfoArray = this.adminInfoArray.filter(
        (adminInfo: any) => adminInfo.adminUUid !== adminUUid
      );
      this.$message.success("删除成功");
    }
    this.$message.success("删除失败");
  }

  async mounted(): Promise<void> {
    const res = await this.axios.get("/admin/getAllAdminsInfo", {
      params: {
        adminRole: this.$store.getters[GET_ADMIN_INFO].adminRole,
      },
    });
    if (res.data.code === "0") {
      this.adminInfoArray = res.data.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.adminsInfo {
  width: 80%;
}
</style>
