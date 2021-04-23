import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function PlanSave() {

    return (
        <View style={styles.container}>
            <SvgFromUri
                uri=""
                height={150}
                width={150}
            />

            <Text style={styles.plantName}>
                Nome da Planta
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    plantName: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        lineHeight: 20,
    },
    header: {
        paddingHorizontal: 30,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1
    },
    contentContainerStyle: {

    },
})