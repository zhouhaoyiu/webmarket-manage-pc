<template>
  <div>
    <Title>用户统计</Title>
    <el-table>
      <el-table-column
        align="center"
        label="用户名"
        prop="username"
      ></el-table-column>
      <el-table-column
        align="center"
        label="用户id"
        prop="userid"
      ></el-table-column>
      <el-table-column
        align="center"
        label="访问分类"
        prop="type"
      ></el-table-column>
      <el-table-column
        align="center"
        label="访问内容"
        prop="gid"
      ></el-table-column>
      <el-table-column
        align="center"
        label="访问时间"
        prop="logdate"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { Title },
})
export default class UsersStatistics extends Vue {
  mounted(): void {
    //
  }
}
</script>

<style lang="scss" scoped></style>
