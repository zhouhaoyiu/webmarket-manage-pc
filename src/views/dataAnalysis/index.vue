<template>
  <div>
    <Title>数据分析</Title>
    <div>
      <el-radio-group v-model="echartsDom">
        <el-radio-button
          :disabled="orders.length === 0"
          label="orderCountByTime"
          >销量/时间</el-radio-button
        >
        <el-radio-button
          :disabled="orders.length === 0"
          label="orderCountByGood"
          >销量/商品分类</el-radio-button
        >
        <el-radio-button
          :disabled="userLog.length === 0"
          label="visitCountByTime"
          >访问量/时间</el-radio-button
        >
        <el-radio-button
          :disabled="userLog.length === 0"
          label="visitCountByGoodName"
          >访问量/商品名称</el-radio-button
        >
        <el-radio-button
          :disabled="userLog.length === 0"
          label="visitCountByGoodClassification"
          >访问量/商品分类</el-radio-button
        >
      </el-radio-group>
    </div>
    <div>
      <div
        id="echartDomBox"
        class="orderCountByTime"
        v-show="echartsDom === 'orderCountByTime'"
      ></div>
      <div
        id="echartDomBox"
        class="orderCountByGood"
        v-show="echartsDom === 'orderCountByGood'"
      ></div>
      <div
        id="echartDomBox"
        class="visitCountByTime"
        v-show="echartsDom === 'visitCountByTime'"
      ></div>
      <div
        id="echartDomBox"
        class="visitCountByGoodName"
        v-show="echartsDom === 'visitCountByGoodName'"
      ></div>
      <div
        id="echartDomBox"
        class="visitCountByGoodClassification"
        v-show="echartsDom === 'visitCountByGoodClassification'"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Title from "@/components/title.vue";
import Vue from "vue";
import Component from "vue-class-component";

import * as echarts from "echarts";
import dayjs from "dayjs";
import { Watch } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: { Title },
})
export default class DataAnalysis extends Vue {
  public echartsDom = "";
  public orders = [];
  public userLog = [];

  public async mounted() {
    this.echartsDom = "orderCountByTime";
    const res = await this.axios.get("/userLog/getAllUserLog");
    if (res.data.code === 1) {
      this.userLog = res.data.data;
    }
  }

  @Watch("echartsDom")
  public echartsDomChange(val: string) {
    setTimeout(() => {
      this.resetDom(val);
    }, 0);
  }

  public resetDom(val: string) {
    if (val === "orderCountByTime") {
      this.orderCountByTime();
    } else if (val === "orderCountByGood") {
      this.orderCountByGoodName();
    } else if (val === "visitCountByTime") {
      this.visitCountByTime();
    } else if (val === "visitCountByGoodName") {
      this.visitCountByGoodName();
    } else if (val === "visitCountByGoodClassification") {
      this.visitCountByGoodClassification();
    }
  }

