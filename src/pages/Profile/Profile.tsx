/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, {
  Fragment, memo, useCallback,
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
} from 'formik';
import clsx from 'clsx';

import { CloseCircleIcon, ImageIcon, PlusIcon } from 'theme/icons';
import { CheckBox } from 'components/CheckBox';
import contractFormsSelector from 'store/contractForms/selectors';
import { useAuthConnectWallet, useShallowSelector } from 'hooks';
import {
  deleteTokenContractForm,
  dynamicFormDataTemplate,
  initialState,
  setTokenContractForm,
} from 'store/contractForms/reducer';
// import { RemovableContractsFormBlock } from 'components';
import { routes } from 'appConstants';
// import { isEqual } from 'lodash';
import { setActiveModal } from 'store/modals/reducer';
import { Modals } from 'types';
import {
  tokenContractFormConfigStart,
  validationSchema,
  // dynamicFormDataConfig,
  tokenContractFormConfigEnd,
} from './Profile.helpers';
import { useStyles } from './Profile.styles';

export const Profile = memo(() => {
  const dispatch = useDispatch();

  // const handleClearTokenState = useCallback(() => {
  //   dispatch(deleteTokenContractForm());
  // }, [dispatch]);

  const { tokenContract } = useShallowSelector(contractFormsSelector.getContractForms);
  const handleChangePassword = () => {
    dispatch(setActiveModal({
      modals: {
        [Modals.PasswordChange]: true,
      },
    }));
  };

  const hasUploadedLogoImage = Date.now() % 2 === 0;
  const classes = useStyles({ hasUploadedLogoImage });

  // const { isAuthenticated, connectDropdownModal, handleConnect } = useAuthConnectWallet();
  // sm={6}
  // md={6}
  // lg={6}
  // xl={6}
  return (
    <Container>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={tokenContract}
        validationSchema={validationSchema}
        onSubmit={(
          values,
        ) => {
          dispatch(setTokenContractForm(values));
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          isValid,
          setFieldValue,
          setFieldTouched,
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
                        />
                      )
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Field
                    name="email"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Email"
                          name="email"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['email']}
                          onBlur={handleBlur}
                          error={errors['email'] && touched['email']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <Field
                    name="password"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Password"
                          name="password"
                          type="password"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['password']}
                          onBlur={handleBlur}
                          error={errors['password'] && touched['password']}
                        />
                      )
                    }
                  />
                  <Button
                    style={{
                      marginTop: 4,
                    }}
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
                  item
                  xs={12}
                >
                  <Field
                    name="walletAddress"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          label="Wallet address"
                          name="walletAddress"
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['walletAddress']}
                          onBlur={handleBlur}
                          error={errors['walletAddress'] && touched['walletAddress']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
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
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    position: 'relative',
                  }}
                >
                  <Field
                    name="telephone"
                    render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          // style={{
                          // }}
                          label="Tel"
                          name="telephone"
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
                          // InputProps={{
                          //   startAdornment: (
                          //     <Select style={{
                          //       height: 40,
                          //     }}
                          //     >
                          //       <MenuItem value="+9714">+9714</MenuItem>
                          //       <MenuItem value="+7">+7</MenuItem>
                          //     </Select>
                          //   ),
                          // }}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['telephone']}
                          onBlur={handleBlur}
                          error={errors['telephone'] && touched['telephone']}
                        />
                      )
                    }
                  />
                  <Select
                    className={classes.select}
                    variant="filled"
                    disableUnderline
                    classes={{
                      root: classes.selectRoot,
                    }}
                  >
                    <MenuItem value="+9714">+9714</MenuItem>
                    <MenuItem value="+7">+7</MenuItem>
                  </Select>
                </Grid>

                <Grid
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
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values['country']}
                          onBlur={handleBlur}
                          error={errors['country'] && touched['country']}
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
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
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
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
                        />
                      )
                    }
                  />
                </Grid>

                <Grid
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
                  <Box className={classes.imageUploaderContainer}>
                    <input
                      className={classes.nativeFileInput}
                      type="file"
                      // inputProps={{
                      //   accept: fileExtensions,
                      // }}
                      // onChange={onFileReadyToBeUploaded}
                      // {...props}
                    />
                    {
                      hasUploadedLogoImage ? (
                        <img src="https://avatars.mds.yandex.net/get-verba/1540742/2a0000017fb1a555a52eb01b8ddb17bac37f/realty_main" alt="logo" />
                      ) : (
                        <ImageIcon />
                      )
                    }

                  </Box>
                  <Button
                    // className={classes.textButton}
                    variant="text"
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
                    style={{
                      maxWidth: 151,
                      whiteSpace: 'break-spaces',
                    }}
                    variant="body2"
                    align="center"
                  >
                    This image will also be used for navigation. 350 x 350 recommended.
                  </Typography>
                </Box>

              </Box>
            </Box>
            <Box className={classes.tokenContractFormSection}>
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
              <Button
                size="large"
                type="reset"
                color="secondary"
                variant="outlined"
                className={classes.resetButton}
                // onClick={handleClearTokenState}
                // disabled={isEqual(values, initialState.tokenContract)}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
