var admin = require('firebase-admin');
var serviceAccount = require("../config/riksfigur-admin-firebase-adminsdk-xbo1x-4b17a4ead9.json");

const db = require('../db')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const getDbUser = (id) => {
  return new Promise((resolve, reject) => {
      db.query('SELECT role FROM users WHERE id = ?', [id], (err, res) => {
        const data = Object.values(JSON.parse(JSON.stringify(res)))
        if (err) {
            reject(new Error("Database lookup error"));
        }
        else if (data.length != 1){
            reject(new Error("User not found"));
        }
        else if (!data[0].role){
          reject(new Error("User not found"));
        }
        else{
            resolve(data[0].role);
        }
      });
  });
}

const getUserFromReq = (req) => {
  return new Promise((resolve, reject) => {
    getAuthToken(req, null, async () => {
      try {
        const { authToken } = req;
        const userInfo = await admin
          .auth()
          .verifyIdToken(authToken);
        const role = await getDbUser(userInfo.uid);
        resolve({uid: userInfo.uid, role: role});
      } catch (e) {
        reject(Error("No user found"));
      }
    });
  })
}


const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


const checkIfAuthenticated = (req, res, next) => {

  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.uid = userInfo.uid;
      const role = await getDbUser(userInfo.uid);

      if (!role){
        return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
      }
      
      req.role = role;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

const checkIfAuthenticatedForEvent = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const eventId = req.params.id;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.uid = userInfo.uid;
      const role = await getDbUser(userInfo.uid);
      const hasPerm = await hasPermission(role, eventId);

      if (!hasPerm){
        return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
      }else{
        req.role = role;
        return next();
      }
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
}

const hasPermission = (role, eventId) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.query('SELECT Count(1) AS value FROM events WHERE id = ? AND owner_role = ?', [eventId, role], (err, res) => {
        const data = Object.values(JSON.parse(JSON.stringify(res)))[0];
        if (err) {
          reject(false);
        }
        else if (!data.value) {
          reject(false);
        }
        else{
            resolve(true);
        }
      });
    } catch (error) {
      reject(false);
    }
  });
}

const hasPermissionForEvent = (uid, eventId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const role = await getDbUser(uid);
      db.query('SELECT Count(1) AS value FROM events WHERE id = ? AND owner_role = ?', [eventId, role], (err, res) => {
        const data = Object.values(JSON.parse(JSON.stringify(res)))[0];
        if (err) {
          reject(new Error("Database lookup error"));
        }
        else if (!data.value) {
          reject(new Error("Access Denied"));
        }
        else{
            resolve(data.value);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

exports.checkIfAuthenticated = checkIfAuthenticated;
exports.getUserFromReq = getUserFromReq;

exports.hasPermissionForEvent = hasPermissionForEvent;

exports.checkIfAuthenticatedForEvent = checkIfAuthenticatedForEvent;