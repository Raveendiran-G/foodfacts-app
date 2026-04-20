import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (saved.length === 0) {
    return <p>No saved items</p>
  }

  return (
    <div className="page">
      <h2>Saved Items</h2>

      {saved.map(product => (
        <div key={product.code}>
          <h3>{product.product_name}</h3>
          <p>{product.brands}</p>

          <button onClick={() => navigate(`/product/${product.code}`)}>
            View
          </button>

          <button onClick={() => dispatch({ type: 'REMOVE', code: product.code })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default SavedPage