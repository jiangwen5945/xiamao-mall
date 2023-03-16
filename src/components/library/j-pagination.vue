<template>
  <div class="j-pagination"  v-if="total>pageSize">
    <a href="javascript:;" :class="{disabled:currentPage === 1}" @click = changePage(currentPage-1)>上一页</a>
    <span v-if="pager.start>1">...</span>
    <a
      href="javascript:;"
      :class="{active: currentPage === page}"
      v-for="page in pager.btnArr"
      :key="page"
      @click = changePage(page)
    >
      {{page}}
    </a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a href="javascript:;" :class="{disabled:currentPage >= pager.pageCount}" @click = changePage(currentPage+1)>下一页</a>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'JPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    btnCount: {
      type: Number,
      default: 5
    }
  },
  setup (props, { emit }) {
    // 切换页码
    const changePage = (newPage) => {
      if (newPage === props.currentPage) return
      emit('changePage', newPage)
    }
    // 重点：根据上述数据得到（总页数，起始页码，结束页码，按钮数组）
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(props.total / props.pageSize)
      // 计算起始页码和结束页码: 根据设置需要显示的页数，计算start => 显示的起始页码，end => 显示的结束页码
      // 通常情况下：
      let start = props.currentPage - Math.floor(props.btnCount / 2)
      let end = start + props.btnCount - 1
      // 起始页码小于1时
      if (start < 1) {
        start = 1
        end = (start + props.btnCount - 1) > pageCount ? pageCount : (start + props.btnCount - 1)
      }
      // 结束页码大于总页数时
      if (end > pageCount) {
        end = pageCount
        start = (end - props.btnCount + 1) < 1 ? 1 : (end - props.btnCount + 1)
      }

      // 需要显示的页码
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })
    return { pager, changePage }
  }
}
</script>
<style scoped lang="less">
.j-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @themeColor;
    }
    &.active {
      background: @themeColor;
      color: #fff;
      border-color: @themeColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
