// pages/cart/cart.js
/**
 * 刚进到购物车页面时,计算的价格不对
 * 最有一个选中的商品取消选中之后,全选还在勾选状态
 * 删除商品时,取消之后还是能删除数据库中的内容,页面中的内容却不会删除---连接数据库的方法放错位置,应该放在wx.showModal中
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false,    // 全选状态，默认全选
    id:0,
    pid:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotalPrice();
    wx.request({
      url: 'http://127.0.0.1:3000/selectCart',
      dataType: 'json',
      method: 'GET',
      success: (res) => {
        console.log(res.data.msg);
        this.setData({
          //全选状态
          hasList: true,    //既然有数据了,就设置为true
          carts: res.data.msg,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /**刚加载过购物车页面时默认为位未选中状态 */
    wx.request({
      url: 'http://127.0.0.1:3000/noSelectedAll',
      method: 'GET',
      success: (res) => {
        //console.log(carts[index].selected);
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
  /**================================计算选中商品的价格============================== */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (!carts[i].selected) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].prod_price;     // 所有价格加起来
      }
    }
    //console.log(total);
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  /**======================单选功能 ==========================*/
  selectList(e) {
    //console.log(e);
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    //console.log(index)
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    //console.log(carts[index].selected);
    if(carts[index].selected == false){
      wx.request({
        url: 'http://127.0.0.1:3000/isSelected',
        data:{id:carts[index].id},
        method:'GET',
        success:(res)=>{
          //console.log(carts[index].selected);
        }
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:3000/noSelected',
        data:{id:carts[index].id},
        method:'GET',
        success:(res)=>{
          //console.log(carts[index].selected);
        }
      })
    }
    //console.log(selected);
    //console.log(carts.length)
    var j =0;                          //开始的时候选中的为0
    for(let i=0;i<carts.length; i++){  //循环列表中所有的数据
      if(carts[i].selected == false){  //如果之前是未选中的变为选中的
        j++;                           //j+1
        //console.log('aaa');
      }else{                           //否则j-1
        j--;
        //console.log('bbb')
        }
    }
    if(j==carts.length){           //如果j的数值等于数值长度
      this.setData({
        selectAllStatus:true       //表示所有的都选中弄,全选就选中
      }) 
    }else{
      this.setData({               //否则全选未选中
        selectAllStatus: false
      })
    }
  
    this.setData({
      carts: carts
    });
    //console.log(carts)
    this.getTotalPrice();                           // 重新获取总价
  },
  /**=========================全选功能============================ */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    if (this.data.selectAllStatus == false) {
      wx.request({
        url: 'http://127.0.0.1:3000/isSelectedAll',
        method: 'GET',
        success: (res) => {
          //console.log(carts[index].selected);
        }
      })
    } else {
      wx.request({
        url: 'http://127.0.0.1:3000/noSelectedAll',
        method: 'GET',
        success: (res) => {
          //console.log(carts[index].selected);
        }
      })
    }
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = !selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },
  // 增加数量
  addCount(e) {
    
    const index = e.currentTarget.dataset.index;
    console.log("点击图片的"+index);
    console.log(this.data.carts[index].pid);
    this.setData({
      pid: this.data.carts[index].pid
    })
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    if (num > 5) {
      num = 5;
      wx.showToast({
        title: '最多只能购买5件',
        icon: "none"
      }, 1500);
     }else{
      wx.request({
        url: 'http://127.0.0.1:3000/addItem',
        data:{
          pid:this.data.pid
        },
        method:"GET",
        success:(res)=>{
          console.log("修改成功");
        }
      })
    }
    setTimeout(() => {
      wx.hideToast();
    }, 3000)
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      wx.showToast({
        title: '亲,不能再减了哦!',
        icon: "none"
      }, 1500)
    }else{
      wx.request({
        url: 'http://127.0.0.1:3000/reduceItem',
        data: {
          pid: this.data.pid
        },
        method: "GET",
        success: (res) => {
          console.log("修改成功");
        }
      })
    }
    setTimeout(() => {
      wx.hideToast()
    }, 3000)
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  /**删除功能 */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    //console.log(index);           //当前商品在购物车列表中的序号
    //console.log(this.data.carts[index].id);  //当前商品在数据库中的序号
    var id = this.data.carts[index].id;
    //console.log(id);
    let carts = this.data.carts;
    //console.log(carts);
    wx.showModal({
      title: '提示',
      content: '确定要从购物车中删除该商品吗',
      success:(res)=>{
        if(res.confirm){
          wx.request({
            url: 'http://127.0.0.1:3000/deleteCart',
            data: { id: id },
            method: 'GET',
            success: () => {
              carts.splice(index, 1);              // 删除购物车列表里这个商品
              this.setData({
                carts: carts
              });
              if (!carts.length) {                  // 如果购物车为空
                this.setData({
                  hasList: false,              // 修改标识为false，显示购物车为空页面
                  totalPrice: 0
                });
              } else {                              // 如果不为空
                this.getTotalPrice();           // 重新计算总价格
              }
            }
          })
        }else{
          console.log('这就对了');
        }
      }
    })
  },
  /**跳转到订单页 */
  jumpOrderlist: function () {
    if(this.data.totalPrice == 0){
      wx.showToast({
        title: '温馨提示:选择您要结算的商品!',
        icon :'none',
        duration:3000
      },1500)
    }else{
      wx.navigateTo({
        url: '../orderlist2/orderlist2'
      });
    }
  }
})