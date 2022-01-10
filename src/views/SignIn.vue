<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <!-- <div v-if="foo">
        <v-text-field v-my-example="exampleHandler" />
      </div>
      <p v-text="bar" /> -->
      <!-- <v-text-field v-my-example:foo.bar.baz="exampleHandler" /> -->
      <my-example
        v-model="parentValue"
        counter="10"
        clearable
        @custom-event="customEventHandler"
      />
      <p class="display-1 py-12">サンプルアプリケーションにサインインする</p>
      <div>
        <v-btn
          width="300"
          large
          color="#1da1f2"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS1
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#dd2a7b"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS2
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#3b5998"
          class="white--text text-none"
          @click="signIn"
        >
          Sign in with SNS3
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
// import { signInAsync } from '@/store/profile';
import { profileStore } from '@/store/profile/profile';
// import { myExample } from '@/directives/my-example';
import { MyExampleComponentParameter } from '@/components/MyExample.vue';

export default defineComponent({
  // directives: {
  //   myExample,
  // },
  setup(prop, context) {
    console.log('親コンポーネント: created');
    const state = reactive({
      // foo: null as string | null,
      // bar: null as string | null,
      parentValue: { foo: 'foo', bar: 'bar' } as MyExampleComponentParameter,
    });
    // const exampleHandler = (event: Event) => {
    //   console.log(
    //     'event.target.value: ',
    //     (event.target as HTMLInputElement).value,
    //   );
    // };

    onMounted(() => {
      console.log('親コンポーネント: mounted');
    });

    /**
     * サインインします。
     */
    const signIn = async () => {
      try {
        // await signInAsync();
        await profileStore.signInAsync();
        context.root.$router.push('/');
      } catch (error) {
        console.log('error: ', error);
      }
    };

    const customEventHandler = (value: number) => {
      console.log('value: ', value);
    };

    return {
      ...toRefs(state),
      // exampleHandler,
      signIn,
      customEventHandler,
    };
  },
});
</script>
