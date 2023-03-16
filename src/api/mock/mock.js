import Mock from 'mockjs'
import loginApi from './permission'

Mock.mock('/api/login', loginApi.getMenu)
