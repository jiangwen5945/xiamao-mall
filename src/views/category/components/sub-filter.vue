<!-- 筛选模块组件 -->
<template>
  <div class="sub-filter" v-if="filterData">
    <!-- 品牌筛选 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <span
          :class="{active:filterData.selectedBrand===brand.id}"
          v-for="brand in filterData.brands"
          :key="brand.id"
          @click='changeBrand(brand.id)'
        >
          {{brand.name}}
        </span>
      </div>
    </div>
    <!-- 其他属性筛选 -->
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{p.name}}：</div>
      <div class="body">
        <span
          :class="{active:p.selectedProp===attr.id}"
          v-for="attr in p.properties"
          :key="attr.id"
          @click='changeAttr(p, attr.id)'
        >
          {{attr.name}}
        </span>
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <JSkeleton class="item" width="800px" height="40px"  />
    <JSkeleton class="item" width="800px" height="40px"  />
    <JSkeleton class="item" width="700px" height="40px"  />
    <JSkeleton class="item" width="700px" height="40px"  />
    <JSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import Api from '@/api'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const filterData = ref(null)
    const route = useRoute()
    // 监听二级分类的ID变动
    watch(() => route.params.id, (newVal, oldVa) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        Api.findSubCategoryFilter(route.params.id).then(res => {
          // 品牌: 默认勾选全部
          res.selectedBrand = null // 品牌添加selectedBrand属性
          res.brands.unshift({ id: null, name: '全部' })
          // 其他属性: 默认勾选全部
          res.saleProperties.forEach(p => {
            p.selectedProp = null // 其他添加selectedProp属性
            p.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = res
          // console.log('filterData', filterData)
        })
      }
    }, { immediate: true })

    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedProp)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      console.log('当前筛选参数', filterParams)
      return filterParams
    }
    // 选择品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 选中属性
    const changeAttr = (p, attrId) => {
      if (p.selectedProp === attrId) return
      p.selectedProp = attrId
      emit('filter-change', getFilterParams())
    }
    return { filterData, changeBrand, changeAttr }
  }
}
</script>
<style scoped lang="less">
 .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        span {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          cursor: pointer;
          &.active,
          &:hover {
            color: @themeColor;
          }
        }
      }
    }
  }
</style>
