


//软文提交--为提交按钮绑定click事件
$('#eSub').click(function(e){
  e.preventDefault();
  var data=$('#formList').serialize();
  $.ajax({
    type:'POST',
    url:'/api/post',
    data:data,
    success: function(obj){

      var objNew = eval("(" + obj + ")");

      if(objNew.code === 200){
        alert('文章提交成功！');
        location.reload();
      }else {
        alert('提交失败！错误消息：'+objNew.msg);
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

      var Templ = "";
      for(var i =0;i<obj.length;i++){
        Templ += `
          <div class="panel panel-default">
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


}())
