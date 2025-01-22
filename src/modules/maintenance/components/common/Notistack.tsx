import {
  OptionsObject,
  SnackbarKey,
  SnackbarProvider,
  useSnackbar,
} from "notistack";
import { PropsWithChildren } from "react";

export const NoistackProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3} // Maximum number of snackbars visible at a time
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={2000} // Default hide duration set to 2000ms
    >
      {children}
    </SnackbarProvider>
  );
};

type NotificationType = "default" | "success" | "error" | "warning" | "info";

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (
    message: string,
    type: NotificationType = "default",
    options?: OptionsObject
  ): SnackbarKey => {
    return enqueueSnackbar(message, {
      variant: type, // Set the type of notification
      autoHideDuration: 2000, // Default hide duration for individual notifications
      ...options, // Allow overriding or adding options
    });
  };

  return { notify };
};
