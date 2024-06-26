import { TTaskStatus } from "@/@types/global.types";
import {
  CheckCircledIcon,
  StopwatchIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

export const taskStatuses: Record<string, TTaskStatus> = {
  backlog: {
    label: "Backlog",
    value: "backlog",
    icon: <QuestionMarkCircledIcon />,
  },
  todo: {
    label: "Todo",
    value: "todo",
    icon: <CircleIcon />,
  },
  "in-progress": {
    label: "In Progress",
    value: "in-progress",
    icon: <StopwatchIcon />,
  },
  done: {
    label: "Done",
    value: "done",
    icon: <CheckCircledIcon />,
  },
  canceled: {
    label: "Canceled",
    value: "canceled",
    icon: <CrossCircledIcon />,
  },
};

export const taskStatusesList: TTaskStatus[] = Object.values(taskStatuses);
