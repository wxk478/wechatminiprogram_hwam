Page({
  data: {
    current: {
      poster: 'http://t2.ossjk.com/static/images/Christine%20Welch.jpg',
      name: '你的名字',
      author: 'Christine Welch',
      src: 'http://m10.music.126.net/20201210091126/a10c2a1df0eb1f894a43d821e64acd69/ymusic/69a6/d278/0e8f/584ce3e11c28d145fcb05940beb652a9.mp3',
    },
    audioAction: {
      method: 'pause'
    },
    play:'播放'
  },
  audioPlayed: function (e) {
    console.log('audio is played')
  },


  audioTimeUpdated: function (e) {
    this.duration = e.detail.duration;
  },

  timeSliderChanged: function (e) {
    if (!this.duration)
      return;

    var time = this.duration * e.detail.value / 100;

    this.setData({
      audioAction: {
        method: 'setCurrentTime',
        data: time
      }
    });
  },
  playbackRateSliderChanged: function (e) {
    this.setData({
      audioAction: {
        method: 'setPlaybackRate',
        data: e.detail.value
      }
    })
  },

  playAudio: function () {
    let that = this;

    

    if(this.data.play == "播放"){
      this.setData({
        audioAction: {
          method: 'play'
        },
        play:"暂停",
      })
    }else if(this.data.play == "暂停"){
      this.setData({
        audioAction: {
          method: 'pause'
        },
        play:"播放",
      });
    }

    
  },
  pauseAudio: function (e) {
    console.log("nin");
    this.setData({
      audioAction: {
        method: 'pause'
      }
    });
  }
})