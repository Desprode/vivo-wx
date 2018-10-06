// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymethod:'online',
    onlinepay:true,
    huabeipay:false,
    moneypay:false,
    tid:0,            //从商品列表页传过来的参数
    orderlist:{},
    cartList:[],
    count:0,
    getTotalPrice:0,
    totalPrice:0
  },
  /**计算总价 */
  getTotalPrice() {
    let orderlist = this.data.orderlist;                  // 获取购物车列表
    console.log(orderlist);
    let total = 0;
    total = this.data.count * orderlist.prod_price;     // 所有价格加起来
    console.log(total);
    this.setData({                                // 最后赋值到data中渲染到页面
      totalPrice: total.toFixed(2)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.tid);
    var tid = options.tid;
    console.log("购物车数量" + options.count);
    this.setData({
      count:options.count
    })
    this.setData({
      tid:tid
    })
    wx.request({
      url: 'http://127.0.0.1:3000/shopList',
      data: { tid },
      dataType: 'json',
      method: 'GET',
      success: (res) => {
        //console.log(res.data[0]);
        this.setData({
          orderlist: res.data[0]
        });
        this.getTotalPrice() ;
        console.log("总价"+this.data.totalPrice);
      }
    }),
      wx.request({
      url: 'http://127.0.0.1:3000/buySelected',
        dataType: 'json',
        method: 'GET',
        success: (res) => {
          console.log(res.data.msg);
          this.setData({
            cartList: res.data.msg
          })
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
  onlinepay:function(){
    this.setData({
      paymethod:'online',
      onlinepay:true,
      huabeipay: false,
      moneypay: false
    })
  },
  huabeipay:function(){
    this.setData({
      paymethod:'huabei',
      huabeipay: true,
      onlinepay:false,
      moneypay:false
    })
  },
  moneypay:function(){
    this.setData({
      paymethod:'money',
      moneypay: true,
      online:false,
      huabeipay:false
    })
  },
  /**点解提交订单时触发事件 */
  submit:function(){
    wx.showToast({
      title: '恭喜,购买成功',
      icon:"success",
    },1500)
    setTimeout(()=>{
      wx.hideToast();
      wx.reLaunch({
        url: '../index/index',
      })
    },3000)
  },
})