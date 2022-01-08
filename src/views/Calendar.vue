<template>
  <v-row class="fill-height">
    <v-col class="pt-0">
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>chevron_left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>chevron_right</v-icon>
          </v-btn>
          <v-toolbar-title v-text="title" />
        </v-toolbar>
      </v-sheet>
      <v-sheet height="580">
        <v-calendar
          v-if="visible"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="filteredEvents"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          :day-format="formatDay"
          :month-format="formatMonth"
          event-more-text="他 {0} 件"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="startAddEvent"
          @change="updateRange"
        />
      </v-sheet>
      <v-sheet>
        <v-row align="center" justify="center">
          <v-switch
            v-for="(sharedUser, index) in sharedUsers"
            :key="index"
            v-model="sharedUser.display"
            class="ml-4 pt-0"
            :color="sharedUser.themeColor"
            :label="sharedUser.nickname"
            hide-details
          />
        </v-row>
      </v-sheet>
      <v-menu
        v-model="isOpenEventMenu"
        :close-on-content-click="false"
        :activator="menuActivatorElement"
        bottom
        max-width="350"
        min-width="350"
      >
        <v-card v-if="selectedEvent" color="grey lighten-4" flat>
          <v-toolbar :color="getEventColor(selectedEvent)" dark>
            <v-toolbar-title v-text="selectedEvent.name" />
            <v-spacer />
            <v-btn
              icon
              :disabled="isNotOwner(selectedEvent.userId)"
              @click.stop="startEditEvent"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <p class="mb-0" v-text="`開始: ${selectedEvent.start}`" />
            <p v-text="formatEndDateTime" />
            <p :class="$style.memo" v-text="selectedEvent.memo" />
          </v-card-text>
        </v-card>
      </v-menu>
      <v-dialog
        v-model="isOpenEventDialog"
        persistent
        max-width="600"
        open-on-hover
      >
        <v-card v-if="newEvent">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="newEvent.name" label="タイトル*" />
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="startDatePickerDialog"
                        v-model="isOpenStartDatePicker"
                        :return-value.sync="startDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startDate"
                            label="開始日*"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          scrollable
                          :day-format="formatDayForDatePicker"
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="closeStartDatePicker"
                            >キャンセル
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.startDatePickerDialog.save(startDate)"
                            >OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="startTimePickerDialog"
                        v-model="isOpenStartTimePicker"
                        :return-value.sync="startTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startTime"
                            label="開始時刻"
                            prepend-icon="access_time"
                            readonly
                            clearable
                            @click:clear="clearStartTime"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="isOpenStartTimePicker"
                          v-model="startTime"
                          full-width
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="closeStartTimePicker"
                            >キャンセル
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.startTimePickerDialog.save(startTime)"
                            >OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="endDatePickerDialog"
                        v-model="isOpenEndDatePicker"
                        :return-value.sync="endDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endDate"
                            label="終了日"
                            prepend-icon="event"
                            readonly
                            clearable
                            @click:clear="clearEndDate"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          scrollable
                          :day-format="formatDayForDatePicker"
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="closeEndDatePicker"
                            >キャンセル
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.endDatePickerDialog.save(endDate)"
                            >OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="endTimePickerDialog"
                        v-model="isOpenEndTimePicker"
                        :return-value.sync="endTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endTime"
                            label="終了時刻"
                            prepend-icon="access_time"
                            readonly
                            :disabled="disabledEndTime"
                            clearable
                            @click:clear="clearEndTime"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-if="isOpenEndTimePicker"
                          v-model="endTime"
                          full-width
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="closeEndTimePicker"
                            >キャンセル
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.endTimePickerDialog.save(endTime)"
                            >OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-textarea
                    v-model="newEvent.memo"
                    rows="1"
                    auto-grow
                    label="メモ"
                  />
                  <v-switch
                    v-model="newEvent.shared"
                    label="共有"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>*必須フィールドを示します</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeEventDialog">
              キャンセル
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">保存する</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  nextTick,
  toRefs,
} from '@vue/composition-api';
import { CalendarTimestamp, CalendarEvent } from 'vuetify';
import {
  parseDate,
  parseTimestamp,
} from 'vuetify/lib/components/VCalendar/util/timestamp';
import {
  CalendarEventDetail,
  NewCalendarEvent,
} from '@/store/calendar-event.model';
import { calendarEventStore, add, update } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';
import { profileStore } from '@/store/profile';

