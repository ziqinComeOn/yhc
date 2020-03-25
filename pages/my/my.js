// pages/my/my.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasUserInfoLogin: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    genderImage: [{
      "genderImagePath0": "../../images/no-male.png",
    }, {
      "genderImagePath1": "../../images/male.png",
    }, {
      "genderImagePath2": "../../images/female.png",
    }],
    isaut: 0,//isaut=0 未认证 isaut=1认证中 isaut=2已认证
    sex: 0,//0保密，1，男，2女
    is_status: 0,//0 未授权前 钱包 认证列表不显示 1 显示
    age: 18,
    money_num: "0.00",
    showModalStatus: false,
    statu:'open',
    is_tabbar:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      //console.log(this.getTabBar().data.list)
      console.log(this.getTabBar().data.list)
      this.getTabBar().setData({
        selected: 3,  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
      })
      
    }

    app.reqMessfunc.reqMessPost('',{},function(res){
      var data = res
      var data = 1
      console.log("我是data",data)
      if(data==1){
        //显示红点
        if (typeof _this.getTabBar === 'function' && _this.getTabBar()) { _this.getTabBar().setData({ ['list[1].tagNum']: 1, is_tabbar:false }) }
      }else{
        if (typeof _this.getTabBar === 'function' && _this.getTabBar()) { _this.getTabBar().setData({ ['list[1].tagNum']:0 }) }
      }

    })

    //查看是否有变量存在
    if (app.globalData.userInfo) {

      this.setData({
        userInfo: app.globalData.userInfo,
        nickname: app.globalData.userInfo.nickName,
        hasUserInfo: true,
        hasUserInfoLogin: false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('b' + res);
        this.setData({
          userInfo: res.userInfo,
          nickname: res.userInfo.nickName,//页面昵称显示此处的变量
          hasUserInfo: true,
          hasUserInfoLogin: false
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            nickname: res.userInfo.nickName,
            hasUserInfo: true,
            hasUserInfoLogin: false,
            sex: res.userInfo.gender,
            //is_status:1
          })
        },

      })
    }

    this.setData({
      icon18:'../../images/guanzhu.png',
      icon19: '../../images/wallet.png',
      icon20: '../../images/not-certified.png',
      icon200: '../../images/certified.png',
      icon21: '../../images/helper.png',
      icon22: '../../images/agreement.png',
      icon23: '../../images/aboutus.png',
      icon24:'../../images/setUp.png',
      url18:'/pages/my/my_guanzhu',
      url19: '/pages/wallet/wallet',
      url20: '/pages/my/certifieds',
      url21: '/pages/helper/helper',
      url22: '/pages/agreement/agreement',
      url23: '/pages/aboutus/aboutus',
      url24:'/pages/setup/setup'
    });
    /*this.setData({
      isaut: this.data.isaut,
      is_status: this.data.is_status
    })*/
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo

    // 传头像链接、性别、昵称到服务器
    var userInfo = e.detail.userInfo
    console.log('avatarUrl: ' + userInfo.avatarUrl)
    console.log('nickName: ' + userInfo.nickName)
    console.log('gender: ' + userInfo.gender)
    wx.request({
      url: 'https://www.developsea.cn/wechat/login_userinfo.php',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json' // 默认值   
      },
      data: {
        my_id: wx.getStorageSync('my_id'),
        my_session: wx.getStorageSync('my_session'),
        photo_url: userInfo.avatarUrl,
        nick_name: userInfo.nickName,
        sex: userInfo.gender
      },
      success: function (res) {
        console.log(res)

      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        nickname: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        hasUserInfo: true,
        hasUserInfoLogin: false,
        sex: e.detail.userInfo.gender,
        is_status: 1,
        money_num: this.data.money_num,
      })
    } else {
      this.setData({
        hasUserInfo: false,
        hasUserInfoLogin: true,
        is_status: 0,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3  //数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，审批页面为1
      })
    }
    //清楚缓存
    wx.removeStorageSync('isaut');

    this.setData({
      isaut: this.data.isaut,
      is_status: this.data.is_status

    })
    var my_id = wx.getStorageSync('my_id')
    var my_session = wx.getStorageSync('my_session')
    var that = this
    //检测是否有授权过,没有授权 显示登录按钮，授权过  显示个人信息
    // console.log(wx.getStorageSync('my_id'), wx.getStorageSync('my_session'))
    if (!my_id || !my_session) {

      this.setData({
        hasUserInfo: false,
        hasUserInfoLogin: true,
        is_status: 0,
      })

      var interval = setInterval(function () {
        if (!wx.getStorageSync('my_id') || !wx.getStorageSync('my_session')) {
          console.log('not my_id')
        } else {

          console.log('this is my_id')
          clearInterval(interval)
          wx.request({
            url: 'https://www.developsea.cn/wechat/getmymoney.php',
            data: {
              my_id: wx.getStorageSync('my_id'),
              my_session: wx.getStorageSync('my_session'),
            },
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('我是定时器获取的数据，', res)

              that.setData({
                //is_status: 1,
                isaut: res.data.isaut,
                sex: res.data.sex,
                age: util.getAges(res.data.age),
                nickname: res.data.nickname,
                avatarUrl: res.data.photo_url,
                money_num: res.data.money_num,
              })
              //保存认证状态缓存，方便其他页面调用
              wx.setStorageSync('isaut', res.data.isaut)
              //保存金钱为缓存
              wx.setStorageSync('money_num', res.data.money_num)
            }
          })
        }
      }, 100000000000000) //循环间隔 单位ms

      // 清除定时器
      clearInterval(interval)

    } else {
      this.setData({
        is_status: 1,
      })
      wx.request({
        url: 'https://www.developsea.cn/wechat/getmymoney.php',
        data: {
          my_id: wx.getStorageSync('my_id'),
          my_session: wx.getStorageSync('my_session'),
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('初次渲染数据', res)
          //调起用户协议弹窗
          var currentStatu = that.data.statu
          if(!res.data.nickname){
            that.util(currentStatu)
          }
          that.setData({
            //is_status: 1,
            isaut: res.data.isaut,
            sex: res.data.sex,
            age: util.getAges(res.data.age),
            nickname: res.data.nickname,
            avatarUrl: res.data.photo_url,
            money_num: res.data.money_num,
          })
          //保存认证状态缓存，方便其他页面调用
          wx.setStorageSync('isaut', res.data.isaut)
          //保存金钱为缓存
          wx.setStorageSync('money_num', res.data.money_num)
        }

      })
    }

  },

  //当用户第一次拒绝后再次请求授权
  openConfirm: function () {
    var that = this
    wx.showModal({
      content: '检测到您未授权，是否重新授权？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {
              console.log("授权结果..")
              console.log(res)
              if (!res.authSetting["scope.userInfo"]) {

              }
            },
            fail: (res) => {
              console.log("授权结果失败")
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  /**
   * 跳转主页
   */
  bindEdit: function (e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

  toAgreement: function () {
    wx.redirectTo({
      url: '/pages/agreement/agreement',
    })
  },

  toPrivacyAgreement:function(){
    wx.redirectTo({
      url: '/pages/agreement/privacyAgreement',
    })
  },
  
})