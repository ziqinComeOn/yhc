
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['大宗交易', '定向增发', '精选项目'],
    currentTab: 0,
    sendList: [],
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false
  },
  select: {
    page: 1,
    size: 6,
    isEnd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 5000
    })
    
    this.setData({
      isLoadingMoreData: true
    })
    this.getData()//数据请求
    //this.getData()
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.select = {
      page: 1,
      size: 6,
      isEnd: false
    }
    this.data.sendList = [];
    this.getData()
  },

  getData: function () {
    var _this = this;
    if (this.select.isEnd) {
      return
    }
    // var type = this.data.currentTab == 0 ? 'shouru' : this.data.currentTab == 1 ? 'tixian' : 'zhichu';
    // app.reqGetfunc.reqGet('abc.html/'+ type + '/' + this.select.page + '/' + this.select.size, {},function (res) {
    //   var content = res.data.data;
    //   _this.setData({
    //     sendList: (_this.data.sendList).concat(content)
    //   })
    //   if (content.length > 0) {
    //     _this.select.page++
    //   } else {
    //     _this.select.isEnd = true
    //   }
    // })

    if (this.data.currentTab == 0) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
      })
      //大宗交易
      app.reqPostfunc.reqPost('wxyaosu/jc_index.html', { page:this.select.page, size: this.select.size}, function (res) {
          if(res){

            var content = res;
            _this.setData({
              sendList: (_this.data.sendList).concat(content)
            })
            if (content.length > 0) {
              _this.select.page++
            } else {
              _this.select.isEnd = true
            }
            wx.hideToast()
          } else {
            //没有更多数据了
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              mask: true,
              duration: 2000
            }) 

          }

        })

    }

    if (this.data.currentTab == 1) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
      })
      //定向增发
      app.reqPostfunc.reqPost('wxyaosu/zf_index.html', { page: this.select.page, size: this.select.size}, function (res) {
        if (res.status == 'OK') {
          var content = res.data;
          _this.setData({
            sendList: (_this.data.sendList).concat(content)
          })
          if (content.length > 0) {
            _this.select.page++
          } else {
            _this.select.isEnd = true
          }
          wx.hideToast()
        } else {
          //没有更多数据了
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }
      })
    }

    if (this.data.currentTab == 2) {
      //精选项目
      app.reqPostfunc.reqPost('wxyaosu//pickitem_index', { page: this.select.page, size: this.select.size}, function (res) {
        if (res.status == 'OK') {
          var content = res.data;
          _this.setData({
            sendList: (_this.data.sendList).concat(content)
          })
          if (content.length > 0) {
            _this.select.page++
          } else {
            _this.select.isEnd = true
          }
          wx.hideToast()
        } else {
          //没有更多数据了
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            mask: true,
            duration: 2000
          })

          _this.setData({ hasMoreData: false})
        }
        _this.setData({ isLoadingMoreData: false, isRefreshing: false,})

      })
    }

  },

  bindBillDetail: function (e) {
    var item = e.currentTarget.dataset.item
    var currentTab = e.currentTarget.dataset.currentTab
    //console.log(currentTab)
    var str = JSON.stringify(item)
    var _str = JSON.stringify(currentTab)
    wx.navigateTo({
      url: "/pages/wallet/billDetails?jsonStr=" + str + '&strr=' + _str
    })
  },

  //定向增发 点击事件 页面跳转
  bindToDetail: function (e) {
    var id = e.currentTarget.dataset.id
    //console.log(id)
    //跳转页面
    wx.navigateTo({
      url: '/pages/project/zf_detail?id=' + id,
    })

  },


})