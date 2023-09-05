import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { THEME_COLORS } from '../../Constants';

interface OpenChatSendMessageProps {
    onSend: (text: string) => void;
}

interface OpenChatSendMessageState {
    text: string;
}

export default class OpenChatSendMessage extends Component<OpenChatSendMessageProps, OpenChatSendMessageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={this.state.text}
                    onChangeText={this.handleTextChange}
                />
                <IconButton
                    style={{backgroundColor: THEME_COLORS.ACTIVE_SCREEN_TAB}}
                    icon="send"
                    onPress={this.handleSendButtonPress}
                    disabled={!this.state.text}
                />
            </View>
        );
    }

    private handleTextChange = (text: string) => {
        this.setState({ text });
    };

    private handleSendButtonPress = () => {
        const { onSend } = this.props;
        const { text } = this.state;
        onSend(text);
        this.setState({ text: '' });
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        marginRight: 8,
    },
});