import { UserProfile } from 'types';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  userName: Yup.string().max(128).required(),
  company: Yup.string().max(128).required(),
  telephone: Yup.object().shape({
    countryCode: Yup.string().max(31).required(),
    body: Yup.string().max(31).required(),
  }),
  city: Yup.string().max(128).required(),
  street: Yup.string().max(128).required(),
  office: Yup.string().max(32).required(),
  building: Yup.string().max(128).required(),
  zipcode: Yup.string().max(20).required(),
  avatarUrl: Yup.string().required(),
});

export type TInitialValues = UserProfile;
