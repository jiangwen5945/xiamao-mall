<template>
  <!--头部商品导航-->
  <div class="stick-container" :class="{show:y>=138}">
    <div class="header-wrap" v-show="y>=138">
      <!--左侧logo区-->
      <router-link to="/" class="header-logo"> <img class="logo-img" :src="require('@/assets/images/logo.png')" />
        <img class="slogan-img" :src="require('@/assets/images/slogan.gif')" />
      </router-link>
      <!-- 商品标题 -->
      <div class="header-nav"  @mouseenter="setHideMenu(false)" @mouseleave="setHideMenu(true)">
        <span @mouseenter="setSubMenu(item.children)" v-for="(item, index) in categoryList" :key="index" :data-index="index">
          <router-link class="title"  :to="/category/+item.id">{{ item.name || item }}</router-link>
        </span>
        <transition>
          <div class="menu-wrapper" v-show="!hideMenu">
            <div class="menu-list">
              <div class="menu-item" v-for="subItem in subMenuData" :key="subItem.id">
                <img :src="subItem.picture" />
                <a>{{ subItem.name }}</a>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 其他 -->
      <div class="other">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'StickyHeader',
  props: {
    categoryList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup () {
    const hideMenu = ref(true)
    const subMenuData = ref(null)
    const setHideMenu = (isShow) => {
      hideMenu.value = isShow
    }
    const setSubMenu = (item) => {
      subMenuData.value = item
    }

    const { y } = useWindowScroll()
    return {
      hideMenu,
      setHideMenu,
      setSubMenu,
      subMenuData,
      y
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
  // opacity: 0;
  height: 0px !important;
  // animation-name: animate__fadeOutUp;
  // animation-duration: 0.5s;
}

// 元素进入结束的状态｜元素开始离开的状态 （这里不写也可以！）
// .v-enter-to, .v-leave-from {}
.stick-container {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  z-index: 999;
  transform: translateY(-100%);
  opacity: 1;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .header-wrap {
    display: flex;
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

        .title {
          text-align: center;
          font-size: 16px;
          color: rgb(51, 51, 51);
          // 溢出隐藏
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &:hover {
            color: @baseColor;
          }
        }
      }

      .menu-wrapper {
        width: 100%;
        height: 250px;
        position: absolute;
        top: 80px;
        left: 0;
        z-index: 100;
        overflow: hidden;

        .menu-list {
          height: 210px;
          width: 1240px;
          background: rgb(255, 255, 255);
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
          z-index: 100;
          overflow: hidden;
          margin: 10px auto;
          display: flex;
          justify-content: space-around;
          .menu-item {
            width: 100%;
            padding: 40px 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    .other {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 40px;
      a{
        &:first-child{
          border-left: 2px solid @baseColor;
          padding: 0 50px;
        }
      }
    }
  }
}
</style>
