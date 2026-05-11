import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/settings";
import SettingsLib "../lib/settings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  settings : { var data : Types.SystemSettings },
  stripeConfig : { var data : ?Types.StripeConfig },
) {
  public query func getSettings() : async Types.SystemSettings {
    SettingsLib.getSettings(settings);
  };

  public shared ({ caller }) func updateSettings(updated : Types.SystemSettings) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update settings");
    };
    SettingsLib.updateSettings(settings, caller, updated);
  };
};
