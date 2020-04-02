import React, { useEffect, useState } from "react";
import {View, FlatList, Image,Text, TouchableOpacity} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import logoImg from "../../assets/logo.png";
import styles from './styles'

export default function Incidents(){
    
    /**
     * Estado dos componentes de tela e função 
     * para setar novo state
     */
     const [ incidents, setIncidents ] = useState([]);
     const [ totalIncidents, setTotalIncidents] = useState(0);
     const [ pages, setPages] = useState(1);
     const [ isLoading, setIsLoading] = useState(false);


    /** useEfect é uma função que 
     * é disparada toda vez que as variáveis
     * inseridas no array mudam de
     * estado
     */
    async function loadIncidents(){
        try {

            if(isLoading){
                return;
            }

            if( totalIncidents > 0 && incidents.length == totalIncidents ){
                return;
            }

            setIsLoading(true);
            const res = await api.get('incidents', {
                params:{
                    page
                }
            });
            
            /**
             * Pega todos os casos que vieram na api e
             * insere no state 'incidents'
             */
            setIncidents([...incidents, ...res.data] );

            /**Pega o total de casos que vieram na api
             * do cabeçalho da request e insere no state 'totalIncidents'
             */
            setTotalIncidents( res.headers['x-total-count'] );
            setPages(pages+1);
            setIsLoading(false);
        } catch (error) {
            alert(`Ocorreu um erro: ${error}` )
        }
    }
     useEffect(  ()=>{
         loadIncidents()
     }, []);

    


    //função para direcionar a outras páginas
    const navigation =  useNavigation();

    function navigateToDetail( incident ){
        navigation.navigate('Detail', {incident} );
    }
 

    return (
        <View  style={styles.container}>

            {/* Cabelho do layout */}
            <View  style={styles.header}>
                <Image source={logoImg}/>

                <Text style={styles.headerText}>
                    Total de: <Text style={styles.headerTextBold}> {totalIncidents} casos </Text>
                </Text>
            </View>

            
            {/* Texto antes da lista */}
            <Text style={styles.title}>
                    Bem vindo!
            </Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            {/* Lista de casos */}
            <FlatList
                // data={incidents} //em Data é passado tudo que vem da api 
                data={incidents} //em Data é passado tudo que vem da api 
                style={styles.incidentList}
                // keyExtractor={ incident => String(incident.id) }
                keyExtractor={ incident => String(incident.id) }
                showsVerticalScrollIndicator={false}
                onEndReached={ loadIncidents }
                ondEndReachedThreshold={ 0.2 }
                renderItem={ ( {item: incident} )=>(
                    <View style={ styles.incident }>
                    <Text style={ styles.incidentProperty}>ONG:</Text>
                    <Text style={ styles.incidentValue}>{incident.name}</Text>

                    <Text style={ styles.incidentProperty}>CASO:</Text>
                    <Text style={ styles.incidentValue}>{incident.title}</Text>

                    <Text style={ styles.incidentProperty}>VALOR:</Text>
                    <Text style={ styles.incidentValue}>
                        {
                            Intl.NumberFormat( 
                            'pt-br', 
                            {style:'currency', currency: 'BRL'} )
                            .format(incident.value)
                        }
                    </Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={ ()=>{navigateToDetail(incident)} }
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16}  color="#E02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />
           
        </View>
    )
}