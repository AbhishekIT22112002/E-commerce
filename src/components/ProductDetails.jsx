import React, { useState, useEffect } from "react";
import useFetchProducts from "../utils/useFetch";
import { Hourglass } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";


const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetchProducts("https://dummyjson.com/products");
  const { id } = useParams();


  useEffect(() => {
    if (data) {
      const productItem = data.find((item) => item.id === parseInt(id));
      if (productItem) {
        setProduct(productItem);
      }
    }
  }, [data, id]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Hourglass
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    } else {
      console.log("Product is not defined");
    }
 
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join("");
  }
  

  return (
    <div className="bg-white">
      {product && (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li className="text-sm">
                  <a
                    href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.title}
                  </a>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  alt={product.images}
                  src={product.images[0]}
                  className="h-full w-auto object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>

                <p className="text-md tracking-tight line-through text-gray-400">
                  ${product.price}
                </p>
                <p className="text-3xl font-medium text-gray-900">
                  $
                  {Math.round(
                    product.price * (1 - product.discountPercentage / 100)
                  )}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <a className="ml-0 -mb-7 -mr-5 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {product.rating} Ratings
                    </a>
                  </div>
                </div>

                {/* Sizes */}
                <button
                  onClick={handleAddToCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    {/* SomeThing we will do */}
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Details
                  </h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;