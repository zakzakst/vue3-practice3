/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
// テスト対象の関数
import { foo } from '@/library/foo';
// モック化した後、動作を変更する関数
// import { validate } from 'vee-validate';
// import * as veeValidate from 'vee-validate';
declare let mockVeeValidate: any;

// vee-validateをモック化
// jest.mock('vee-validate', () => ({
//   validate: jest.fn(),
//   extend: (name: any, schema: any) => {
//     return;
//   },
// }));

// jest.spyOn(veeValidate, 'validate');

// foo関数のテスト
describe('foo', () => {
  // foo関数がtrueを返したときの挙動を確認するテスト
  it('function foo (validate) return true', async () => {
    // validateが必ずtrueを返すようにモック化
    // (veeValidate.validate as any).mockResolvedValue({ valid: true });
    mockVeeValidate(true);
    // テスト対象関数を実行
    const result = await foo('123');
    // 戻り値がtrueであることを検証
    expect(result).toBeTruthy();
    // 戻り値が true であるときの挙動を検証
  });
  // foo関数がfalseを返したときの挙動を確認するテスト
  it('function foo (validate) return false', async () => {
    // validateが必ずfalseを返すようにモック化
    // (veeValidate.validate as any).mockResolvedValue({ valid: false });
    mockVeeValidate(false);
    // テスト対象関数を実行
    const result = await foo('1234');
    // 戻り値がfalseであることを検証
    expect(result).toBeFalsy();
    // 戻り値が false であるときの挙動を検証
  });
});
