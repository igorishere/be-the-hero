import React from "react";
import {View, Text, Image,TouchableOpacity, Linking} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from 'expo-mail-composer';

import style from "./styles";
import logoImg from "../../assets/logo.png";


export default function Detail(){

    //função para direcionar a outras páginas
    const navigation =  useNavigation();
    //função para pegar informações da rota
    const route  = useRoute();


    //Caso que vai ser detalhado nesta tela
    const incidentToBeDetailed = route.params.incident;

    //Mensagem que vai ser enviada no e-mail ou whatsapp
    const message = `
    Olá ${incidentToBeDetailed.name}, gostaria de ajudar no caso ${incidentToBeDetailed.title}
    com a quantia de ${
        Intl.NumberFormat( 
        'pt-br', 
        {style:'currency', currency: 'BRL'} )
        .format(incidentToBeDetailed.value)
    }
    `;
    

    function navigateGoBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync(
        {
            subject: `Herói do caso: ${incidentToBeDetailed.title}`,
            recipients: [`${incidentToBeDetailed.email}`],
            body: message
        } );
    }
    
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${incidentToBeDetailed.whatapp}&text=${message}`)
    }

    return (
        <View style={style.container}> 
            {/* Cabelho do layout */}
            <View  style={style.header}>
                <Image source={logoImg}/>
                <TouchableOpacity
                    onPress={ navigateGoBack }
                >
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            {/* Item da lista escolhido */}
            <View style={style.incident}>
                <Text style={ [style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={ style.incidentValue}>
                    {incidentToBeDetailed.name} de {incidentToBeDetailed.uf}/{incidentToBeDetailed.city}
                </Text>

                <Text style={ style.incidentProperty}>CASO:</Text>
                <Text style={ style.incidentValue}>{incidentToBeDetailed.title}</Text>

                <Text style={ style.incidentProperty}>VALOR:</Text>
                <Text style={ style.incidentValue}>
                        {
                            Intl.NumberFormat( 
                            'pt-br', 
                            {style:'currency', currency: 'BRL'} )
                            .format(incidentToBeDetailed.value)
                        }
                </Text>
            </View>
 
            {/* Contato */}
            <View style={style.contactBox}>
                <Text style={style.heroTitle} >Salve o dia</Text>
                <Text style={style.heroTitle} >Seja o herói deste caso</Text>
                
                <Text style={style.heroDescription} >Entre em contato</Text>
                
                
                {/* Botões caixa de contato */}
                <View style={style.actions}>
                    <TouchableOpacity
                        style={style.action}
                        onPress={ sendWhatsapp }    
                    >
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.action}
                        onPress={ sendMail }    
                    >
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}