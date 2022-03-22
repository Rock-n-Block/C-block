import React, { SyntheticEvent } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
  FieldProps,
} from 'formik';

import { CloseCircleIcon } from 'theme/icons';
import {
  CustomDevelopmentFormValues,
  customDevelopmentFormConfig,
  initFormValues,
  validationSchema,
  isAtLeastOneFormFieldFilled,
  sendEmail,
} from './CustomDevelopment.helpers';
import { useStyles } from './CustomDevelopment.styles';

export const CustomDevelopment = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
          <Typography variant="body1">
            If you need any kind of custom development please fill the form below.
          </Typography>
          <Formik
            initialValues={initFormValues}
            validateOnMount
            validationSchema={validationSchema}
            onSubmit={(
              values: CustomDevelopmentFormValues,
              { resetForm },
            ) => {
              sendEmail(values);
              resetForm();
            }}
          >
            {({
              errors, touched, values, handleChange, handleBlur, isValid,
            }) => {
              const hasFormFilledFields = isAtLeastOneFormFieldFilled(values);
              const isDisabledCleanButton = !hasFormFilledFields;
              const isDisabledSendButton = !hasFormFilledFields || !isValid;
              return (
                <Form translate={undefined} className={classes.form}>
                  {customDevelopmentFormConfig.map(({ id, name, renderProps }) => (
                    <Field
                      key={name}
                      id={id}
                      name={name}
                      render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          {...renderProps}
                          disabled={isSubmitting}
                          onChange={handleChange}
                          value={values[name]}
                          onBlur={(e: SyntheticEvent) => handleBlur(e)}
                          helperText={(errors[name] && touched[name]) && errors[name]}
                          error={errors[name] && touched[name]}
                        />
                      )
                    }
                    />
                  ))}
                  <Box className={classes.customDevelopmentControlsContainer}>
                    <Button
                      className={classes.submitButton}
                      size="large"
                      type="submit"
                      color="secondary"
                      variant="outlined"
                      disabled={isDisabledSendButton}
                    >
                      Send
                    </Button>
                    <Button
                      className={classes.resetButton}
                      size="large"
                      type="reset"
                      color="secondary"
                      variant="outlined"
                      endIcon={<CloseCircleIcon />}
                      disabled={isDisabledCleanButton}
                    >
                      Clean
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};
