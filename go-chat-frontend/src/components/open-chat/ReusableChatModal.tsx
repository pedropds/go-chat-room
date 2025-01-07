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

interface ReusableChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { chatName?: string; members: string[] }) => void;
  title: string;
  initialChatName?: string;
  initialSelectedMembers?: string[];
  placeholderText?: string;
  friends: { label: string; value: string }[]; // Dropdown options
  allowChatName?: boolean; // Show/hide chat name input
}

const ReusableChatModal: React.FC<ReusableChatModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  initialChatName = "",
  initialSelectedMembers = [],
  placeholderText = "Select members...",
  friends,
  allowChatName = true,
}) => {
  const [chatName, setChatName] = useState(initialChatName);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
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
              options={friends}
              placeholder={placeholderText}
              onChange={(
                selectedOptions: MultiValue<{ label: string; value: string }>
              ) =>
                setSelectedMembers(
                  selectedOptions.map((option) => option.value)
                )
              }
              value={friends.filter((friend) =>
                selectedMembers.includes(friend.value)
              )}
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
