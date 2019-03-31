import ModelPoint from "./modules/trip-points/model-point";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({url: `tasks`})
      .then(toJSON)
      .then(ModelPoint.parseTripPoints);
  }

  createTask({task}) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(toJSON)
      .then(ModelPoint.parseTripPoint);
  }

  updateTask({id, data}) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(toJSON)
      .then(ModelPoint.parseTripPoint);
  }

  deleteTask({id}) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.DELETE
    });
  }

  syncTasks({tasks}) {
    return this._load({
      url: `tasks/sync`,
      method: `POST`,
      body: JSON.stringify(tasks),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`fetch error: ${error}`);
        throw error;
      });
  }
};

export {API};
