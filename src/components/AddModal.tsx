import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalContent,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Props = Pick<UseDisclosureReturn, "isOpen" | "onClose"> & {
  addTask: (name: string) => void;
};

export default function AddModal({ isOpen, onClose, addTask }: Props) {
  const { register, handleSubmit } = useForm<{ name: string }>();
  const onSubmit = handleSubmit(
    ({ name }) => {
      addTask(name);
    },
    (err) => {
      console.error(err);
    }
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Task:</FormLabel>
              <Input {...register("name")} />
            </FormControl>
            <Button type="submit">Add</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
