import * as Yup from 'yup';

export interface IFormValues {
  password: string;
  confirmPassword: string;

  showPassword: boolean;
  showConfirmPassword: boolean;
}

export const initFormValues: IFormValues = {
  password: '',
  confirmPassword: '',

  showPassword: false,
  showConfirmPassword: false,
};

export const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .test('passwords-match', 'Passwords must match', function valuesMatcher(value) {
      return this.parent.password === value;
    })
    .required('Required'),
});
