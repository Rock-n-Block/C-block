/* eslint-disable react/no-array-index-key */
import React, { Fragment, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  FieldArray,
} from 'formik';
import clsx from 'clsx';

import { CloseCircleIcon, PlusIcon } from 'theme/icons';
import { CheckBox } from 'components/CheckBox';
import contractFormsSelector from 'store/contractForms/selectors';
import { ContractFormsState, State, TokenContract as TokenContractType } from 'types';
import { useShallowSelector } from 'hooks';
import {
  deleteTokenContractForm,
  dynamicFormDataTemplate,
  initialState,
  setTokenContractForm,
} from 'store/contractForms/reducer';
import { RemovableContractsFormBlock } from 'components';
import { routes } from 'appConstants';
import { isEqual } from 'lodash';
import {
  tokenContractFormConfigStart,
  validationSchema,
  dynamicFormDataConfig,
  tokenContractFormConfigEnd,
} from './TokenContract.helpers';
import { useStyles } from './TokenContract.styles';

export const TokenContract = memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearTokenState = useCallback(() => {
    dispatch(deleteTokenContractForm());
  }, [dispatch]);

  const {
    tokenContract,
  } = useShallowSelector<State, ContractFormsState>(contractFormsSelector.getContractForms);
  return (
    <Container>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={tokenContract}
        validationSchema={validationSchema}
        onSubmit={(
          values: TokenContractType,
        ) => {
          dispatch(setTokenContractForm(values));
          navigate(routes['token-contract']['preview-contract'].root);
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
            {tokenContractFormConfigStart.map((formSection, indexLvl2) => (
              <Grid container className={classes.tokenContractFormSection} key={`start_${indexLvl2}`}>
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
                    {helperText.map((text, indexLvl1) => (
                      <Typography
                        key={indexLvl1}
                        className={clsx({ [classes.helperText]: indexLvl1 === 0 }, 's')}
                        variant="body1"
                        color="textSecondary"
                      >
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ))}
            <Box className={classes.tokenContractFormSection}>
              <FieldArray name="tokens">
                {({ remove, push }) => (values.tokens.map((token, indexLvl1) => {
                  const tokensErrors = (errors.tokens?.length && errors.tokens[indexLvl1]) || {};
                  const tokensTouched = (touched.tokens?.length && touched.tokens[indexLvl1]) || {};
                  const totalTokenAmount = values.tokens.reduce((acc, tokenForm) => {
                    // eslint-disable-next-line no-param-reassign
                    acc += +tokenForm.amount;
                    return acc;
                  }, 0);
                  return (
                    <Fragment key={`dynamic_${indexLvl1}`}>
                      <RemovableContractsFormBlock
                        isFirst={indexLvl1 === 0}
                        title="Define address for tokens"
                        subtitle="(after minting it will be sent to this address)"
                        deleteForm={() => remove(indexLvl1)}
                      >
                        {dynamicFormDataConfig.map(({
                          id, name, renderProps, icon, isShort,
                        }, indexLvl2) => {
                          if (name === 'frozenUntilDate' && !values.tokens[indexLvl1].isFrozen) {
                            return null;
                          }

                          return (
                            <Grid
                              item
                              xs={12}
                              sm={isShort ? 6 : 12}
                              md={isShort ? 3 : 6}
                              lg={isShort ? 3 : 6}
                              xl={isShort ? 3 : 6}
                              key={`${name}_${indexLvl2}`}
                              className={clsx(classes[name])}
                            >
                              <Field
                                id={`tokens[${indexLvl1}].${id}`}
                                name={`tokens[${indexLvl1}].${name}`}
                                render={
                                ({ form: { isSubmitting } }: FieldProps) => {
                                  console.log(name);
                                  if (renderProps.type === 'switch') {
                                    const updatedHandleChange = (e) => {
                                      handleChange(`tokens[${indexLvl1}].${name}`)(e);
                                      if (name === 'isFrozen' && !values.freezable) {
                                        setFieldValue('freezable', true);
                                        setFieldTouched('freezable', true);
                                      }
                                    };
                                    return (
                                      <CheckBox
                                        {...renderProps}
                                        icon={icon}
                                        value={token[name]}
                                        onClick={(e) => updatedHandleChange(e)}
                                      />
                                    );
                                  }
                                  return (
                                    <TextField
                                      {...renderProps}
                                      name={`tokens[${indexLvl1}].${name}`}
                                      disabled={isSubmitting}
                                      onChange={handleChange(`tokens[${indexLvl1}].${name}`)}
                                      value={token[name]}
                                      onBlur={handleBlur}
                                      error={tokensErrors[name] && tokensTouched[name]}
                                    />
                                  );
                                }
                              }
                              />
                            </Grid>
                          );
                        })}
                      </RemovableContractsFormBlock>
                      {indexLvl1 === values.tokens.length - 1 && (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          {indexLvl1 < 4 && (
                            <Button
                              variant="outlined"
                              onClick={() => push(dynamicFormDataTemplate)}
                              endIcon={<PlusIcon />}
                            >
                              Mint Tokens
                            </Button>
                          )}
                          <Typography
                            variant="body1"
                            className={clsx(classes.helperText, 's')}
                            color="textSecondary"
                          >
                            You can reserve the tokens for Team, Bonuses, Bounties - these
                            tokens will be created,but can’t be sold until token sale completion.
                          </Typography>
                          <Typography
                            variant="body1"
                            className={clsx(classes.helperText, 'l')}
                            color="textSecondary"
                          >
                            Total supply:{' '}
                            <span className={classes.newCount}>
                              {`${totalTokenAmount} ${values.tokenSymbol}`}
                            </span>
                          </Typography>
                        </Grid>
                      )}
                    </Fragment>
                  );
                }))}
              </FieldArray>
            </Box>
            <Grid container className={classes.tokenContractFormSection}>
              {tokenContractFormConfigEnd.map(({
                id, name, renderProps, helperText,
              }) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={id}>
                  <Field
                    id={id}
                    name={name}
                    render={
                        () => {
                          const updatedHandleChange = (e) => {
                            handleChange(name)(e);
                            if (name === 'freezable' && values.freezable) {
                              values.tokens.forEach((_, indexLvl2) => {
                                setFieldValue(`tokens[${indexLvl2}].isFrozen`, false);
                                setFieldTouched(`tokens[${indexLvl2}].isFrozen`, false);
                              });
                            }
                          };
                          return (
                            <CheckBox
                              {...renderProps}
                              onClick={updatedHandleChange}
                              value={values[name]}
                            />
                          );
                        }
                      }
                  />
                  {helperText.map((text, indexLvl1) => (
                    <Typography
                      key={indexLvl1}
                      className={clsx({ [classes.helperText]: indexLvl1 === 0 }, 's')}
                      variant="body1"
                      color="textSecondary"
                    >
                      {text}
                    </Typography>
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
                Create
              </Button>
              <Button
                size="large"
                type="reset"
                color="secondary"
                variant="outlined"
                endIcon={<CloseCircleIcon />}
                className={classes.resetButton}
                onClick={handleClearTokenState}
                disabled={isEqual(values, initialState.tokenContract)}
              >
                Clean
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
