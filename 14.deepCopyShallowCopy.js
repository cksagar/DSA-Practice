

const user = {
  name: "Chetan",
  address: { city: "Mumbai" }
};

const copy = { ...user };
copy.name = "Rahul";          // only copy changes
copy.address.city = "Pune";   // original also changes


consolezz.log("user",user);


const user2 = {
  name: "Chetan",
  address: { city: "Mumbai" }
};

const copy2 = structuredClone(user);

copy2.address.city = "Pune";


console.log(user2);
