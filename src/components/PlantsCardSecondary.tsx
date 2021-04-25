import React from 'react';
import {
    Text, StyleSheet, View
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton, RectButtonProps  } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string,
    }
}

export default function PlantsCardSecondary({
    data,
    ...rest
}: PlantsProps) {
    return (
        <RectButton
            style={styles.constainer}
            {...rest}
        >
            <SvgFromUri uri={data.photo} width={70} height={70} />
            <Text style={styles.title}>
                { data.name }
            </Text>
            <View style={styles.details}>
                <Text style={styles.timeLabel}>
                    Regar às
                </Text>
                <Text style={styles.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    constainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    details: {
        alignItems: 'flex-end',
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_light,
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    }
})