import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()

  const { product_name, brands, nutriments, image_small_url, code } = product

  return (
    <div
      className="food-card"
      onClick={() => navigate(`/product/${code}`)}
      style={{ cursor: 'pointer' }}
    >
      {image_small_url && <img src={image_small_url} alt="" />}

      <h3>{product_name}</h3>
      <p>{brands}</p>

      <p>Calories: {nutriments?.['energy-kcal_100g'] || 'N/A'}</p>
      <p>Protein: {nutriments?.proteins_100g || 'N/A'}</p>
    </div>
  )
}

export default FoodCard