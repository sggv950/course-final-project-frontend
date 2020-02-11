import eventService from '../service/event.service.js';
import bus, { MSG } from '../bus.js';
export default {
  state: {
    events: [],
    currEvent: null
  },
  mutations: {
    setEvents(state, { events }) {
      state.events = events;
    },
    setCurrentEvent(state, { event }) {
      state.currEvent = event;
    },
    setUpdateEvent(state, { joinedEvent }) {
      state.currEvent.instruments
      .find(instrument => {
        return instrument.name === joinedEvent.instrument;
      })
      .playerIds.push(joinedEvent.currUser._id);
      state.currEvent.joinedMembersCount++
    },
    setEventStatus(state) {
      const ratio =
      state.currEvent.joinedMembersCount / +state.currEvent.allowedMembersCount;
      if (ratio < 0.4) state.currEvent.status = "Waiting for players";
      else if (ratio < 0.8) state.currEvent.status = "Kinda full";
      else if (ratio < 1) state.currEvent.status = "Almost full";
      else state.currEvent.status = "Event full";
    },
    pushMsgToHistory(state, {msg}){
      state.currEvent.msgs.push(msg);
    }
  },
  actions: {
    joinEvent({ commit, getters, state, dispatch }, { joinedEvent }) {
      joinedEvent.currUser = getters.loggedInUser;
      commit({ type: 'setUpdateEvent', joinedEvent });
      commit({ type: 'setEventStatus', joinedEvent });
      const event = state.currEvent
      delete event.players
      delete event.admin
      return eventService.saveEvent(event).then(() => {
        return dispatch({type: 'getEventById' , eventId: event._id}).then(() => {
          bus.$emit(MSG, 'Joined event.');
        })
      });
    },
    
    loadEvents({ commit }) {
      return eventService.query().then(events => {
        commit({ type: 'setEvents', events });
      });
    },
    getEventById({ commit }, { eventId }) {
      return eventService.getEventById(eventId).then(event => {
        commit({ type: 'setCurrentEvent', event });
        return event;
      });
    },

    saveNewEvent({ commit }, { event }) {
      return eventService.saveEvent(event).then(result => {
        bus.$emit(MSG, 'Event saved.');
        return result.data.eventId;
      });
    },

    updateEvent({ commit }, { event }) {
      return eventService.saveEvent(event).then(() => {
        bus.$emit(MSG, 'Event updated.');
      });
    },
    updateHistoryEvent({ commit }, { event }) {
      return eventService.saveEvent(event).then(() => {
      });
    },
    pushMsgToHistory({ commit, getters, dispatch }, { msg }) {
      commit({type: 'pushMsgToHistory', msg})
      const tempEvent = getters.currEvent
      dispatch({type: 'updateHistoryEvent', event: tempEvent})
    },
    removeEvent({ commit }, { eventId }) {
      return eventService.remove(eventId).then(() => {
        bus.$emit(MSG, 'Event canceled.');
      });
    },
    filter({ commit, dispatch }, { filter, sort }) {
      if (!filter.byGenre && !filter.byInstrument && !filter.byName && !filter.byStatus) {
          if (!sort) return dispatch('loadEvents')
          return eventService.query(null, sort)
      }
      return eventService.query(filter, sort).then(events => {
          commit({ type: 'setEvents', events })
      })
  }
  },
  getters: {
    events: state => state.events,
    currEvent: state => state.currEvent,
  }
};
