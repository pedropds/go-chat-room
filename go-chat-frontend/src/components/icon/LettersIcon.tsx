import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME_COLORS } from "../../Constants";

interface LetterIconProps {
    initials: string;
}

export default class LetterIcon extends Component<LetterIconProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            initials: ""
        };
    }

    render() {
        const { initials } = this.props;
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>{initials}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 2,
        borderColor: THEME_COLORS.INITIALS_ROOM_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: THEME_COLORS.INITIALS_ROOM_COLOR,
        backgroundColor: THEME_COLORS.INITIALS_ROOM_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: THEME_COLORS.CHAT_LIST_COLOR,
        fontSize: 25,
    },
});
