<template>
  <div class="container">
    <MemberAside />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>

<script>
import MemberAside from './home/components/MemberAside.vue'
export default {
  name: 'MemberLayout',
  components: {
    MemberAside
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
