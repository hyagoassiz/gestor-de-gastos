import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  rightContent?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subTitle,
  rightContent,
}) => {
  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h5" component="h1" color="text.primary">
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subTitle}
          </Typography>
        )}
      </Box>

      {rightContent && <Box>{rightContent}</Box>}
    </Box>
  );
};
