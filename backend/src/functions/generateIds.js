// ++++++++++++ generate random Id ++++++++++++

function generateId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let userId = "";

  for (let i = 0; i < 6; i++) {
    userId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for (let i = 0; i < 4; i++) {
    userId += Math.floor(Math.random() * 10);
  }

  return userId;
}

module.exports = {
    generateId
};