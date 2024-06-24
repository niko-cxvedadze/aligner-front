import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export function TasksPanel() {
  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full flex flex-row justify-between px-3 pt-3">
        <div className="flex"></div>
        <div>
          <Button variant="outline" size="sm">
            Create Task
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
