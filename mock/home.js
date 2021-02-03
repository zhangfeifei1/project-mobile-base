export default [
  // 我的账户
  {
    url: '/myaccount.do',
    type: 'post',
    response: () => {
      return {
        'returnCode': '000000',
        'message': '成功',
        'data': { 'AvailBalList': [{ CardNo: '622360012341', ActOpenBankBranch: '华夏分行', ActCurType: '人民币', ActAvaiBal: '1000', CifIntegral: '1000' }] }
      }
    }
  },

  {
    url: '/initial/api/list',
    type: 'get',
    response: () => {
      return { 'returnCode': '000000', 'message': 'success', 'data': [{ 'apiId': 1257860982982598657, 'serviceId': 'wcb-auth', 'path': '/wcb/auth/**', 'status': 1, 'isEncrypt': '1' }, { 'apiId': 1257889972476731394, 'serviceId': 'wcb-myaccount', 'path': '/wcb/myaccount/**', 'status': 1, 'isEncrypt': '1' }, { 'apiId': 1257891175566696449, 'serviceId': 'wcb-binding', 'path': '/wcb/binding/getmsgwithphone', 'status': 1, 'isEncrypt': '1' }, { 'apiId': 1257891377384022018, 'serviceId': 'wcb-binding', 'path': '/wcb/binding/pageactsign', 'status': 1, 'isEncrypt': '1' }, { 'apiId': 1257894712744894466, 'serviceId': 'open-cloud-trans-config-server', 'path': '/trans/dictionary/getDictionaryPage', 'status': 1, 'isEncrypt': '1' }, { 'apiId': 1257894861093232641, 'serviceId': 'open-cloud-trans-config-server', 'path': '/trans/dictionary/getDictionaryList', 'status': 1, 'isEncrypt': '1' }], 'timestamp': 1591087514339 }
    }
  },
  // 绑卡
  {
    url: '/binding/pageactsign',
    type: 'post',
    response: () => {
      return {
        'returnCode': '000000',
        'message': '绑卡成功',
        'data': { 'Balance': '1000' }
      }
    }
  },
  // 短信
  {
    url: '/binding/getmsgwithphone',
    type: 'post',
    response: () => {
      return {
        'returnCode': '000000',
        'message': '短信已发送',
        'data': { }
      }
    }
  }

]
