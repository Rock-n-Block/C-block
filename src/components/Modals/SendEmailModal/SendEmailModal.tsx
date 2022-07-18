import React, {
  SyntheticEvent,
  useCallback, useMemo, useRef, VFC,
} from 'react';
import clsx from 'clsx';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import {
  Field, FieldProps, Form, Formik, FormikProps, FormikHelpers,
} from 'formik';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import {
  initFormValues,
  validationSchema,
  IFormValues,
  sendEmail,
  formConfig,
} from './SendEmailModal.helpers';
import { useStyles } from './SendEmailModal.styles';

export interface SendEmailModalProps {
  className?: string;
  open?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  onClose?: () => void;
}

export const SendEmailModal: VFC<SendEmailModalProps> = ({
  open,
  setIsModalOpen,
  onClose,
}) => {
  const classes = useStyles();

  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  }, [onClose, setIsModalOpen]);

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(
    () => (
      <Box className={classes.title}>
        <Typography
          align="left"
          variant="h3"
        >
          Send an e-mail to user
        </Typography>
      </Box>
    ),
    [classes.title, isLight],
  );

  const formikRef = useRef<FormikProps<IFormValues>>();

  return (
    <Modal
      className={classes.root}
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initFormValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={(
          values,
          { resetForm }: FormikHelpers<IFormValues>,
        ) => {
          sendEmail(values);
          resetForm();
        }}
      >
        {({
          errors, touched, values, handleChange, handleBlur, isValid,
        // eslint-disable-next-line arrow-body-style
        }) => {
          return (
            <Form translate={undefined}>
              {formConfig.map(({ id, name, renderProps }) => (
                <Box className={classes.inputContainer}>
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
                </Box>
              ))}
              <Box className={classes.buttonsContainer}>
                <Button
                  className={clsx(classes.button)}
                  size="large"
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!isValid}
                >
                  Send
                </Button>
                <Button
                  className={classes.button}
                  size="large"
                  type="reset"
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
