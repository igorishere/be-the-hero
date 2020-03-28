import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

//api
import api from "../../services/api";
//css
import './styles.css'
//images
import logoImg from "../../assets/logo.svg";

//Icone
import {FiArrowLeft} from "react-icons/fi";



export default function Register(){


    const [name, setName] = useState('');  
    const [email, setEmail] = useState('');  
    const [whatsapp, setWhatsapp] = useState('');  
    const [city, setCity] = useState('');  
    const [uf, setUf] = useState('');
    /**
     * 
     * Função que vai manipular os dados
     * do formulário e enviar os mesmos
     * para a API
     */
    
    const history = useHistory();


    async function handelRegister(e){
        e.preventDefault();
        
        const data = {email,name,whatsapp,city,uf};

        try {
            
            const response  = await api.post( "/ongs", data );
            alert(`Seu ID de acesso: ${response.data.id}`) 
            history.push('/')
        } catch (error) {
            alert("Erro no cadastro, tente novamente");
        }
    }

    return(

        <div className="register-container">
            <div className="content">
                <section >
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma 
                        ajude as pessoas a encontrarem sua ONG.
                    </p>

                    <Link to="/register" className="bacl-link">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={ handelRegister }>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={  e =>setName( e.target.value ) }
                    /> 
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={  e =>setEmail( e.target.value ) }    
                    />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={  e =>setWhatsapp( e.target.value ) }    
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={  e =>setCity( e.target.value ) } 
                        />
                        <input
                            placeholder="UF"
                            style={ { width:80 } }
                            value={uf}
                            onChange={  e =>setUf( e.target.value ) } 
                            />
                    </div>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}