  public async orderCountByTime() {
    const res = await this.axios.get("/order/getAllOrder");
    this.orders = res.data.data;
    const successOrder = this.orders.filter(
      (i: { orderStatus: number }) => i.orderStatus === 2
    );
    const data = successOrder.map((i: { goods: string; orderdate: any }) => {
      return [
        JSON.parse(i.goods).reduce((a: number, b: { goodNumber: number }) => {
          return a + b.goodNumber;
        }, 0),
        i.orderdate,
      ];
    });

    const goodNumerTotalByOrderDate = data
      .map((i) => {
        return [i[0], dayjs(i[1]).format("YYYY-MM-DD")];
      })
      .reduce((a: any, b: any) => {
        a[b[1]] = a[b[1]] ? a[b[1]] + b[0] : b[0];
        return a;
      }, {});

    const xAxis = Object.keys(goodNumerTotalByOrderDate);
    const yAxis = Object.values(goodNumerTotalByOrderDate);

    const myChart = echarts.init(
      document.querySelector(".orderCountByTime")! as HTMLElement
    );

    myChart.setOption({
      title: {
        text: "销量/时间",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yAxis,
          type: "line",
        },
      ],
    });
  }

  public orderCountByGoodName() {
    const successOrder = this.orders.filter(
      (i: { orderStatus: number }) => i.orderStatus === 2
    );

    const data = successOrder.map((i: { goods: string }) => {
      return JSON.parse(i.goods);
    });

    const goodNumberTotelByGoodName = data.flat().reduce((a: any, b: any) => {
      a[b.goodName] = a[b.goodName]
        ? a[b.goodName] + b.goodNumber
        : b.goodNumber;
      return a;
    }, {});

    const xAxis = Object.keys(goodNumberTotelByGoodName);
    const yAxis = Object.values(goodNumberTotelByGoodName);

    const myChart = echarts.init(
      document.querySelector(".orderCountByGood")! as HTMLElement
    );

    myChart.setOption({
      title: {
        text: "销量/商品分类",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yAxis,
          type: "bar",
        },
      ],
    });
  }

  public visitCountByTime() {
    const xAxis = Object.keys(
      this.userLog
        .map((i: { logtime: string }) => dayjs(i.logtime).format("YYYY-MM-DD"))
        .reduce((a: any, b: any) => {
          a[b] = a[b] ? a[b] + 1 : 1;
          return a;
        }, {})
    );

    const yAxis = Object.values(
      this.userLog
        .map((i: { logtime: string }) => dayjs(i.logtime).format("YYYY-MM-DD"))
        .reduce((a: any, b: any) => {
          a[b] = a[b] ? a[b] + 1 : 1;
          return a;
        }, {})
    );

    const myChart = echarts.init(
      document.querySelector(".visitCountByTime")! as HTMLElement
    );

    myChart.setOption({
      title: {
        text: "访问量/时间",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yAxis,
          type: "line",
        },
      ],
    });
  }

  public visitCountByGoodName(): void {
    const xAxis = Object.keys(
      this.userLog
        .filter((i: { type: string }) => i.type === "查看商品")
        .map((i: { gid: number }) => i.gid)
        .reduce((a: Record<number, number>, b: number) => {
          a[b] = a[b] ? a[b] + 1 : 1;
          return a;
        }, {})
    ).map((i: string) => {
      return (
        this.$store.state.goodsList.find(
          (j: { goodId: number }) => j.goodId === +i
        )?.goodName || "错误分类"
      );
    });

    const yAxis = Object.values(
      this.userLog
        .filter((i: { type: string }) => i.type === "查看商品")
        .map((i: { gid: number }) => i.gid)
        .reduce((a: any, b: any) => {
          a[b] = a[b] ? a[b] + 1 : 1;
          return a;
        }, {})
    );

    const myChart = echarts.init(
      document.querySelector(".visitCountByGoodName")! as HTMLElement
    );

    myChart.setOption({
      title: {
        text: "访问量/商品名称",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yAxis,
          type: "bar",
        },
      ],
    });
  }

  public visitCountByGoodClassification() {
    const xAxis = Object.keys(
      this.userLog
        .filter((i: { type: string }) => i.type === "查看分类")
        .map((i: { gid: number }) => i.gid)
        .reduce((a: any, b: any) => {
          a[b] = a[b] ? a[b] + 1 : 1;
          return a;
        }, {})
    ).map((i: string) => {
      return (
        this.$store.state.goodsClassificationList.find(
          (j: { classificationId: number }) => j.classificationId === +i
        )?.classificationName || "错误分类"
      );
    });

    const yAxis = Object.values(
      this.userLog
        .filter((i: { type: string }) => i.type === "查看分类")
        .map((i: { gid: number }) => i.gid)
        .reduce((a: any, b: any) => {
          a[b] = a[b] ? a[b] + 1 : 1;
          return a;
        }, {})
    );

    const myChart = echarts.init(
      document.querySelector(".visitCountByGoodClassification")! as HTMLElement
    );

    myChart.setOption({
      title: {
        text: "访问量/商品分类",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yAxis,
          type: "bar",
        },
      ],
    });
  }
}
</script>

<style lang="scss" scoped>
#echartDomBox {
  margin: 100px auto;
  width: 100%;
  height: 500px;
}
</style>
