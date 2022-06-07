import React, {
  useCallback, useMemo, useRef, VFC,
} from 'react';
import clsx from 'clsx';
import {
  Typography, Button, Box, TextField, IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Field, FieldProps, Form, Formik, FormikProps, FormikHelpers,
} from 'formik';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import {
  initFormValues,
  validationSchema,
  IFormValues,
} from './PasswordResetModal.helpers';
import { useStyles } from './PasswordResetModal.styles';

export interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  onClose?: () => void;
  onAccept?: (email: IFormValues['password']) => void;
}

export const PasswordResetModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  onClose,
  onAccept,
}) => {
  const classes = useStyles();

  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  }, [onClose, setIsModalOpen]);

  const handleAccept = useCallback((password: IFormValues['password']) => {
    if (onAccept) {
      onAccept(password);
    }
  }, [onAccept]);

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(
    () => (
      <Box className={classes.title}>
        <Typography
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          align="left"
          variant="h2"
        >
          Change Password
        </Typography>
      </Box>
    ),
    [classes.title, isLight],
  );

  const formikRef = useRef<FormikProps<IFormValues>>();

  const handleClickShowPassword = (fieldKey: keyof IFormValues) => () => {
    const currentValue = formikRef.current.values[fieldKey];
    formikRef.current.setFieldValue(fieldKey, !currentValue);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initFormValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={(
          values,
          { resetForm }: FormikHelpers<IFormValues>,
        ) => {
          handleAccept(values.password);
          resetForm();
        }}
      >
        {({
          errors, touched, values, handleChange, handleBlur, isValid,
        // eslint-disable-next-line arrow-body-style
        }) => {
          return (
            <Form translate={undefined}>
              <Box className={classes.inputContainer}>
                <Field
                  key="password"
                  id="password"
                  name="password"
                  render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          type={values.showPassword ? 'text' : 'password'}
                          name="password"
                          label="New password"
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                className={classes.showPasswordBtn}
                                color="secondary"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword('showPassword')}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            ),
                          }}
                          disabled={isSubmitting}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.password && touched.password) && errors.password}
                          error={errors.password && touched.password}
                        />
                      )
                    }
                />
              </Box>
              <Box className={classes.inputContainer}>
                <Field
                  key="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          type={values.showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          label="Repeat new password"
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                className={classes.showPasswordBtn}
                                color="secondary"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword('showConfirmPassword')}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            ),
                          }}
                          disabled={isSubmitting}
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.confirmPassword && touched.confirmPassword) && errors.confirmPassword}
                          error={errors.confirmPassword && touched.confirmPassword}
                        />
                      )
                    }
                />
              </Box>
              <Box className={classes.buttonsContainer}>
                <Button
                  className={clsx(classes.button)}
                  size="large"
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                >
                  Change
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
