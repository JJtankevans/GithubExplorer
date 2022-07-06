import { RepositoryItem } from "./RepositoryItem";
import { useState, useEffect } from "react";

import '../styles/repositories.scss';

//https://api.github.com/users/JJtankevans
//https://api.github.com/users/JJtankevans/repos

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export function RepositoryList() {

    /*Sempre que for armazenar uma lista sempre 
    deixar um array vazio dentro da função useStace 
    no caso é uma lista de repositórios do Github.
    Recomenda-se deixar a variavel dos estados dentro do componente
    sempre que os dados forem vir de uma consulta externa pq assim
    o tempo de resposta n da consulta nao vai interferir no 
    carregamento do componente em si*/
    const [repositories, setRepositories] = useState<Repository[]>([]);

    /* O useEffect serve para executar uma função sempre que uma de suas dependências
    sofrer algum tipo de alteração.
    As dependências dos useEffect sempre são passadas no segundo parametro dele.
    !!!Quando o array de dependências é passado vazio o useEffect executa somente uma única vez
    que é quando o componente é renderizado!!!
    !!!Jamais esquecer o segundo parametro do useEffect !!! 
    !!!Jamais atualizar uma das variáveis de dependência do useEffect dentro dele mesmo !!!
    Em ambos os casos ele entre em loop eterno*/
    useEffect(() => {
        /* Faz a requisição, quando recebe a resposta no primeiro then conver para JSON
        no segundo Then seta a variavel repositories com os dados recebidos da API */
        fetch('https://api.github.com/users/JJtankevans/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
    }, []);

    //console.log(repositories)

    return(
        /* Dentro do ul foi usado o map pq é preciso ter um retorno, no caso um RepositoryItem, 
        e com o foreach nao tem nenhum retorno*/
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                {repositories.map(repository => {
                    return < RepositoryItem key={repository.name} repository ={repository}/>
                })}
            </ul>
        </section>
    );
}