import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/events";
import EventsLib "../lib/events";

mixin (
  accessControlState : AccessControl.AccessControlState,
  events : Map.Map<Common.ResourceId, Types.Event>,
  rsvps : Map.Map<Common.ResourceId, Map.Map<Common.UserId, Types.Rsvp>>,
  state : { var nextEventId : Nat },
) {
  public shared ({ caller }) func createEvent(
    title : Text,
    description : Text,
    location : Text,
    startDate : Common.Timestamp,
    endDate : Common.Timestamp,
    capacity : ?Nat,
    imageUrl : ?Text,
  ) : async Types.Event {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create events");
    };
    let id = state.nextEventId;
    state.nextEventId += 1;
    EventsLib.createEvent(events, rsvps, id, caller, title, description, location, startDate, endDate, capacity, imageUrl);
  };

  public shared ({ caller }) func updateEvent(
    id : Common.ResourceId,
    title : Text,
    description : Text,
    location : Text,
    startDate : Common.Timestamp,
    endDate : Common.Timestamp,
    capacity : ?Nat,
    imageUrl : ?Text,
    isPublished : Bool,
  ) : async Types.Event {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EventsLib.updateEvent(events, caller, id, title, description, location, startDate, endDate, capacity, imageUrl, isPublished);
  };

  public shared ({ caller }) func deleteEvent(id : Common.ResourceId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    EventsLib.deleteEvent(events, rsvps, id);
  };

  public shared ({ caller }) func submitRsvp(
    eventId : Common.ResourceId,
    status : Types.RsvpStatus,
  ) : async () {
    EventsLib.submitRsvp(rsvps, caller, eventId, status);
  };

  public query func getEvent(id : Common.ResourceId) : async ?Types.Event {
    EventsLib.getEvent(events, id);
  };

  public query func listEvents() : async [Types.Event] {
    EventsLib.listEvents(events);
  };

  public query ({ caller }) func getEventWithRsvps(id : Common.ResourceId) : async ?Types.EventWithRsvps {
    EventsLib.getEventWithRsvps(events, rsvps, id);
  };
};
