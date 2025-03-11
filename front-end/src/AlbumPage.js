import React from 'react';

const AlbumPage = ({ album }) => {
  if (!album) return <div>No album selected</div>;

  return (
    