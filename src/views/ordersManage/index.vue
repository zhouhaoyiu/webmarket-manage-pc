<template>
  <div>
    <Title>订单管理</Title>
    <el-table :data="orders" border stripe style="width: 100%">
      <el-table-column align="center" label="订单商品">
        <template v-slot="scope">
          <div>
            <div
              v-for="(goodname, index) in getGoodNames(
                JSON.parse(scope.row.goods)
              )"
              :key="index"
            >
              {{ goodname }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单总价">
        <template v-slot="scope">
          <div>
            {{ getTotalPrice(JSON.parse(scope.row.goods)) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单日期" prop="orderdate">
      </el-table-column>
      <el-table-column align="center" label="收货地址" prop="orderaddress">
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
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <div style="display: flex; width: 100%">
            <el-button
              @click="acceptOrder(scope.row)"
              size="mini"
              round
              type="primary"
              style="font-size: 16px !important"
            >
              通过
            </el-button>
            <el-button
              @click="refuseOrder(scope.row)"
              round
              size="mini"
              type="danger"
              style="font-size: 16px !important"
            >
              拒绝
            </el-button>
          </div>
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

  public async mounted(): Promise<void> {
    const orders = await this.axios.get("/order/getAllOrder");
    if (orders.data.code === 1) {
      this.orders = window._.cloneDeep(orders.data.data);
      this.$message.success("获取订单成功");
    }
    console.log(this.orders);
  }

  public getGoodNames(goods: Array<any>): Array<string> {
    // console.log(goods.map((item) => item.goodName + ` *${item.goodNumber}`));
    return goods.map((item) => item.goodName + ` *${item.goodNumber}`);
  }

  public getTotalPrice(goods: Array<any>): number {
    // console.log(JSON.stringify(goods, null, 2));
    return goods
      .map((item) => item.goodPrice * item.goodNumber)
      .reduce((a, b) => a + b);
  }

  public acceptOrder(order: order): void {}

  public refuseOrder(order: order): void {}
}
</script>
