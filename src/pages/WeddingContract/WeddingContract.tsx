/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';
import clsx from 'clsx';
import { CircleCloseIcon } from 'theme/icons';
import contractFormsSelector from 'store/contractForms/selectors';
import { ContractFormsState, State, TokenContract as TokenContractType } from 'types';
import { useShallowSelector } from 'hooks';
import { setTokenContractForm } from 'store/contractForms/reducer';
import { useDispatch } from 'react-redux';
import {
  validationSchema,
  weddingContractFormConfigEnd, weddingContractFormConfigStart,
} from './WeddingContract.helpers';
import { useStyles } from './WeddingContract.styles';

const WeddingContract = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    tokenContract,
  } = useShallowSelector<State, ContractFormsState>(contractFormsSelector.getContractForms);
  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={tokenContract}
        validationSchema={validationSchema}
        onSubmit={(
          values: TokenContractType,
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
          // setFieldValue,
          // setFieldTouched,
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
            <Grid container className={classes.tokenContractFormSection}>
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
            </Grid>
            <Box className={classes.tokenContractFormSection}>
              <Button
                size="large"
                type="submit"
                color="secondary"
                disabled={!isValid}
                variant="outlined"
                className={classes.submitButton}
              >
                Send
              </Button>
              <Button
                size="large"
                type="reset"
                color="secondary"
                variant="outlined"
                endIcon={<CircleCloseIcon />}
                className={classes.resetButton}
                disabled={!Object.keys(touched).length}
              >
                Clean
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default React.memo(WeddingContract);
