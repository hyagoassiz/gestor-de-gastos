export interface SnackBar {
  message: string;
  type: "error" | "info" | "success" | "warning";
  open: boolean;
}
