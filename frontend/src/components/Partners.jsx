import React from "react";

const Partners = () => {
  return (
    <section className="bg-white py-10">
      <h2 className="text-center text-xl font-semibold">Nos Partenaires</h2>
      <div className="flex justify-center space-x-6 mt-6">
        <img src="/images/crous-logo.png" alt="Crous" className="h-12" />
        <img src="/images/jinka-logo.png" alt="Jinka" className="h-12" />
        <img src="/images/leboncoin-logo.png" alt="Leboncoin" className="h-12" />
      </div>
    </section>
  );
};

export default Partners;
