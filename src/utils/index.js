/**
  当字段组件的 prop 属性对于 model/rules 对象是一个合法的 key 路径时，返回 model/rules 对象本身，以及该路径下获取到的键值对；
  未通过则报错
*/
export const getPropByPath = (obj, path, strict) => {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  // 若 prop 路径合法，则取得表单 model 嵌套对象中最低一层包含属性名与 prop 的对象，以及对应的 key 和 value
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

// 实现Vue3中已经去掉了this.$on、this.$emit这些功能
export const myEvent = {
  map: {},
  $emit (name, params) {
    if (this.map[name] == null) {
      console.log('没有找到关于' + name + '的事件，无法触发')
    } else {
      this.map[name].detail = params
      window.dispatchEvent(this.map[name])
    }
  },
  $on (name, work) {
    const myEvent = new Event(name)
    this.map[name] = myEvent
    window.addEventListener(name, (event) => {
      console.log('得到数据为：', event.detail)
      work(this.map[name].detail)
    })
  }
}

// 派发，指的是从一个组件内部向上传递一个事件，并在组件内部通过 $on 进行监听
export const dispatch = (componentName, eventName, params) => {
  let parent = this.$parent || this.$root
  let name = parent.$options.name
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params))
  }
}

// 广播，指的是从一个组件内部向下传递一个事件，并在组件内部通过 $on 进行监听
export function broadcast (componentName, eventName, params) {
  console.log('this', this)
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
