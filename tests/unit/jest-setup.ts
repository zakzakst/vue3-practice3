/* eslint-disable @typescript-eslint/no-explicit-any */
// モック化対象のオブジェクト
import * as veeValidate from 'vee-validate';
declare let global: any;

global.mockVeeValidate = (valid: boolean) => {
  // vee-validateをモック化
  jest
    .spyOn(veeValidate, 'validate')
    .mockResolvedValue({ valid: valid } as any);
};
