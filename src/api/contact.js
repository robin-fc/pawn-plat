import { ethers } from "ethers";
import { abi as PawnPlatabi } from "./PawnPlat.json";
import { abi as ERC721abi } from "./ERC721.json";

let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
let contactPP = new ethers.Contract(
  process.env.VUE_APP_PAWNPLAT_ADDRESS,
  PawnPlatabi,
  provider
);
let contactPP_signer = new ethers.Contract(
  process.env.VUE_APP_PAWNPLAT_ADDRESS,
  PawnPlatabi,
  provider.getSigner()
);
let contactRivermen_signer = new ethers.Contract(
  process.env.VUE_APP_ERC721_ADDRESS,
  ERC721abi,
  provider.getSigner()
);
export { provider, contactPP, contactPP_signer, contactRivermen_signer };
