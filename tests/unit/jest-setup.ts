/* eslint-disable @typescript-eslint/no-explicit-any */
// モック化対象のオブジェクト
import * as veeValidate from 'vee-validate';
import axios from 'axios';
declare let global: any;

global.mockVeeValidate = (valid: boolean) => {
  // vee-validateをモック化
  jest
    .spyOn(veeValidate, 'validate')
    .mockResolvedValue({ valid: valid } as any);
};

global.mockAxiosGet = (value: any) => {
  // axios.getをモック化
  jest.spyOn(axios, 'get').mockResolvedValue(value);
};

global.mockAxiosPatch = (value: any) => {
  // axios.patchをモック化
  jest.spyOn(axios, 'patch').mockResolvedValue(value);
};

import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);
