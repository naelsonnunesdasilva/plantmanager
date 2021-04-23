import React from 'react';
import {
    Text, StyleSheet
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton, RectButtonProps  } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
    }
}

export default function PlantsCardPrimary({
    data,
    ...rest
}: PlantsProps) {
    return (
        <RectButton
            style={styles.constainer}
            {...rest}
        >
            <SvgFromUri uri={data.photo} width={70} height={70} />
            <Text style={styles.text}>
                { data.name }
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },
})