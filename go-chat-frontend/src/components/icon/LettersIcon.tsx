import React, { Component } from "react";
import { View, Text } from "react-native";

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
            <View>
                <Text style={{ color: 'black', fontSize: 25 }}>{initials}</Text>
            </View>
          );
    }
}
