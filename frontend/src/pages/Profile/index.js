import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

//api
import api from "../../services/api";

//csa
import './styles.css'

//images
import logoImg from "../../assets/logo.svg";

//Icone
import {FiPower, FiTrash2} from "react-icons/fi";


export default function Profile(){

    /**
     * Definindo state do component e função para setar.
     */
    const [incidents, setIncident] = useState([]);

    /**Busca o ID e o nome da ONG
     * do armazenamento local do 
     * navegador
     */
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    /**
     * importação da função que roteia a aplicação
     * entre as telas.
     */
    const history =  useHistory();
    

    /**
     *Quando declarado useEffect, a função passada no primeiro 
     parâmetro vai ser executado sempre que o valor passado no
     array de dependências (segundo parâmetro) mudar de valor.
     */ 
    useEffect(  ()=>{
        api.get('/profile',{
            headers: {
                'Authorization': ongId
            }
        }).then( res =>{
            setIncident(res.data);
        })
    },
    [ongId] )

    
    /**
     * 
     * Função para deletar o caso
     */
    async function handleDeleteIncident(id, title){
        try{
            await api.delete(`/incidents/${id}`,{
                headers: {
                    'Authorization': ongId
                }
            });   
            
            alert(`O caso ${title} foi deletado`);

            setIncident(  incidents.filter(  
                inc => inc.id !== id
            ) )
        }catch(err ){
            alert('Erro ao deletar o caso, tente novamente');
        }
    }

    /**Função para efetuar
     * logout da aplicação
     */
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    
    return(

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                {/* Botão de logout */}
                <button 
                    type="button"
                    onClick={ ()=> handleLogout() }
                >
                    <FiPower size={18} color="#e02041">

                    </FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                { incidents.map( inc =>
                    (
                        <li key={inc.id}>
                        <strong>CASO: </strong>
                        <p>
                            {inc.title}
                        </p>

                        <strong>
                            DESCRIÇÃO:
                        </strong>
                        <p>{inc.description}</p>

                        <strong>VALOR:</strong>
                        <p>
                            {
                                Intl.NumberFormat(
                                    'pt-br',
                                    {
                                        style:'currency',
                                        currency: 'BRL'
                                    }
                                ).format(inc.value)
                            }
                        </p>

                        <button
                            type="button"
                            onClick={ () => handleDeleteIncident(inc.id, inc.title)}
                        >
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>
                    ))
                }    
            </ul>
        </div>
    )
}