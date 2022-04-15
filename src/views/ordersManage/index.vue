<template>
  <div>
    <Title>订单管理</Title>
    <el-table :data="orders" border stripe style="width: 100%">
      <el-table-column align="center" label="订单id" prop="orderid">
      </el-table-column>
      <el-table-column align="center" label="订单商品" prop="goods">
      </el-table-column>

      <el-table-column align="center" label="订单总价"> </el-table-column>
      <el-table-column align="center" label="订单日期" prop="orderDate">
      </el-table-column>
      <el-table-column align="center" label="用户名" prop="username">
      </el-table-column>
      <el-table-column align="center" label="用户uuid" prop="useruuid">
      </el-table-column>
      <el-table-column align="center" label="订单uuid" prop="orderuuid">
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderStatus">
      </el-table-column>
      <el-table-column align="center" label="信息">
        <template v-slot="scope">
          {{ scope.row.orderStatus ? "已完成" : "未完成" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import Title from "@/components/title.vue";
import { Component, Vue } from "vue-property-decorator";
type order = {
  orderid: Number;
  orderuuid: String;
  goods: String;
  // orderTotalPrice: number;
  orderStatus: orderStatus;
  username: string;
  useruuid: string;
};

enum orderStatus {
  已付款 = 0,
  已拒绝 = 1,
  已发货 = 2,
}

@Component({
  components: { Title },
})
export default class OrdersManage extends Vue {
  public orders: Array<order> = [];
}
</script>
