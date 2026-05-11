import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import Common "../types/common";
import Types "../types/donations";
import SettingsTypes "../types/settings";
import DonationsLib "../lib/donations";

mixin (
  accessControlState : AccessControl.AccessControlState,
  donations : Map.Map<Common.ResourceId, Types.Donation>,
  stripeConfig : { var data : ?SettingsTypes.StripeConfig },
  state : { var nextDonationId : Nat },
) {
  public shared ({ caller }) func recordDonation(
    donorName : Text,
    donorEmail : Text,
    amountCents : Nat,
    currency : Text,
    message : ?Text,
    stripeSessionId : ?Text,
  ) : async Types.Donation {
    let donorId : ?Common.UserId = if (caller.isAnonymous()) { null } else { ?caller };
    let id = state.nextDonationId;
    state.nextDonationId += 1;
    DonationsLib.recordDonation(donations, id, donorId, donorName, donorEmail, amountCents, currency, message, stripeSessionId);
  };

  public query ({ caller }) func listDonations() : async [Types.Donation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view donations");
    };
    DonationsLib.listDonations(donations);
  };

  public query func totalDonationsCents() : async Nat {
    DonationsLib.totalDonationsCents(donations);
  };
};
