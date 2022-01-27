<template>
  <div class="adminsInfo">
    <Title>用户信息</Title>
    <div class="button-group">
      <el-button
        style="box-shadow: 0px 0px 20px 10px #eee"
        @click="dialogFormVisible = true"
        type="primary"
        >新增管理员</el-button
      >
    </div>
    <div class="info-group">
      <el-table :data="adminInfoArray" stripe class="info-table">
        <el-table-column align="center" prop="userName" label="用户名">
        </el-table-column>
        <el-table-column align="center" prop="phoneNumber" label="电话号码">
        </el-table-column>
        <el-table-column align="center" label="用户身份">
          <template slot-scope="scope">
            <span>
              {{ scope.row.adminRole === 0 ? "超级管理员" : "管理员" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div style="width: 100%; display: flex; justify-content: center">
              <div
                style="color: green; padding: 5px; cursor: pointer"
                @click="sendEmail(scope.row.emailAddress)"
              >
                发送邮件
              </div>
              <div
                style="color: red; padding: 5px; cursor: pointer"
                @click="deleteAdmin(scope.row.adminUUid)"
              >
                删除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="admin-count-charts"></div>
      <el-dialog
        width="400px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :center="true"
        title="新增管理员信息"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form">
          <el-form-item label="用户名">
            <el-input v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.passWord"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址">
            <el-input v-model="form.emailAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="pin">
            <el-input
              v-model="form.pin"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false"
              >确 定</el-button
            >
          </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
import Vue from "vue";
import Component from "vue-class-component";
import * as echarts from "echarts";
import Title from "@/components/title.vue";

@Component({
  components: {
    Title
  },
})
export default class adminsManage extends Vue {
  private adminInfoArray = [];
  private dialogFormVisible = false;
  private form = {
    userName: "",
    passWord: "",
    phoneNumber: "",
    emailAddress: "",
    pin: "",
  };

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

    this.$nextTick(() => {
      let dom = document.querySelector(".admin-count-charts") as HTMLElement;
      console.log(dom);
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: "管理员数量统计",
          x: "center",
        },
        xAxis: {
          type: "category",
          data: ["管理员", "超级管理员"],
        },
        grid: {
          left: "10%",
          right: "10%",
          // top: "10%",
          // bottom: "10%",
          // containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "管理员数量",
            type: "bar",
            data: [
              {
                value: this.adminInfoArray.filter(
                  (adminInfo: any) => adminInfo.adminRole === 0
                ).length,
                name: "超级管理员",
              },
              {
                value: this.adminInfoArray.filter(
                  (adminInfo: any) => adminInfo.adminRole === 1
                ).length,
                name: "管理员",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    });
  }
}
</script>

<style lang="scss" scoped>
.adminsInfo {
  width: 80%;
  .info-group {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .info-table {
      width: 60%;
      flex: none;
      box-shadow: 0px 0px 20px 10px #eee;
    }
    .admin-count-charts {
      width: 33%;
      padding: 10px 20px;
      background: white;
      box-shadow: 0px 0px 20px 10px #eee;
      // display: none;
      height: 400px;
      // padding: 2%;
    }
  }
  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    // margin-bottom: 20px;
  }
}
</style>
