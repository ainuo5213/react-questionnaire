import Mock from 'mockjs'
import Reponse from '../model/Response.js'
const { Random } = Mock
function getQuestionList({ pageSize, isDeleted, isStar }) {
  return Array.from({ length: pageSize }, (_, i) => {
    return {
        id: Random.guid(),
        title: Random.ctitle(4, 7),
        isPublished: Random.boolean(),
        isStar: isStar || Random.boolean(),
        answerCount: Random.natural(1, 100),
        createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
        isDeleted: isDeleted || Random.boolean(),
    }
  })
}
export default [
  {
    url: '/api/questionnaires',
    method: 'get',
    response(ctx) {
      const isStar = (Boolean(ctx.query.isStar) || false)
      const isDeleted = (Boolean(ctx.query.isDeleted) || false)
      const pageSize = (Number(ctx.query.pageSize) || 10)
      const res = getQuestionList({isDeleted, isStar, pageSize})
      return new Reponse({
        total: 120,
        result: res
      })
    }
  },
  {
    url: '/api/questionnaire',
    method: 'post',
    response() {
      return new Reponse(Random.guid())
    }
  },
  {
    url: '/api/questionnaire/:id',
    method: 'get',
    response() {
      return new Reponse(Mock.mock({
        "id": "@guid",
        "title": "@ctitle(4,7)",
      }))
    }
  },
  {
    url: '/api/questionnaire/:id',
    method: 'patch',
    response() {
      return new Reponse(null)
    }
  },
  {
    url: '/api/questionnaire/duplicate/:id',
    method: 'patch',
    response() {
      return new Reponse(Random.guid())
    }
  },
  {
    url: '/api/questionnaire',
    method: 'delete',
    response() {
      return new Reponse(null)
    }
  }
]
