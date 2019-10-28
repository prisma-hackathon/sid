const fs = require("fs");
const { exec } = require("child_process");
const art = require("ascii-art");
const canvas = require("canvas");

const { Photon } = require("@generated/photon");

const renderImage = async path => {
  return new Promise((resolve, reject) => {
    const image = new art.Image({
      filepath: path,
      alphabet: "variant1"
    });

    image.write(function(err, rendered) {
      if (err) {
        return reject(err);
      }
      return resolve(rendered);
    });
  });
};

const readdir = path =>
  new Promise((res, rej) => {
    return fs.readdir(path, (err, files) => {
      if (err) {
        console.error("Error in readdir", err);
        return rej(files);
      }

      return res(files);
    });
  });

const mkdir = path => {
  return new Promise((res, rej) => {
    exec(`rm -r ${path}`, e => {
      if (e) {
        return rej(e);
      }

      return exec(`mkdir ${path}`, e => {
        if (e) {
          return rej(e);
        }
        return res(e);
      });
    });
  });
};

const seed = async framesDir => {
  const photon = new Photon();

  try {
    // Clear all older frames
    await photon.frames.deleteMany({
      where: {
        content: {
          not: "1"
        }
      }
    });

    const files = await readdir(framesDir);

    for (let i = 0; i < files.length; i++) {
      if (!files[i].endsWith(".jpg")) {
        continue;
      }
      const rendered = await renderImage(`${framesDir}/${files[i]}`);

      await photon.frames.create({
        data: {
          content: rendered
        }
      });
    }
  } catch (e) {
    console.error("Error seeding:", e);
  } finally {
    await photon.disconnect();
  }
};

module.exports = seed;
