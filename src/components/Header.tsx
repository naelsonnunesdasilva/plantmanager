import React, { useState, useEffect } from 'react';
import { 
    Text, View, StyleSheet, Image } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import userImg from '../assets/naelson.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    }, [])
    return (
        <View style={styles.constainer}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
    <Text style={styles.userName}>{userName}</Text>
            </View>

            <Image source={userImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40, 
    }
})