import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Header from '../components/Header';
import EnviromentButton from '../components/EnviromentButton';
import PlantsCardPrimary from '../components/PlantsCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
    key: string;
    title: string;
}


export default function PlantSelect() {

    const [enviroments, setEnviroment] = useState<EnviromentProps[]>();
    const [plants, setPlants] = useState<PlantProps[]>();
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>();
    const [enviromentsSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);

    const navigation = useNavigation();

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', {plant});
    }

    function handleEnviromentSelected(enviroment: string){
        setEnviromentSelected(enviroment);

        if(enviroment === 'all'){
            return setFilteredPlants(plants);
        }

        const filtered = plants?.filter(plant => plant.environments.includes(enviroment));

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=title&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true);

        if(page > 1){
            setPlants((oldValue: any) => [...oldValue, ...data]);
            setFilteredPlants((oldValue: any) => [...oldValue, ...data]);
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    };

    function handleFetchMore(distance: number){
        if(distance < 1)
            return
        
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroment([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        };

        fetchEnviroment();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    if(loading)
        return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    Você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    keyExtractor={(item) => item.key}
                    data={enviroments}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            title={item.title}
                            active={item.key === enviromentsSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>


            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PlantsCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore ?
                        <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    title: {
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