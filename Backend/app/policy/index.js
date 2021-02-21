const { AbilityBuilder, Ability } = require("@casl/ability");

//membuat object policy ciri khas object bla-bla = {}
const policies = {
  guest(user, { can }) {
    //can sebagai fungsi
    can("read", "Product");
  },
  user(user, { can }) {
    //Membaca daftar 'Order'
    can("view", "Order");

    //Membuat daftar 'Order'
    can("create", "Order");

    //Membaca 'Order' miliknya
    can("read", "Order", { user_id: user._id });

    // mengupdate data dirinya sendiri (`User`)
    can("update", "User", { _id: user._id });

    // membaca `Cart` miliknya
    can("read", "Cart", { user_id: user._id });

    // mengupdate `Cart` miliknya
    can("update", "Cart", { user_id: user._id });

    // melihat daftar `DeliveryAddress`
    can("view", "DeliveryAddress");

    // membuat `DeliveryAddress`
    can("create", "DeliveryAddress", { user_id: user._id });

    // membaca `DeliveryAddress` miliknya
    can("read", "DeliveryAddress", { user_id: user._id });

    // mengupdate `DeliveryAddress` miliknya
    can("update", "DeliveryAddress", { user_id: user._id });

    // menghapus `DeliveryAddress` miliknya
    can("delete", "DeliveryAddress", { user_id: user._id });

    // membaca `Invoice` miliknya
    can("read", "Invoice", { user_id: user._id });
  },
  admin(user, { can }) {
    can("manage", "all");
  },
};

const policyFor = (user) => {
  let builder = new AbilityBuilder();

  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }

  return new Ability(builder.rules);
};

module.exports = { policyFor };
