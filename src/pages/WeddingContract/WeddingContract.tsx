/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box, Slider,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';
import clsx from 'clsx';

import { CloseIcon } from 'theme/icons';
import { useAuthConnectWallet, useShallowSelector } from 'hooks';
import { routes } from 'appConstants';
import contractFormsSelector from 'store/contractForms/selectors';
import { setWeddingContractForm } from 'store/contractForms/reducer';
import {
  validationSchema,
  weddingContractFormConfigEnd, weddingContractFormConfigStart,
} from './WeddingContract.helpers';
import { useStyles } from './WeddingContract.styles';

export const WeddingContract = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    weddingContract,
  } = useShallowSelector(contractFormsSelector.getContractForms);

  const { isAuthenticated, connectDropdownModal, handleConnect } = useAuthConnectWallet();

  const [
    partnerOneSliderValue, setPartnerOneSliderValue,
  ] = useState(weddingContract.partnerOneSliderValue);
  const [
    partnerTwoSliderValue, setPartnerTwoSliderValue,
  ] = useState(weddingContract.partnerTwoSliderValue);

  const onFirstSliderHandler = useCallback((_, value: number) => {
    setPartnerOneSliderValue(value);
    setPartnerTwoSliderValue(100 - value);
  }, []);

  const onSecondSliderHandler = useCallback((_, value: number): void => {
    setPartnerTwoSliderValue(value);
    setPartnerOneSliderValue(100 - value);
  }, []);

  const dispatch = useDispatch();

  return (
    <Container>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={weddingContract}
        validationSchema={validationSchema}
        onSubmit={(
          values,
        ) => {
          if (!isAuthenticated) {
            handleConnect();
            return;
          }
          dispatch(setWeddingContractForm({
            ...values,
            partnerOneSliderValue,
            partnerTwoSliderValue,
          }));
          navigate(routes['wedding-contract']['preview-contract'].root);
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
            {weddingContractFormConfigStart.map((formSection, index) => (
              <Grid container className={classes.tokenContractFormSection} key={`start_${index}`}>
                {formSection.map(({
                  id, name, renderProps, helperText, isShort,
                }) => (
                  <Grid
                    item
                    xs={12}
                    sm={isShort ? 6 : 12}
                    md={isShort ? 3 : 6}
                    lg={isShort ? 3 : 6}
                    xl={isShort ? 3 : 6}
                    key={id}
                  >
                    <Field
                      id={id}
                      name={name}
                      render={
                        ({ form: { isSubmitting } }: FieldProps) => (
                          <TextField
                            {...renderProps}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            value={values[name]}
                            onBlur={handleBlur}
                            error={errors[name] && touched[name]}
                          />
                        )
                      }
                    />
                    {helperText?.map((text, i) => (
                      <Typography key={i} variant="body1" className={clsx({ [classes.helperText]: i === 0 }, 's')} color="textSecondary">
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ))}
            <Grid container className={clsx(classes.container)}>
              <Box className={clsx(classes.slider)}>
                <Typography className={clsx(classes.title)}>Partner who initialized the divorce</Typography>
                <Slider
                  value={partnerOneSliderValue}
                  onBlur={handleBlur}
                  onChange={onFirstSliderHandler}
                />
                <Typography className={clsx(classes.desc)}>If second partner approves the divorce the funds will be divided equally between ex-spouses. Otherwise, you can specify the percentage of how much each spouse gets.</Typography>
              </Box>
              <Box className={clsx(classes.slider)}>
                <Typography className={clsx(classes.title)}>Partner who hasn`t approved the divorce</Typography>
                <Slider
                  value={partnerTwoSliderValue}
                  onBlur={handleBlur}
                  onChangeCommitted={onSecondSliderHandler}
                />
                <Typography className={clsx(classes.desc)}>If second partner approves the divorce the funds will be divided equally between ex-spouses. Otherwise, you can specify the percentage of how much each spouse gets.</Typography>
              </Box>
            </Grid>
            {weddingContractFormConfigEnd.map((formSection, index) => (
              <Grid container className={classes.tokenContractFormSection} key={`start_${index}`}>
                {formSection.map(({
                  id, name, renderProps, helperText, isShort,
                }) => (
                  <Grid
                    item
                    xs={12}
                    sm={isShort ? 6 : 12}
                    md={isShort ? 3 : 6}
                    lg={isShort ? 3 : 6}
                    xl={isShort ? 3 : 6}
                    key={id}
                  >
                    <Field
                      id={id}
                      name={name}
                      render={
                        ({ form: { isSubmitting } }: FieldProps) => (
                          <TextField
                            {...renderProps}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            value={values[name]}
                            onBlur={handleBlur}
                            error={errors[name] && touched[name]}
                          />
                        )
                      }
                    />
                    {helperText.map((text, i) => (
                      <Typography key={i} variant="body1" className={clsx({ [classes.helperText]: i === 0 }, 's')} color="textSecondary">
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ))}
            <Box className={classes.tokenContractFormSection}>
              <Button
                size="large"
                type="submit"
                color="secondary"
                disabled={!isValid}
                variant="outlined"
                className={classes.submitButton}
              >
                {!isAuthenticated ? 'Log in' : 'Create'}
              </Button>
              <Button
                size="large"
                type="reset"
                color="secondary"
                variant="outlined"
                endIcon={<CloseIcon />}
                className={classes.resetButton}
                disabled={!Object.keys(touched).length}
              >
                Clean
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {connectDropdownModal}
    </Container>
  );
};

export default React.memo(WeddingContract);
