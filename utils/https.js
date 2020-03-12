var rootDocment = 'https://www.developsea.cn/';//域名

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


module.exports = {
  reqGet: reqGet,
  reqPost: reqPost,
  reqMessPost: reqMessPost
}  