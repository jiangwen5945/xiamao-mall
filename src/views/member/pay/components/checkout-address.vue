<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation}}</li>
      </ul>
      <span class="edit-btn" v-if="showAddress" @click="openAddressEdit(showAddress)">修改地址</span>
    </div>
    <div class="action">
      <j-button type="plain" size="small" @click="dialogVisible = true">切换地址</j-button>
      <j-button type="plain" size="small"  @click='openAddressEdit()'>添加地址</j-button>
    </div>
  </div>
  <!-- 修改/添加地址 -->
  <addressEdit ref="addressEdit" @on-success="onSuccess"/>
  <!-- 切换地址 -->
  <addressSwitch />
  <j-dialog v-model="dialogVisible" lock  width="40%" title="切换收货地址">
    <ul class="dialog-content"
        v-for="item in list"
        :key="item.id"
        :class="{active:selectedAddress && item.id===selectedAddress.id}"
        @click="selectedAddress=item"
    >
      <j-icon iconClass="web-icon-default" color="#27ba9b" size="100px" class="default-icon" v-if="item.isDefault === 1"/>
      <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
      <li><span>联系方式：</span>{{item.contact}}</li>
      <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <j-button @click="dialogVisible = false">取消</j-button>
        <j-button type="primary" @click="confirmAddress()">确定</j-button>
      </span>
    </template>
  </j-dialog>
</template>
<script>
// import Message from '@/components/library/Message'
import { ref } from 'vue'
import addressEdit from './address-edit.vue'
import addressSwitch from './address-switch.vue'
export default {
  name: 'CheckoutAddress',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],
  components: {
    addressEdit,
    addressSwitch
  },
  setup (props, { emit }) {
    const showAddress = ref(null) // 默认显示的地址
    const selectedAddress = ref(null) // 切换选择的地址
    if (props.list.length) {
      const defaultAddress = props.list.find(item => item.isDefault === 1)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }

    // 对话框显示隐藏
    const dialogVisible = ref(false)
    const openDialog = () => {
      dialogVisible.value = true
      selectedAddress.value = null
    }

    // 确认地址
    const confirmAddress = () => {
      dialogVisible.value = false
      props.list.forEach((item, index) => {
        if (item.id === selectedAddress.value.id) {
          // eslint-disable-next-line vue/no-mutating-props
          props.list[index].isDefault = 1
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          props.list[index].isDefault = 0
        }
      })
      showAddress.value = selectedAddress.value
      // 默认通知一个地址ID给父
      emit('change', showAddress.value?.id)
    }

    // 添加&修改地址
    const addressEdit = ref(null)
    const openAddressEdit = (form) => {
      addressEdit.value.open(form)
    }

    // 处理添加&修改地址成功后的操作
    const onSuccess = (formData) => {
      const editAddress = props.list.find(item => item.id === formData.id) // 获取被修改的地址信息
      if (editAddress) { // 修改
        for (const key in editAddress) {
          editAddress[key] = formData[key]
        }
      } else { // 添加
        const json = JSON.stringify(formData) // 需要克隆下，不然使用的是对象的引用
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(json))
      }
    }
    return { showAddress, dialogVisible, openDialog, selectedAddress, confirmAddress, openAddressEdit, addressEdit, onSuccess }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    .edit-btn {
      color: @themeColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
      cursor: pointer;
    }
  }
  .action {
    width: 420px;
    text-align: center;
  }
}
.dialog-content {
  position: relative;
  padding: 10px;
  margin: 0 20px;
  font-size: 14px;
  line-height: 30px;
  border: 1px solid #f5f5f5;
  margin-bottom: 10px;
  cursor: pointer;
  color: #585858;
  &:hover, &.active{
    border-color: @themeColor;
    background: lighten(@themeColor,50%);
  }
  .default-icon {
    position: absolute;
    top: 0;
    right: 0;
    transform: scale(1.33);
  }
}
</style>
