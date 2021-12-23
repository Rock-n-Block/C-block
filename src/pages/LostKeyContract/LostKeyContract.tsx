import React, { FC, Fragment, useEffect } from 'react';
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
  Formik, Form, Field, FieldProps, FieldArray,
} from 'formik';
import clsx from 'clsx';

import { CloseCircleIcon, PlusIcon } from 'theme/icons';
import contractFormsSelector from 'store/contractForms/selectors';
import userSelector from 'store/user/selectors';
import {
  ContractFormsState, State, ILostKeyContract, UserState,
} from 'types';
import { useShallowSelector } from 'hooks';
import {
  crowdsaleContractDynamicFormInitialData,
  setLostKeyContractForm,
} from 'store/contractForms/reducer';
import { routes } from 'appConstants';
import { DELETE_ME_DISABLED_TEXTFIELD } from 'pages/CrowdsaleContractPreview/DELETE_ME_DISABLED_TEXTFIELD/DELETE_ME_DISABLED_TEXTFIELD';
import { TokenBlockForm } from './components';
import {
  validationSchema,
  dynamicFormDataConfig,
  // crowdsaleContractFormConfigSaleDuration,
  contractNameSectionConfig,
  managementAddressSectionConfig,
  rewardAmountSectionConfig,
  confirmLiveStatusSectionConfig,
} from './LostKeyContract.helpers';
import { useStyles } from './LostKeyContract.styles';

