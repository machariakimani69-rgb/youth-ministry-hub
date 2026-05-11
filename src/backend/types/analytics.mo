import Common "common";

module {
  public type PageView = {
    page : Text;
    viewedAt : Common.Timestamp;
    userId : ?Common.UserId;
  };

  public type AnalyticsSummary = {
    totalPageViews : Nat;
    totalUsers : Nat;
    totalMembers : Nat;
    totalEvents : Nat;
    totalDonations : Nat;
    totalDonationAmountCents : Nat;
  };
};
