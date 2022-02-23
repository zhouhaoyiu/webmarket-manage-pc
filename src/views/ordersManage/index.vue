<template>
  <div>
    <Title>订单管理</Title>
  </div>
</template>
<script lang="ts">
import Title from "@/components/title.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Title },
})
export default class OrdersManage extends Vue {}
</script>