export const LostKeyContract: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    lostKeyContract,
  } = useShallowSelector<State, ContractFormsState>(contractFormsSelector.getContractForms);
  const { address: userAddress } = useShallowSelector<State, UserState>(userSelector.getUser);

  useEffect(() => {
    dispatch(setLostKeyContractForm({
      ...lostKeyContract,
      managementAddress: userAddress,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userAddress]);

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={lostKeyContract}
        validationSchema={validationSchema}
        onSubmit={(values: ILostKeyContract) => {
          dispatch(setLostKeyContractForm(values));
          navigate(routes['lostkey-contract']['preview-contract'].root);
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
          <Form className={classes.form} translate={undefined}>
            <Grid className={clsx(classes.section, classes.contractNameSection)} container>
              {
                contractNameSectionConfig.map(({
                  key, name, renderProps, helperText,
                }) => (
                  <Grid
                    key={key}
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                  >
                    <Field
                      id={key}
                      name={name}
                      render={({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          {...renderProps}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values[name]}
                          onBlur={handleBlur}
                          error={errors[name] && touched[name]}
                        />
                      )}
                    />
                    {helperText.map((text, i) => (
                      <Typography
                        key={i.toString()}
                        className={clsx(classes.helperText)}
                        variant="body1"
                        color="textSecondary"
                      >
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))
              }
            </Grid>

            <Grid className={clsx(classes.section, classes.managementAddressSection)} container>
              {
                managementAddressSectionConfig.map(({
                  key, title, name, helperText,
                }) => (
                  <Grid
                    key={key}
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={6}
                  >
                    <Typography
                      className={clsx(classes.managementAddressSectionTitle)}
                      variant="body1"
                      color="textSecondary"
                    >
                      {title}
                    </Typography>
                    <DELETE_ME_DISABLED_TEXTFIELD
                      value={values[name]}
                    />
                    {/* <Field
                      id={key}
                      name={name}
                      render={({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          {...renderProps}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values[name]}
                          onBlur={handleBlur}
                          error={errors[name] && touched[name]}
                        />
                      )}
                    /> */}
                    {helperText.map((text, i) => (
                      <Typography
                        key={i.toString()}
                        className={clsx(classes.helperText)}
                        variant="body1"
                        color="textSecondary"
                      >
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))
              }
              <Box className={clsx(classes.section, classes.reservesSection)}>
                <FieldArray name="reservesConfigs">
                  {({ remove, push }) => values.reservesConfigs.map((reserves, i) => {
                    const reservesConfigsErrors =
                        (errors.reservesConfigs?.length && errors.reservesConfigs[i]) || {};
                    const reservesConfigsTouched =
                        (touched.reservesConfigs?.length && touched.reservesConfigs[i]) || {};
                    return (
                      <Fragment key={`dynamic_${i.toString()}`}>
                        <TokenBlockForm
                          isFirst={i === 0}
                          deleteForm={() => remove(i)}
                        >
                          {dynamicFormDataConfig.map(
                            (
                              {
                                key, name, renderProps, helperText,
                              },
                              index,
                            ) => (
                              <Grid
                                key={`${name}_${index.toString()}`}
                                className={clsx(classes[name])}
                                item
                                xs={12}
                                sm={6}
                              >
                                <Field
                                  id={`reservesConfigs[${i}].${key}`}
                                  name={`reservesConfigs[${i}].${name}`}
                                  render={({
                                    form: { isSubmitting },
                                  }: FieldProps) => (
                                    <TextField
                                      {...renderProps}
                                      name={`reservesConfigs[${i}].${name}`}
                                      disabled={isSubmitting}
                                      value={reserves[name]}
                                      error={
                                          reservesConfigsErrors[name] &&
                                          reservesConfigsTouched[name]
                                        }
                                      onChange={handleChange(
                                        `reservesConfigs[${i}].${name}`,
                                      )}
                                      onBlur={handleBlur}
                                    />
                                  )}
                                />
                                {helperText.map((text) => (
                                  <Typography
                                    key={i.toString()}
                                    className={clsx(classes.helperText)}
                                    variant="body1"
                                    color="textSecondary"
                                  >
                                    {text}
                                  </Typography>
                                ))}
                              </Grid>
                            ),
                          )}
                        </TokenBlockForm>
                        {i === values.reservesConfigs.length - 1 && (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          {/* supported only 4 tokens as a reserved address */}
                          {i + 1 < 4 && (
                          <Button
                            variant="outlined"
                            endIcon={<PlusIcon />}
                            onClick={() => push(crowdsaleContractDynamicFormInitialData)}
                          >
                            Add address
                          </Button>
                          )}
                        </Grid>
                        )}
                      </Fragment>
                    );
                  })}
                </FieldArray>
              </Box>
            </Grid>

            <Grid className={clsx(classes.section, classes.confirmLiveStatusSection)} container>
              <Typography>
                {confirmLiveStatusSectionConfig.title}
              </Typography>
              {confirmLiveStatusSectionConfig.additionalText.map((text, i) => (
                <Typography
                  key={i.toString()}
                  className={clsx(classes.additionalText)}
                  variant="body1"
                  color="textSecondary"
                >
                  {text}
                </Typography>
              ))}
              {confirmLiveStatusSectionConfig.fields.map(
                ({
                  key, name, renderProps, helperText,
                }) => (
                  <Grid
                    key={key}
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                  >
                    <Field
                      id={key}
                      name={name}
                      render={({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          {...renderProps}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values[name]}
                          onBlur={handleBlur}
                          error={errors[name] && touched[name]}
                        />
                      )}
                    />
                    {helperText.map((text, i) => (
                      <Typography
                        key={i.toString()}
                        className={clsx(classes.helperText)}
                        variant="body1"
                        color="textSecondary"
                      >
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ),
              )}
              {confirmLiveStatusSectionConfig.helperText.map((text, i) => (
                <Typography
                  key={i.toString()}
                  className={clsx(classes.helperText)}
                  variant="body1"
                  color="textSecondary"
                >
                  {text}
                </Typography>
              ))}
            </Grid>

            <Grid className={clsx(classes.section, classes.rewardAmountSection)} container>
              {
                rewardAmountSectionConfig.map(({
                  key, name, renderProps, helperText,
                }) => (
                  <Grid
                    key={key}
                    className={classes.gridItem}
                    item
                    xs={12}
                    sm={6}
                  >
                    <Field
                      id={key}
                      name={name}
                      render={({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          {...renderProps}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values[name]}
                          onBlur={handleBlur}
                          error={errors[name] && touched[name]}
                        />
                      )}
                    />
                    {/* <Field
                      id={key}
                      name={name}
                      render={({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          {...renderProps}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values[name]}
                          onBlur={handleBlur}
                          error={errors[name] && touched[name]}
                        />
                      )}
                    /> */}
                    {helperText.map((text, i) => (
                      <Typography
                        key={i.toString()}
                        className={clsx(classes.helperText)}
                        variant="body1"
                        color="textSecondary"
                      >
                        {text}
                      </Typography>
                    ))}
                  </Grid>
                ))
              }
            </Grid>

            <Box className={classes.buttonsGroupSection}>
              <Button
                className={classes.submitButton}
                size="large"
                type="submit"
                color="secondary"
                disabled={!isValid}
                variant="outlined"
              >
                Create
              </Button>

              <Button
                className={classes.resetButton}
                size="large"
                type="reset"
                color="secondary"
                variant="outlined"
                endIcon={<CloseCircleIcon />}
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
