<template>
  <div>
    <Title>用户统计</Title>
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