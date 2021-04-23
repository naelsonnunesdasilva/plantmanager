import React from 'react';
import {
    Text, StyleSheet
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton, RectButtonProps  } from 'react-native-gesture-handler';

interface EnviromentButtonProps extends RectButtonProps {
    title: string,
    active?: boolean,
}

export default function EnviromentButton({
    title,
    active = false,
    ...rest
}: EnviromentButtonProps) {
    return (
        <RectButton
            style={[
                styles.constainer,
                active && styles.constainerActive
            ]}
            {...rest}
        >
            <Text style={[
                styles.text,
                active && styles.textActive
                ]}>
                { title }
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    constainer: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5,
    },
    constainerActive: {
        color: colors.green,
        backgroundColor: colors.green_light,
    },
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textActive:{
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
})