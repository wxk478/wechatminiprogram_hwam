//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '哈哈哈',
    userInfo: {},
    hasUserInfo: false,
    animation:'',
    ColorList: app.globalData.ColorList,
    list: [{
      name: '动漫瞧瞧',
      color: 'purple'
    },
    {
      name: '动漫',
      color: 'mauve'
    },
    {
      name: '动漫人',
      color: 'purple'
    },
    {
      name: '动漫排行榜',
      color: 'mauve'
    }, {
      name: '动漫',
      color: 'purple'
    },
    {
      name: '搜索动漫',
      color: 'mauve'
    },
    {
      name: '动漫Music',
      color: 'purple'
    },
    {
      name: '动漫Play',
      color: 'mauve'
    }
    ],
    toggleDelay: false
  },

  toggle(e) {
    console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function () {
      that.setData({
        animation: ''
      })
    }, 1000)

    console.log(e.target.dataset.index);
    if (e.target.dataset.index==7){
      wx.navigateTo({
        url: '/pages/movielook/movielook',
      })
    }

    if (e.target.dataset.index==0){
      wx.navigateTo({
        url: '/pages/animecomment/acomment',
      })
    }

    if(e.target.dataset.index==3){
      wx.navigateTo({
        url: '/pages/first/first',
      })
    }

    if(e.target.dataset.index==6){
      wx.navigateTo({
        url: '/pages/mine/mine',
      })
    }

  
  },

  toggleDelay() {
    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 1000)
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
  }
})
