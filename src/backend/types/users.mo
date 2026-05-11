import Common "common";

module {
  public type UserRole = { #admin; #leader; #member; #guest };

  public type RegistrationStatus = { #pending; #approved; #rejected };

  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    email : Text;
    phone : ?Text;
    photoUrl : ?Text;
    role : UserRole;
    registrationStatus : RegistrationStatus;
    joinedAt : Common.Timestamp;
  };
};
