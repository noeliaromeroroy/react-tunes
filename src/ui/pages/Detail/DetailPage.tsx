import { useParams } from 'react-router-dom';
import React from 'react';
import '../../../assets/styles/index.css';

function Detail(): JSX.Element {
  const { id } = useParams();
  return (
    <div>
      <span>Esta es la página de detalle del podcast</span>
      <span>{id}</span>
    </div>
  );
}

export default Detail;
