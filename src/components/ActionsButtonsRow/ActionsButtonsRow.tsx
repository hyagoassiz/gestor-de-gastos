import { Box } from "@mui/material";
import { ReactNode } from "react";

interface ActionButtonsRowProps {
  left?: ReactNode;
  right?: ReactNode;
}

export const ActionButtonsRow: React.FC<ActionButtonsRowProps> = ({
  left,
  right,
}) => {
  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>{left || <div />}</Box>

      <Box>{right}</Box>
    </Box>
  );
};
