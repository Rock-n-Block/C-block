import React, {
  MutableRefObject,
  useCallback, useMemo, useRef, useState, VFC,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  Typography, Button, Box, TextField, IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Field, FieldProps, Form, Formik, FormikProps, FormikHelpers,
} from 'formik';

import { routes } from 'appConstants';
import userSelector from 'store/user/selectors';
import { setActiveModal } from 'store/modals/reducer';
import { useShallowSelector } from 'hooks';
import { Modal, ConnectDropdownModal } from 'components';
import { Modals } from 'types';
import { EmailIcon, WalletIcon } from 'theme/icons';
import { shortenPhrase } from 'utils';
import {
  initSignUpFormValues,
  initLoginFormValues,
  signUpValidationSchema,
  loginValidationSchema,
  ISignUpFormValues,
  ILoginFormValues,
} from './ LoginModal.helpers';
import { useStyles } from './LoginModal.styles';

export interface Props {
  className?: string;
  open?: boolean;
  mode: 'login' | 'signup';
  setIsModalOpen?: (isOpen: boolean) => void;
  onClose?: () => void;
  onLogin?: (data: Pick<ILoginFormValues, 'email' | 'password'>) => void;
  onSignUp?: (data: Pick<ISignUpFormValues, 'email' | 'password' |'confirmPassword'>) => void;
}

export const LoginModal: VFC<Props> = ({
  open,
  mode,
  setIsModalOpen,
  onClose,
  onLogin,
  onSignUp,
}) => {
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  }, [onClose, setIsModalOpen]);

  const { address: userWalletAddress, isLight } = useShallowSelector(userSelector.getUser);

  const formikRef = useRef<FormikProps<ISignUpFormValues | ILoginFormValues>>();

  const handleLogin = useCallback((data: Pick<ILoginFormValues, 'email' | 'password'>) => {
    if (onLogin) {
      onLogin(data);
    }
  }, [onLogin]);

  const handleSignUp = useCallback((data: Pick<ISignUpFormValues, 'email' | 'password' |'confirmPassword'>) => {
    if (onSignUp) {
      onSignUp(data);
    }
  }, [onSignUp]);

  const handleClickShowPassword = (fieldKey: keyof ISignUpFormValues | keyof ILoginFormValues) => () => {
    const currentValue = formikRef.current.values[fieldKey];
    formikRef.current.setFieldValue(fieldKey, !currentValue);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const handleForgotPassword = () => {
    dispatch(setActiveModal({
      modals: {
        [Modals.PasswordResetByEmail]: true,
        [Modals.Login]: false,
      },
    }));
  };

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const handleConnectWalletModal = useCallback(() => {
    setIsConnectWalletModalOpen(!isConnectWalletModalOpen);
  }, [isConnectWalletModalOpen]);

  const [isSignUp, setIsSignUp] = useState(mode === 'signup');
  const classes = useStyles({ isSignUp });
  const title = useMemo(
    () => (
      <Box className={classes.title}>
        <Typography
          className={clsx(isLight ? '' : 'acidGreen gradient')}
          align="left"
          variant="h2"
        >
          Login
        </Typography>
      </Box>
    ),
    [classes.title, isLight],
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Box className={classes.tabsContainer}>
        <Button
          className={clsx(classes.tabButton, {
            [classes.tabButtonNotActive]: isSignUp,
          }, 'border-radius-s')}
          size="small"
          variant="contained"
          onClick={() => setIsSignUp(false)}
        >
          Sign In
        </Button>
        <Button
          className={clsx(classes.tabButton, {
            [classes.tabButtonNotActive]: !isSignUp,
          }, 'border-radius-s')}
          size="small"
          variant="contained"
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </Button>
      </Box>
      {
        isSignUp ? (
          <Formik
            innerRef={formikRef as MutableRefObject<FormikProps<ISignUpFormValues>>}
            initialValues={initSignUpFormValues}
            validateOnMount
            validationSchema={signUpValidationSchema}
            onSubmit={(
              values,
              // { resetForm }: FormikHelpers<ISignUpFormValues>,
            ) => {
              handleSignUp({
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
              });
              // resetForm();
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
                      key="email"
                      id="email"
                      name="email"
                      render={
                          ({ form: { isSubmitting } }: FieldProps) => (
                            <TextField
                              name="email"
                              label="Email"
                              InputProps={{
                                endAdornment: <EmailIcon />,
                              }}
                              disabled={isSubmitting}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={(errors.email && touched.email) && errors.email}
                              error={errors.email && touched.email}
                            />
                          )
                        }
                    />
                  </Box>
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
                          label="Password"
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
                          label="Repeat password"
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

                  <TextField
                    value={userWalletAddress ? shortenPhrase(userWalletAddress) : 'Sign up with wallet'}
                    InputProps={{
                      className: classes.walletContainer,
                      readOnly: true,
                      endAdornment: <WalletIcon />,
                    }}
                    onClick={userWalletAddress ? undefined : handleConnectWalletModal}
                  />

                  <Typography className={classes.disclaimer} variant="body2">
                    By using the service, you accept the{' '}
                    <NavLink className={classes.link} to={routes['terms'].root}>Terms of Service</NavLink>
                  </Typography>

                  <Box className={classes.buttonsContainer}>
                    <Button
                      className={clsx(classes.button)}
                      size="large"
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={!isValid || !userWalletAddress}
                    >
                      Create account
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Formik
            innerRef={formikRef as MutableRefObject<FormikProps<ILoginFormValues>>}
            initialValues={initLoginFormValues}
            validateOnMount
            validationSchema={loginValidationSchema}
            onSubmit={(
              values,
              { resetForm }: FormikHelpers<ILoginFormValues>,
            ) => {
              handleLogin({
                email: values.email,
                password: values.password,
              });
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
                      key="email"
                      id="email"
                      name="email"
                      render={
                          ({ form: { isSubmitting } }: FieldProps) => (
                            <TextField
                              name="email"
                              label="Email"
                              InputProps={{
                                endAdornment: <EmailIcon />,
                              }}
                              disabled={isSubmitting}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={(errors.email && touched.email) && errors.email}
                              error={errors.email && touched.email}
                            />
                          )
                        }
                    />
                  </Box>
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
                          label="Password"
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

                  <Button
                    className={classes.textButton}
                    variant="text"
                    onClick={handleForgotPassword}
                  >
                    <Typography
                      className={classes.link}
                      variant="body2"
                      align="left"
                    >
                      Forgot your password?
                    </Typography>
                  </Button>

                  <Box className={classes.buttonsContainer}>
                    <TextField
                      value={userWalletAddress ? shortenPhrase(userWalletAddress) : 'Sign in with wallet'}
                      InputProps={{
                        className: classes.walletContainer,
                        readOnly: true,
                        endAdornment: <WalletIcon />,
                      }}
                      onClick={userWalletAddress ? undefined : handleConnectWalletModal}
                    />
                    <Button
                      className={clsx(classes.button)}
                      size="large"
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={!isValid || !userWalletAddress}
                    >
                      Log in
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        )
      }
      <ConnectDropdownModal
        address={userWalletAddress}
        open={isConnectWalletModalOpen}
        onClose={() => setIsConnectWalletModalOpen(false)}
      />
    </Modal>
  );
};
