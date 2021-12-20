/* eslint-disable */
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box, Slider, Tooltip,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';
import clsx from 'clsx';
import { CircleCloseIcon } from 'theme/icons';
import weddingFormsSelector from 'store/weddingForms/selectors';
import { State, WeddingContract as WeddingContractType, WeddingFormsState } from 'types';
import { useShallowSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { navigate } from '@storybook/addon-links';
import {
  validationSchema,
  weddingContractFormConfigEnd, weddingContractFormConfigStart,
} from './WeddingContract.helpers';
import { useStyles } from './WeddingContract.styles';
import { WeddingBlockSlider } from './components';
import { routes } from '../../appConstants';
import { setWeddingContractForm } from '../../store/weddingForms/reducer';

const WeddingContract = () => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [partnerOneSliderValue, setPartnerOneSliderValue] = useState(50);
  // const [partnerTwoSliderValue, setPartnerTwoSliderValue] = useState(50);

  // const onFirstSliderHandler = (value: number): void => {
  //   setPartnerOneSliderValue(value);
  //   setPartnerTwoSliderValue(100 - value);
  // };
  //
  // const onSecondSliderHandler = (value: number): void => {
  //   setPartnerTwoSliderValue(value);
  //   setPartnerOneSliderValue(100 - value);
  // };

  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  };
  const dispatch = useDispatch();
  // eslint-disable-next-line max-len
  const { weddingContract } = useShallowSelector<State, WeddingFormsState>(weddingFormsSelector.getWeddingForms);
  console.log('weddingContract: ', weddingContract);

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={weddingContract}
        validationSchema={validationSchema}
        // @ts-ignore
        onSubmit={(
          values: WeddingContractType,
        ) => {
          console.log(values, 'VALUES');
          dispatch(setWeddingContractForm(values));
          // @ts-ignore
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
            <WeddingBlockSlider>
              <Grid container className={clsx(classes.container)}>
                <Box className={clsx(classes.slider)}>
                  <Typography className={clsx(classes.title)}>Partner who
                    initialized the divorce
                  </Typography>
                  <Field
                      id="partnerOneSliderValue"
                      name="partnerOneSliderValue"
                  >
                    {({ form: { isSubmitting } }: FieldProps) => (
                      <Slider
                        name="partnerOneSliderValue"
                        ValueLabelComponent={ValueLabelComponent}
                        valueLabelDisplay="on"
                        aria-label="pretto slider"
                        value={values.partnerOneSliderValue}
                        // onBlur={handleBlur}
                        onChange={(e, value) => handleChange(e)}
                      />
                      )
                    }
                  </Field>
                  <Typography className={clsx(classes.desc)}>If second partner approves
                    the divorce the funds will be
                    divided equally between ex-spouses.
                    Otherwise, you can specify the percentage of how much each spouse gets.
                  </Typography>
                </Box>
                <Box className={clsx(classes.slider)}>
                  <Typography className={clsx(classes.title)}>Partner who hasn`t approved
                    the divorce
                  </Typography>
                  <Field
                      id="partnerTwoSliderValue"
                      name="partnerTwoSliderValue"
                  >
                    {({ form }: FieldProps) => {
                      console.log(form.values)
                      return(
                        <Slider
                            name="partnerTwoSliderValue"
                            ValueLabelComponent={ValueLabelComponent}
                            valueLabelDisplay="on"
                            aria-label="pretto slider"
                            value={values.partnerTwoSliderValue}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    )}
                    }
                  </Field>
                  <Typography className={clsx(classes.desc)}>If second partner approves
                    the divorce the funds will be
                    divided equally between ex-spouses.
                    Otherwise, you can specify the percentage of how much each spouse gets.
                  </Typography>
                </Box>
              </Grid>
            </WeddingBlockSlider>
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
                Create
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
