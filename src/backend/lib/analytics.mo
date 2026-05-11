import List "mo:core/List";
import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/analytics";
import UserTypes "../types/users";
import DonationTypes "../types/donations";
import EventTypes "../types/events";

module {
  public func recordPageView(
    pageViews : List.List<Types.PageView>,
    page : Text,
    userId : ?Common.UserId,
  ) : () {
    pageViews.add({
      page = page;
      viewedAt = Common.now();
      userId = userId;
    });
  };

  public func getSummary(
    pageViews : List.List<Types.PageView>,
    profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
    donations : Map.Map<Common.ResourceId, DonationTypes.Donation>,
    events : Map.Map<Common.ResourceId, EventTypes.Event>,
  ) : Types.AnalyticsSummary {
    let totalMembers = profiles.values().filter(func(p) { p.role == #member }).size();
    let totalDonationAmountCents = donations.values().foldLeft(0, func(acc, d) { acc + d.amountCents });
    {
      totalPageViews = pageViews.size();
      totalUsers = profiles.size();
      totalMembers = totalMembers;
      totalEvents = events.size();
      totalDonations = donations.size();
      totalDonationAmountCents = totalDonationAmountCents;
    };
  };
};
