import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import '../../../assets/styles/index.css';
import { useSearch } from '../../contexts/PlayerContext';

function Detail(): JSX.Element {
  const { id } = useParams();
  const { setIsHome } = useSearch();
  useEffect(() => {
    setIsHome(false);
  }, []);
  return (
    <div>
      <span>Esta es la página de detalle del podcast</span>
      <span>{id}</span>
    </div>
  );
}

export default Detail;
