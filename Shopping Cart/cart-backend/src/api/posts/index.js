import Router from 'koa-router';
import * as postsCtrl from './appPosts.ctrl';

const appPosts = new Router();

// 데이터 조회
appPosts.get('/mycart', postsCtrl.Clist);
appPosts.get('/myproduct', postsCtrl.Plist);

// 데이터 생성
appPosts.post('/mycart/add/:id', postsCtrl.Cwrite);
appPosts.post('/myproduct/add', postsCtrl.Pwrite);

/* // 특정 데이터 조회
appPosts.get('mycart/:id', postsCtrl.checkObjectId, postsCtrl.Cread);
appPosts.get('myproduct/:id', postsCtrl.checkObjectId, postsCtrl.Pread); */

// 특정 데이터 삭제
appPosts.delete(
  '/mycart/delete/:id',
  postsCtrl.checkObjectId,
  postsCtrl.remove
);

// // 전체 데이터 삭제는 어떻게 하는거지?
// appPosts.delete('/mycart/delete', postsCtrl.adelete);

// 특정 데이터 수정
appPosts.patch('/mycart/modify/:id', postsCtrl.checkObjectId, postsCtrl.update);

export default appPosts;
