"use client";

import {
  AlertCircle,
  Check,
  Heart,
  Info,
  LoaderCircle,
  ShoppingBag,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import {
  Id,
  Slide,
  toast,
  ToastContainer,
  ToastOptions,
  TypeOptions,
} from "react-toastify";

type ToastKind =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "gold";

type ProjectRequestPayload = {
  projectName?: string;
  ref?: string;
};

type ToastContentProps = {
  kind: ToastKind;
  title: string;
  message?: string;
  detail?: string;
};

type FynaroToastOptions = {
  id?: string;
  autoClose?: number | false;
};

type PromiseMessages<T> = {
  loading?: string;

  success?:
    | string
    | ((result: T) => string);

  error?:
    | string
    | ((error: unknown) => string);
};

const baseOptions:
  ToastOptions = {
  position: "bottom-right",
  autoClose: 4200,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  draggable: true,
  theme: "light",
  transition: Slide,
  icon: false,
};

function ToastIcon({
  kind,
}: {
  kind: ToastKind;
}) {
  const className =
    "h-[17px] w-[17px]";

  switch (kind) {
    case "success":
      return (
        <Check
          className={
            className
          }
          strokeWidth={2}
        />
      );

    case "error":
      return (
        <AlertCircle
          className={
            className
          }
          strokeWidth={1.8}
        />
      );

    case "warning":
      return (
        <TriangleAlert
          className={
            className
          }
          strokeWidth={1.8}
        />
      );

    case "loading":
      return (
        <LoaderCircle
          className={`${className} animate-spin`}
          strokeWidth={1.8}
        />
      );

    case "gold":
      return (
        <Sparkles
          className={
            className
          }
          strokeWidth={1.8}
        />
      );

    default:
      return (
        <Info
          className={
            className
          }
          strokeWidth={1.8}
        />
      );
  }
}

function ToastContent({
  kind,
  title,
  message,
  detail,
}: ToastContentProps) {
  return (
    <div className="fynaro-toast-content">
      <div
        className={`fynaro-toast-icon fynaro-toast-icon--${kind}`}
      >
        <ToastIcon
          kind={kind}
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

        {detail && (
          <p className="fynaro-toast-detail">
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}

function typeForKind(
  kind: ToastKind
): TypeOptions {
  if (
    kind === "gold" ||
    kind === "loading"
  ) {
    return "default";
  }

  return kind;
}

function showToast(
  kind: Exclude<
    ToastKind,
    "loading"
  >,
  title: string,
  message?: string,
  detail?: string,
  options?: FynaroToastOptions
) {
  return toast(
    <ToastContent
      kind={kind}
      title={title}
      message={message}
      detail={detail}
    />,
    {
      ...baseOptions,

      toastId:
        options?.id,

      autoClose:
        options?.autoClose ??
        baseOptions.autoClose,

      type:
        typeForKind(
          kind
        ),

      className:
        `fynaro-toast fynaro-toast--${kind}`,
    }
  );
}

export function FynaroToastHost() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4200}
      newestOnTop
      limit={4}
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss={false}
      draggable
      hideProgressBar={false}
      theme="light"
      transition={Slide}
      icon={false}
      className="fynaro-toast-container"
      toastClassName="fynaro-toast"
      bodyClassName="fynaro-toast-body"
      progressClassName="fynaro-toast-progress"
      aria-label="Fynaro notifications"
    />
  );
}

export function getToastErrorMessage(
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

export function useFynaroToast() {
  const notifySuccess = (
    title: string,
    message?: string,
    options?: FynaroToastOptions
  ) =>
    showToast(
      "success",
      title,
      message,
      undefined,
      options
    );

  const notifyError = (
    title: string,
    message?: string,
    options?: FynaroToastOptions
  ) =>
    showToast(
      "error",
      title,
      message,
      undefined,
      {
        autoClose: 5500,
        ...options,
      }
    );

  const notifyWarning = (
    title: string,
    message?: string,
    options?: FynaroToastOptions
  ) =>
    showToast(
      "warning",
      title,
      message,
      undefined,
      options
    );

  const notifyInfo = (
    title: string,
    message?: string,
    options?: FynaroToastOptions
  ) =>
    showToast(
      "info",
      title,
      message,
      undefined,
      options
    );

  const notifyGoldMoment = (
    title: string,
    message?: string
  ) =>
    showToast(
      "gold",
      title,
      message,
      "This update is now live in your Fynaro workspace."
    );

  const notifyAddToCart = (
    productName: string
  ) =>
    toast(
      <div className="fynaro-toast-content">
        <div className="fynaro-toast-icon fynaro-toast-icon--gold">
          <ShoppingBag
            className="h-[17px] w-[17px]"
            strokeWidth={1.8}
          />
        </div>

        <div className="fynaro-toast-copy">
          <p className="fynaro-toast-title">
            Added to cart
          </p>

          <p className="fynaro-toast-message">
            {productName}
          </p>

          <p className="fynaro-toast-detail">
            Adjust the quantity from your Fynaro cart.
          </p>
        </div>
      </div>,
      {
        ...baseOptions,
        type: "default",
        className:
          "fynaro-toast fynaro-toast--gold",
      }
    );

  const notifyWishlistToggle = (
    productName: string,
    added: boolean
  ) =>
    toast(
      <div className="fynaro-toast-content">
        <div
          className={`fynaro-toast-icon ${
            added
              ? "fynaro-toast-icon--success"
              : "fynaro-toast-icon--info"
          }`}
        >
          <Heart
            className="h-[17px] w-[17px]"
            strokeWidth={1.8}
            fill={
              added
                ? "currentColor"
                : "none"
            }
          />
        </div>

        <div className="fynaro-toast-copy">
          <p className="fynaro-toast-title">
            {added
              ? "Added to wishlist"
              : "Removed from wishlist"}
          </p>

          <p className="fynaro-toast-message">
            {productName}
          </p>

          <p className="fynaro-toast-detail">
            {added
              ? "Saved for later in your Fynaro wishlist."
              : "The item has been removed from your wishlist."}
          </p>
        </div>
      </div>,
      {
        ...baseOptions,
        type:
          added
            ? "success"
            : "info",
        className:
          `fynaro-toast ${
            added
              ? "fynaro-toast--success"
              : "fynaro-toast--info"
          }`,
      }
    );

  const notifyProjectRequestCreated =
    ({
      projectName,
      ref,
    }: ProjectRequestPayload = {}) =>
      showToast(
        "success",
        projectName ||
          "Project request received",
        ref
          ? `Reference: ${ref}`
          : "Your project brief has been submitted.",
        "Timeline, pricing and updates will appear in your Fynaro workspace.",
        {
          autoClose: 5500,
        }
      );

  const notifyLoading = (
    title: string,
    message?: string
  ): Id =>
    toast.loading(
      <ToastContent
        kind="loading"
        title={title}
        message={message}
      />,
      {
        ...baseOptions,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        className:
          "fynaro-toast fynaro-toast--loading",
      }
    );

  const updateSuccess = (
    id: Id,
    title: string,
    message?: string
  ) => {
    toast.update(id, {
      render: (
        <ToastContent
          kind="success"
          title={title}
          message={message}
        />
      ),

      type: "success",
      icon: false,
      isLoading: false,
      autoClose: 4200,
      closeOnClick: true,
      draggable: true,

      className:
        "fynaro-toast fynaro-toast--success",
    });
  };

  const updateError = (
    id: Id,
    title: string,
    message?: string
  ) => {
    toast.update(id, {
      render: (
        <ToastContent
          kind="error"
          title={title}
          message={message}
        />
      ),

      type: "error",
      icon: false,
      isLoading: false,
      autoClose: 5500,
      closeOnClick: true,
      draggable: true,

      className:
        "fynaro-toast fynaro-toast--error",
    });
  };

  const notifyPromise =
    async <T,>(
      operation:
        | Promise<T>
        | (() => Promise<T>),

      messages:
        PromiseMessages<T> = {}
    ): Promise<T> => {
      const id =
        notifyLoading(
          "Processing",
          messages.loading ||
            "Fynaro is completing your request."
        );

      try {
        const result =
          typeof operation ===
          "function"
            ? await operation()
            : await operation;

        const successMessage =
          typeof messages.success ===
          "function"
            ? messages.success(
                result
              )
            : messages.success ||
              "The action was completed successfully.";

        updateSuccess(
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
              getToastErrorMessage(
                error
              );

        updateError(
          id,
          "Action failed",
          errorMessage
        );

        throw error;
      }
    };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyLoading,
    updateSuccess,
    updateError,
    notifyPromise,

    notifyAddToCart,
    notifyWishlistToggle,
    notifyProjectRequestCreated,
    notifyGoldMoment,

    dismiss:
      toast.dismiss,

    clear: () =>
      toast.dismiss(),

    rawToast:
      toast,

    getErrorMessage:
      getToastErrorMessage,
  };
}