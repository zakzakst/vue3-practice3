import { validate, extend } from 'vee-validate';
import { max } from 'vee-validate/dist/rules';

extend('max', max);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const foo = (value: string) => {
  return validate(value, { max: 3 }).then((result) => {
    return result.valid;
  });
};
