import React, {
  useCallback, useMemo, VFC,
} from 'react';
import clsx from 'clsx';
import {
  Typography, Button, Box, TextField,
} from '@material-ui/core';
import {
  Field, FieldProps, Form, Formik, FormikHelpers,
} from 'formik';

import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { Modal } from 'components/Modal';
import { EmailIcon } from 'theme/icons';
import {
  initFormValues,
  validationSchema,
  IFormValues,
} from './PasswordResetByEmailModal.helpers';
import { useStyles } from './PasswordResetByEmailModal.styles';

export interface Props {
  className?: string;
  open?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  onClose?: () => void;
  onSubmit?: (email: IFormValues['email']) => void;
}

export const PasswordResetByEmailModal: VFC<Props> = ({
  open,
  setIsModalOpen,
  onClose,
  onSubmit,
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

  const handleSubmit = useCallback((email: IFormValues['email']) => {
    if (onSubmit) {
      onSubmit(email);
    }
  }, [onSubmit]);

  const { isLight } = useShallowSelector(userSelector.getUser);

  const title = useMemo(
    () => (
      <Box className={classes.title}>
        <Typography
          className={clsx(isLight ? '' : 'acidGreen gradient', classes.titleText)}
          align="left"
          variant="h2"
        >
          Enter e-mail for password reset
        </Typography>
      </Box>
    ),
    [classes.title, classes.titleText, isLight],
  );

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={title}
    >
      <Formik
        initialValues={initFormValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={(
          values,
          { resetForm }: FormikHelpers<IFormValues>,
        ) => {
          handleSubmit(values.email);
          resetForm();
        }}
      >
        {({
          errors, touched, values, handleChange, handleBlur, isValid,
        // eslint-disable-next-line arrow-body-style
        }) => {
          return (
            <Form translate={undefined}>
              <Box className={classes.inputContainer}>
                <Field
                  key="email"
                  id="email"
                  name="email"
                  render={
                      ({ form: { isSubmitting } }: FieldProps) => (
                        <TextField
                          name="email"
                          label="Email"
                          InputProps={{
                            endAdornment: <EmailIcon />,
                          }}
                          disabled={isSubmitting}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={(errors.email && touched.email) && errors.email}
                          error={errors.email && touched.email}
                        />
                      )
                    }
                />
              </Box>
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
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};
