<template>
  <!--头部商品导航-->
  <div class="header-container">
    <HeaderNav/>
    <div class="site-header">
      <!--左侧logo区-->
      <router-link to="/" class="header-logo"> <img class="logo-img" :src="require('@/assets/images/logo.png')" />
        <img class="slogan-img" :src="require('@/assets/images/slogan.gif')" />
      </router-link>
      <!-- 商品标题 -->
      <ul class="header-nav" @mouseleave="setHideMenu(true)">
        <li
          @mousemove="setSubMenu(item.children)"
          v-for="(item, index) in categoryList"
          :key="index" :data-index="index"
           @click="active=index"
        >
          <router-link class="title" :class="{active: active === index }"  :to="/category/+item.id">{{ item.name || item }}</router-link>
        </li>
        <transition>
          <div class="menu-wrapper" v-show="!hideMenu">
            <div class="menu-list">
              <div class="menu-item"
                v-for="subItem in subMenuData"
                :key="subItem.id"
                @click="goCategorySub(subItem)"
              >
                <img :src="subItem.picture" />
                <a>{{ subItem.name }}</a>
              </div>
            </div>
          </div>
        </transition>
      </ul>

      <!--右边查询区-->
      <div class="header-search">
        <j-input v-model="queryData" class="search" placeholder="请输入查询商品名称" suffix-icon="search" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import HeaderNav from '@/components/HeaderNav.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'CommonHeader',
  components: { HeaderNav },
  props: {
    categoryList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup () {
    const router = useRouter()
    const active = ref(null)
    const queryData = ref('')
    const hideMenu = ref(true)
    const subMenuData = ref(null)
    const setHideMenu = (isShow) => {
      hideMenu.value = isShow
    }
    const setSubMenu = (item) => {
      hideMenu.value = false
      subMenuData.value = item.slice(0, 8)
    }
    const goCategorySub = (subItem) => {
      router.push(`/category/sub/${subItem.id}`)
      hideMenu.value = true
    }
    return {
      active,
      queryData,
      hideMenu,
      setHideMenu,
      setSubMenu,
      subMenuData,
      goCategorySub
    }
  }
}
</script>

<style lang="less" scoped>
// 元素进入｜结束时，过渡的效果
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

// 元素开始进入的状态|元素离开结束的状态
.v-enter-from, .v-leave-to {
  opacity: 0;
  height: 0px !important;
}
.header-container {
  position: relative;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;

  .site-header {
    display: flex;
    justify-content: space-between;
    width: 1240px;
    height: 90px;
    margin: 0 auto;
    .header-logo {
      flex: 0 0 230px;
      display: flex;
      align-items: center;

      .logo-img {
        width: 60px;
        height: 60px;
      }

      .slogan-img {
        width: 100px;
        height: 60px;
      }
    }

    // 商品标题
    .header-nav {
      flex: 1 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 696px;

      li {
        height: 100%;
        padding: 0 10px;
        max-width: 80px;
        text-align: center;
        display: flex;
        align-items: center;
        color: red;
        .title {
          text-align: center;
          font-size: 16px;
          color: rgb(51, 51, 51);
          // 溢出隐藏
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            color: @themeColor;
            border-bottom: 1px solid  @themeColor
          }
        }
        .active{
          color: @themeColor;
            border-bottom: 1px solid  @themeColor
        }
      }

      .menu-wrapper {
        width: 100%;
        position: absolute;
        top: 120px;
        left: 0;
        z-index: 100;
        .menu-list {
          display: flex;
          // justify-content: space-around;
          height: 166px;
          width: 1240px;
          background: rgb(255, 255, 255);
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          z-index: 100;
          overflow: hidden;
          margin: 10px auto;
          .menu-item {
            width: 150px;
            height: 150px;
            padding: 16px;
            text-align: center;
            &:not(:nth-child(6n)) {
              margin-right: calc(22% / 4);
            }
            img {
              width: 100%;
              height: 100%;
              margin-bottom: 4px;
            }
          }
        }
      }
    }

    // 右边查询区
    .header-search {
      flex: 0 0 300px;
      width: 300px;
      position: relative;
      .search {
        width: 200px;
        height: 50px;
        margin: 20px 0;
        float: right;
      }
    }
  }
}
</style>
