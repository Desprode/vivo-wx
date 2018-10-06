// pages/liandong/liandong.js
//var list = require('../../utils/list.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧点击类样式
    curNav: 'A',
    list:[]
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
    // 生命周期函数--监听页面初次渲染完成
    wx.request({
      url: 'http://127.0.0.1:3000/buylist',
      dataType: 'json',
      method: 'GET',
      success: (res) => {
        console.log(res);
        this.setData({
          list: res.data
        })
        console.log(this.data.list);
        var listChild1 = this.data.list.List[0];
        console.log(listChild1);
        var that = this;
        // 获取可视区高度
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              list: listChild1,
              winHeight: res.windowHeight,
            })
          }
        })
      }
    })
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
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function (e) {
    var id = e.target.id;
    console.log(typeof id)
    this.setData({
      // 动态把获取到的 id 传给 scrollTopId
      scrollTopId: id,
      // 左侧点击类样式
      curNav: id
    })
  }
})