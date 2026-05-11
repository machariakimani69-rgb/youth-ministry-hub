import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type ResourceId = Nat;

  public func now() : Timestamp { Time.now() };
};
