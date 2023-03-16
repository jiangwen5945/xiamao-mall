<template>
  <div class="j-empty" data-v-104d6efd="">
    <div class="j-empty__image" :style="{ width: imageSize }">
      <img src="@/assets/images/none.png" alt="">
    </div>
    <p>{{description}}</p>
  </div>
</template>

<script>
export default {
  name: 'JEmpty',
  props: {
    description: {
      type: String,
      default: '内容为空'
    },
    imageSize: {
      type: String,
      default: '100px'
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.j-empty{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding: 40px 0;
  img {
    user-select: none;
    width: 100%;
    height: 100%;
    vertical-align: top;
    -o-object-fit: contain;
    object-fit: contain;
  }
  p {
    color: #999;
  }
}
</style>
