import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/users";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  public func registerUser(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    name : Text,
    email : Text,
    phone : ?Text,
  ) : Types.UserProfile {
    let profile : Types.UserProfile = {
      id = caller;
      name = name;
      email = email;
      phone = phone;
      photoUrl = null;
      role = #member;
      registrationStatus = #pending;
      joinedAt = Common.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func approveUser(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    accessControlState : AccessControl.AccessControlState,
    caller : Common.UserId,
    userId : Common.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (null) { Runtime.trap("User not found") };
      case (?p) {
        profiles.add(userId, { p with registrationStatus = #approved });
        AccessControl.assignRole(accessControlState, caller, userId, #user);
      };
    };
  };

  public func rejectUser(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    userId : Common.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (null) { Runtime.trap("User not found") };
      case (?p) {
        profiles.add(userId, { p with registrationStatus = #rejected });
      };
    };
  };

  public func assignRole(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    accessControlState : AccessControl.AccessControlState,
    caller : Common.UserId,
    userId : Common.UserId,
    role : Types.UserRole,
  ) : () {
    switch (profiles.get(userId)) {
      case (null) { Runtime.trap("User not found") };
      case (?p) {
        profiles.add(userId, { p with role = role });
        let acRole : AccessControl.UserRole = switch (role) {
          case (#admin) { #admin };
          case (#leader) { #user };
          case (#member) { #user };
          case (#guest) { #guest };
        };
        AccessControl.assignRole(accessControlState, caller, userId, acRole);
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId);
  };

  public func listProfiles(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
  ) : [Types.UserProfile] {
    profiles.values().toArray();
  };

  public func listPendingRegistrations(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
  ) : [Types.UserProfile] {
    profiles.values().filter(func(p) { p.registrationStatus == #pending }).toArray();
  };

  public func updateProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    name : Text,
    email : Text,
    phone : ?Text,
  ) : () {
    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Profile not found") };
      case (?p) {
        profiles.add(caller, { p with name = name; email = email; phone = phone });
      };
    };
  };
};
