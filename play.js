const logUpdate = require("log-update");
const { Photon } = require("@generated/photon");

const photon = new Photon();

const play = async () => {
  try {
    const frames = (await photon.frames.findMany()).map(f => f.content);
    await photon.disconnect();

    let i = 0;
    setInterval(() => {
      const frame = frames[(i = ++i % frames.length)];

      logUpdate(`${frame}`);
    }, 80);
  } catch (e) {
    console.error(e);
  }
};

play();
