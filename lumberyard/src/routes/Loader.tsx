import React from "react";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <div className="w-full h-full flex flex-col justify-center items-center text-2xl font-bold text-white gap-y-4">
        <lottie-player
          src="https://assets1.lottiefiles.com/private_files/lf30_esg1l8r1.json"
          background="transparent"
          speed="0.8"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        />
        Loading...
      </div>
    </div>
  );
};

export default Loader;
