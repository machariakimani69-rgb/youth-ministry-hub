import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/events";

module {
  public func createEvent(
    events : Map.Map<Common.ResourceId, Types.Event>,
    rsvps : Map.Map<Common.ResourceId, Map.Map<Common.UserId, Types.Rsvp>>,
    id : Common.ResourceId,
    caller : Common.UserId,
    title : Text,
    description : Text,
    location : Text,
    startDate : Common.Timestamp,
    endDate : Common.Timestamp,
    capacity : ?Nat,
    imageUrl : ?Text,
  ) : Types.Event {
    let ev : Types.Event = {
      id = id;
      title = title;
      description = description;
      location = location;
      startDate = startDate;
      endDate = endDate;
      capacity = capacity;
      createdBy = caller;
      createdAt = Common.now();
      imageUrl = imageUrl;
      isPublished = false;
    };
    events.add(id, ev);
    rsvps.add(id, Map.empty<Common.UserId, Types.Rsvp>());
    ev;
  };

  public func updateEvent(
    events : Map.Map<Common.ResourceId, Types.Event>,
    caller : Common.UserId,
    id : Common.ResourceId,
    title : Text,
    description : Text,
    location : Text,
    startDate : Common.Timestamp,
    endDate : Common.Timestamp,
    capacity : ?Nat,
    imageUrl : ?Text,
    isPublished : Bool,
  ) : Types.Event {
    switch (events.get(id)) {
      case (null) { Runtime.trap("Event not found") };
      case (?ev) {
        let updated : Types.Event = { ev with
          title = title;
          description = description;
          location = location;
          startDate = startDate;
          endDate = endDate;
          capacity = capacity;
          imageUrl = imageUrl;
          isPublished = isPublished;
        };
        events.add(id, updated);
        updated;
      };
    };
  };

  public func deleteEvent(
    events : Map.Map<Common.ResourceId, Types.Event>,
    rsvps : Map.Map<Common.ResourceId, Map.Map<Common.UserId, Types.Rsvp>>,
    id : Common.ResourceId,
  ) : () {
    events.remove(id);
    rsvps.remove(id);
  };

  public func submitRsvp(
    rsvps : Map.Map<Common.ResourceId, Map.Map<Common.UserId, Types.Rsvp>>,
    caller : Common.UserId,
    eventId : Common.ResourceId,
    status : Types.RsvpStatus,
  ) : () {
    switch (rsvps.get(eventId)) {
      case (null) { Runtime.trap("Event not found") };
      case (?eventRsvps) {
        let rsvp : Types.Rsvp = {
          userId = caller;
          status = status;
          registeredAt = Common.now();
        };
        eventRsvps.add(caller, rsvp);
      };
    };
  };

  public func getEvent(
    events : Map.Map<Common.ResourceId, Types.Event>,
    id : Common.ResourceId,
  ) : ?Types.Event {
    events.get(id);
  };

  public func listEvents(
    events : Map.Map<Common.ResourceId, Types.Event>,
  ) : [Types.Event] {
    events.values().toArray();
  };

  public func getEventWithRsvps(
    events : Map.Map<Common.ResourceId, Types.Event>,
    rsvps : Map.Map<Common.ResourceId, Map.Map<Common.UserId, Types.Rsvp>>,
    id : Common.ResourceId,
  ) : ?Types.EventWithRsvps {
    switch (events.get(id)) {
      case (null) { null };
      case (?ev) {
        let eventRsvps = switch (rsvps.get(id)) {
          case (null) { [] };
          case (?m) { m.values().toArray() };
        };
        ?{ event = ev; rsvps = eventRsvps };
      };
    };
  };
};
