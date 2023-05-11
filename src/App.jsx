import {React, useState, useEffect} from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const pagesToShow = 5

  // calculate the starting and ending page numbers to display:
  const startPage = Math.max(page - (pagesToShow - 2), 1);
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const pageNumbers = [];
  for (let i=startPage; i<=endPage; i++) {
    pageNumbers.push(i)
  }

  const selectPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  const fetchProducts = async() => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10 -10}`)
    const data = await response.json()
    setProducts(data.products)
    setTotalPages(data.total/10)
  }

  useEffect(() => {
    fetchProducts()
  }, [page])

  return (
    <>
    <h1>Product Pagination</h1>
    {products.length > 0 ? (
      <>
      <ul className='products'>
      {products.map(({id, title, images}) => {
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
      {pageNumbers.map((num, i) => {
        return (
          <span key={i} className={page === num ? 'selected_page' : ""} onClick={() => selectPage(num)}>{num}</span>
        )
      })}
      <span onClick={() => setPage((next) => next+1)} className={page === totalPages ? 'disable_button' : ""}>▶</span>
      </div>
    ) : null}
    </>
  )
}

export default App
