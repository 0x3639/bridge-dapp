import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { storeReferralCode } from "../../services/redux/referralSlice";
import { getReferralAddress } from "../../utils/utils";

const ReferralCodeInterpreter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Route any inbound ?referral=<hex> through the static consent page at
  // /affiliate.html. That page is the only surface allowed to write
  // localStorage["znn-referral-code"], and only on an explicit user click.
  // This prevents third-party sites from silently planting affiliate
  // attribution by navigating visitors through the bridge root.
  useEffect(() => {
    const referralCode = searchParams.get("referral");
    if (referralCode) {
      window.location.replace(`/affiliate.html?referral=${encodeURIComponent(referralCode)}`);
    }
  }, [searchParams]);

  useEffect(() => {
    const referralAddress = getReferralAddress();

    if (referralAddress) {
      dispatch(storeReferralCode(referralAddress));
    }
  }, [dispatch]);

  return <></>;
};

export default ReferralCodeInterpreter;
