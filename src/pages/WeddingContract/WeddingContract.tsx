/* eslint-disable react/no-array-index-key */
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
import { WeddingBlockSlider } from './components';

const WeddingContract = () => {
  const classes = useStyles();
  const [firstSliderValue, setFirstSliderValue] = useState(50);
  const [secondSliderValue, setSecondSliderValue] = useState(50);

  const onFirstSliderHandler = (value: number): void => {
    setFirstSliderValue(value);
    setSecondSliderValue(100 - value);
  };

  const onSecondSliderHandler = (value: number): void => {
    setSecondSliderValue(value);
    setFirstSliderValue(100 - value);
  };

  const ValueLabelComponent = (props) => {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  };
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
            <WeddingBlockSlider>
              <Grid container className={clsx(classes.container)}>
                <Box className={clsx(classes.slider)}>
                  <Typography className={clsx(classes.title)}>Partner who
                    initialized the divorce
                  </Typography>
                  <Slider
                    ValueLabelComponent={ValueLabelComponent}
                    valueLabelDisplay="on"
                    aria-label="pretto slider"
                    value={firstSliderValue}
                    onChange={(_, value: number) => onFirstSliderHandler(value)}
                  />
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
                  <Slider
                    ValueLabelComponent={ValueLabelComponent}
                    valueLabelDisplay="on"
                    aria-label="pretto slider"
                    value={secondSliderValue}
                    onChange={(_, value: number) => onSecondSliderHandler(value)}
                  />
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
