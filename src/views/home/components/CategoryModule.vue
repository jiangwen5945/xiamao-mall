<template>
   <div class="category-container">
      <div class="category-wrap">
        <!--轮播区左侧开始-->
        <div class="category-list" @mouseenter="setSubMenuHide(false)" @mouseleave="setSubMenuHide(true)">
          <ul  @mouseenter="setSubMenuData(item.goods)" :key="index" v-for="(item, index) in categoryList">
            <li class="category-item" v-if="item">
              {{item.name || item}}
              <j-icon iconClass="arrow-right" color="#fff"/>
            </li>
            <li class="category-item" v-else>
              <jSkeleton width="150px" height="18px" style="margin-right:10px" bg="rgba(255,255,255,0.2)" :animated="true"/>
              <jSkeleton width="20px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" :animated="false"/>
            </li>
          </ul>
          <ul class="sub-menu" v-show="!isHideSubMenu">
              <li v-for="goods in subMenuData" :key="goods.id" @click="$router.push(`/product/${goods.id}`)">
                <img :src="goods.picture" />
                <span class="goods-info">
                  <p class="ellipsis">{{goods.name}}</p>
                  <p class="price">¥{{goods.price}}</p>
                </span>
              </li>
          </ul>
        </div>

        <!--轮播区中间开始-->
        <div class="category-middle">
          <j-carousel :sliders="sliderList" autoPlay/>
        </div>

        <!--轮播区底部开始-->
        <ul class="category-bottom">
          <li class="icon-wrapper">
            <a class="icon-item" v-for="(item,index) in iconList" :key="index">
              <span><j-icon :iconClass="item.icon" size="22px"/></span>
              <span>{{item.title}}</span>
            </a>
          </li>
          <li v-for="item in imgRecommends" :key="item.id">
            <img :src="item.imgUrl"/>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
// import { useStore } from 'vuex'
export default {
  props: {
    categoryList: {
      type: Array,
      default: () => {
        return []
      }
    },
    sliderList: {
      type: Array,
      default: () => []
    },
    imgRecommends: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // const store = useStore()
    // 图标列表
    const iconList = [
      { icon: 'pinpai', title: '品牌' },
      { icon: 'icon', title: '口碑' },
      { icon: 'shoucang', title: '收藏' },
      { icon: 'Field-time', title: '时效' },
      { icon: 'huiyuan', title: '会员' },
      { icon: 'gongzhonghao', title: '公众号' }
    ]
    // 获取分类数据
    // const categoryList = computed(() => store.state.categoryList)
    // 控制分类二级菜单显示隐藏
    const isHideSubMenu = ref(true)
    const setSubMenuHide = (isHide) => {
      isHideSubMenu.value = isHide
    }
    // 设置分类二级菜单数据
    const subMenuData = ref()
    const setSubMenuData = (data) => {
      subMenuData.value = data
    }
    return {
      isHideSubMenu,
      setSubMenuHide,
      subMenuData,
      setSubMenuData,
      iconList
    }
  }
}
</script>

<style lang="less" scoped>
.category-container {
  width: 100%;
  background: #fff;
}

.category-wrap {
  width: @baseWidth;
  height: 644px;
  margin: 0 auto;
  position: relative;
  // 轮播图
  .category-middle{
    width: 100%;
    height: 450px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  // 分类列表
  .category-list {
    width: 234px;
    height: 450px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    padding-top: 10px;
    position: relative;
    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 42px;
      height: 42px;
      font-size: 14px;
      color: #fff;
      padding: 0 24px;
      z-index: 2;
      overflow: hidden;
      &:hover {
          background-color: @themeColor;
      }
    }
    .sub-menu {
      display: flex;
      flex-flow: column wrap;
      align-content: flex-start;
      width: 1006px;
      overflow: hidden;
      height: 450px;
      position: absolute;
      left: 234px;
      top: 0;
      background-color: #fff;
      z-index: 2;
      box-shadow: 1px 1px 7px #938c83;
      li {
        display: flex;
        align-items: center;
        width: 220px;
        height: 72px;
        margin: 6px;
        box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
        font-size: 12px;
        .goods-info{
          flex: 1;
          overflow: hidden;
          .price {
            color: red;
            margin-top: 8px;
          }
        }
        img {
          width: 60px;
          height: 60px;
          margin: 0 10px;
        }
        &:hover {
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
      }
    }
  }
  // 分类底部区域
  .category-bottom {
    display: flex;
    width: @baseWidth;
    height: 170px;
    margin-top: 14px;
    justify-content: space-between;
    li {
        &:nth-child(1) {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          align-content: space-evenly;
          width: 234px;
          background: #5f5750
        }
        img {
          width: 316px;
          height: 170px;
          object-fit: cover;//转化不同类型
        }
        .icon-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 66px;
          height: 73px;
          color: rgb(207, 205, 203);
          font-size: 12px;
          text-align: center;
          &:hover{
            color: #fff
          }
          span {
            margin: 4px 0;
          };
        }
    }
  }
}
</style>
