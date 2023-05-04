import Mock from "mockjs";
import Reponse from "../model/Response.js";
const { Random } = Mock;
export default [
  {
    url: "/api/user/login",
    method: "post",
    response(ctx) {
      return new Reponse(Random.word(20));
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    response(ctx) {
      return new Reponse({
        userId: Random.guid(),
        username: Random.first() + Random.last(),
        nickname: Random.cfirst() + Random.clast(),
      });
    },
  },
  {
    url: "/api/user/register",
    method: "post",
    response(ctx) {
      return new Reponse(null);
    },
  },
  {
    url: "/api/user/logout",
    method: "post",
    response(ctx) {
      return new Reponse(null);
    },
  },
];
