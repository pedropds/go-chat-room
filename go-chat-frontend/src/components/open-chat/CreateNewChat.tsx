import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default class CreateNewChat extends Component {
    render() {
        return (
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => this.handleAddChatRoomPress()}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleAddChatRoomPress() {
        console.log("handle press");
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