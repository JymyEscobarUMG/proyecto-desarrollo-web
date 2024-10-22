interface Props {
    error: Array<string> | undefined;
}

export const AlertaError = ({ error }: Props) => {
    return (
        <>
            {error && <div className="alert alert-danger">{
                error.map(element => (
                    <li key={element}>{element}</li>
                ))
            }</div>}
        </>
    )
}
