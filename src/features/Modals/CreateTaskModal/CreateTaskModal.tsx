import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

type CreateTaskModalProps = {
  onOpenChange: (open: boolean) => void;
};

export function CreateTaskModal({ onOpenChange }: CreateTaskModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Create Task</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div>content</div>
      </DialogContent>
      <DialogFooter>
        <button>Close</button>
      </DialogFooter>
    </Dialog>
  );
}
