import { reactive } from '@vue/composition-api';
import { sharedUserStore } from '@/store/shared-user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSharedEvents = (): any => {
  const sharedEventState = reactive({
    // カレンダーを共有しているユーザーです。
    sharedUsers: sharedUserStore.sharedUsers,
  });

  /**
   * カレンダーにイベントを表示するユーザーのIDを取得します。
   */
  const getDisplayUserIds = () => {
    return sharedEventState.sharedUsers
      .filter((user) => user.display)
      .map((user) => user.userId);
  };

  return { sharedEventState, getDisplayUserIds };
};
