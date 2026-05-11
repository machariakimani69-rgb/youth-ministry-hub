import Common "common";

module {
  public type Donation = {
    id : Common.ResourceId;
    donorId : ?Common.UserId;
    donorName : Text;
    donorEmail : Text;
    amountCents : Nat;
    currency : Text;
    message : ?Text;
    stripeSessionId : ?Text;
    createdAt : Common.Timestamp;
  };
};
