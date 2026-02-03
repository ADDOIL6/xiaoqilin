import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import PublishListing from "./pages/PublishListing";
import PublishRequest from "./pages/PublishRequest";
import PublishChoice from "./pages/PublishChoice";
import PublishMarketplace from "./pages/PublishMarketplace";
import Contact from "./pages/Contact";
import RentalRequests from "./pages/RentalRequests";
import RentalRequestDetail from "./pages/RentalRequestDetail";
import Marketplace from "./pages/Marketplace";
import Articles from "./pages/Articles";
import Reviews from "./pages/Reviews";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/listings"} component={Listings} />
      <Route path="/listings/:id" component={ListingDetail} />
      <Route path="/publish" component={PublishChoice} />
      <Route path="/publish/listing" component={PublishListing} />
      <Route path="/publish/request" component={PublishRequest} />
      <Route path="/publish/marketplace" component={PublishMarketplace} />
      <Route path="/contact" component={Contact} />
      <Route path="/rental-requests/:id" component={RentalRequestDetail} />
      <Route path="/rental-requests" component={RentalRequests} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/articles" component={Articles} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}


function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}


export default App;
