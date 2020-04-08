// pages/my/edit_personal_message.js
import { citys } from '../../utils/city.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['上海市', '上海市', '市区'],
    customItem: '全部',
    showTopTips: false,

    radioItems: [
      { name: '男', value: '1' },
      { name: '女', value: '2', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    companyType: ["请选择公司类型", "上市公司", "证券公司", "信托公司", "银行", "保险", "期货公司", "投资公司", "国有企业", "民营企业", "其他"],
    companyIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    isShow_08: false,
    defaultPickData_08: [
      { code: '500000' }, { code: '500200' }, { code: '500243' }
    ],
    listData_08: citys,
    picker_08_data: [],
  },

  showPicker_08: function () {
    this.setData({
      isShow_08: true
    })
  },
  sureCallBack_08(e) {
    this.setData({
      isShow_08: false,
      picker_08_data: JSON.stringify(e.detail.choosedData),
      picker_08_index: JSON.stringify(e.detail.choosedIndexArr)

    })
  },
  cancleCallBack_08() {
    this.setData({
      isShow_08: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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



  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  //公司类型选择器
  bindCompanyChange: function (e) {
    console.log('picker company 发生选择改变，携带值为', e.detail.value);

    this.setData({
      companyIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  //城市选择器
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },


  /**
   * 获取手机号
   */
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.login({
        success: function (res) {
          var code = res.code;
          if (res.code) {
            //发起网络请求  
            console.log(res.code)
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '同意授权',
            success: function (res) {
              //console.log(that)
              console.log(123)
              var tmp_my_id = wx.getStorageSync('my_id')
              console.log('my_id: ' + tmp_my_id)
              wx.request({
                url: 'https://www.developsea.cn/wechat/get_phone_num.php',
                data: {
                  code: code,
                  iv: e.detail.iv,
                  encryptedData: e.detail.encryptedData,
                  my_id: tmp_my_id
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  wx.setStorageSync('user', res.data);
                  console.log(res)
                  if (res.data.errCode == "0") {
                    console.log(res.data)
                    wx.showToast({
                      title: '一键绑定成功',
                      icon: 'success',
                      duration: 2000,
                      success: function () {
                        // wx.switchTab({ url: '../user-center/index' });
                      }
                    })
                    that.setData({
                      phoneNum: res.data.phoneNum,
                      hasPhoneNum: true,
                      hasButton: false
                    })

                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '一键绑定失败，请重新尝试',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                },
              });
            }
          })
        }
      });
    }
  },



})