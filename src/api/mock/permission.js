import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { account, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (account === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall.vue'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'UserManage.vue'
            },
            {
              path: '/menu',
              name: 'menu',
              label: '菜单管理',
              icon: 'turn-off',
              url: 'MenuManage.vue'
            },
            {
              path: '/role',
              name: 'role',
              label: '角色管理',
              icon: 'thumb',
              url: 'RoleManage.vue'
            },
            {
              path: '/class',
              name: 'class',
              label: '部门管理',
              icon: 'bangzhu',
              url: 'ClassManage.vue'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'PageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'PageTwo.vue'
                }
              ]
            }
          ],
          userInfo: {
            username: 'Admin',
            role: '超级管理员',
            avatar: 'user.jpg'
          },
          token: Mock.Random.guid(),

          message: '获取成功'
        }
      }
    } else if (account === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall.vue'
            }
          ],
          userInfo: {
            username: '小小',
            role: '客服',
            avatar: 'avatar.jpg'
          },
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}
