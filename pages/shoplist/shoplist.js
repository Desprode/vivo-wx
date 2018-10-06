// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:0,
    shopList: {},
    count:1,
    prod_title:'',
    sm_url:'',
    prod_type:'',
    prod_price:'',
    fav:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tid);
    var tid = options.tid;
    this.setData({
      tid:tid
    })
    wx.request({
      url: 'http://127.0.0.1:3000/shopList',
      data:{tid},
      dataType: 'json',
      method: 'GET',
      success: (res) => {
        //console.log(res.data[0]);
        this.setData({
          shopList: res.data[0]
        })
        this.setData({
          sm_url: this.data.shopList.sm_url,
          prod_type: this.data.shopList.prod_type,
          prod_title: this.data.shopList.prod_title,
          prod_price: this.data.shopList.prod_price
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
  /**实现按钮功能 */
  add:function(){
    console.log(this.data.count);
    var count = this.data.count + 1;
    if(count>5){
      count=5;
      wx.showToast({
        title: '最多只能购买5件',
        icon:"none"
      },1500);
    }
    setTimeout(()=>{
      wx.hideToast();
    },3000)
    this.setData({
      count:count
    })
  },
  reduce:function(){
    var count = this.data.count -1;
    if(count<1){
      count=1;
      wx.showToast({
        title: '亲,不能再减了哦!',
        icon:"none"
      },1500)
    };
    setTimeout(()=>{
      wx.hideToast()
    },3000)
    this.setData({
      count:count
    })
  },
  /**跳转到购物车页面 */
  jumpCart:function(){
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  /**跳转到订单页 */
  jumpOrderlist:function(){
    var tid = this.data.tid;
    wx.navigateTo({
      url: '../orderlist/orderlist?tid='+tid+'&count='+this.data.count,
    });
  },
  /**添加购物车功能 */
  addcart:function(){
    wx.request({
      url: 'http://127.0.0.1:3000/cartList',
      data:{
        sm_url: this.data.sm_url,
        prod_title:this.data.prod_title,
        prod_type:this.data.prod_type,
        prod_price:this.data.prod_price,
        pid:this.data.tid,
        num:this.data.count
      },
      success:()=>{
        wx.showToast({
          title: '购物车添加成功',
          icon: "success"
        }, 1500)
        setTimeout(() => {
          wx.hideToast()
        }, 3000);
      }
    })
  },
  /**收藏功能 */
  shoucang:function(){
    if(this.data.fav==0){
      wx.showToast({
        title: '收藏成功',
        icon:"success",
      },1500);
      this.setData({
        fav: 1
      })
    }else{
      wx.showToast({
        title: '取消成功',
        icon: "success",
      }, 1500);
      this.setData({
        fav: 0
      })
    }
  }
})