import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster, TooltipProvider } from "@/shared/ui";
import NotFound from "@/pages/not-found";

import { Home } from "@/pages/Home";
import { Login } from "./pages/Login";
import { RestaurantDetail } from "./pages/RestaurantDetail";
import { Categories } from "./pages/Categories";
import { MyCart } from "./pages/MyCart";
import { Checkout } from "./pages/Checkout";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Orders } from "./pages/Orders";
import { Profile } from "./pages/Profile";
import { useAuthStore } from "@/shared/store";

function Router() {
  const { isAuthenticated } = useAuthStore();

  return (
        <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/restaurant/:id" component={RestaurantDetail} />
      <Route path="/categories" component={Categories} />
      <Route path="/cart" component={MyCart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/orders" component={Orders} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
