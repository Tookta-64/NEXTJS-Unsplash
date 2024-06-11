"use client";

import { useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const getUnsplashPhotos = async () => {
    if (!query.trim()) {
      return;
    }
    try {
      const apiKey = 'EbtQKEAHyTqWaX5Qh0vuba-lGUMIak2mIPXZJI1HrNw';

      const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${query}&per_page=12&page=${page}`);
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.results]);
      setPage(prevPage => prevPage + 1);

      if (!showLoadMore) {
        setShowLoadMore(true);
      }

    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image); // เมื่อคลิกที่รูปภาพ เก็บข้อมูลภาพใน state
  };

  const closeModal = () => {
    setSelectedImage(null); // ปิดโมดัล ล้างข้อมูลภาพ
  };

  return (
    <div className="fullscreen">
      
      <div class="logo-containe center">
      <Image
      src="/Unsplash.png"
      width={500}
      height={500}
      alt="Picture of the author"
    />
    </div>
      <div className="center">


      <div class="group">
  <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input 
          placeholder='Enter Search Photos' 
          type="search" class="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getUnsplashPhotos();
            }
          }}
        />
           </div>
      </div>
<div className="center">
  <div className="gallery">
  {images.map((image) => (
  <figure key={image.id} className="gallery-item" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
    <img src={image.urls.full} alt={image.description} itemprop="contentUrl" onClick={() => openModal(image)} />
  </figure>
))}

  </div>
  
</div>

  <div className="center">
    {showLoadMore && <button className="load-more-button" onClick={getUnsplashPhotos}>Load More</button>}
  </div>
    </div>
  );
}
