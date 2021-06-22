import React from "react";

import { ExistingPaymentMethod } from "./ExistingPaymentMethod";
import { NewPaymentMethod } from "./NewPaymentMethod";
import { Status } from "../Status";
import { useAppContext } from "../../AppContext";

export interface Props {
  selectedPaymentMethod: PaymentMethodViewModel | undefined;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodViewModel | undefined>>;
}

export const InlineCheckout: React.FC<Props> = ({ selectedPaymentMethod, setSelectedPaymentMethod }) => {
  const { userId, userToken } = useAppContext();
  const [savedPaymentMethods, setSavedPaymentMethods] = React.useState<Array<PaymentMethodViewModel>>();
  const [forceNewPaymentMethod, setForceNewPaymentMethod] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const getSavedPaymentMethods = async () => {
      setProcessing(true);
      setError("");
      const api = new PaymentMethodsApi();
      const [_, ret, err] = await api.readAll(userToken);
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
      {!forceNewPaymentMethod && savedPaymentMethods && (
        <ExistingPaymentMethod
          paymentMethods={savedPaymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          setForceNewPaymentMethod={setForceNewPaymentMethod}
          processing={processing}
        />
      )}
      {(forceNewPaymentMethod || !savedPaymentMethods) && (
        <NewPaymentMethod
          setPaymentMethods={setSavedPaymentMethods}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          setForceNewPaymentMethod={setForceNewPaymentMethod}
          processing={processing}
          setProcessing={setProcessing}
          setError={setError}
        />
      )}
      <Status processing={processing} error={error} />
    </React.Fragment>
  );
};
