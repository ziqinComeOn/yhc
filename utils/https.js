var rootDocment = 'https://www.developsea.cn/';//域名
var rootDocment = 'https://wx.ssgsrz.com/';
function reqGet(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'GET',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    },

  })
}

function reqPost(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function reqMessPost(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)

    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

//登录函数
function login(url, code, encrypteData, iv){
  var that = this
  //创建一个dialog提示
  wx.showToast({
    title: '正在登录...',
    icon:'loading',
    duration:5000
  });
  wx.request({
    url: rootDocment+url,
    method:'GET',
    data:{
      code:code,
      encrypteData: encrypteData,
      iv:iv
    },
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      wx.hideToast()
      //console.log('服务器返回' + res.data)
      app.globalData.userInfo = res.data
    },
    fail: function () {
      wx.showToast({
        title: '网络错误！',
        duration: 2000
      })
    },
    complete: function () {

    }

  })
}


module.exports = {
  reqGet: reqGet,
  reqPost: reqPost,
  reqMessPost: reqMessPost,
  login: login
}  