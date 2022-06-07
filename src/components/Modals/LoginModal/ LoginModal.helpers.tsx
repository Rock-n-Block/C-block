import * as Yup from 'yup';

export interface ISignUpFormValues {
  email: string,
  password: string;
  confirmPassword: string;

  showPassword: boolean;
  showConfirmPassword: boolean;
}

export interface ILoginFormValues {
  email: string,
  password: string;

  showPassword: boolean;
}

export const initSignUpFormValues: ISignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',

  showPassword: false,
  showConfirmPassword: false,
};

export const initLoginFormValues: ILoginFormValues = {
  email: '',
  password: '',

  showPassword: false,
};

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().min(8, 'Password must contain at least 8 characters.').required('Required'),
  confirmPassword: Yup.string()
    .test('passwords-match', 'Passwords must match', function valuesMatcher(value) {
      return this.parent.password === value;
    })
    .required('Required'),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
});
