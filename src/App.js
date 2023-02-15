import React, { useState, useEffect } from 'react'
import './index.scss'
import Collection from './Collection'
import Pagination from './Pagination'

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  const [collections, setCollections] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [categoryId, setCategory] = useState(0)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const category = categoryId ? `category=${categoryId} ` : ''

    setIsLoading(true)

    fetch(
      `https://63ebb9fcbe929df00ca12a8f.mockapi.io/ph_collection2?page=${
        page + 1
      }&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .then(() => setIsLoading(false))
      .catch((err) => console.warn(err))
    // .finally(() => console.log(collections))
  }, [categoryId, page])

  const handleChangeCategory = (index) => {
    setCategory(index)
  }

  const handleChangePage = (i) => {
    setPage(i)
    console.log(i)
  }

  return (
    <div className='App'>
      <h1>Моя коллекция фотографий</h1>
      <div className='top'>
        <ul className='tags'>
          {categories.map((category, i) => (
            <li
              onClick={(e) => handleChangeCategory(i)}
              className={categoryId === i ? 'active' : ''}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <input
          className='search-input'
          placeholder='Поиск по названию'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='content'>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(inputValue.toLowerCase().trim())
            )
            .map((obj) => (
              <Collection
                name={obj.name}
                images={obj.photos}
              />
            ))
        )}
      </div>
      <ul className='pagination'>
        <Pagination
          page={page}
          handleChangePage={handleChangePage}
        />
      </ul>
    </div>
  )
}

export default App
