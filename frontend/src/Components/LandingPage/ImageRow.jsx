import React from 'react'

const ImageRow = ({ title, images }) => {
    return (
      <div className="w-100 text-center mt-5">
        <h2 className="mb-4" >{title}</h2>
        <div className="d-flex justify-content-center mt-4">
          {images.map((image, index) => (
            <div key={index} className="text-center mx-3" onClick={image.onClick}>
              <img
                src={image.img}
                alt={image.alt}
                className="rounded mb-2"
                style={{ width: "300px", height: "250px", objectFit: "cover", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ImageRow

