<template>
  <header class="login-header">
    <div class="container">
      <img src="../../../assets/images/logo.png" class="logo">
      <h3 class="sub"><slot /></h3>
      <RouterLink class="entry" to="/">
        <j-icon iconClass="arrow-right"  size="24" fontSize="16px">
          <template v-slot:before>进入网站首页</template>
        </j-icon>
      </RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LoginHeader'
}
</script>

<style scoped lang='less'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 10px;
  }
  .logo {
    width: 100px;
  }
  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
    text-align: left;
  }
  .entry {
    margin-bottom: 38px;
  }
}
</style>
