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
            <View style={styles.container}>
                <Text style={styles.text}>{initials}</Text>
            </View>
          );
    }
}

const styles = StyleSheet.create({ 
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: THEME_COLORS.ROOM_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: THEME_COLORS.ROOM_COLOR,
        fontSize: 25,
    },
});
