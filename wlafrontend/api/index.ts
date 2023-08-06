import axios from "axios";

// set axios configurations
//remote server : https://wildlifealertusa.com
//locoal server: http://10.0.10.10:3000
const API = axios.create({
  baseURL: "https://wildlifealertusa.com",
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
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get the public map data of alerts:
interface Alert {
  id: string;
  FullName: string;
  Latitude: string;
  Longitude: string;
  Photo: string;
  PhoneNumber: string;
  Animal: string;
  Description: string;
  Email: string;
  ShareContact: string;
  Timestamp: string;
}
export const getPubData = async () => {
  try {
    const pubdata = await API.get("/api/publicmapgeopos");

    const transformedData = pubdata.data.map((alert: Alert) => ({
      ...alert,
      Latitude: parseFloat(alert.Latitude),
      Longitude: parseFloat(alert.Longitude),
      ShareContact: alert.ShareContact.toLowerCase() === "true",
    }));

    return transformedData;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//Get Public Map Info Dialogue content
export const getPubMapDialogueContent = async () => {
  try {
    const pubmapdialoguecontent = await API.get("/api/publicmapscreen");
    return pubmapdialoguecontent.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
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
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get the about us content
export const getAboutScreenContent = async () => {
  try {
    const aboutContent = await API.get("/api/getabout");
    return aboutContent.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get the privacy policy content
export const getPrivacyPolicyContent = async () => {
  try {
    const privacyPolicyContent = await API.get("/api/getpolicies");
    return privacyPolicyContent.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//Post Register New Rescuer
export const registerRescuer = async ({ userDetails }: { userDetails: Record<string, string> }) => {
  try {
    const registerRescuer = await API({
      method: "post",
      url: "/secure-api/newrescuer",
      // headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: userDetails,
    });
    return registerRescuer.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get the welcomecreen content:
export const getWelcomeScreenContent = async () => {
  try {
    const welcomeContent = await API({
      method: "get",
      url: "/secure-api/welcomescreen",
      //headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return welcomeContent.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
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
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
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
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//update preference: notifications
export const SetNotificationPref = async ({
  sessionId,
  token,
  Notifications,
  expoPushToken,
}: {
  sessionId: String;
  token: String;
  Notifications: String;
  expoPushToken: String;
}) => {
  try {
    const setNotifications = await API({
      method: "post",
      url: "secure-api/rescuerprefnotifications",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: { Notifications, expoPushToken },
    });
    return setNotifications.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
// update user push token
export const updatePushToken = async ({
  sessionId,
  token,
  expoPushToken,
}: {
  sessionId: string;
  token: string;
  expoPushToken: string;
}) => {
  try {
    const updatePushToken = await API({
      method: "post",
      url: "secure-api/updatepushtoken",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
      data: { expoPushToken },
    });
    return updatePushToken.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
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
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//delete rescuer account
export const deleteAccount = async ({ sessionId, token }: { sessionId: String; token: String }) => {
  try {
    const deleteAccount = await API({
      method: "delete",
      url: "secure-api/deleterescuer",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return deleteAccount.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get the alerts in the rescuer's radius
export const getActiveInArea = async ({ sessionId, token }: { sessionId: String; token: String }) => {
  try {
    const activeInArea = await API({
      method: "get",
      url: "data/active-alert-radius",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return activeInArea.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get the total active alerts
export const getTotalAlerts = async ({ sessionId, token }: { sessionId: String; token: String }) => {
  try {
    const totalAlerts = await API({
      method: "get",
      url: "data/total-active-alerts",
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return totalAlerts.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};

//===================================================
//get alert details
export const getAlertDetails = async ({
  sessionId,
  token,
  alertId,
}: {
  sessionId: String;
  token: String;
  alertId: String;
}) => {
  try {
    const alertDetails = await API({
      method: "get",
      url: `data/alert-details/${alertId}`,
      headers: { Authorization: `Bearer ${sessionId} ${token}` },
    });
    return alertDetails.data;
  } catch (error: any) {
    console.error(error?.response?.data.error);
    let errorMsg = error.message || "Unknown error";
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      errorMsg = error.response.data.message || errorMsg;
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      errorMsg = "The request was made but no response was received. Sorry, there maybe a server problem";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw new Error(errorMsg);
  }
};
