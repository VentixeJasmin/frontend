const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;
const VERIFICATION_SERVICE_URL = import.meta.env.VITE_VERIFICATION_SERVICE_URL;
const ORDER_SERVICE_URL = import.meta.env.VITE_ORDER_SERVICE_URL;
const VENUE_SERVICE_URL = import.meta.env.VITE_VENUE_SERVICE_URL;
const EVENT_SERVICE_URL = import.meta.env.VITE_EVENT_SERVICE_URL;
const PROFILE_SERVICE_URL = import.meta.env.VITE_PROFILE_SERVICE_URL;


export const ENDPOINTS = {
  AUTH: {
    SIGNIN: `${AUTH_SERVICE_URL}/api/auth/signin`,
    SIGNUP: `${AUTH_SERVICE_URL}/api/auth/signup`,
    SIGNOUT: `${AUTH_SERVICE_URL}/api/auth/signout`,
    CONFIRM_EMAIL: `${AUTH_SERVICE_URL}/api/auth/confirm-email`,
    ME: `${AUTH_SERVICE_URL}/api/auth/me`,
  },
  VERIFICATION: {
    SEND_VERIFICATION: `${VERIFICATION_SERVICE_URL}/api/verfication/sendverification`,
    VERIFY: `${VERIFICATION_SERVICE_URL}/api/verfication/verify`,
  },
  ORDERS: {
    CREATE: `${ORDER_SERVICE_URL}/api/orders`,
    GET_FORMDATA: `${ORDER_SERVICE_URL}/api/orders/form-data`,
    GET: `${ORDER_SERVICE_URL}/api/orders{id}`,
    GET_ALL: `${ORDER_SERVICE_URL}/api/orders`,
  },
  PROFILES: {
    GET_FORMDATA: `${PROFILE_SERVICE_URL}/api/profiles/form-data`,
    CREATE: `${PROFILE_SERVICE_URL}/api/profiles`,
    GET: `${PROFILE_SERVICE_URL}/api/profiles{username}`,
    GET_ALL: `${PROFILE_SERVICE_URL}/api/profiles`,
  },
  VENUES: {
    GET_FORMDATA: `${VENUE_SERVICE_URL}/api/venues/form-data`,
    CREATE: `${VENUE_SERVICE_URL}/api/venues`,
    GET: `${VENUE_SERVICE_URL}/api/venues`,
    GET_ALL: `${VENUE_SERVICE_URL}/api/venues`,
  },
  EVENTS: {
    GET_FORMDATA: `${EVENT_SERVICE_URL}/api/events/form-data`,
    CREATE: `${EVENT_SERVICE_URL}/api/events`,
    GET: `${EVENT_SERVICE_URL}/api/events{id}`,
    GET_ALL: `${EVENT_SERVICE_URL}/api/events`,
  },
};