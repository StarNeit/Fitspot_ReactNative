module.exports = {
  USER_TYPE: {
    UNKNOWN: 0,
    CUSTOMER: 1,
    TRAINER: 2,
    ADMIN: 3
  },
  GENDER: {
    MALE: 0,
    FEMALE: 1,
    UNSPECIFIED: 2,
  },
  LOGIN_TYPE: {
    EMAIL: 0,
    FACEBOOK: 1,
  },
  AVAILABILITY_RECURRING_OPTIONS:{
    NONE: 0,
    DAILY: 1,
    WEEKLY: 2,
    MONTHLY: 3,
  },
  API_CALL_STATUS:{
    IDLE: 0,
    IN_PROGRESS: 5,
    CREATED: 1,
    DELETED: 2,
    UPDATED: 3,
    FAILED: 4,
  },
  BOOKING_TYPE: {
    UNDEFINED: -1,
    BY_TRAINER: 0,
    BY_ACTIVITY: 1
  },
  WORKOUT_STATUS: {
    PENDING: 0,
    ACCEPTED: 1,
    COMPLETED: 2,
    CANCELLED: 3,
    FAILED: 4
  }
};
