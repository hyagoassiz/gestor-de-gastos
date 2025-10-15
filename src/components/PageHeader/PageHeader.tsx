import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { BreadcrumbItem } from "@/types";

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  rightContent?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
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
        {breadcrumbs && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 0.5 }}
          >
            {breadcrumbs.map((item, index) => {
              const content = (
                <Typography
                  noWrap
                  sx={{
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                    verticalAlign: "bottom",
                  }}
                >
                  {item.label}
                </Typography>
              );

              return item.to ? (
                <Link
                  key={index}
                  component={RouterLink}
                  to={item.to}
                  underline="hover"
                  color="inherit"
                >
                  {content}
                </Link>
              ) : (
                <Typography key={index} color="text.primary">
                  {content}
                </Typography>
              );
            })}
          </Breadcrumbs>
        )}

        <Typography variant="h5" component="h1" color="text.primary">
          {title}
        </Typography>
      </Box>

      {rightContent && (
        <Box display="flex" alignItems="center" gap={2}>
          {rightContent}
        </Box>
      )}
    </Box>
  );
};
