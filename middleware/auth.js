import auth from "basic-auth";

export const basicAuth = (req, res, next) => {
  const user = auth(req);
  if (!user || user.name !== process.env.USERNAME || user.pass !== process.env.PASSWORD) {
    res.set("WWW-Authenticate", "Basic realm='example'");
    return res.status(401).send("Authentication required.");
  }
  next();
};
