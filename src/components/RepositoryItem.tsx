interface RepositoryItemProps {
    repository: {
        name: string,
        description: string,
        html_url: string,
    }
}

export function RepositoryItem(porps: RepositoryItemProps) {
    return (
        <li>
            <strong>{porps.repository.name}</strong>
            <p>{porps.repository.description}</p>
            <a href={porps.repository.html_url}>
                Acessar repositório
            </a>
        </li>
    );
}