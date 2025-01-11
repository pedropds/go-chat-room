import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Select, { MultiValue } from "react-select";
import { Member } from "./CreateNewChat";

interface ReusableChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { chatName?: string; members: Member[] }) => void;
  title: string;
  initialChatName?: string;
  initialSelectedMembers?: Member[];
  placeholderText?: string;
  friends: Member[]; // Dropdown options
  allowChatName?: boolean; // Show/hide chat name input
}

const ReusableChatModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialChatName = "",
  initialSelectedMembers = [],
  placeholderText = "Select members...",
  friends,
  allowChatName = true,
}: ReusableChatModalProps) => {
  const [chatName, setChatName] = useState(initialChatName);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>(
    initialSelectedMembers
  );

  const handleSubmit = () => {
    onSubmit({
      chatName: allowChatName ? chatName : undefined,
      members: selectedMembers,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="80%">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {allowChatName && (
            <FormControl isRequired>
              <FormLabel>Chat Name</FormLabel>
              <Input
                placeholder="Enter chat name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </FormControl>
          )}
          <FormControl mt={4}>
            <FormLabel>
              {allowChatName ? "Add Friends" : "Add Members"}
            </FormLabel>
            <Select
              isMulti
              options={friends.map((friend) => ({
                label: friend.label.toString(), // Convert numeric label to string for display
                value: friend.value,
              }))}
              placeholder={placeholderText}
              onChange={(
                selectedOptions: MultiValue<{ label: string; value: string }>
              ) =>
                setSelectedMembers(
                  selectedOptions.map(
                    (option) =>
                      friends.find((friend) => friend.value === option.value)!
                  )
                )
              }
              value={selectedMembers.map((member) => ({
                label: member.label.toString(),
                value: member.value,
              }))}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isDisabled={allowChatName && !chatName}
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReusableChatModal;
