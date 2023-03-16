<template>
  <div class="j-city" ref="target">
    <div class="select" @click="open" :class="visible? 'active':''">
      <span class="value" v-if="changeResult.fullLocation">{{ changeResult.fullLocation }}</span>
      <span class="placeholder" v-else>选择配送区域</span>

      <j-icon iconClass="down" color="#999"/>
    </div>
    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getCityData } from '@/api/constants'
export default {
  name: 'JCity',
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const visible = ref(false)
    const loading = ref(false)
    const cityData = ref([])

    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        visible.value = false
        emit('change', changeResult)
      }
    }

    // 打开城市选择列表
    const open = () => {
      visible.value = true
      loading.value = true
      // 获取数据
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
      // 清空选择结果
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    // 定义计算属性
    const currList = computed(() => {
      let showList = cityData.value
      // 根据点击的省份城市获取对应的列表
      if (changeResult.provinceCode) {
        showList = showList.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 地区
      if (changeResult.cityCode) {
        showList = showList.find(c => c.code === changeResult.cityCode).areaList
      }
      return showList
    })
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      visible.value = false
    })
    // 切换展开收起
    // const toggleDialog = () => {
    //   if (active.value) closeDialog()
    //   else openDialog()
    // }

    return { visible, target, currList, loading, open, changeItem, changeResult }
  }
}
</script>

<style scoped lang="less">
.j-city {
  display: inline-block;
  position: relative;
  margin-left: 10px;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
      padding: 0 6px;
    }
    .value {
      color: #666;
      font-size: 12px;
      padding: 0 6px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
