import * as Yup from 'yup';

export interface IFormValues {
  email: string;
}

export const initFormValues: IFormValues = {
  email: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});
