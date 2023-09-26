import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react';

interface CreateNewChatState {
    isOpen: boolean;
}

export default class CreateNewChat extends Component<any, CreateNewChatState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    render() {
        return (
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => this.handleAddChatRoomPress()}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                <Modal isOpen={this.state.isOpen} onClose={this.onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create new chat</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            what is happening
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={this.onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </View>
        )
    }

    handleAddChatRoomPress() {
        this.setState({ isOpen: true });
    }

    onClose = () => {
        this.setState({ isOpen: false });
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        fontSize: 24,
        color: '#fff',
    }
});