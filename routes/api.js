'use strict';

const AV = require('leanengine');
const Router = require('koa-router');
const router = new Router({prefix: '/api'});

const News = AV.Object.extend('News');

// 查询 News 列表
router.get('/get', async function(ctx) {

  var query = new AV.Query(News);
  query.descending('createdAt');
  try {
    ctx.body = await query.find();
  } catch (err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      ctx.body = {"code" : 101 , "msg" : err };
    } else {
      throw err;
    }
  }
});


// 查询 News 单篇文章
router.get('/single/:aid',async (ctx)=>{

  var aid = ctx.params.aid;
  if (isNaN(aid)) {
    ctx.body = {'code': 0,'desc':'参数不对。'};
  }else{
    var query = new AV.Query(News);
    query.descending('createdAt');

    await query.find().then(function(results) {
      if (results[aid]) {
        ctx.body = {'code':200 ,'results': results[aid] };
      }else{
        ctx.body = {'code':301 ,'desc':'数据未创建'};
      }
    }, function(err) {
      if (err.code === 101) {
        ctx.body = {"code":101,"msg": err };
      }
    });
  }
});




// 新增 News 项目
router.post('/post', async function(ctx) {

  console.log("in post");
  var newsa = new News();
  newsa.set('title', ctx.request.body.title);
  newsa.set('summary', ctx.request.body.summary);
  newsa.set('eauthor', ctx.request.body.eauthor);
  newsa.set('tips', ctx.request.body.tips);
  newsa.set('tag', ctx.request.body.tag);
  newsa.set('lgPic', ctx.request.body.lgPic);
  newsa.set('smPic', ctx.request.body.smPic);
  newsa.set('textBody', ctx.request.body.textBody);

  await newsa.save().then(function(suc) {
    ctx.body = {"code":200 , "msg":"SUCCES"};
  },function(err){
    ctx.body = {'code':501 , 'msg':'FAIL'};
  });

});




module.exports = router;
