const db = require("_helpers/db");
const WhiteList = db.WhiteList;

module.exports = {
  isAlreadyExists,
  addWhiteListAddress,
  getAllWhiteListAddresses,
  deleteAddresses,
};

async function isAlreadyExists(address) {
  const exists = await WhiteList.findOne({ address: address });
  console.log(exists);
  return exists != null;
}

async function addWhiteListAddress(address) {
  const exists = await isAlreadyExists(address);
  if (exists) {
    return "exists";
  } else {
    const addData = {
      address: address,
    };
    const whiteListAddress = new WhiteList(addData);
    console.log(whiteListAddress);
    await whiteListAddress.save();
    return "success";
  }
}

async function getAllWhiteListAddresses() {
  return await WhiteList.find();
}

async function deleteAddresses(addresses) {
  for (var i = 0; i < addresses.length; i++) {
    await WhiteList.findOneAndDelete({ address: addresses[i] });
  }
  return true;
}
