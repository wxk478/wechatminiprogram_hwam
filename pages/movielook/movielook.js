let formatTime = require("../../utils/util.js")
Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://192.168.10.16:1016/onegif.gif'
    }, {
      id: 1,
      type: 'image',
        url: 'http://192.168.10.16:1016/threeimages.gif',
    }, {
      id: 2,
      type: 'image',
        url: 'http://192.168.10.16:1016/fourimages.gif'
    }, {
      id: 3,
      type: 'image',
        url: 'http://192.168.10.16:1016/fiveimages.gif'
    }, {
      id: 4,
      type: 'image',
        url: 'http://192.168.10.16:1016/siximages.gif'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    fList:[],
    timeList:''
  },
  onLoad() {
    this.setData({
      timeList: formatTime.formatTime(new Date())
    })
    

    let that = this
    wx.request({
      url: 'http://192.168.10.16:1215/flist/list',
      method: "POST",
      header:{
        'content-type':'application/json' //默认值
      },
      success(res){
       
        console.log(res.data.obj);

        that.setData({
          fList:res.data.obj
        })
        
      }
    }),
  

    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  flist(e){
    console.log(e)
    if (e.currentTarget.dataset.id == 1){
      wx.navigateTo({
        url: '/pages/movieplay/movieplay?id=' + e.currentTarget.dataset.id,
      })
    }
 
    // let filfilmHistoryRecord = '';
    // this.data.fList.forEach(el=>({
    //   filmHistoryRecord = el
    // }));

    // console.log("===========")
    // console.log(filfilmHistoryRecord)
    
    // console.log("----------")
    // console.log(filmHistoryRecord)
    console.log(this.data.fList)
    // this.data.fList.forEach(el=>({

    // }))
    let filmHistoryRecord = this.data.fList[e.currentTarget.dataset.id-1];
    wx.request({
      url: 'http://192.168.10.16:1215/film/historyRecord',
      method:"post",
      data:filmHistoryRecord,
      header: {
        'content-type': 'application/json;charset=UTF-8',
      },
      success(res){
        console.log("----------")
        console.log(res.data)
      }
    })
  
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})