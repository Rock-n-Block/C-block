import * as Yup from 'yup';

export interface IFormValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;

  showOldPassword: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export const initFormValues: IFormValues = {
  oldPassword: '',
  password: '',
  confirmPassword: '',

  showOldPassword: false,
  showPassword: false,
  showConfirmPassword: false,
};

export const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Required'),
  password: Yup.string().test('unique-values', 'Should not be the same as old password', function uniqueValues(value) {
    return this.parent.oldPassword !== value;
  }).required('Required'),
  confirmPassword: Yup.string()
    .test('passwords-match', 'Passwords must match', function valuesMatcher(value) {
      return this.parent.password === value;
    })
    .required('Required'),
});
