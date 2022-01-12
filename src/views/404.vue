<template>
  <div>
    <div>
      404
      <button @click="$router.back(-1)">返回</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped></style>
