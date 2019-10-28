const { exec } = require("child_process");
const path = require("path");

const seed = require("./seed");

const rmdir = path => {
  return new Promise(res => {
    exec(`rm -r ${path}`, e => {
      return res(e);
    });
  });
};

const mkdir = async path => {
  await rmdir(path);

  return new Promise((res, rej) => {
    return exec(`mkdir ${path}`, e => {
      if (e) {
        return rej(e);
      }
      return res(e);
    });
  });
};

const encode = async videoPath => {
  const baseDir = path.dirname(videoPath);
  const framesDir = `${baseDir}/frames`;

  await mkdir(framesDir);

  exec(
    `ffmpeg -i ${videoPath} -ss 00:00:00 -t 00:00:10 ${framesDir}/$filename%03d.jpg`,
    async e => {
      if (e) {
        console.error("Error in FFMPEG", e);
        return;
      }

      await seed(framesDir);
      await rmdir(framesDir);

      // const outDir = `${baseDir}/out`;
      // rmdir(outDir);
      // mkdir(outDir);

      // await new Promise(res => exec(`cp -R ./prisma/* ${outDir}`, res));
      // await new Promise(res => exec(`nexe play.js -o play`, res));
      // await new Promise(res => exec(`cp play ${outDir}/play`, res));
    }
  );
};

module.exports = encode;
