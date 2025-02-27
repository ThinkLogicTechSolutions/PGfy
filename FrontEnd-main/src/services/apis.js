const BASE_URL = "http://172.50.24.150:4000/api/v1"

export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    VERIFY_OTP_API: BASE_URL + "/auth/verify-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    LOGIN_OWNER_API: BASE_URL + "/auth/login-owner" //added
}

export const tenantEndpoints = {
    PROFILE_API:BASE_URL+ "/tenant/create-profile",
    ALL_PG_DETAILS: BASE_URL + "/tenant/getAllPGs",
    GET_PG_DETAILS:BASE_URL + "/tenant/viewPG"

};
  
export const ownerEndpoints = {
  CREATE_PG_API: BASE_URL + '/owner/createNewPg',
  GET_PG_API: BASE_URL + '/owner/pg-details-by-user',
  GET_PG_DETAILS_API: BASE_URL + '/owner/pg-details',
  GET_OWNER_DETAILS_API: (ownerId) => `${BASE_URL}/owner/pg-owner-details/${ownerId}`,
  GET_ROOM_CHART_API:(pgBuildingId) => `${BASE_URL}/owner/pg-overview/${pgBuildingId}`
};


export const adminEndpoints = {};
