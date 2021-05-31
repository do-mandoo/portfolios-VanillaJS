import Router from 'koa-router';

import posts from './posts';

const api = new Router();

api.use('/appPosts', posts.routes());

// 라우터 내보냅니다.
export default api;
