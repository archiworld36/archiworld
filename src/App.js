import { Route, Switch, useLocation } from "wouter";
import Homepage from "./HomePage/page";
import Products from "./Products/page";
import AboutUs from "./AboutUs/page";
import { useEffect } from "react";
import NotFound from "./NotFound/page";
import ContactUs from "./ContactUs/page";

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
    <Switch>
      {/* Public Route */}
      <Route path="/" component={Homepage} />
      <Route path="/products" component={Products} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />

      {/* Not Found */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
