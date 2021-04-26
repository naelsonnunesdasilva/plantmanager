import React from 'react';
import {
    Text, StyleSheet, View, Animated
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string,
    },
    handleRemove: () => void,
}

export default function PlantsCardSecondary({
    data,
    handleRemove,
    ...rest
}: PlantsProps) {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.constainer}
                {...rest}
            >
                <SvgFromUri uri={data.photo} width={70} height={70} />
                <Text style={styles.title}>
                    {data.name}
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
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    constainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    },
    buttonRemove: {
        height: 85,
        width: 100,
        backgroundColor: colors.red,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15,
    },
})