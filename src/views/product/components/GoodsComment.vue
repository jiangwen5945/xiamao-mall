<template>
<div class="goods-comment">
  <div class="head" v-if="evaluate">
    <div class="data">
      <p><span>{{evaluate.salesCount}}</span><span>人购买</span></p>
      <p><span>{{evaluate.praisePercent}}</span><span>好评率</span></p>
    </div>
    <div class="tags">
      <div class="dt">大家都在说：</div>
      <div class="dd">
        <a href="javascript:;"
          class="ellipsis"
          :class="{active: currTagIndex === index }"
          v-for="(item, index) in evaluate.tags"
          :key="index"
          @click="changeTag(index)"
        >
          {{item.title}}（{{item.tagCount}}）
        </a>
      </div>
    </div>
  </div>
  <!-- 排序 -->
  <div class="sort">
    <span>排序：</span>
    <a
      @click="changeSort(null)"
      href="javascript:;"
      :class="{active:reqParams.sortField===null}"
    >默认</a>
    <a
      @click="changeSort('praiseCount')"
      href="javascript:;"
      :class="{active:reqParams.sortField==='praiseCount'}"
    >最热</a>
    <a
      @click="changeSort('createTime')"
      href="javascript:;"
      :class="{active:reqParams.sortField==='createTime'}"
    >最新</a>
  </div>
  <!-- 列表 -->
  <div class="list">
    <div class="item" v-for="(item, index) in commentList" :key="index">
      <div class="user">
        <img :src="item.member.avatar" alt="">
        <span>{{formatNickname(item.member.nickname)}}</span>
      </div>
      <div class="body">
        <div class="score">
          <j-icon iconClass ='star-filled'  v-for="icon in item.score" :key="icon+1" size="20px"/>
          <j-icon iconClass ='star'  v-for="icon in (5 - item.score)" :key="icon+1" size="20px"/>
          <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
        </div>
        <div class="text">{{ item.content }}</div>
        <!-- 使用图片预览组件 -->
        <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
        <div class="button-wrap">
          <span class="time">{{ item.createTime }}</span>
          <j-icon iconClass="icon" color="#999">{{item.praiseCount}}</j-icon>
        </div>
      </div>
    </div>
  </div>
    <!-- 分页 -->
    <j-pagination @changePage="onChangePage" :total="total" :currentPage="reqParams.page"  />
</div>
</template>

<script>
import Api from '@/api'
import { ref, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import GoodsCommentImage from '@/components/GoodsCommentImage.vue'
export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage
  },
  setup (props, { emit }) {
    const commentList = ref([])
    const evaluate = ref([])
    const total = ref(0) // 评价总数
    const route = useRoute()

    // 获取评价总览
    Api.getGoodsEvaluate(route.params.id).then(res => {
      // type 的目的是将来点击可以区分点的是不是标签
      res.tags.unshift({ type: 'img', title: '有图', tagCount: res.hasPictureCount })
      res.tags.unshift({ type: 'all', title: '全部评价', tagCount: res.evaluateCount })
      evaluate.value = res
    })

    // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })

    // 获取评价列表
    watch(reqParams, async () => {
      // 评价列表数据
      const commentData = await Api.findCommentListByGoods(route.params.id, reqParams)
      commentList.value = commentData.items
      total.value = commentData.counts
    }, { immediate: true })

    // 改变排序
    const changeSort = (type) => {
      reqParams.sortField = type
      reqParams.page = 1
    }

    // 收集标签和是否有图条件
    const currTagIndex = ref(0)
    const changeTag = (index) => {
      currTagIndex.value = index
      // 设置有图和标签条件
      const currTag = evaluate.value.tags[index]
      if (currTag.type === 'all') {
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (currTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = currTag.title
      }
      reqParams.page = 1
    }

    // 定义转换数据的函数（对应vue2.0的过滤器）
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '***' + nickname.substr(-1)
    }

    // 改变分页函数
    const onChangePage = (np) => {
      reqParams.page = np
    }

    return { reqParams, changeSort, changeTag, commentList, evaluate, formatSpecs, formatNickname, currTagIndex, onChangePage, total }
  }
}
</script>

<style lang="less" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        >a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          padding: 0 6px;

          &:hover {
            border-color: @themeColor;
            background: lighten(@themeColor, 50%);
            color: @themeColor;
          }

          &.active {
            border-color: @themeColor;
            background: @themeColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    text-align: left;
    color: #666;

    >span {
      margin-left: 20px;
    }

    >a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @themeColor;
      }
    }
  }

  .list {
    padding: 0 20px;
    text-align: left;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;
          display: flex;
          align-items: center;
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .button-wrap {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        .time{
          flex: 1;
        }
      }
    }
  }
}
</style>
