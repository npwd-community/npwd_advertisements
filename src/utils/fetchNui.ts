/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
import { isEnvBrowser } from './misc';

async function fetchNui<T = any, D = any>(eventName: string, data?: D, mockResp?: T): Promise<T> {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockResp) {
    return mockResp;
  }

  const resourceName = 'npwd_advertisements';
  const url = isEnvBrowser()
    ? `http://localhost:5005/${eventName.replace(':', '-')}`
    : `https://${resourceName}/${eventName}`;

  const resp = await fetch(url, options);

  const responseObj = await resp.json();

  return responseObj;
}

export default fetchNui;
