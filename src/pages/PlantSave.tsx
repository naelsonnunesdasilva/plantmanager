import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute, useNavigation } from '@react-navigation/core';
import Datetimepicker, { Event } from '@react-native-community/datetimepicker'
import { isBefore, format } from 'date-fns';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png';
import Button from '../components/Button';
import { PlantProps, savePllant, loadPllant } from '../libs/storage';

interface Params {
    plant: PlantProps,
}

export default function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    const navigation = useNavigation();

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(_: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma data no futuro! 🕐');
        }

        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerFromAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave() {
        try {
            await savePllant({
                ...plant,
                dateTimeNotification: selectedDateTime,
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo Certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar de cuidar da sua plantinha com muito carinho.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            });
        } catch (error) {
            Alert.alert('Não foi possivel salvar a planta');
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />

                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado
                </Text>

                    {showDatePicker && (
                        <Datetimepicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={styles.dateTimePickerButton}
                                onPress={handleOpenDateTimePickerFromAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 12,
        marginBottom: 5,
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
})