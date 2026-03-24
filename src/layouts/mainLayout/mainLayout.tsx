import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoBanner from "../../components/info-banner/info-banner";
import NavBreadcrumbsMenu from "../../components/nav-breadcrumbs-menu/nav-breadcrumbs-menu";
import NetworkDetails from "../../components/network-details/network-details";
import ReferralCodeInterpreter from "../../components/referralCodeInterpreter/referralCodeInterpreter";
import WalletDetails from "../../components/wallet-details/wallet-details";
import { SpinnerProvider } from "../../services/hooks/spinner/spinnerContext";
import { InternalNetworkProvider } from "../../services/hooks/internalNetwork-provider/internalNetworkContext";
import { ExternalNetworkProvider } from "../../services/hooks/externalNetwork-provider/externalNetworkContext";
import { addBeforeUnloadEvents, removeBeforeUnloadEvents } from "../../services/pageHandlers/pageHandlers";
import WizardLayout from "../wizardLayout/wizardLayout";
import "./mainLayout.scss";

const MainLayout = () => {
  useEffect(() => {
    addBeforeUnloadEvents();
    return () => {
      removeBeforeUnloadEvents();
    };
  }, []);

  return (
    <div className="main-layout">
      <SpinnerProvider>
        <InternalNetworkProvider>
          <ExternalNetworkProvider>
            <NavBreadcrumbsMenu />
            <main className="responsive-container">
              <WizardLayout />
              <ToastContainer />
              <InfoBanner />
              <WalletDetails />
              <NetworkDetails />
              <ReferralCodeInterpreter />
            </main>
          </ExternalNetworkProvider>
        </InternalNetworkProvider>
      </SpinnerProvider>
      <div id="spinner-root"></div>
    </div>
  );
};

export default MainLayout;
