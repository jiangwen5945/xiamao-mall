<template>
<div class="goods-sku">
  <dl v-for="spec in goods.specs" :key="spec.name">
    <dt>{{spec.name}}</dt>
    <span class="spec-wrap">
      <dd  v-for="val in spec.values" :key="val.name" :class="{selected:val.selected, disabled:val.disabled}">
        <img @click="clickSpecs(spec, val)" v-if="val.picture" :src="val.picture" :title="val.name">
        <span @click="clickSpecs(spec, val)" v-else>{{val.name}}</span>
      </dd>
    </span>
  </dl>
</div>
</template>

<script>
import getPowerSet from '@/vender/power-set'
const spliter = '★'
// 根据skus数据得到路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach(sku => {
  // 1. 过滤出有库存有效的sku
    if (sku.inventory) {
      // 2. 得到sku的规格属性值数组
      const specs = sku.specs.map(spec => spec.valueName)
      // 3. 得到sku属性值数组的子集
      const powerSet = getPowerSet(specs)
      // 4. 设置给路径字典对象
      powerSet.forEach(arr => {
        // 根据子集数组得到字符串的key,例：['蓝色', '中国'] ===> '蓝色★中国'
        const key = arr.join(spliter)
        // 如果存在key则在数组中追加,没有key则赋值一个新数组
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 得到当前选中规格集合
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach(spec => {
    // 获取规格数组中为已选中的规格
    const selectedVal = spec.values.find(e => e.selected)
    // 将规格名称添加到已选中数组selectedArr中
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}
// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    // 获取已选中数组
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach(e => {
      // 已经选中的按钮不用判断
      if (e.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = e.name
      // 过滤无效值得到key
      const key = selectedArr.filter(v => v).join(spliter)
      // 设置禁用状态
      e.disabled = !pathMap[key]
    })
  })
}
// 初始化选中状态
const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find(sku => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName
      spec.values.forEach(val => {
        val.selected = val.name === value
      })
    })
  }
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    console.log('当前商品skus路径字典', pathMap)
    // 根据传入的skuId默认选中规格按钮
    initSelectedStatus(props.goods, props.skuId)
    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 选择规格
    const clickSpecs = (item, val) => {
      // 如果是禁用状态,不进行任何操作
      if (val.disabled) return false
      // 1. 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(bv => { bv.selected = false })
        val.selected = true
      }
      // 点击的时候更新禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 触发change事件将sku数据传递出去
      const selectedArr = getSelectedArr(props.goods.specs).filter(v => v)
      if (selectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[selectedArr.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        console.log('触发change事件将sku数据传递出去')
        // 传递
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        emit('change', {})
      }
    }
    return {
      clickSpecs
    }
  }
}
</script>

<style lang="less" scoped>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin: 0 0 10px 10px;
  cursor: pointer;

  &.selected {
    border-color: @themeColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  text-align: left;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }
    .spec-wrap {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
    }

    dd {
      color: #666;
      >img {
        width: 50px;
        height: 50px;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
      }
      .sku-state-mixin ();
    }
  }
}
</style>
