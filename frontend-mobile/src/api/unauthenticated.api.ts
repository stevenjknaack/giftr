import axios from 'axios';
import { baseConfig } from '.';

/**
 * Axios instance for accessing non-authenticated routes
 */
export const unauthenticatedApi = axios.create(baseConfig);