interface VCalendar {
  scrollToTime(time: string): void;
  prev(): void;
  next(): void;
}

export default defineComponent({
  props: {
    /**
     * 表示するカレンダーの種類（月／週／日）を指定します。
     */
    type: {
      type: String,
      required: true,
      validator: (value: string) => {
        return ['month', 'week', 'day'].includes(value);
      },
    },
  },
  setup(props, context) {
    const state = reactive({
      // カレンダーコンポーネントの参照
      calendar: null as VCalendar | null,
      // カレンダーの表示範囲（開始日付）です。
      start: null as CalendarTimestamp | null,
      // カレンダーの表示範囲（終了日付）です。
      end: null as CalendarTimestamp | null,
      // カレンダーを描画するかどうかを示す値です。
      visible: true,
      // カレンダー上でフォーカスする日付です。
      focus: '',
      // 本日の日付です。
      today: parseDate(new Date()).date,
      // カレンダーを共有しているユーザーです。
      sharedUsers: sharedUserStore.sharedUsers,
      // イベントメニューを表示するかどうかを示す値です。
      isOpenEventMenu: false,
      /**
       * イベントメニューをアクティブにする要素です。
       * 詳細は`v-menu`コンポーネントのドキュメントを参照してください。
       */
      menuActivatorElement: null as HTMLElement | null,
      // 選択したイベントです。
      selectedEvent: null as CalendarEvent | null,
      // イベント登録／編集ダイアログを表示するかどうかを示す値です。
      isOpenEventDialog: false,
      // 登録／更新対象の新しいイベントの情報です。
      newEvent: null as NewCalendarEvent | null,
      // イベント開始日付を選択する`v-date-picker`を表示するかどうかを示す値です。
      isOpenStartDatePicker: false,
      // `v-date-picker`コンポーネントで選択したイベント開始日付です。
      startDate: null as string | null,
      // イベント開始時刻を選択する`v-time-picker`コンポーネントを表示するかどうかを示す値です。
      isOpenStartTimePicker: false,
      // `v-date-picker`コンポーネントで選択したイベント開始時刻です。
      startTime: null as string | null,
      // イベント終了日付を選択する`v-date-picker`コンポーネントを表示するかどうかを示す値です。
      isOpenEndDatePicker: false,
      // `v-date-picker`コンポーネントで選択したイベント終了日付です。
      endDate: null as string | null,
      // イベント終了時刻を選択する`v-time-picker`コンポーネントを表示するかどうかを示す値です。
      isOpenEndTimePicker: false,
      // `v-time-picker`コンポーネントで選択したイベント終了時刻です。
      endTime: null as string | null,
      // カレンダー上部に表示する日付を取得します。
      title: computed((): string => {
        if (!state.start || !state.end) {
          return '';
        }
        if (props.type === 'week') {
          return state.start.month === state.end.month
            ? `${state.start.year}年 ${state.start.month}月`
            : `${state.start.year}年 ${state.start.month}月～${state.end.month}月`;
        }
        return `${state.start.year}年 ${state.start.month}月`;
      }),
      /**
       * カレンダーに表示するイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEvents: computed((): CalendarEventDetail[] => {
        const displayUserIds = state.sharedUsers
          .filter((user) => user.display)
          .map((user) => user.userId);
        return calendarEventStore.calendarEvents.filter((event) =>
          displayUserIds.includes(event.userId),
        );
      }),
      // 終了時刻を表示用にフォーマットします。
      formatEndDateTime: computed((): string => {
        return !state.selectedEvent || !state.selectedEvent.end
          ? ''
          : `終了：${state.selectedEvent.end}`;
      }),
      // イベント終了時刻の入力を無効にするかどうかを判定します。
      disabledEndTime: computed((): boolean => {
        return !state.endDate || !state.startTime;
      }),
    });

    const methods = {
      // カレンダーを本日の日付に移動します。
      setToday: () => {
        state.focus = state.today;
      },
    };

    return {
      ...toRefs(state),
      ...methods,
    };
  },
});
</script>

<style lang="scss" module>
.memo {
  white-space: pre-wrap;
}
</style>
