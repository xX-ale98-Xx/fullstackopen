const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://nicaale98_db_user:${encodeURIComponent(password)}@cluster0.pwilaux.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    // Definizione schema e modello
    const phoneSchema = new mongoose.Schema({
      name: String,
      number: String,
    });

    const Phone = mongoose.model("Phone", phoneSchema);

    // Se ci sono solo password → stampare tutti i contatti
    if (process.argv.length === 3) {
      console.log("phonebook:");
      return Phone.find({}).then((persons) => {
        persons.forEach((p) => console.log(`${p.name} ${p.number}`));
        mongoose.connection.close();
      });
    }

    // Se ci sono password + name + number → aggiungere contatto
    const name = process.argv[3];
    const number = process.argv[4];

    const newPhone = new Phone({ name, number });

    return newPhone.save().then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    mongoose.connection.close();
  });
