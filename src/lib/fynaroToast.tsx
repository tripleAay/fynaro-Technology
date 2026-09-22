import {
  AlertCircle,
  Check,
  Info,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";

import {
  Id,
  toast,
} from "react-toastify";

type FynaroToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

type FynaroToastContentProps = {
  type: FynaroToastType;
  title: string;
  message?: string;
};

type FynaroToastOptions = {
  title?: string;
  message?: string;
  id?: string;
  autoClose?: number | false;
};

type FynaroPromiseMessages<T> = {
  loading?: string;

  success?:
    | string
    | ((
        data: T
      ) => string);

  error?:
    | string
    | ((
        error: unknown
      ) => string);
};

function ToastIcon({
  type,
}: {
  type: FynaroToastType;
}) {
  const iconClass =
    "h-[17px] w-[17px]";

  switch (type) {
    case "success":
      return (
        <Check
          className={
            iconClass
          }
          strokeWidth={2}
        />
      );

    case "error":
      return (
        <AlertCircle
          className={
            iconClass
          }
          strokeWidth={1.8}
        />
      );

    case "warning":
      return (
        <TriangleAlert
          className={
            iconClass
          }
          strokeWidth={1.8}
        />
      );

    case "loading":
      return (
        <LoaderCircle
          className={`${iconClass} animate-spin`}
          strokeWidth={1.8}
        />
      );

    default:
      return (
        <Info
          className={
            iconClass
          }
          strokeWidth={1.8}
        />
      );
  }
}

function FynaroToastContent({
  type,
  title,
  message,
}: FynaroToastContentProps) {
  return (
    <div className="fynaro-toast-content">
      <div
        className={`fynaro-toast-icon fynaro-toast-icon--${type}`}
      >
        <ToastIcon
          type={type}
        />
      </div>

      <div className="fynaro-toast-copy">
        <p className="fynaro-toast-title">
          {title}
        </p>

        {message && (
          <p className="fynaro-toast-message">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

function showToast(
  type: Exclude<
    FynaroToastType,
    "loading"
  >,
  {
    title,
    message,
    id,
    autoClose = 4500,
  }: Required<
    Pick<
      FynaroToastOptions,
      "title"
    >
  > &
    Omit<
      FynaroToastOptions,
      "title"
    >
) {
  return toast(
    <FynaroToastContent
      type={type}
      title={title}
      message={message}
    />,
    {
      toastId: id,
      type,
      icon: false,
      autoClose,
      className:
        `fynaro-toast fynaro-toast--${type}`,
    }
  );
}

function getErrorMessage(
  error: unknown,
  fallback =
    "Something went wrong. Please try again."
) {
  if (
    error instanceof Error &&
    error.message
  ) {
    return error.message;
  }

  if (
    typeof error ===
    "string"
  ) {
    return error;
  }

  if (
    error &&
    typeof error ===
      "object" &&
    "message" in error &&
    typeof error.message ===
      "string"
  ) {
    return error.message;
  }

  return fallback;
}

export const fynaroToast = {
  success(
    title: string,
    message?: string,
    options?: Omit<
      FynaroToastOptions,
      "title" | "message"
    >
  ) {
    return showToast(
      "success",
      {
        title,
        message,
        ...options,
      }
    );
  },

  error(
    title: string,
    message?: string,
    options?: Omit<
      FynaroToastOptions,
      "title" | "message"
    >
  ) {
    return showToast(
      "error",
      {
        title,
        message,
        ...options,
      }
    );
  },

  warning(
    title: string,
    message?: string,
    options?: Omit<
      FynaroToastOptions,
      "title" | "message"
    >
  ) {
    return showToast(
      "warning",
      {
        title,
        message,
        ...options,
      }
    );
  },

  info(
    title: string,
    message?: string,
    options?: Omit<
      FynaroToastOptions,
      "title" | "message"
    >
  ) {
    return showToast(
      "info",
      {
        title,
        message,
        ...options,
      }
    );
  },

  loading(
    title: string,
    message?: string
  ): Id {
    return toast.loading(
      <FynaroToastContent
        type="loading"
        title={title}
        message={message}
      />,
      {
        icon: false,
        closeOnClick: false,
        className:
          "fynaro-toast fynaro-toast--loading",
      }
    );
  },

  updateSuccess(
    id: Id,
    title: string,
    message?: string
  ) {
    toast.update(id, {
      render: (
        <FynaroToastContent
          type="success"
          title={title}
          message={message}
        />
      ),
      type: "success",
      icon: false,
      isLoading: false,
      autoClose: 4000,
      closeOnClick: true,
      className:
        "fynaro-toast fynaro-toast--success",
    });
  },

  updateError(
    id: Id,
    title: string,
    message?: string
  ) {
    toast.update(id, {
      render: (
        <FynaroToastContent
          type="error"
          title={title}
          message={message}
        />
      ),
      type: "error",
      icon: false,
      isLoading: false,
      autoClose: 5500,
      closeOnClick: true,
      className:
        "fynaro-toast fynaro-toast--error",
    });
  },

  async promise<T>(
    promise:
      | Promise<T>
      | (() => Promise<T>),
    messages: FynaroPromiseMessages<T> = {}
  ): Promise<T> {
    const id =
      fynaroToast.loading(
        messages.loading ||
          "Processing",
        "Please wait while Fynaro completes this action."
      );

    try {
      const result =
        typeof promise ===
        "function"
          ? await promise()
          : await promise;

      const successMessage =
        typeof messages.success ===
        "function"
          ? messages.success(
              result
            )
          : messages.success ||
            "Action completed successfully.";

      fynaroToast.updateSuccess(
        id,
        "Completed",
        successMessage
      );

      return result;
    } catch (error) {
      const errorMessage =
        typeof messages.error ===
        "function"
          ? messages.error(
              error
            )
          : messages.error ||
            getErrorMessage(
              error
            );

      fynaroToast.updateError(
        id,
        "Action failed",
        errorMessage
      );

      throw error;
    }
  },

  dismiss(id?: Id) {
    toast.dismiss(id);
  },

  clear() {
    toast.dismiss();
  },

  getErrorMessage,
};