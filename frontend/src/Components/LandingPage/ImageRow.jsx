import React from 'react';

const ImageRow = ({ title, images, iconRow }) => {
  return (
    <div className="w-100 text-center mt-5">
      {title && <h2 className="mb-4">{title}</h2>}
      <div className="d-flex justify-content-center mt-4">
        {iconRow
          ? iconRow.map((item, index) => (
              <div
                key={index}
                className="d-flex text-center p-3 bg-gradient text-dark rounded shadow mx-2"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(242,169,62), rgb(240,112,84))',
                }}
              >
                {item.icon}
                <p className="mb-0 fw-bold">{item.text}</p>
              </div>
            ))
          : images.map((image, index) => (
              <div key={index} className="text-center mx-3" onClick={image.onClick}>
                <img
                  src={image.img}
                  alt={image.alt}
                  className="rounded mb-2"
                  style={{
                    width: '300px',
                    height: '250px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ImageRow;
