

window.$lib={
  //找出未选择的内容 导出
  noChoice:function(pulldata){
    var pull2 = {};
    for(var key in pulldata){
      if (pulldata[key]) {   //找出为true的值
        pull2[key] = pulldata[key]
      }
    }
    return pull2;
  },
//获取对象、数组的长度、元素个数
   count:function(obj){
    var objType = typeof(obj);
    if(objType == "string"){
      return obj.length;
    }else if(objType == "object"){
      var objLen = 0;
      for(var i in obj){
        objLen++;
      }
      return objLen;
    }
    return false;
  },
  //拿到localstorage的key
  getKey:function(item){
    var arr = [];
    for(var key in item){
      arr.push(key);
    }
    return arr;
  },
   getVal:function(item){
    var arr = [];
    for(var key in item){
      arr.push(item[key]);
    }
    return arr;
  },
    //唯一账号
  isOnlyOne:function(ytid){
    var localData = window.localStorage.getItem('person');

    if (localData == null) {

      var person = JSON.stringify(ytid);
      window.localStorage.setItem('person', person);
      return false;
    }else{
      if (localData.indexOf(ytid) == -1) {
        localData += ytid;
        window.localStorage.setItem('person', JSON.stringify(localData));
        return true;
      }else{
        return false;
      }
    }
  },
  //判断同一个人
  isOnePerson:function(ytid){
    var localData = window.localStorage.getItem('ppOnly');

    if (localData == null || localData == undefined) {
      var person = JSON.stringify(ytid);
      window.localStorage.setItem('ppOnly', person);
      return true;
    }else{
      if (localData.indexOf(ytid) == -1) {
        localData += ytid;
        window.localStorage.setItem('ppOnly', JSON.stringify(localData));
        return true;
      }else{
        return false;
      }
    }
  },
  //国庆一个人
  isOneGuoq:function(ytid){
    var localData = window.localStorage.getItem('guoqing');

    if (localData == null || localData == undefined) {
      var person = JSON.stringify(ytid);
      window.localStorage.setItem('guoqing', person);
      return true;
    }else{
      if (localData.indexOf(ytid) == -1) {
        localData += ytid;
        window.localStorage.setItem('guoqing', JSON.stringify(localData));
        return true;
      }else{
        return false;
      }
    }
  },
  //首次判断
  isFirst:function(){
    var day = '101';
    var shareTime = window.localStorage.getItem('shareTime');
    if (shareTime == null) {
      window.localStorage.setItem('shareTime', day);
      return true;
    }else{
      return false;
    }
  },
  handler:function(event){
    event.preventDefault();
  },
  prevent:function(){
    document.addEventListener('touchmove', this.handler, false);
  },
  dispatch:function(){
    document.removeEventListener('touchmove', this.handler, false);
  },
  stringly:function(obj){
    return JSON.stringify(obj);
  },
  parsely:function(obj){
    return JSON.parse(obj);
  },
//设置单个key 导出
  localSet:function(item,key,val){
    var dataList = {};
    if (this.localGet(item)) {
      dataList = this.localGet(item);
    }
      dataList[key] = val;
      window.localStorage.setItem(item, this.stringly(dataList));
  },
//获得整个item的内容 导出
  localGet:function(item){
    return this.parsely(window.localStorage.getItem(item));
  },
  //登录login
  login:function() {
    try {
      Bridge.showLogin({
        link: location.href,
        callback: function(arg) {
          location.reload(true);
        }
      });
    } catch (e) {
        window.location.href = 'https://account.youku.com/?callback=' + escape(window.location.href);
        console.log("can`t get Bridge");
    }
  },
//地址栏后缀获取 导出
  linkGet:function(p){
      var url =location.href.split('?');
      var obj;
      if(url.length>1){
          obj = this.param(url[1]);
      }else{
          obj = this.param(url);
      }
      return obj[p];
  },
  //linkGet字符串转化为对象
  param:function(str){
      var obj = {};
      if(str !== undefined && str.indexOf('=')>-1){
          str = str.replace('&=on','');
          var arr = str.split('&');   
          for(var i=0;i<arr.length;i++){
              var  t= arr[i].split('=');
              obj[t[0]] = t[1];
          }
      }
      return obj;
  }
};

