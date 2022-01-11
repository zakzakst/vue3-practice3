// テスト対象の関数
import { foo } from '@/library/foo';

// foo関数のテスト
describe('foo', () => {
  // foo関数がtrueを返したときの挙動を確認するテスト
  it('function foo (validate) return true', async () => {
    // テスト対象関数を実行
    const result = await foo('123');
    // 戻り値がtrueであることを検証
    expect(result).toBeTruthy();
  });
  // foo関数がfalseを返したときの挙動を確認するテスト
  it('function foo (validate) return false', async () => {
    // テスト対象関数を実行
    const result = await foo('1234');
    // 戻り値がfalseであることを検証
    expect(result).toBeFalsy();
  });
});
