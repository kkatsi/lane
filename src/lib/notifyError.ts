import { toast, type ExternalToast } from "vue-sonner";
import { ZodError } from "zod";

interface NotifyOptions {
  actionVerb?: string; //E.g. Couldn't {actionVerb} -> Couldn't notify user
  retry?: () => void;
  silent?: boolean; // E.g Don't surface it to the user, log it only on Sentry
}

const isNetworkError = (e: unknown): boolean => e instanceof TypeError && /fetch|network/i.test(e.message);
const isStorageOutOfQuotaError = (e: unknown): boolean => e instanceof DOMException && e.name === "QuotaExceededError";

export const notifyError = (error: unknown, options?: NotifyOptions) => {
  if (error instanceof ZodError) return;

  if (isStorageOutOfQuotaError(error)) {
    if (!options?.silent) toast.error("Storage is full. Delete some items to free up space.");
    else console.error(error);
    return;
  }

  if (isNetworkError(error) || !navigator.onLine) {
    if (!options?.silent) toast.error("Couldn't reach the server. Please check your internet connection.");
    else console.error(error);
    return;
  }

  const unhnadledErrorActionVerb = options?.actionVerb || "complete that";
  const unhandledErrorText = `Couldn't ${unhnadledErrorActionVerb}.${options?.retry ? " Please try again." : ""}`;
  const unhandledErrorAction = options?.retry
    ? ({ label: "Retry", onClick: options?.retry } satisfies ExternalToast["action"])
    : undefined;

  console.error("[notifyError] unhandled", error);
  if (!options?.silent) toast.error(unhandledErrorText, { action: unhandledErrorAction });
};
