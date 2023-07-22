import { alert } from "./alerts";

interface ConfirmationPromptProps {
  firstMessage: string;
  secondMessage?: string;
  actionFunction: (payload?: any) => void;
  closeDialog?: () => void;
}

export const confirmationPrompt = async (props: ConfirmationPromptProps) => {
  const { firstMessage, secondMessage, actionFunction, closeDialog } = props;

  const { value: firstConfirm } = await alert.fire({
    title: firstMessage,
    icon: "question",
  });
  if (!firstConfirm) {
    return;
  }

  if (secondMessage) {
    const { value: secondConfirm } = await alert.fire({
      title: secondMessage,
      icon: "question",
    });
    if (!firstConfirm || !secondConfirm) {
      return;
    }
  }

  actionFunction();
  closeDialog?.();
};
