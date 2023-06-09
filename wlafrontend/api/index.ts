import axios from "axios";

// set axios configurations
//remote server : https://d1h2airt5kbf3g.cloudfront.net
//locoal server: http://10.0.10.10:3000
const API = axios.create({
  baseURL: "http://10.0.10.10:3000",
  timeout: 10000,
  withCredentials: false,
});

// Set Token to be in header in subsequent reqs after login or signup
API.interceptors.request.use(async (config) => {
  config.headers["X-WildlifeAlert"] = "acceptableRequest";
  return config;
});

//===================================================
//get the homescreen content:
export const getHomeScreenContent = async () => {
  try {
    const homescreencontent = await API.get("/api/homescreen");
    return homescreencontent.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//get the public map data of rescue alerts:
export const getPubData = async () => {
  try {
    const pubdata = await API.get("/api/publicmapgeopos");
    return pubdata.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//get alert details for rescuers:
export const getAlertDetails = async (id: number) => {
  try {
    const alertdetails = await API.get(`/api/alertdetails/${id}`);
    return alertdetails.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//Get Public Map Info Dialogue content
export const getPubMapDialogueContent = async () => {
  try {
    const pubmapdialoguecontent = await API.get("/api/publicmapscreen");
    return pubmapdialoguecontent.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//post a new alert
export const postNewAlert = async ({
  photoBlob,
  userDetails,
}: {
  photoBlob: string | null;
  userDetails: Record<string, string>;
}) => {
  try {
    let formData = new FormData();

    // Adding the user details to the form data
    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    // Parse the photoBlob string into an array
    if (typeof photoBlob === "string") {
      photoBlob = JSON.parse(photoBlob);
    }

    // Adding the photo blobs to the form data
    if (Array.isArray(photoBlob)) {
      for (let blob of photoBlob) {
        const uriParts = blob.split("/");
        const fileName = uriParts[uriParts.length - 1];
        const fileType = fileName.split(".")[1];

        // Create a new file object using the URI
        let file = {
          uri: blob,
          type: `image/${fileType}`,
          name: `${fileName}`,
        };
        // @ts-ignore
        formData.append("images", file);
      }
    }

    const newalert = await API({
      method: "post",
      url: "/api/postalert",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return newalert.data;
  } catch (error) {
    // @ts-ignore
    if (error.response) {
      // The request was made and the server responded with a status code out of the range of 2xx
      // @ts-ignore
      console.log(error.response.data);
      // @ts-ignore
      console.log(error.response.status);
      // @ts-ignore
      console.log(error.response.headers);
      // @ts-ignore
    } else if (error.request) {
      // The request was made but no response was received
      // @ts-ignore
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // @ts-ignore
      console.log("Error", error.message);
    }
    // @ts-ignore
    console.log(error.config);
  }
};

//===================================================
//get resources for the resources screen
export const getResources = async () => {
  try {
    const resources = await API.get("/api/getresources");
    return resources.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//get the about us content
export const getAboutScreenContent = async () => {
  try {
    const aboutContent = await API.get("/api/getabout");
    return aboutContent.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//get the privacy policy content
export const getPrivacyPolicyContent = async () => {
  try {
    const privacyPolicyContent = await API.get("/api/getpolicies");
    return privacyPolicyContent.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//Post Register New Rescuer
export const registerRescuer = async ({
  sessionId,
  token,
  userDetails,
}: {
  sessionId: string | null;
  token: string | null;
  userDetails: Record<string, string>;
}) => {
  try {
    const registerRescuer = await API({
      method: "post",
      url: "/secure-api/newrescuer",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: userDetails,
    });
    return registerRescuer.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//get the welcomecreen content:
export const getWelcomeScreenContent = async (
  sessionId: String,
  token: String
) => {
  try {
    const welcomeContent = await API({
      method: "get",
      url: "/secure-api/welcomescreen",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return welcomeContent.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    return { error: error.response?.data?.error || "Unknown error" };
  }
};

//===================================================
//get rescuer profile
export const getRescuerProfile = async (sessionId: String, token: String) => {
  try {
    const rescuerProfile = await API({
      method: "get",
      url: "/secure-api/rescuerprofile",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return rescuerProfile.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    return { error: error.response?.data?.error || "Unknown error" };
  }
};

//===================================================
//update preference: GeoRadius
export const setGeoRadius = async ({
  sessionId,
  token,
  Radius,
}: {
  sessionId: String;
  token: String;
  Radius: String;
}) => {
  try {
    const setRadius = await API({
      method: "post",
      url: "secure-api/rescuerprefradius",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: { Radius },
    });
    return setRadius.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//update preference: notifications
export const SetNotificationPref = async ({
  sessionId,
  token,
  Notifications,
}: {
  sessionId: String;
  token: String;
  Notifications: String;
}) => {
  try {
    const setNotifications = await API({
      method: "post",
      url: "secure-api/rescuerprefnotifications",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: { Notifications },
    });
    return setNotifications.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//update preference: location
type LocationType = {
  latitude: number;
  longitude: number;
};

export const SetLocationPref = async ({
  sessionId,
  token,
  location,
}: {
  sessionId: string;
  token: string;
  location: LocationType;
}) => {
  try {
    const changeLocation = await API({
      method: "post",
      url: "secure-api/rescuerpreflocation",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: {
        Latitude: location.latitude,
        Longitude: location.longitude,
      },
    });
    return changeLocation.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//delete rescuer account
export const deleteAccount = async ({
  sessionId,
  token,
}: {
  sessionId: String;
  token: String;
}) => {
  try {
    const deleteAccount = await API({
      method: "delete",
      url: "secure-api/deleterescuer",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return deleteAccount.data;
  } catch (error) {
    console.error(error);
  }
};

//===================================================
//get the alerts in the rescuer's radius
export const getActiveInArea = async ({
  sessionId,
  token,
}: {
  sessionId: String;
  token: String;
}) => {
  try {
    const activeInArea = await API({
      method: "get",
      url: "data/active-alert-radius",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return activeInArea.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    return { error: error.message || "Unknown error" };
  }
};

//===================================================
//get the total active alerts
export const getTotalAlerts = async ({
  sessionId,
  token,
}: {
  sessionId: String;
  token: String;
}) => {
  try {
    const totalAlerts = await API({
      method: "get",
      url: "data/total-active-alerts",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return totalAlerts.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    return { error: error.message || "Unknown error" };
  }
};
