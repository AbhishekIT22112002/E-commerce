import React, { useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useInView } from "react-intersection-observer";
import { ArrowDownIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  
  return (
    <>
 
      
       <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-8"
                    />
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4"></div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Link to="/"><p
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white ",
                      "rounded-md px-3 py-2 text-md font-medium font-bold"
                    )}
                  >
                    {"Home"}
                  </p>
                  </Link>
                  <Link to="/products">
                    <p
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white ",
                        "rounded-md px-3 py-2 text-md font-medium font-bold"
                      )}
                    >
                      {"Products"}
                    </p>
                  </Link>
                  <Link to="/login">
                    <p
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white ",
                        "rounded-md px-3 py-2 text-md font-medium font-bold"
                      )}
                    >
                      {"Login"}
                    </p>
                  </Link>
                  <Link to="/cart">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <ShoppingCartIcon
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </button>
                  </Link>
                  <span className="inline-flex items-center rounded-full mb-5 -ml-3 z-0  bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {cartTotalQuantity}
                  </span>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <Link to="/cart">
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </Link>
                <span className="inline-flex items-center rounded-full mb-7 -ml-3 z-0 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {cartTotalQuantity}
                </span>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link to="/">
                  <DisclosureButton className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                    {"Home"}
                  </DisclosureButton>
                </Link>
                <Link to="/products">
                  <DisclosureButton className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                    {"Product"}
                  </DisclosureButton>
                </Link>
                <Link to="/login">
                  <DisclosureButton className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                    {"Login"}
                  </DisclosureButton>
                </Link>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      <div className="relative">
       
        <section
          className="relative h-screen bg-fixed bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://wallpapercave.com/wp/wp3537552.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-6xl font-extrabold tracking-wider drop-shadow-lg animate-fadeInUp">
              Welcome to ShoppyGlobe
            </h1>
            <p className="mt-6 text-2xl font-light animate-fadeInUp delay-1s">
              Shop with the best deals every day
            </p>
            <Link
             to="/products"
              className="mt-10 px-10 py-5 bg-gray-800 hover:bg-orange-600 text-white rounded-full text-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeInUp delay-2s"
            >
              Shop Now
            </Link>
            <ArrowDownIcon className="w-10 h-10 mt-10 text-white animate-bounce" />
          </div>
        </section>
        <section id="shop-now" className="py-20 bg-gray-100 overflow-hidden ">
          <h2 className="text-5xl text-center font-bold mb-16">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mx-auto max-w-7xl">
            {/* Beauty Products Card */}
            
            <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <Link to = '/products'>
              <img
                src="https://wallpapercave.com/wp/wp12180161.jpg"
                alt="Beauty Products"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                Beauty Products
              </div>
              </Link>
            </div>

            {/* Fragrance Card */}
            <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:rotate-3">
            <Link to = '/products'> 
              <img
                src="https://wallpapercave.com/wp/wp13894928.jpg"
                alt="Fragrance"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                Fragrance
              </div>
             </Link>
            </div>

            {/* Furniture Card */}
            <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <Link to = '/products'> 
              <img
                src="https://wallpapercave.com/wp/wp9625932.jpg"
                alt="Furniture"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                Furniture
              </div>
              </Link>
            </div>

            {/* Groceries Card */}
            <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:rotate-3">
            <Link to = '/products'> 
              <img
                src="https://wallpapercave.com/wp/wp10044776.jpg"
                alt="Groceries"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                Groceries
              </div>
              </Link>
            </div>
            
          </div>
        </section>

        <section
          className="relative py-32 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('/path-to-deal-image.jpg')" }}
        >
          <div
            className="absolute inset-0 bg-opacity-100"
            style={{
              backgroundImage:
                "url('https://wallpapercave.com/wp/wp3537552.jpg')",
            }}
          >
            {" "}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-5xl font-bold mb-8">Deal of the Day</h2>
            <p className="text-2xl mb-12">
              Grab the hottest deals on select items today!
            </p>
            <div className="bg-white text-orange-500 py-10 px-8 max-w-4xl mx-auto rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
              <h3 className="text-4xl font-extrabold mb-4">
                50% Off on Selected Items
              </h3>
              <Link
                to = "/products"
                className="mt-6 inline-block px-8 py-4 bg-gray-800 text-white rounded-full hover:bg-orange-600 transition-all text-xl font-bold shadow-lg hover:shadow-xl"
              >
                View Deals
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-300">
                ShoppyGlobe offers a wide range of products at unbeatable
                prices, delivering right to your door.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#shop-now" className="hover:text-orange-500">
                    Shop Now
                  </a>
                </li>
                <li>
                  <a href="#contact-us" className="hover:text-orange-500">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#privacy-policy" className="hover:text-orange-500">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-orange-500">
                  <FontAwesomeIcon icon={faFacebookF} className="w-8 h-8" />
                </a>
                <a href="#" className="hover:text-orange-500">
                  <FontAwesomeIcon icon={faTwitter} className="w-8 h-8" />
                </a>
                <a href="#" className="hover:text-orange-500">
                  <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
          <p className="text-center mt-10 text-gray-500">
            &copy; 2024 ShoppyGlobe | All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
