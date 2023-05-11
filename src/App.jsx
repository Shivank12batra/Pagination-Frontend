import {React, useState, useEffect} from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const selectPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  const fetchProducts = async() => {
    const response = await fetch(`https://dummyjson.com/products?limit=100&skip=${page*10 -10}`)
    const data = await response.json()
    setProducts(data.products)
    setTotalPages(data.total/10)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
    <h1>Product Pagination</h1>
    {products.length > 0 ? (
      <>
      <ul className='products'>
      {products.slice((totalPages*(page-1)), page *10).map(({id, title, images}) => {
        return (
          <li key={id} className='product_single'>
            <img src={images[0]} alt={title}/>
            <h3>{title}</h3>
          </li>
        )
      })}
      </ul>
      </>
    ) : null}
    {/* pagination: */}
    {products.length > 0 ? (
      <div className='pagination'>
      <span onClick={() => setPage((prev) => prev-1)} className={page === 1 ? 'disable_button' : ""}>◀</span>
      {[...Array(totalPages)].map((_, i) => {
        return (
          <span key={i} className={page === i + 1 ? 'selected_page' : ""} onClick={() => selectPage(i+1)}>{i+1}</span>
        )
      })}
      <span onClick={() => setPage((next) => next+1)} className={page === totalPages ? 'disable_button' : ""}>▶</span>
      </div>
    ) : null}
    </>
  )
}

export default App
