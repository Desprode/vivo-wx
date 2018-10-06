// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymethod: 'online',
    onlinepay: true,
    huabeipay: false,
    moneypay: false,
    tid: 0,            //从商品列表页传过来的参数
    orderlist: {},
    cartList: [],
    totalPrice:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.tid);
    var tid = options.tid;
    this.setData({
      tid: tid
    })
      wx.request({
        url: 'http://127.0.0.1:3000/buySelected',
        dataType: 'json',
        method: 'GET',
        success: (res) => {
          //console.log(res.data.msg);
          this.setData({
            cartList: res.data.msg
          });
          this.getTotalPrice();
        }
      })
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
  /**点击支付方式时样式切换 */
  onlinepay: function () {
    this.setData({
      paymethod: 'online',
      onlinepay: true,
      huabeipay: false,
      moneypay: false
    })
  },
  huabeipay: function () {
    this.setData({
      paymethod: 'huabei',
      huabeipay: true,
      onlinepay: false,
      moneypay: false
    })
  },
  moneypay: function () {
    this.setData({
      paymethod: 'money',
      moneypay: true,
      online: false,
      huabeipay: false
    })
  },
  /**点解提交订单时触发事件 */
  submit: function () {
    wx.showToast({
      title: '恭喜,购买成功',
      icon: "success",
    }, 1500)
    setTimeout(() => {
      wx.hideToast();
      wx.reLaunch({
        url: '../index/index',
      })
    }, 3000)
  },
  /**================================计算选中商品的价格============================== */
  getTotalPrice() {
    let cartList = this.data.cartList;                  // 获取购物车列表
    console.log(this.data.cartList);
    let total = 0;
    for (let i = 0; i < cartList.length; i++) {         // 循环列表得到每个数据
        total += cartList[i].num * cartList[i].prod_price;     // 所有价格加起来
    }
    console.log(total);
    this.setData({                                // 最后赋值到data中渲染到页面
      cartList: cartList,
      totalPrice: total.toFixed(2)
    });
  }
})