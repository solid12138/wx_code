//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.name.length == 0 || e.detail.value.mianji.length == 0 || e.detail.value.phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '手机号码或面积不得为空!',
        showCancel: false,
      }) 
    } else if (e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位手机号码!',
        showCancel: false,
      }) 
    } else {
      var data = e.detail.value;
      console.log(data)
      wx.request({
        url: "http://manager.rxjy.com/r/saveRegistration",//仅为示例，并非真实的接口地址
        method: "POST",
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
    }
    console.log('携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
