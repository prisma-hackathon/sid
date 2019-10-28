const commander = require("commander");
const encode = require("./encode");
// /Users/siddhant/Downloads/example/video.mp4

const main = async () => {
  commander
    .option("-s, --start", "Start Time")
    .option("-d, --duration", "Duration ");

  commander.parse(process.argv);

  if (commander.start) {
    console.log("Start at", commander.start);
  }
  if (commander.duration) {
    console.log("Duration", commander.duration);
  }

  const videoPath = commander.args[0];

  if (!videoPath) {
    console.error("Need a video");
    return;
  }

  encode(videoPath);
};

main();
