import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

import { API_URL } from '@env';

//Base devloper URL - 
let baseURL = "http://localhost:5000/api"; 

if (__DEV__) {
  if (Platform.OS === "android") {
    
    baseURL = "http://10.0.2.2:5000/api";
  } else {
    
    const debuggerHost = Constants.manifest?.debuggerHost;
    const lanIP = debuggerHost?.split(":")[0];
    if (lanIP) {
      baseURL = `http://${lanIP}:5000/api`;
    }
  }
} else {
  
  baseURL = "https://your-api.example.com/api";
}

export default axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
