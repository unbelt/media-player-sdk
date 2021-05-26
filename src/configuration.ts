/** An interface for all configuration parameters required by the SDK */
export interface Configuration {
  environment: 'development' | 'production';
}

/** Environments available for the SDK */
export enum Environment {
  Production = 'production',
  Development = 'development',
}

/** Default configuration of the SDK client */
export const DEFAULT_CONFIGURATION: Configuration = {
  environment: Environment.Development,
};
