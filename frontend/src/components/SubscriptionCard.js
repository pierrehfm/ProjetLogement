// components/SubscriptionCard.jsx
const SubscriptionCard = ({ type, price, features, color }) => {
    return (
        <div className="subscription-card">
            <div className="subscription-header" style={{ backgroundColor: color }}>
                <h3>{type}</h3>
            </div>
            <div className="subscription-body">
                <p className="price">
                    <span className="priceNumber">{price}€</span>
                    <br />
                    <small>Par mois</small>
                </p>
                <button className="subscribe-button" style={{ backgroundColor: color }}>
                    Je m'abonne
                </button>
                <ul>
                    {features.map((f, i) => (
                        <li key={i}>• {f}</li>
                    ))}
                </ul>
            </div>
            <div className="subscription-footer">
                Condition d'achat, rétractation
            </div>
        </div>
    );
};

export default SubscriptionCard;
