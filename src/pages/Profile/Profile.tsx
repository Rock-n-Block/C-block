import React, {
  ChangeEvent,
  memo, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikProps,
} from 'formik';

import { ImageIcon } from 'theme/icons';
import userSelectors from 'store/user/selectors';
import userActions from 'store/user/auth/actions';
import userActionTypes from 'store/user/auth/actionTypes';
import uiSelectors from 'store/ui/selectors';
import apiActions from 'store/ui/actions';
import { useShallowSelector } from 'hooks';
import { Copyable } from 'components';
import { routes } from 'appConstants';
import { setActiveModal } from 'store/modals/reducer';
import { Modals, RequestStatus } from 'types';
import { setNotification } from 'utils';
import {
  validationSchema,
  TInitialValues,
} from './Profile.helpers';
import { useStyles } from './Profile.styles';

export const Profile = memo(() => {
  const dispatch = useDispatch();

  const formikRef = useRef<FormikProps<TInitialValues>>();

  const isAuthenticated = useShallowSelector(userSelectors.selectIsAuthenticated);
  const {
    address: userWalletAddress, email, profile, countryCodes,
  } = useShallowSelector(userSelectors.getUser);

  const phoneCodes = useMemo(() => {
    const filteredArr = Array.from(new Set(countryCodes.map(({ phoneCode }) => phoneCode).filter((item) => item)));
    filteredArr.sort((a, b) => a - b);
    return filteredArr;
  }, [countryCodes]);
  const countries = useMemo(() => {
    const newArray = [...countryCodes];
    newArray.sort((a, b) => a.countryCode.localeCompare(b.countryCode));
    return newArray;
  }, [countryCodes]);
  const phoneCountryLink = useMemo(() => countryCodes.find(({ countryCode }) => countryCode === profile.country), [countryCodes, profile.country]);

  const initialValues = useMemo(() => (profile), [profile]);
  const handleChangePassword = () => {
    dispatch(setActiveModal({
      modals: {
        [Modals.PasswordChange]: true,
      },
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>();
  const dropAreaRef = useRef<HTMLElement>();
  const onFileUpload = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DragEvent,
  ) => {
    // @ts-expect-error wrong type for Input type='file'
    const [newFile]: [File] = e.target.files;
    formikRef.current.setFieldValue('avatarUrl', URL.createObjectURL(newFile));
    formikRef.current.setFieldValue('avatar', newFile);
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (dropArea) {
      dropArea.addEventListener('drop', onFileUpload, false);
    }
    return () => {
      dropArea.removeEventListener('drop', onFileUpload, false);
    };
  }, []);

  useEffect(() => {
    if (!countryCodes.length) {
      dispatch(
        userActions.getCountryCodes(),
      );
    }
  }, [countryCodes.length, dispatch]);

  useEffect(() => {
    if (!countryCodes.length) return;
    if (!phoneCountryLink) return;
    const { phoneCode } = phoneCountryLink;
    formikRef.current.setFieldValue(
      'telephone.body',
      profile.telephone.body.replace(`+${phoneCode}`, ''),
    );
    formikRef.current.setFieldValue(
      'telephone.countryCode',
      phoneCode,
    );
  }, [countryCodes.length, phoneCountryLink, phoneCountryLink?.phoneCode, profile.telephone.body]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.root);
      setNotification({
        type: 'error',
        message: 'You must log in to see profile page',
      });
    }
    // NOTE: make sure that deps has only [isAuthenticated], due to having `navigate` as dep causes to run this effect twice
  }, [isAuthenticated]);

  const updateProfileRequestStatus = useShallowSelector(
    uiSelectors.getProp(userActionTypes.USER_AUTH_UPDATE_PROFILE),
  );
  useEffect(() => {
    if (updateProfileRequestStatus === RequestStatus.SUCCESS) {
      dispatch(
        apiActions.reset(userActionTypes.USER_AUTH_UPDATE_PROFILE),
      );
      navigate(routes.root);
    }
  }, [dispatch, updateProfileRequestStatus]);

  useEffect(() => {
    if (updateProfileRequestStatus === RequestStatus.SUCCESS || updateProfileRequestStatus === RequestStatus.ERROR) {
      formikRef.current.setSubmitting(false);
    }
  }, [updateProfileRequestStatus]);

  const classes = useStyles({ hasUploadedLogoImage: !!formikRef.current?.values.avatarUrl });

  return (
    <Container>
      <Formik
        innerRef={formikRef}
        enableReinitialize
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(
          values,
        ) => {
          dispatch(userActions.updateProfile(values));
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          isValid,
        }) => (
          <Form translate={undefined} className={classes.form}>
            <Box
              className={classes.colsWrapper}
            >
              <Grid
                className={classes.leftCol}
                container
              >
                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <Field
                    name="userName"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Name"
                          name="userName"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['userName']}
                          onBlur={handleBlur}
                          error={errors['userName'] && touched['userName']}
                          helperText={(errors['userName'] && touched['userName']) && errors['userName']}
                        />
                      )
                    }
                  />
                </Grid>
                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <TextField
                    label="Email"
                    name="email"
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled
                    value={email}
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    value="***********"
                  />
                  <Button
                    className={classes.changePasswordBtn}
                    variant="text"
                    onClick={handleChangePassword}
                  >
                    <Typography
                      className={classes.link}
                      variant="body2"
                      align="center"
                    >
                      Change password
                    </Typography>
                  </Button>
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <TextField
                    label="Wallet address"
                    name="walletAddress"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Copyable className={classes.copyableIcon} valueToCopy={userWalletAddress} withIcon />
                      ),
                    }}
                    disabled
                    value={userWalletAddress}
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <Field
                    name="company"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Company"
                          name="company"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['company']}
                          onBlur={handleBlur}
                          error={errors['company'] && touched['company']}
                          helperText={(errors['company'] && touched['company']) && errors['company']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                  style={{
                    position: 'relative',
                  }}
                >
                  <Field
                    name="telephone.body"
                    render={
                      // eslint-disable-next-line arrow-body-style
                      ({ form: { isSubmitting } }: FieldProps) => {
                        // console.log('TEST', values, errors, touched);
                        return (
                          <TextField
                            label="Tel"
                            name="telephone.body"
                            type="tel"
                            placeholder="(000) 000 00–00"
                            InputProps={{
                              style: {
                                paddingLeft: 80,
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            value={values.telephone?.body}
                            onBlur={handleBlur}
                            error={errors.telephone?.body && touched.telephone?.body}
                            helperText={(errors.telephone?.body && touched.telephone?.body) && errors.telephone?.body}
                          />
                        );
                      }
                    }
                  />
                  <Field
                    name="telephone.countryCode"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <Select
                          className={classes.select}
                          variant="filled"
                          disableUnderline
                          classes={{
                            root: classes.selectRoot,
                          }}
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          name="telephone.countryCode"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values.telephone?.countryCode}
                          onBlur={handleBlur}
                          error={errors.telephone?.countryCode && touched.telephone?.countryCode}
                        >
                          {
                            phoneCodes.map((phoneCode) => (
                              <MenuItem key={phoneCode} value={phoneCode}>
                                +{phoneCode}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <Field
                    name="country"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Country"
                          name="country"
                          select
                          SelectProps={{
                            MenuProps: {
                              className: classes.selectMenu,
                            },
                          }}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['country']}
                          onBlur={handleBlur}
                          error={errors['country'] && touched['country']}
                        >
                          {
                            countries.map(({ countryCode, countryName }) => (
                              <MenuItem key={countryCode} value={countryCode}>
                                <img
                                  style={{ marginRight: 12 }}
                                  loading="lazy"
                                  width="20"
                                  src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                                  alt=""
                                />
                                {countryCode}, {countryName}
                              </MenuItem>
                            ))
                          }
                        </TextField>
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <Field
                    name="city"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="City"
                          name="city"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['city']}
                          onBlur={handleBlur}
                          error={errors['city'] && touched['city']}
                          helperText={(errors['city'] && touched['city']) && errors['city']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={12}
                >
                  <Field
                    name="street"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Street"
                          name="street"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['street']}
                          onBlur={handleBlur}
                          error={errors['street'] && touched['street']}
                          helperText={(errors['street'] && touched['street']) && errors['street']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={6}
                >
                  <Field
                    name="office"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Office"
                          name="office"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['office']}
                          onBlur={handleBlur}
                          error={errors['office'] && touched['office']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={6}
                >
                  <Field
                    name="building"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Building"
                          name="building"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['building']}
                          onBlur={handleBlur}
                          error={errors['building'] && touched['building']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  className={classes.gridField}
                  item
                  xs={6}
                >
                  <Field
                    name="zipcode"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Zipcode"
                          name="zipcode"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['zipcode']}
                          onBlur={handleBlur}
                          error={errors['zipcode'] && touched['zipcode']}
                        />
                      )
                    }
                  />
                </Grid>

              </Grid>
              <Box className={classes.imageUploader}>
                <Box className={classes.imageUploaderWrapper}>
                  {/* @ts-expect-error Mui4 mis-typing @see https://github.com/mui/material-ui/issues/17010 */}
                  <Box ref={dropAreaRef} className={classes.imageUploaderContainer}>
                    <input
                      ref={fileInputRef}
                      className={classes.nativeFileInput}
                      type="file"
                      accept="image/*"
                      onChange={onFileUpload}
                    />
                    {
                      values.avatarUrl ? (
                        <img src={values.avatarUrl} alt="preview avatar" />
                      ) : (
                        <ImageIcon />
                      )
                    }

                  </Box>
                  <Button
                    className={classes.uploadLogoImageBtn}
                    variant="text"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                  >
                    <Typography
                      className={classes.link}
                      variant="body2"
                      align="center"
                    >
                      Upload logo image
                    </Typography>
                  </Button>
                  <Typography
                    className={classes.imageUploaderDescription}
                    variant="body2"
                    align="center"
                  >
                    This image will also be used for navigation. 350 x 350 recommended.
                  </Typography>
                </Box>

              </Box>
            </Box>
            <Box className={classes.buttonsGroup}>
              <Button
                size="large"
                type="submit"
                color="secondary"
                disabled={!isValid}
                variant="outlined"
                className={classes.submitButton}
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
