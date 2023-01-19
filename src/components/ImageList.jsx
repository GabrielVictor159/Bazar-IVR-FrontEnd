import React, { useState } from 'react';
import "./ImageList.scss";
function ImageList(props) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = (index) => {
    setIsFullscreen(!isFullscreen);
  }

  return (
    <div>
      {props.images.map((image, index) => (
        <img src={image.url} onClick={() => toggleFullscreen(index)} />
      ))}
      {isFullscreen && (
        <div className="fullscreen-overlay">
          <img src={props.images[index].url} onClick={toggleFullscreen} />
        </div>
      )}
    </div>
  );
}

export default ImageList;
