import React, { FC, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Switch,
} from '@material-ui/core';
import {
  Formik, Form, Field, FieldProps, FieldArray,
} from 'formik';
import clsx from 'clsx';

import { CloseCircleIcon, PlusIcon } from 'theme/icons';
import contractFormsSelector from 'store/contractForms/selectors';
import { ContractFormsState, State, ILostKeyContract } from 'types';
import { useShallowSelector } from 'hooks';
import {
  crowdsaleContractDynamicFormInitialData,
  setLostKeyContractForm,
} from 'store/contractForms/reducer';
import { routes } from 'appConstants';
import { DELETE_ME_DISABLED_TEXTFIELD } from 'pages/CrowdsaleContractPreview/DELETE_ME_DISABLED_TEXTFIELD/DELETE_ME_DISABLED_TEXTFIELD';
import { InfoBlock, TokenBlockForm } from './components';
// import { SwitchableBlockForm } from './components/SwitchableBlockForm';
import {
  validationSchema,
  crowdsaleContractFormConfigStart,
  dynamicFormDataConfig,
  crowdsaleContractFormConfigSoftcap,
  crowdsaleContractFormConfigSaleDuration,
  crowdsaleContractFormConfigFlagOptions,
  crowdsaleContractFormConfigEnd,
} from './LostKeyContract.helpers';
import { useStyles } from './LostKeyContract.styles';

export const LostKeyContract: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    lostKeyContract,
  } = useShallowSelector<State, ContractFormsState>(contractFormsSelector.getContractForms);
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
            {crowdsaleContractFormConfigStart.map((formSection, index) => (
              <Grid
                key={`start_${index.toString()}`}
                className={classes.crowdsaleContractFormSection}
                container
              >
                {formSection.map(
                  ({
                    id, name, renderProps, helperText, isShort,
                  }) => (
                    <Grid
                      key={id}
                      item
                      xs={12}
                      sm={isShort ? 6 : 12}
                      md={isShort ? 3 : 6}
                      lg={isShort ? 3 : 6}
                      xl={isShort ? 3 : 6}
                    >
                      <Field
                        id={id}
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
              </Grid>
            ))}

            <Grid container>
              <Grid item xs={12} sm={6}>
                <DELETE_ME_DISABLED_TEXTFIELD
                  value={lostKeyContract.managementAddress}
                />
              </Grid>
            </Grid>

            <Box className={classes.crowdsaleContractFormSection}>
              <FieldArray name="reservesConfigs">
                {({ remove, push }) => values.reservesConfigs.map((token, i) => {
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
                              id, name, renderProps, isShort, helperText,
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
                                id={`tokens[${i}].${id}`}
                                name={`tokens[${i}].${name}`}
                                render={({
                                  form: { isSubmitting },
                                }: FieldProps) => (
                                  <TextField
                                    className={clsx({
                                      [classes.shortTextField]: isShort,
                                    })}
                                    {...renderProps}
                                    name={`tokens[${i}].${name}`}
                                    disabled={isSubmitting}
                                    value={token[name]}
                                    error={
                                        reservesConfigsErrors[name] &&
                                        reservesConfigsTouched[name]
                                      }
                                    onChange={handleChange(
                                      `tokens[${i}].${name}`,
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

            <Grid className={classes.crowdsaleContractFormSection} container>
              {crowdsaleContractFormConfigSoftcap.map(
                ({
                  id, name, renderProps, helperText, infoText,
                }) => (
                  <Fragment key={id}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Field
                        id={id}
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
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <InfoBlock>
                        {infoText.map((text) => (
                          <Typography
                            key={text}
                            variant="body1"
                            color="textSecondary"
                          >
                            {text}
                          </Typography>
                        ))}
                      </InfoBlock>
                    </Grid>
                  </Fragment>
                ),
              )}
            </Grid>

            <Grid className={classes.crowdsaleContractFormSection} container>
              {crowdsaleContractFormConfigSaleDuration.map(
                ({
                  id, name, renderProps, helperText, isShort,
                }) => (
                  <Grid
                    key={id}
                    item
                    xs={12}
                    sm={isShort ? 6 : 12}
                    md={isShort ? 3 : 6}
                    lg={isShort ? 3 : 6}
                    xl={isShort ? 3 : 6}
                  >
                    <Field
                      id={id}
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
            </Grid>

            <Grid container className={classes.crowdsaleContractFormSection}>
              {crowdsaleContractFormConfigFlagOptions.map(
                ({
                  id, name, title, icon, helperText,
                }) => (
                  <Grid key={id} item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box className={classes.changingDates}>
                      <Box className={classes.changingDatesHeader}>
                        <Box className={classes.changingDatesTitle}>
                          {icon}
                          <Typography variant="body1" color="inherit">
                            {title}
                          </Typography>
                        </Box>
                        <Field
                          id={id}
                          name={name}
                          render={() => (
                            <Switch
                              name={name}
                              checked={values[name]}
                              onClick={handleChange}
                            />
                          )}
                        />
                      </Box>
                      <Box>
                        {helperText.map((text, i) => (
                          <Typography
                            key={i.toString()}
                            variant="body1"
                            color="textSecondary"
                          >
                            {text}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                ),
              )}
            </Grid>

            {crowdsaleContractFormConfigEnd.map((formSection, index) => (
              <Grid
                key={`end_${index.toString()}`}
                className={classes.crowdsaleContractFormSection}
                item
                xs={12}
              >
                {/* <SwitchableBlockForm
                  key={formSection.id}
                  title={formSection.title}
                  description={formSection.description}
                  checkboxName={formSection.id}
                  checked={values[formSection.id]}
                  onChecked={(
                    e: Parameters<
                    React.ComponentProps<
                        typeof SwitchableBlockForm
                    >['onChecked']
                    >['0'],
                  ) => {
                    handleChange(e);
                    if (
                      formSection.id === 'minMaxInvestmentsSection' &&
                      values[formSection.id]
                    ) {
                      handleChange('minInvestments')('0');
                      handleChange('maxInvestments')('0');
                    }
                  }}
                >
                  <Grid container>
                    {formSection.fields.map(
                      ({
                        id, name, renderProps, helperText, isShort,
                      }) => (
                        <Grid
                          key={id}
                          item
                          xs={12}
                          sm={isShort ? 6 : 6}
                          md={isShort ? 3 : 6}
                          lg={isShort ? 3 : 4}
                          xl={isShort ? 3 : 4}
                        >
                          <Field
                            id={id}
                            name={name}
                            render={({
                              form: { isSubmitting },
                            }: FieldProps) => (
                              <TextField
                                {...renderProps}
                                disabled={
                                  isSubmitting || !values[formSection.id]
                                }
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
                  </Grid>
                </SwitchableBlockForm> */}
              </Grid>
            ))}

            <Box className={classes.crowdsaleContractFormSection}>
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
