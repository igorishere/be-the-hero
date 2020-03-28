import React,{useState} from "react";
import {Link, useHistory} from "react-router-dom";
//Icone
import {FiArrowLeft} from "react-icons/fi";

//images
import logoImg from "../../assets/logo.svg";

import './styles.css';

//api
import api from "../../services/api";

 export default function NewIndcidente(){

    /**Definindo state da aplicação e 
     * função para setar novo state
     */
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');

    /**Pega o ID da ong direto do armazenamento local */
    const ongId = localStorage.getItem('ongId');
    
    /**Declaração da função de navegação */
    const history = useHistory();
    
    /**Função para enviar para a api
     * os dados do formulário
     */
    function handleSubmit(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value
        }

        try {
            api.post('/incidents',data,{
                headers:{
                    'Authorization': ongId
                }
            });
            alert('Caso salvo com sucesso! Boa sorte')
            history.push('/profile');
        } catch (error) {
            alert('Ocorreu um erro, tente novamente')
        }
        
    }

     return( 
            <div className="new-incident-container">
                <div className="content">
                    <section >
                        <img src={logoImg} alt="Be The Hero"/>

                        <h1>Cadastrar novo caso</h1>
                        <p>
                        Descreva o caso detalhadamente
                        para encontrar um herói para
                        resolver isso.
                        </p>

                        <Link to="/profile" className="bacl-link">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                        </Link>
                    </section>

                    <form onSubmit={  handleSubmit }>
                        <input 
                            placeholder="Título do caso"
                            value={title}
                            onChange={ e => setTitle(e.target.value)}
                        /> 
                        <textarea 
                            placeholder="Descrição"
                            value={description}
                            onChange={ e => setDescription(e.target.value) }
                        />
                        <input  
                            placeholder="Valor em reais" 
                            type="number" min="1" step="any"
                            value={value}
                            onChange={ e => setValue(e.target.value)}
                        />

                        <button className="button" type="submit">
                        Cadastrar
                        </button>
                    </form>
                </div>
            </div>
 );
 }