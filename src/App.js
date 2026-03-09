import { Route, Switch, useLocation } from "wouter";
import Homepage from "./HomePage/page";
import Products from "./Products/page";
import AboutUs from "./AboutUs/page";
import { useEffect } from "react";
import NotFound from "./NotFound/page";
import ContactUs from "./ContactUs/page";
import ProductDetails from "./Products/details/page";
import VendorDetails from "./Vendor/page";
import { ToastContainer } from "react-toastify";

function App() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // or "smooth"
    });
  }, [location]);
  return (
    <>
      <Switch>
        {/* Public Route */}
        <Route path="/" component={Homepage} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetails} />
        <Route path="/vendor/:id" component={VendorDetails} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />

        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
      <ToastContainer position="top-center" closeOnClick={true} closeButton />
    </>
  );
}

export default App;
