import React from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";

const Home = () => {

  return (
    <>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </>
  );
};

export default Home;
