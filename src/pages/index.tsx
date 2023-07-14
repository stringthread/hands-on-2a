import AddModal from "@/components/AddModal";
import TaskRecord, { Task } from "@/components/task";
import {
  Heading,
  Container,
  VStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<{
    task: Record<string, Task>;
    nextId: number;
  }>({ task: {}, nextId: 1 });

  const generateSetCompleted = (taskId: string) => (state: boolean) => {
    setTasks((lastState) => ({
      task: {
        ...lastState.task,
        [taskId]: { ...lastState.task[taskId], completed: state },
      },
      nextId: lastState.nextId,
    }));
  };

  const generateRemove = (taskId: string) => () => {
    setTasks((lastState) => {
      delete lastState.task[taskId];
      return { ...lastState };
    });
  };

  const addTask = (name: string) => {
    setTasks(({ task, nextId }) => {
      return {
        task: { ...task, [nextId]: { name, completed: false } },
        nextId: nextId + 1,
      };
    });
  };

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Container>
      <Heading>Todo List</Heading>
      <VStack>
        {Object.keys(tasks.task).map((k) => (
          <TaskRecord
            task={tasks.task[k]}
            setCompleted={generateSetCompleted(k)}
            remove={generateRemove(k)}
            key={k}
          />
        ))}
      </VStack>
      <Button onClick={onOpen}>追加</Button>
      <AddModal isOpen={isOpen} onClose={onClose} addTask={addTask} />
    </Container>
  );
}
