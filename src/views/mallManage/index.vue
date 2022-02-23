<template>
  <div>
    <Title>商城管理</Title>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Title from "../../components/title.vue";
@Component({
  components: {
    Title,
  },
})
export default class MallManage extends Vue{

}
</script>

<style lang="scss" scoped>

</style>