import React, { Fragment } from 'react';
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
import { dynamicFormDataTemplate, setTokenContractForm } from 'store/contractForms/reducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from 'appConstants';
import {
  tokenContractFormConfigStart,
  validationSchema,
  dynamicFormDataConfig,
  tokenContractFormConfigEnd,
} from './TokenContract.helpers';
import { useStyles } from './TokenContract.styles';
import { TokenBlockForm } from './components';

export const TokenContract = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            {tokenContractFormConfigStart.map((formSection, index) => (
              <Grid container className={classes.tokenContractFormSection} key={`start_${index.toString()}`}>
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
                      <Typography key={i.toString()} variant="body1" className={clsx({ [classes.helperText]: i === 0 }, 's')} color="textSecondary">
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))}
              </Grid>
            ))}
            <Box className={classes.tokenContractFormSection}>
              <FieldArray name="tokens">
                {({ remove, push }) => (values.tokens.map((token, i) => {
                  const tokensErrors = (errors.tokens?.length && errors.tokens[i]) || {};
                  const tokensTouched = (touched.tokens?.length && touched.tokens[i]) || {};
                  const totalTokenAmount = values.tokens.reduce((acc, tokenForm) => {
                    // eslint-disable-next-line no-param-reassign
                    acc += +tokenForm.amount;
                    return acc;
                  }, 0);
                  return (
                    <Fragment key={`dynamic_${i.toString()}`}>
                      <TokenBlockForm isFirst={i === 0} deleteForm={() => remove(i)}>
                        {dynamicFormDataConfig.map(({
                          id, name, renderProps, icon, isShort,
                        }, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={isShort ? 6 : 12}
                            md={isShort ? 3 : 6}
                            lg={isShort ? 3 : 6}
                            xl={isShort ? 3 : 6}
                            key={`${name}_${index.toString()}`}
                            className={clsx(classes[name])}
                          >
                            <Field
                              id={`tokens[${i}].${id}`}
                              name={`tokens[${i}].${name}`}
                              render={
                              ({ form: { isSubmitting } }: FieldProps) => {
                                if (renderProps.type === 'switch') {
                                  const updatedHandleChange = (e) => {
                                    handleChange(`tokens[${i}].${name}`)(e);
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
                                    name={`tokens[${i}].${name}`}
                                    disabled={isSubmitting}
                                    onChange={handleChange(`tokens[${i}].${name}`)}
                                    value={token[name]}
                                    onBlur={handleBlur}
                                    error={tokensErrors[name] && tokensTouched[name]}
                                  />
                                );
                              }
                            }
                            />
                          </Grid>
                        ))}
                      </TokenBlockForm>
                      {i === values.tokens.length - 1 && (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          {i < 4 && (
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
                              {`${totalTokenAmount} New`}
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
                        () => (
                          <CheckBox
                            {...renderProps}
                            onClick={handleChange}
                            value={values[name]}
                          />
                        )
                      }
                  />
                  {helperText.map((text, i) => (
                    <Typography
                      key={i.toString()}
                      variant="body1"
                      className={clsx({ [classes.helperText]: i === 0 }, 's')}
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
});
