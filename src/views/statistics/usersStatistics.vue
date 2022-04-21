<template>
  <div>
    <Title>用户统计</Title>
    <div style="width: 70%; margin-bottom: 20px; display: flex">
      <el-input
        style="width: 30%"
        v-model="searchUserName"
        placeholder="请输入用户名"
      ></el-input>
      <div style="margin-left: 20px">
        <el-button @click="visitClassification" type="primary"
          >查看分类</el-button
        >
        <el-button @click="visitGoods" type="primary">查看商品</el-button>
        <el-button @click="visitAll" type="primary">查看全部</el-button>
      </div>
    </div>
    <el-table :data="filterUserLog" border stripe style="width: 100%">
      <el-table-column align="center" label="用户名">
        <template v-slot="scope">
          <div>
            {{ useruuidToName(scope.row.useruuid) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访问分类"
        prop="type"
      ></el-table-column>
      <el-table-column align="center" label="访问内容" prop="gid">
        <template v-slot="scope">
          <div v-if="scope.row.type === '查看分类'">
            {{ gidToClassificationName(scope.row.gid) }}
          </div>
          <div v-if="scope.row.type === '查看商品'">
            {{ gidToGoodName(scope.row.gid) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访问时间"
        prop="logtime"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
@Component({
  components: { Title },
})
export default class UsersStatistics extends Vue {
  public filterUserLog: Array<any> = [];
  public userLog: Array<any> = [];
  public searchUserName: string = "";

  public useruuidToName(useruuid: string): string {
    const user = this.$store.getters.getCustomersList;
    for (const item of user) {
      if (item.useruuid === useruuid) {
        return item.username;
      }
    }
    return user ? user.username : "";
  }

  public gidToClassificationName(gid: number): string {
    const classification = this.$store.getters.getGoodsClassificationList;
    for (const item of classification) {
      if (item.classificationId === gid) {
        return item.classificationName;
      }
    }
    return classification ? classification.classificationName : "";
  }

  public gidToGoodName(gid: number): string {
    const good = this.$store.getters.getGoodsList;
    for (const item of good) {
      if (item.goodId === gid) {
        return item.goodName;
      }
    }
    return good ? good.goodName : "";
  }

  public visitClassification(): void {
    this.filterUserLog = this.userLog
      .filter((item: any) => item.type === "查看分类")
      .filter((item: any) => {
        return (
          this.useruuidToName(item.useruuid).indexOf(this.searchUserName) !== -1
        );
      });
  }

  public visitGoods(): void {
    this.filterUserLog = this.userLog
      .filter((item: any) => item.type === "查看商品")
      .filter((item: any) => {
        return (
          this.useruuidToName(item.useruuid).indexOf(this.searchUserName) !== -1
        );
      });
  }

  public visitAll(): void {
    this.filterUserLog = this.userLog.filter((item: any) => {
      return (
        this.useruuidToName(item.useruuid).indexOf(this.searchUserName) !== -1
      );
    });
  }

  @Watch("searchUserName")
  public onSearchUserNameChanged(val: string) {
    this.filterUserLog = this.userLog.filter((item: any) => {
      return this.useruuidToName(item.useruuid).indexOf(val) !== -1;
    });
  }

  public async mounted(): Promise<void> {
    const userLog = await this.axios.get("/userLog/getAllUserLog");
    if (userLog.data.code === 1) {
      this.userLog = window._.cloneDeep(userLog.data.data).sort(
        (a: { logtime: string }, b: { logtime: string }) =>
          dayjs(b.logtime).unix() - dayjs(a.logtime).unix()
      );
      this.filterUserLog = window._.cloneDeep(this.userLog);
    }
  }
}
</script>

<style lang="scss" scoped></style>
