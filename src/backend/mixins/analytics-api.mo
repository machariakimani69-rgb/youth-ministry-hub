import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/analytics";
import UserTypes "../types/users";
import DonationTypes "../types/donations";
import EventTypes "../types/events";
import AnalyticsLib "../lib/analytics";

mixin (
  accessControlState : AccessControl.AccessControlState,
  pageViews : List.List<Types.PageView>,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  donations : Map.Map<Common.ResourceId, DonationTypes.Donation>,
  events : Map.Map<Common.ResourceId, EventTypes.Event>,
) {
  public func recordPageView(page : Text) : async () {
    AnalyticsLib.recordPageView(pageViews, page, null);
  };

  public query ({ caller }) func getAnalyticsSummary() : async Types.AnalyticsSummary {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };
    AnalyticsLib.getSummary(pageViews, profiles, donations, events);
  };
};
