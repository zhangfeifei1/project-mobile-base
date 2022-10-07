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
  },
  {
    url: '/base/app/getEncryptionPublicKey',
    type: 'post',
    response: () => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{"appAsymmetricEncryptionPublicKey":"0425a19c39b1056e02e022b34f6fe8a71bbc25c24e7ed14453109385f679f125ff9d01800aae6fde980ae96db44c2a436d5fbf53117f7932b850fd28edd69d6421","appAsymmetricEncryptionType":"SM2","appSymmetricEncryptionType":"AES"},"extra":{},"timestamp":"1631156208632"}', 'isEncrypt': '0' }
    }
  },
  {
    url: '/initial/api/list',
    type: 'get',
    response: () => {
      return { 'returnCode': '000000', 'message': 'success', 'data': [{ 'apiId': 1149168013226991617, 'apiName': '', 'serviceId': 'loongeasy-cloud-base-server', 'path': '/base/role', 'status': 1, 'appId': '', 'isEncrypt': '1' }, { 'apiId': 1149168013327654913, 'apiName': '', 'serviceId': 'loongeasy-cloud-base-server', 'path': '/base/role/update', 'status': 1, 'appId': '', 'isEncrypt': '1' }, { 'apiId': 1257894861093232641, 'apiName': '', 'serviceId': 'loongeasy-cloud-txconfig-server', 'path': '/trans/dictionary/getDictionaryList', 'status': 1, 'appId': '', 'isEncrypt': '1' }, { 'apiId': 1331149566375907329, 'apiName': '', 'serviceId': 'loongeasy-cloud-token-server', 'path': '/token/token/test', 'status': 1, 'appId': '', 'isEncrypt': '1' }, { 'apiId': 1392678841350303746, 'apiName': '', 'serviceId': 'loongeasy-cloud-activiti-server', 'path': '/activiti/task/list', 'status': 1, 'appId': '', 'isEncrypt': '1' }, { 'apiId': 1399292806167715842, 'apiName': '', 'serviceId': 'loongeasy-cloud-txconfig-server', 'path': '/trans/dataStandard/deleteDataStandardById', 'status': 1, 'appId': '', 'isEncrypt': '1' }, { 'apiId': 1434793905943113730, 'apiName': '', 'serviceId': 'loongeasy-cloud-activiti-server', 'path': '/activiti/task/defaultUserStartProcessInstance', 'status': 1, 'appId': '', 'isEncrypt': '1' }], 'timestamp': 1631156208616 }
    }
  },
  {
    url: '/initial/antiReplacementApi/list',
    type: 'get',
    response: () => {
      return { 'returnCode': '000000', 'message': 'success', 'data': [{ 'apiId': 1291264367173689345, 'serviceId': 'loongeasy-cloud-token-server', 'path': '/token/token/getToken' }, { 'apiId': 1331149566375907329, 'serviceId': 'loongeasy-cloud-token-server', 'path': '/token/token/test' }], 'timestamp': 1631156208810 }
    }
  },
  {
    url: '/trans/dictionary/getListByAppTypeAndValidationType',
    type: 'get',
    response: () => {
      return { 'response': '{"returnCode":"000000","message":"success","path":"","data":{"records":[],"total":"0","size":"10","current":"1","searchCount":true,"pages":"0"},"extra":{},"timestamp":"1631093714662"}', 'isEncrypt': '0' }
    }
  }

]
