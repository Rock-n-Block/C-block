import { UserProfile } from 'types';
import * as Yup from 'yup';

import { latinAndNumbersAndSpecialChars } from 'utils';

Yup.addMethod(Yup.string, 'latinNumbersSpecialChars', function yupLatinNumbersSpecialChars(message: string) {
  return this.test('latinNumbersSpecialChars', message, (str) => latinAndNumbersAndSpecialChars.test(str));
});

export const validationSchema = Yup.object().shape({
  userName: Yup.string().latinNumbersSpecialChars('Should contain latin, digits or special characters').max(128).required('Required'),
  company: Yup.string().latinNumbersSpecialChars('Should contain latin, digits or special characters').max(128).required('Required'),
  telephone: Yup.object().shape({
    countryCode: Yup.string().required('Required'),
    body: Yup.string().max(31).required('Required'),
  }),
  city: Yup.string().latinNumbersSpecialChars('Should contain latin, digits or special characters').max(128).required('Required'),
  street: Yup.string().latinNumbersSpecialChars('Should contain latin, digits or special characters').max(128).required('Required'),
  office: Yup.string().max(32).required('Required'),
  building: Yup.string().max(128).required('Required'),
  zipcode: Yup.string().max(20).required('Required'),
  avatarUrl: Yup.string(),
});

export type TInitialValues = UserProfile;
