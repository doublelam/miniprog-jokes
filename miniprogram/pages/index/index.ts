// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
Page({
  data: {
    jokes: [] as { title: string; content: string }[],
    err: '',
    loading: false,
  },
  // 事件处理函数
  onLoad() {
    this.getJokes();
  },
  getJokes() {
    this.setData({
      loading: true,
    });
    wx.request({
      url: 'https://hn216.api.yesapi.cn/?s=App.Common_Joke.RandOne',
      method: 'POST',
      data: {
        app_key: '4C08E3A055F95802966332B150220518',
        num: 1,
      },
      success: (data) => {
        console.log('dats', data.data)
        const jokes = (data.data as any).data.joke.map((v: string) => ({
          title: v[0].slice(0, 5) + '...',
          content: v,
        }))
        this.setData({
          err: '',
          loading: false,
          jokes,
        });
      },
      fail: (e) => {
        this.setData({
          err: e.errMsg,
          loading: false,
        });
      }
    });
  },
  copyJoke() {
    wx.setClipboardData({
      data: this.data.jokes[0].content[0],
      success(_) {
        wx.showToast({
          title: '已复制到粘贴版',
          icon: 'success',
        })
      }
    })
  }
})
