import Common "../types/common";
import Types "../types/settings";

module {
  public func getSettings(
    settings : { var data : Types.SystemSettings },
  ) : Types.SystemSettings {
    settings.data;
  };

  public func updateSettings(
    settings : { var data : Types.SystemSettings },
    caller : Common.UserId,
    updated : Types.SystemSettings,
  ) : () {
    settings.data := updated;
  };

  public func setStripeConfig(
    stripeConfig : { var data : ?Types.StripeConfig },
    caller : Common.UserId,
    config : Types.StripeConfig,
  ) : () {
    stripeConfig.data := ?config;
  };

  public func getStripeConfig(
    stripeConfig : { var data : ?Types.StripeConfig },
  ) : ?Types.StripeConfig {
    stripeConfig.data;
  };
};
