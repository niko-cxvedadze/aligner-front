import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button.tsx";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

type AgreeModalProps = {
  open?: boolean;
  title: string;
  description?: string;
  onOpenChange: (value: boolean) => void;
  onAgree: () => void;
  loading?: boolean;
};

export function AgreeModal({
  open,
  title,
  onAgree,
  description,
  onOpenChange,
  loading = false,
}: AgreeModalProps) {
  useEffect(() => {
    if (open) return;

    const timer = setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onAgree} disabled={loading}>
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
