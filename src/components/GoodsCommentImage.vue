<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        :class="{active:currImage===url}"
        @click="currImage=url"
        v-for="url in pictures"
        :key="url"
      >
        <img :src="url" alt="">
      </a>
    </div>
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="">
      <span @click="currImage=null">
        <j-icon iconClass="close" color="#fff" size="30"/>
      </span>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'GoodsCommentImage',
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currImage = ref(null)
    return { currImage }
  }
}
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border:1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @themeColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    span {
      position: absolute;
      right: 0;
      top: 0;
      background: rgba(0,0,0,0.2);
    }
  }
}
</style>
