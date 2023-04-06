import Mock from 'mockjs'
const { Random } = Mock
export default [
  {
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        status: 200,
        message: '',
        data: {
          id: Random.id(),
          title: Random.ctitle(3, 7)
        }
      }
    }
  }
]
