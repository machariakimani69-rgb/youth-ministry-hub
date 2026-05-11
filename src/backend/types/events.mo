import Common "common";

module {
  public type RsvpStatus = { #going; #notGoing; #maybe };

  public type Rsvp = {
    userId : Common.UserId;
    status : RsvpStatus;
    registeredAt : Common.Timestamp;
  };

  public type Event = {
    id : Common.ResourceId;
    title : Text;
    description : Text;
    location : Text;
    startDate : Common.Timestamp;
    endDate : Common.Timestamp;
    capacity : ?Nat;
    createdBy : Common.UserId;
    createdAt : Common.Timestamp;
    imageUrl : ?Text;
    isPublished : Bool;
  };

  public type EventWithRsvps = {
    event : Event;
    rsvps : [Rsvp];
  };
};
