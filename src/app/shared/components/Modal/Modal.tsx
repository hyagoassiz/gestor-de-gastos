import { Box, BoxProps, Modal as MuiModal } from "@mui/material";
import { ReactNode } from "react";
import { StyledBox, Title } from "./styles";

interface IMuiModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  buttons: ReactNode;
  style: BoxProps;
}

export const Modal: React.FC<IMuiModalProps> = ({
  title,
  open,
  children,
  buttons,
  style,
}) => {
  return (
    <>
      <MuiModal open={open}>
        <StyledBox
          sx={{
            ...style,
          }}
        >
          <Title id="modal-modal-title" variant="h6">
            {title}
          </Title>
          <Box sx={{ mt: 4, textAlign: "justify" }}>{children}</Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
            {buttons}
          </Box>
        </StyledBox>
      </MuiModal>
    </>
  );
};