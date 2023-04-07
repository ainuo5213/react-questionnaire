import Mock from 'mockjs'
const Random = Mock.Random
export default [
  {
    url: '/api/test',
    method: 'get',
    response() {
      return {
        code: 200,
        message: '',
        data: {
          name: Random.cname()
        }
      }
    }
  }
]
