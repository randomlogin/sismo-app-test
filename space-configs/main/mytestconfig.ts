import { SpaceConfig } from "../types";

export default {
  metadata: {
    name: "Eth paris test app", 
    description:
      "Test description", // UPDATE HERE
    image: "photo2.jpg", // UPDATE HERE
    socialLinks: [
      {
        type: "link", 
        link: "https://www.my-awesome-website.io/", // UPDATE HERE
      },
      // OTHER TYPE OF LINK YOU CAN USE
      // {
      //   type: "twitter",
      //   link: "https://twitter.com/Sismo_eth",
      // },
      // {
      //   type: "discord",
      //   link: "https://discord.com/invite/sismo",
      // },
      // {
      //   type: "github",
      //   link: "https://github.com/sismo-core",
      // },
    ],
  },
  apps: [],
} as SpaceConfig;
