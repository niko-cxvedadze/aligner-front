import { TCompoboxOption } from "@/components/custom/ComboBox";

import {
  CheckCircledIcon,
  StopwatchIcon,
  CircleIcon,
  CrossCircledIcon,
  MinusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DoubleArrowUpIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const taskStatuses: Record<string, TCompoboxOption> = {
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

export const taskStatusesList: TCompoboxOption[] = Object.values(taskStatuses);

export const taskPriorities: Record<string, TCompoboxOption> = {
  "no-priority": {
    label: "No Priority",
    value: "no-priority",
    icon: <MinusIcon />,
  },
  urgent: {
    label: "Urgent",
    value: "urgent",
    icon: <DoubleArrowUpIcon />,
  },
  low: {
    label: "Low",
    value: "low",
    icon: <ChevronDownIcon />,
  },
  medium: {
    label: "Medium",
    value: "medium",
    icon: <ChevronRightIcon />,
  },
  high: {
    label: "High",
    value: "high",
    icon: <ChevronUpIcon />,
  },
};

export const taskPrioritiesList: TCompoboxOption[] =
  Object.values(taskPriorities);
