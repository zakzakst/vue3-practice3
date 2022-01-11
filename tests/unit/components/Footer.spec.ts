/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
// テスト対象のコンポーネント
import FooterComponent from '@/components/Footer.vue';
// モック化対象のモジュール
import { profileStore } from '@/store/profile/profile';

// 単体テストで使用するVueインスタンスを生成
const localVue = createLocalVue();

// プロフィール情報のモックデータ
const nickname = '波平';
const mockData = {
  data: {
    nickname: nickname,
  },
};

// profileモジュールをモック化
jest.mock('@/store/profile/profile', () => ({
  profileStore: {
    getProfile: jest.fn(),
  },
}));

describe('Footer.vue', () => {
  let vuetify: any;
  // テスト実行前にVuetifyの状態を初期化
  beforeEach(() => {
    vuetify = new Vuetify();
    (profileStore.getProfile as any) = { ...mockData.data };
  });
  // テスト対象のコンポーネントをマウントするヘルパー関数
  const mountHelper = (options?: any) => {
    return mount(FooterComponent, {
      localVue,
      vuetify,
      ...options,
    });
  };
  it('test', () => {
    // getterのモックを実装
    (profileStore.getProfile as any) = { ...mockData.data };
    // テスト対象のコンポーネントをマウント
    const wrapper = mountHelper();
    // コンポーネントの描画テキストを検証
    expect(wrapper.text()).toMatch(nickname);
  });
});
