<template>
  <div>
    <Title>用户统计</Title>
    <el-table >
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="用户电话" prop="phoneNumber"></el-table-column>
      <el-table-column label="访问分类" prop="address"></el-table-column>
      <el-table-column label="访问内容" prop="emailAddress"></el-table-column>
      <el-table-column label="访问时间" prop="status"></el-table-column>
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