import { notFoundError } from "../errors/error";
import { UpsertUser } from "../protocols";
import { userRepository } from "../repositories/user-repository";

async function updateUser(data: UpsertUser) {
  const user = await userRepository.findByFrontId(data.frontId);

  if (!user) {
    await userRepository.createUser(data);
    return;
  }

  const userId = user.id;

  if (!data.assets || data.assets.length === 0) {
    await userRepository.updateUserMoney(userId, data.money);
    return;
  }

  await userRepository.updateUserMoney(userId, data.money);

  for (const asset of data.assets) {
    const existingAsset = await userRepository.findUserAssetByName(userId, asset.name);

    if (asset.amount === 0 && existingAsset) {
      await userRepository.deleteAsset(userId, asset.name);
      continue;
    }

    if (existingAsset) {
      await userRepository.updateAsset(userId, asset);
    } else {
      await userRepository.createAsset(userId, asset);
    }
  }
}

async function findByFrontId(frontId: string) {
  const user = await userRepository.findByFrontId(frontId);
  if (!user) throw notFoundError("ID do usuárioo");
  return user;
}

export const userService = {
  updateUser,
  findByFrontId
};