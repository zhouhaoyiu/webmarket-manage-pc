<template>
  <div>
    <Title>订单管理</Title>
    <div style="width: 20%; margin-bottom: 20px">
      <el-input v-model="searchUserName" placeholder="请输入用户名"></el-input>
    </div>
    <el-table :data="filterOrders" border stripe style="width: 100%">
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
      <el-table-column align="center" label="订单uuid" prop="orderuuid">
      </el-table-column>
      <el-table-column align="center" label="信息">
        <template v-slot="scope">
          {{
            scope.row.orderStatus === 0
              ? "未完成"
              : scope.row.orderStatus === 2
              ? `备注: ${scope.row.remarks}`
              : `原因: ${scope.row.refuseReason}`
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <div
            v-if="scope.row.orderStatus === 0"
            style="display: flex; width: 100%"
          >
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
          <div v-else-if="scope.row.orderStatus === 1" style="color: red">
            已拒绝
          </div>
          <div v-else-if="scope.row.orderStatus === 2" style="color: green">
            已通过
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="acceptDialog" title="通过订单">
      <el-input v-model="remarks" placeholder="请输入备注"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="acceptDialog = false">取 消</el-button>
        <el-button type="primary" @click="acceptOrderConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible="refuseDialog" title="拒绝订单">
      <el-input v-model="refuseReason" placeholder="请输入拒绝原因"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseDialog = false">取 消</el-button>
        <el-button type="primary" @click="refuseDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Title from "@/components/title.vue";
import { addAdminLog } from "@/utils/addAdminLog";
import { Component, Vue, Watch } from "vue-property-decorator";
type order = {
  orderid: Number;
  orderuuid: string;
  goods: string;
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
  public searchUserName: string = "";
  public filterOrders: order[] = [];

  public orders: Array<order> = [];
  public acceptDialog: boolean = false;
  public refuseDialog: boolean = false;

  public remarks: string = "";
  public refuseReason: string = "";
  public dialogInfo: order = {
    orderid: 0,
    orderuuid: "",
    goods: "",
    orderStatus: orderStatus.已付款,
    username: "",
    useruuid: "",
  };

  @Watch("searchUserName")
  public onSearchUserNameChange() {
    this.filterOrders = this.orders.filter((order) => {
      return order.username.includes(this.searchUserName);
    });
  }

  public async mounted(): Promise<void> {
    const orders = await this.axios.get("/order/getAllOrder");
    if (orders.data.code === 1) {
      this.orders = window._.cloneDeep(orders.data.data).sort(
        (a: { orderid: number }, b: { orderid: number }) =>
          b.orderid - a.orderid
      );
      this.filterOrders = window._.cloneDeep(this.orders);
      this.$message.success("获取订单成功");
    }
  }

  public getGoodNames(goods: Array<any>): Array<string> {
    return goods.map((item) => item.goodName + ` *${item.goodNumber}`);
  }

  public getTotalPrice(goods: Array<any>): number {
    return goods
      .map((item) => item.goodPrice * item.goodNumber)
      .reduce((a, b) => a + b);
  }

  public acceptOrder(order: order): void {
    this.acceptDialog = true;
    this.dialogInfo = order;
  }

  public async acceptOrderConfirm(): Promise<void> {
    const res = await this.axios.get("/order/setOrderStatus", {
      params: {
        orderGoods: JSON.stringify(
          JSON.parse(this.dialogInfo.goods).map(
            (item: { goodNumber: any; goodId: any }) => {
              return { orderGoodsNumber: item.goodNumber, goodId: item.goodId };
            }
          )
        ),
        orderuuid: this.dialogInfo.orderuuid,
        orderStatus: orderStatus.已发货,
        remarks: this.remarks,
      },
    });
    if (res.data.code === 1) {
      this.$message.success(res.data.msg);
      this.resetInfo();
      this.acceptDialog = false;
      await addAdminLog("通过订单", this.dialogInfo.orderuuid);
      this.$forceUpdate();
    } else {
      this.$message.error(res.data.msg);
    }
  }

  public refuseOrder(order: order): void {
    this.refuseDialog = true;
    this.dialogInfo = order;
  }

  public async refuseDialogConfirm(): Promise<void> {
    const res = await this.axios.get("/order/setOrderStatus", {
      params: {
        orderGoods: JSON.stringify(
          JSON.parse(this.dialogInfo.goods).map(
            (item: { goodNumber: any; goodId: any }) => {
              return { orderGoodsNumber: item.goodNumber, goodId: item.goodId };
            }
          )
        ),
        orderuuid: this.dialogInfo.orderuuid,
        orderStatus: orderStatus.已拒绝,
        refuseReason: this.refuseReason,
      },
    });
    if (res.data.code === 1) {
      this.$message.success(res.data.msg);
      this.resetInfo();
      await addAdminLog("拒绝订单", this.dialogInfo.orderuuid);
      this.refuseDialog = false;
      this.$forceUpdate();
    } else {
      this.$message.error(res.data.msg);
    }
  }

  public resetInfo = (): void => {
    this.remarks = "";
    this.refuseReason = "";
    this.dialogInfo = {
      orderid: 0,
      orderuuid: "",
      goods: "",
      orderStatus: 0,
      username: "",
      useruuid: "",
    };
  };
}
</script>
