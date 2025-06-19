import { Box, Typography } from "@mui/material";

interface IPageTitle {
  title: string;
  subTitle?: string;
}

export const PageTitle: React.FC<IPageTitle> = ({ title, subTitle }) => {
  return (
    <Box mb={2.5}>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      {subTitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subTitle}
        </Typography>
      )}
    </Box>
  );
};
