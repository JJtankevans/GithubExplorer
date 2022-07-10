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
    const [perfilRepositories, setPerfilRepositories] = useState<string>('');
    const [userPerfil, setUserPerfil] = useState<string>('');

    let apiLink = 'https://api.github.com/users/'
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
        fetch(perfilRepositories)
            .then(response => response.json())
            .then(data => setRepositories(data))
    }, [perfilRepositories]);

    //console.log(repositories)

    //Essa função fica observando userPerfil que qando ele fica diferente de nulo entao
    function handleNewPerfil() {
        if(!userPerfil) return;

        //Junta o user do github com o resto do link para fazer a requisição
        apiLink += `${userPerfil}/repos`;

        //Seta a o estado de perfilRepositories que dispara o useEffect ali encima
        setPerfilRepositories(apiLink);

        //Faz o texto do input ficar em branco novamente
        setUserPerfil('');

    }

    return (
        /* Dentro do ul foi usado o map pq é preciso ter um retorno, no caso um RepositoryItem, 
        e com o foreach nao tem nenhum retorno*/
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <header>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Pesquisa novo perfil"
                        onChange={(e) => setUserPerfil(e.target.value)}
                        value={userPerfil}
                    />
                    <button type="submit" onClick={handleNewPerfil}>Pesquisar</button>
                </div>
            </header>

            <ul>
                {repositories.map(repository => {
                    return < RepositoryItem key={repository.name} repository={repository} />
                })}
            </ul>
        </section>
    );
}