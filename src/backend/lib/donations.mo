import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/donations";

module {
  public func recordDonation(
    donations : Map.Map<Common.ResourceId, Types.Donation>,
    id : Common.ResourceId,
    donorId : ?Common.UserId,
    donorName : Text,
    donorEmail : Text,
    amountCents : Nat,
    currency : Text,
    message : ?Text,
    stripeSessionId : ?Text,
  ) : Types.Donation {
    let d : Types.Donation = {
      id = id;
      donorId = donorId;
      donorName = donorName;
      donorEmail = donorEmail;
      amountCents = amountCents;
      currency = currency;
      message = message;
      stripeSessionId = stripeSessionId;
      createdAt = Common.now();
    };
    donations.add(id, d);
    d;
  };

  public func getDonation(
    donations : Map.Map<Common.ResourceId, Types.Donation>,
    id : Common.ResourceId,
  ) : ?Types.Donation {
    donations.get(id);
  };

  public func listDonations(
    donations : Map.Map<Common.ResourceId, Types.Donation>,
  ) : [Types.Donation] {
    donations.values().toArray();
  };

  public func totalDonationsCents(
    donations : Map.Map<Common.ResourceId, Types.Donation>,
  ) : Nat {
    donations.values().foldLeft(0, func(acc, d) { acc + d.amountCents });
  };
};
