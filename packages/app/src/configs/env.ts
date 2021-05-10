import * as config from "../../config.json";

type EnvironmentPropsByEnv = {
  production: EnvironmentProps;
  development: EnvironmentProps;
  staging: EnvironmentProps;
  storybook: EnvironmentProps;
};

interface EnvironmentProps {
  REACT_ENV: string;
  API_URL: string;
  WEBVIEW_URL: string;
}

const REACT_ENV =
  (config as { REACT_ENV?: keyof EnvironmentPropsByEnv })?.REACT_ENV ??
  "staging";

// tslint:disable:object-literal-sort-keys
const env: EnvironmentPropsByEnv = {
  development: {
    REACT_ENV,
    API_URL: "",
    WEBVIEW_URL: "http://localhost:8000/"
  },
  production: {
    REACT_ENV,
    API_URL: "",
    WEBVIEW_URL: "http://localhost:8000/"
  },
  staging: {
    REACT_ENV,
    API_URL: "",
    WEBVIEW_URL: "http://localhost:8000/"
  },
  storybook: {
    REACT_ENV,
    API_URL: "",
    WEBVIEW_URL: "http://localhost:8000/"
  }
};

export const isDevelopment = () =>
  REACT_ENV === "development" || REACT_ENV === "staging";

export const isProduction = () => REACT_ENV === "production";

export const isStorybook = () => REACT_ENV === "storybook";

export default env[REACT_ENV] || ({} as EnvironmentProps);
