import { password, required } from 'ui';

export const CredentialsForm = {
  password: {
    value: '',
    validators: {
      required: (v: string) => required(v),
      password: (v: string) => password(v),
    },
  },
  newPassword: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
