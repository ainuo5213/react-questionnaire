import Mock from 'mockjs'
import Reponse from '../model/Response.js'
const { Random } = Mock
export default [
  {
    url: '/api/questionnaires',
    method: 'get',
    response() {
      const res = Mock.mock({
        "result|10": [
          {
            "id": "@guid",
            "title": "@ctitle(4,7)",
            "isPublished": "@boolean",
            "isStar": "@boolean",
            "answerCount|1-100": 1,
            "createTime": Random.datetime('YYYY-MM-DD HH:mm:ss')
          }
        ]
      })
      return new Reponse({
        total: 120,
        ...res
      })
    }
  },
  {
    url: '/api/questionnaire',
    method: 'post',
    response() {
      return new Reponse(Random.guid())
    }
  }
]
