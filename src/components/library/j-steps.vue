<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'JSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render () {
    const { ctx } = getCurrentInstance()
    const items = ctx.$slots.default() // 获取插槽的节点
    const dynamicItems = [] // 获取动态生成（for循环）的JStepsItem组件节点
    // 组装动态列表
    items.forEach(item => {
      // 匹配到JStepsItem直接插入容器JSteps中
      if (item.type.name === 'JStepsItem') {
        dynamicItems.push(item)
      } else {
        item.children.forEach(c => {
          dynamicItems.push(c)
        })
      }
    })
    const itemsJsx = dynamicItems.map((item, i) => {
      const currentClass = i < this.active ? 'j-steps-item active' : 'j-steps-item'
      const currentDesc = i < this.active ? item.props.desc : ''
      return (
          <div class={ currentClass }>
            <div class="step"><span>{i + 1}</span></div>
            <div class="title">{item.props.title}</div>
            <div class="desc">{ currentDesc }</div>
          </div>
      )
    })
    return <div class="j-steps">{itemsJsx}</div>
  }
}
</script>
<style lang="less">
.j-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @themeColor;
          background: @themeColor;
          color: #fff
        }
        &::before,&::after {
          background: @themeColor;
        }
      }
      .title {
        color: @themeColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,&::before{
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
         left: 0;
      }
      &::after {
         right: 0;
       }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
