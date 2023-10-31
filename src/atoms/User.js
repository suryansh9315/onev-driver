import { atom } from 'recoil';

export const session_token = atom({
  key: 'JWTToken',
  default: null,
});

export const phone_number = atom({
  key: 'Number',
  default: null,
});

export const user_info = atom({
  key: 'User',
  default: null,
});