import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useStyles as useCommonStyles } from '../../MyContracts.styles';
import { AdditionalContent, ApproveRejectBox, ConfirmationTimeBlock } from '..';

export const AdditionalContentRequestWithdrawal: FC<{ onApprove: () => void; onReject: () => void }> = ({ onApprove, onReject }) => {
  const commonClasses = useCommonStyles();
  return (
    <AdditionalContent>
      <Box className={commonClasses.contractActionBlockInner}>
        <Typography className={commonClasses.contractActionText}>Request withdrawal</Typography>
        <ApproveRejectBox onApprove={onApprove} onReject={onReject} />
      </Box>
      <ConfirmationTimeBlock className={commonClasses.contractActionBlockInner} />
    </AdditionalContent>
  );
};
