import React from "react";

import { Status } from "../../common";
import { PaymentCardsApi, PaymentCardViewModel, useAppContext } from "../../checkout";

import { ExistingPaymentMethod } from "./ExistingPaymentMethod";
import { NewPaymentMethod } from "./NewPaymentMethod";

export const InlineCheckout: React.FC = () => {
  const { userId, userToken } = useAppContext();
  const [savedPaymentMethods, setSavedPaymentMethods] = React.useState<Array<PaymentCardViewModel>>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentCardViewModel>();
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const getSavedPaymentMethods = async () => {
      setProcessing(true);
      setError("");
      const api = new PaymentCardsApi();
      const [ret, err] = await api.readItems(userToken);
      if (ret && !err) {
        setSavedPaymentMethods(ret);
      } else {
        setError(err);
      }
      setProcessing(false);
    };
    getSavedPaymentMethods().then();
  }, [userId, userToken]);

  return (
    <React.Fragment>
      {savedPaymentMethods && (
        <ExistingPaymentMethod
          paymentMethods={savedPaymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          processing={processing}
        />
      )}
      {!savedPaymentMethods && (
        <NewPaymentMethod
          paymentMethods={savedPaymentMethods}
          setPaymentMethods={setSavedPaymentMethods}
          processing={processing}
        />
      )}
      <Status processing={processing} error={error} />
    </React.Fragment>
  );
};
