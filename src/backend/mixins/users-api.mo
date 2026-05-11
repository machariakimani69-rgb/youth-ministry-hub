import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/users";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, Types.UserProfile>,
  state : { var nextUserId : Nat },
) {
  public shared ({ caller }) func registerUser(
    name : Text,
    email : Text,
    phone : ?Text,
  ) : async Types.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to register");
    };
    UsersLib.registerUser(profiles, caller, name, email, phone);
  };

  public shared ({ caller }) func approveUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve users");
    };
    UsersLib.approveUser(profiles, accessControlState, caller, userId);
  };

  public shared ({ caller }) func rejectUser(userId : Common.UserId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject users");
    };
    UsersLib.rejectUser(profiles, caller, userId);
  };

  public shared ({ caller }) func assignUserRole(
    userId : Common.UserId,
    role : Types.UserRole,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    UsersLib.assignRole(profiles, accessControlState, caller, userId, role);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    profiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(
    name : Text,
    email : Text,
    phone : ?Text,
  ) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated");
    };
    switch (profiles.get(caller)) {
      case (null) {
        ignore UsersLib.registerUser(profiles, caller, name, email, phone);
      };
      case (?_) {
        UsersLib.updateProfile(profiles, caller, name, email, phone);
      };
    };
  };

  public query ({ caller }) func getUserProfile(userId : Common.UserId) : async ?Types.UserProfile {
    profiles.get(userId);
  };

  public query ({ caller }) func listUsers() : async [Types.UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all users");
    };
    UsersLib.listProfiles(profiles);
  };

  public query ({ caller }) func listPendingRegistrations() : async [Types.UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view pending registrations");
    };
    UsersLib.listPendingRegistrations(profiles);
  };
};
