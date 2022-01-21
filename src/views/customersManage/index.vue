<template>
  <div>
    顾客管理
    <div>
      <el-table>
        <el-table-column label="顾客姓名" prop="name"></el-table-column>
        <el-table-column label="顾客电话" prop="phoneNumber"></el-table-column>
        <el-table-column label="顾客邮箱" prop="emailAddress"></el-table-column>
        <el-table-column label="顾客地址" prop="address"></el-table-column>
        <el-table-column label="顾客状态" prop="status"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
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
@Component({
  components: {},
})
export default class CustomersManage extends Vue {
  deleteCustomer(row: any) {
    console.log(row);
  }
}
</script>

<style lang="scss" scoped></style>
