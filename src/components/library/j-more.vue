<template>
  <RouterLink :to="path" class="j-more" >
    <j-icon iconClass="arrow-right"  size="24" fontSize="16px">
      <template v-slot:before>查看全部</template>
    </j-icon>
  </RouterLink>
</template>

<script>
export default {
  name: 'JMore',
  props: {
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped lang='less'>
</style>
