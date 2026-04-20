import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (!cancelled) {
          setProduct(res.data.product)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError('Error loading product')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some(p => p.code === barcode)

  const toggleSave = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Not found</p>

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{product.product_name}</h2>
      <p>{product.brands}</p>

      <p>Calories: {product.nutriments?.['energy-kcal_100g']}</p>
      <p>Protein: {product.nutriments?.proteins_100g}</p>
      <p>Carbs: {product.nutriments?.carbohydrates_100g}</p>
      <p>Fat: {product.nutriments?.fat_100g}</p>

      <button onClick={toggleSave}>
        {isSaved ? 'Remove from Saved' : 'Save'}
      </button>
    </div>
  )
}

export default DetailPage