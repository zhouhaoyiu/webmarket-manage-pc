<template>
  <div>
    <Title>个人信息</Title>
    <div class="infoList">
      <div class="infoCard">
        <div class="infoTitle">用户名</div>
        <div class="infoText">{{ userName }}</div>
      </div>
      <div class="infoCard">
        <div class="infoTitle">邮箱</div>
        <div class="infoText">{{ userInfo.emailAddress }}</div>
      </div>
      <div class="infoCard">
        <div class="infoTitle">手机号</div>
        <div class="infoText">{{ userInfo.phoneNumber }}</div>
      </div>
      <div class="infoCard">
        <div class="infoTitle">身份</div>
        <div class="infoText">
          {{ userInfo.adminRole === 0 ? "超级管理员" : "管理员" }}
        </div>
      </div>
    </div>
    <div class="infoBigList">
      <div class="infoBigCard">
        <div class="infoTitle">操作记录</div>
        <div class="infoLogTable">
          <div
            class="infoLog"
            v-for="(log, logIndex) in myLogArray"
            :key="logIndex"
          >
            <div class="logTime">{{ log.logTime }}</div>
            <div class="logInfo">{{ log.info }}</div>
          </div>
        </div>
      </div>
      <div class="infoBigCard">
        <div class="infoTitle">
          <div>操作分析</div>
          <el-radio-group v-model="chartsDom">
            <el-radio-button label="classificationAna"
              >分类分析</el-radio-button
            >
            <el-radio-button label="timeAna">时间分析</el-radio-button>
          </el-radio-group>
        </div>
        <div
          v-show="chartsDom === 'classificationAna'"
          id="echartsDom"
          class="infoAnalysisChartDomClassification"
        ></div>
        <div
          v-show="chartsDom === 'timeAna'"
          id="echartsDom"
          class="infoAnalysisChartDomTime"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { adminInfoType, adminLog } from "@/types/type";
import { GET_ADMIN_INFO } from "@/store/type/getter-type";
import Title from "../../components/title.vue";
import * as echarts from "echarts";
import { Watch } from "vue-property-decorator";
@Component({
  components: {
    Title,
  },
})
export default class userInfo extends Vue {
  public myLogArray: adminLog[] = [];
  public chartsDom: string = "";

  @Watch("chartsDom")
  public async chartsDomChange(val: string): Promise<void> {
    setTimeout(() => {
      if (val === "classificationAna") {
        this.classificationAna();
      } else if (val === "timeAna") {
        this.timeAna();
      }
    }, 0);
  }

  public classificationAna() {
    const classificationChart = echarts.init(
      document.querySelector(
        ".infoAnalysisChartDomClassification"
      ) as HTMLDivElement
    );

    classificationChart.setOption({
      title: {
        text: "操作分类分析",
      },
      tooltip: {},
      legend: {
        data: ["操作次数"],
      },
      xAxis: {
        data: ["添加商品", "添加商品分类", "处理订单", "添加商品属性值"],
      },
      yAxis: {},
      series: [
        {
          name: "操作次数",
          type: "bar",
          data: [
            this.myLogArray.filter((item) => item.info === "添加商品").length,
            this.myLogArray.filter((item) => item.info === "添加商品分类")
              .length,
            this.myLogArray.filter((item) => item.info === "处理订单")
              .length,
            this.myLogArray.filter((item) => item.info === "添加商品属性值")
              .length, // 添加商品属性值
          ],
        },
      ],
    });
  }

  public timeAna() {
    const timeChart = echarts.init(
      document.querySelector(".infoAnalysisChartDomTime") as HTMLDivElement
    );
    const operationsCountByDay = this.myLogArray.reduce((acc, cur) => {
      const date = new Date(cur.logTime);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month}-${day}`;
      if (acc[key]) {
        acc[key] += 1;
      } else {
        acc[key] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });
    const xAxisData = Object.keys(operationsCountByDay);
    timeChart.setOption({
      title: {
        text: "操作时间分析",
      },
      tooltip: {},
      legend: {
        data: ["操作次数"],        
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: "category",
        data: xAxisData,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: "操作次数",
          type: "bar",
          data: Object.values(operationsCountByDay),
        },
      ],
    });
    console.log(
      this.myLogArray.map((item) => {
        return item;
      })
    );
  }

  async mounted(): Promise<void> {
    const res = await this.axios.get("/adminLog/getAdminLogByAdminUUid", {
      params: {
        adminUUid: this.$store.getters[GET_ADMIN_INFO].adminUUid,
      },
    });
    if (res.data.code === 1) {
      this.myLogArray = window._.cloneDeep(res.data.data);
      this.chartsDom = "classificationAna";
    }
  }
  get userInfo(): adminInfoType {
    return this.$store.getters[GET_ADMIN_INFO];
  }

  get userName(): string {
    return this.$store.getters[GET_ADMIN_INFO].userName;
  }
}
</script>

<style lang="scss" scoped>
.infoList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  .infoCard {
    width: 340px;
    height: 190px;
    padding: 40px;
    margin-top: 20px;
    margin-left: 20px;
    background: #fff;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    // border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    .infoTitle {
      font-size: 32px;
      font-weight: bold;
    }
    .infoText {
      font-size: 24px;
      color: #666;
    }
  }
}
.infoBigList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  .infoBigCard {
    width: 47%;
    height: 450px;
    padding: 40px;
    margin-top: 20px;
    margin-left: 20px;
    background: #fff;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.05);
    align-items: left;

    .infoTitle {
      font-size: 24px;
      font-weight: bold;
    }
    .infoLogTable {
      width: 100%;
      height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      .infoLog {
        width: 400px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: left;
        margin-top: 10px;
        .logTime {
          font-size: 18px;
          color: #666;
        }
        .logInfo {
          font-size: 18px;
          color: #666;
        }
      }
    }
    #echartsDom {
      width: 100%;
      height: 300px;
      top: 10%;
    }
    .infoText {
      font-size: 24px;
      color: #666;
    }
  }
}
</style>
