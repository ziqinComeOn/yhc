//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background_image: ['../../images/1.png', '../../images/2.jpg', '../../images/3.jpg'],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    indicatorDotss:false,
    vertical: false,
    autoplay: true,
    autoplays:false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    msgList: [
      { url: "url", title: "恭喜xxx完成任务退回200进入领奖区" },
      { url: "url", title: "恭喜xxx获得XXX奖励" },
      { url: "url", title: "恭喜xxx完成任务退回300进入领奖区" }]
  },
  onLoad:function(){
    this.setData({
      icon1:'../../images/binggou.jpg',
      icon2:'../../images/jingpin.png',
    })
  },

  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    console.log(propertyName)
    var newData = {}
    newData[propertyName] = e.detail.value
    console.log(newData)
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
