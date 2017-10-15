const getApiUrl = () => {
  return 'http://localhost:3000'
}

const getURL = url => {
  return getApiUrl() + (url.startsWith('/') ? '' : '/') + url
}

const getHeaders = () => {
  const authToken = undefined

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }
  return headers
}

const parseJSON = async response => {
  try {
    return await response.json()
  } catch (err) {
    return undefined
  }
}

const processError = async error => {
  const errors = await parseJSON(error)
  return Promise.reject(errors)
}

const checkStatus = response => {
  if (response.ok) {
    return response
  } else {
    return processError(response)
  }
}

const makeRequest = (url, method, body) => {
  const options = {
    credentials: 'same-origin',
    headers: getHeaders(),
    method,
    body: body ? JSON.stringify(body) : undefined
  }

  const fetchUrl = getURL(url)

  return fetch(fetchUrl, options)
    .then(checkStatus)
    .then(parseJSON)
}

const get = (url, opts) => {
  return makeRequest(url, 'GET', null, opts)
}

const post = (url, body, opts) => {
  return makeRequest(url, 'POST', body, opts)
}

const put = (url, body, opts) => {
  return makeRequest(url, 'PUT', body, opts)
}

const patch = (url, body, opts) => {
  return makeRequest(url, 'PATCH', body, opts)
}

const del = (url, body, opts) => {
  return makeRequest(url, 'DELETE', body, opts)
}

export { get, post, patch, del, put }
