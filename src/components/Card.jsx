import './Card.css'

const Card = ({title, info}) => {




    return (
        <div className = "single-card">
        <h2>{title}</h2>
        <p>{info}</p>

        </div>
    )
}

export default Card