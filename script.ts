import { fork } from "child_process";

import { Photon } from "@generated/photon";

const photon = new Photon();

async function main() {
  console.log(await photon.users.findMany({}));
  console.log(await photon.posts.findMany({}));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
