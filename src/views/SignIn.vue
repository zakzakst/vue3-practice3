<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <!-- <div v-if="foo">
        <v-text-field v-my-example="exampleHandler" />
      </div>
      <p v-text="bar" /> -->
      <v-text-field v-my-example:foo.bar.baz="exampleHandler" />
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
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
// import { signInAsync } from '@/store/profile';
import { profileStore } from '@/store/profile/profile';
// import { myExample } from '@/directives/my-example';

export default defineComponent({
  // directives: {
  //   myExample,
  // },
  setup(prop, context) {
    const state = reactive({
      foo: null as string | null,
      bar: null as string | null,
    });
    const exampleHandler = (event: Event) => {
      console.log(
        'event.target.value: ',
        (event.target as HTMLInputElement).value,
      );
    };
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

    return {
      ...toRefs(state),
      exampleHandler,
      signIn,
    };
  },
});
</script>
