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
      ...options, // Allow overriding or adding options
    });
  };

  return { notify };
};
