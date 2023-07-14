import { Button, Checkbox, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler } from "react";

export type Task = {
  name: string;
  completed: boolean;
};

type Props = {
  task: Task;
  setCompleted: (state: boolean) => void;
  remove: () => void;
};

export default function TaskRecord({ task, setCompleted, remove }: Props) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCompleted(e.target.checked);
  };
  return (
    <HStack>
      <Checkbox isChecked={task.completed} onChange={onChange} />
      <Text>{task.name}</Text>
      <Button colorScheme="red" size="xs" onClick={remove}>
        削除
      </Button>
    </HStack>
  );
}
