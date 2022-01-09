/* eslint-disable @typescript-eslint/no-var-requires */
const delay = require('mocker-api/lib/delay');
const profile = require('./profile/profile-mock');

const proxy = {
  // 'GET /api/profile': (req, res) => {
  //   return res.status(200).json({
  //     userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
  //     userName: 'naminami',
  //     nickname: '波平',
  //     themeColor: '#4caf50',
  //     hasAvatar: false,
  //     mailAddress: 'namihei@example.com',
  //   });
  // },
  // 'PATCH /api/profile': (req, res) => {
  //   if (req.body.userName === 'fune') {
  //     return res.status(422).json({
  //       title: 'このユーザーは既に使われています。',
  //     });
  //   }
  //   return res.status(200).json();
  // },
  ...profile,
};

// 1秒遅延させる
module.exports = delay(proxy, 1000);
