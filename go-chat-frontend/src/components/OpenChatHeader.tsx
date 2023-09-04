import { Component } from "react";
import { StyleSheet } from "react-native";
import { ChatRoomDTO } from "../model/chat.model";
import { Appbar, Menu } from "react-native-paper";
import { THEME_COLORS } from "../Constants";

interface OpenChatHeaderProps {
    navigation: any;
    chatRoom: ChatRoomDTO | null;
}

export default class OpenChatHeader extends Component<OpenChatHeaderProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            chatRoom: null,
            visible: false,
        };
    }

    _openMenu = () => this.setState({ visible: true });
    _closeMenu = () => this.setState({ visible: false });

    render() {
        const { chatRoom } = this.props;
        const chatTitle = chatRoom?.roomName ?? "Chat";

        return (
            <Appbar.Header style={styles.topBar}>
                <Appbar.BackAction onPress={this.handleBackButtonPress} />
                <Appbar.Content titleStyle={styles.headerTitle} title={chatTitle} />
                <Menu
                    visible={this.state.visible}
                    onDismiss={this._closeMenu}
                    anchor={
                        <Appbar.Action
                            icon="dots-vertical"
                            onPress={this._openMenu}
                        />
                    }
                >
                    <Menu.Item onPress={() => { this.handleViewMembersOption() }} title="View members" />
                </Menu>
            </Appbar.Header>
        );
    }

    private handleViewMembersOption() {
        console.log("View members");
    }

    private handleBackButtonPress = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

}


const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        backgroundColor: THEME_COLORS.BACKGROUND_MENU_COLOR,
    },
    headerTitle: {
        color: THEME_COLORS.ACTIVE_SCREEN_TAB,
    }
});
