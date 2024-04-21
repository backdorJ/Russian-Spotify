import React from "react";

const handleImageNotLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror=null;
    e.currentTarget.src= "https://www.kurin.com/wp-content/uploads/placeholder-square.jpg"
}

export default handleImageNotLoaded