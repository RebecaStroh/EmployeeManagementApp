// CustomAlert.jsx
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CustomAlert = ({
  open,
  handleClose,
  title,
  content,
  onConfirm,
  cancelLabel,
  confirmLabel
}) => {
  const handleConfirm = () => {
    handleClose();
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof content === 'string' ? (
          <DialogContentText>{content}</DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      <DialogActions>
        {cancelLabel && <Button onClick={handleClose} color="primary">
          {cancelLabel}
        </Button>}
        <Button onClick={handleConfirm} color="primary">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;