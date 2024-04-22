import { getPhotos } from 'apiService/photos';
import { Text, Form, Loader, PhotosGallery } from 'components';
import { useState, useEffect } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { photos, total_results, per_page } = await getPhotos(
          query,
          page,
        );
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }
        setImages(prev => [...prev, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setImages(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = value => {
    console.log(value);
    setQuery(value);
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {/* {images.length > 0 < PhotosGallery images={images}/>} */}

      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text> Somthing is wrong </Text>}
    </>
  );
};
