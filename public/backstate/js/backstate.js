


//软文提交--为提交按钮绑定click事件
$('#eSub').click(function(e){
  e.preventDefault();
  var data=$('#formList').serialize();
  $.ajax({
    type:'POST',
    url:'/api/post',
    data:data,
    success: function(obj){

      if(obj.code === 200){
        alert('文章提交成功！');
        location.reload();
      }else {
        alert('提交失败！错误消息：'+obj.msg);
      }
    },
    error: function(){
      alert('异步请求失败！')
    }
  });
  });



!(function(){
  console.log(2);
  $.ajax({
    type:'GET',
    url:'/api/get',
    success: function(obj){
      console.log(obj);
      var Templ = "";
      for(var i =0;i<obj.length;i++){
        Templ += `
          <div class="panel panel-default" data-id="${i}">
            <div class="panel-body">
              ${obj[i].title}
            </div>
          </div>
        `;
      }
      $(".Jnews").html(Templ);
    },
    error: function(){
      alert('异步请求失败！')
    }
  });

  //绑定点击事件
  setTimeout(function(){
    $(".new-list>div").on("click",function(event){

      var param = $(event.currentTarget).attr("data-id");

      $.ajax({
        type:'GET',
        url:'/api/single/'+param,
        success:function(data){
          var dataDo = data.results;
          var newsDetail = `
            <div class="newspre out">
              <h3>${dataDo.title}</h3>
              <p>摘要：${dataDo.summary}</p>
              <p>${dataDo.createdAt}</p>
              <div class="well well-sm">${dataDo.textBody}</div>
              <div class="btn btn-info fedBack">返回</div>
            </div>
          `;
          $(".new-list").html(newsDetail);
          bindBack();
        },
        error:function(err){
          console.log("msg",err);
        }
      });

    })
  }, 500);


}())

function bindBack(){
  $(".fedBack").on("click",function(){
    location.reload();
  })
}