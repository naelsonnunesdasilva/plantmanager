import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string,
}

export default function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.constainer}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.text}>{ title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    constainer: {
        backgroundColor: colors.green,
        height: 54,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.white,
        marginTop: 16,
    },
})