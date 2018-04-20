var app = getApp()
Page({
  data: {
    noClick:0,
    array: ['原告', '被告','原告代理人'],
    objectArray: [
      {
        id: 0,
        name: '原告'
      },
      {
        id: 1,
        name: '被告'
      },
      {
        id: 2,
        name: '原告代理人'
      }
    ],
    index: -1,
    multiArray: [['人格权纠纷', '物权确认纠纷'], ['生命权、健康权、身体权纠纷', '姓名权纠纷', '肖像权纠纷', '名誉权纠纷', '荣誉权纠纷', '婚姻自主权纠纷', '人身自由权纠纷','一般人格权纠纷']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '人格权纠纷'
        },
        {
          id: 1,
          name: '物权确认纠纷'
        }
      ], [
        {
          id: 0,
          name: '生命权、健康权、身体权纠纷'
        },
        {
          id: 1,
          name: '姓名权纠纷'
        },
        {
          id: 2,
          name: '肖像权纠纷'
        },
        {
          id: 3,
          name: '名誉权纠纷'
        },
        {
          id: 4,
          name: '荣誉权纠纷'
        },
        {
          id: 5,
          name: '婚姻自主权纠纷'
        },
        {
          id:6,
          name: '人身自由权纠纷'
        },
        {
          id: 7,
          name: '婚姻自主权纠纷'
        },
        {
          id: 8,
          name: '人身自由权纠纷'
        }]
    ],
    multiIndex: [],
    ay:'',
    lasf:'',
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['生命权、健康权、身体权纠纷', '姓名权纠纷', '肖像权纠纷', '名誉权纠纷', '荣誉权纠纷', '婚姻自主权纠纷', '人身自由权纠纷', '一般人格权纠纷'];
            break;
          case 1:
            data.multiArray[1] = ['所有权确认纠纷', '用益物权确认纠纷', '担保物权确认纠纷'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  inputUserInfo(e){
    var that = this;
    var tel = e.detail.value.tel;
    var bd = e.detail.value.bd;
    var ssqq = e.detail.value.ssqq;
    var ay = that.data.multiArray[1][that.data.multiIndex[1]];
    var lasf = that.data.array[that.data.index];

    that.setData({
      noClick: 1
    })

    wx.request({
      url: app.globalData.httpUrl + 'zxla/case_insert.php',
      data: {
        sfz: wx.getStorageSync('sfz'),
        user_token: wx.getStorageSync('user_token'),
        tel:tel,
        bd:bd,
        ssqq:ssqq,
        ay:ay,
        lasf:lasf
      },
      success: function (res) {
        console.log('提交信息保存：', res)
        let data = res.data;

        if (data.state == 1) {
          wx.navigateTo({
            url: '../dsrxx/dsrxx',
            success:function(){
              wx.setStorageSync('case_id', data.case_id)
            }
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'loading',
            duration: 500
          })
        }
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        that.setData({
          noClick:0
        })
      }
    })
  }
})