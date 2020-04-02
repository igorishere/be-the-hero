import React from 'react';

//pacote para utiliazar a internacionalização 
//em toda a aplicação
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

//Roteador
import Router from "./src/routes";

export default function App() {
  return (
    <Router />
  );
}

