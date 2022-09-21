const ethers = require("ethers");
require("dotenv").config();

const donABI = require("./contractABI.json");
const Event = require("./model/eventModel");

// Starting Event Listener
const eventListener = async () => {
  try {
    // DoubleOrNothing contract address
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const provider = new ethers.providers.WebSocketProvider(
      `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_WEBSOCKET}`
    );
    const contract = new ethers.Contract(contractAddress, donABI, provider);
    console.log("Listening to the Events...");

    // UserWon Event Listener
    contract.on(
      "UserWon",
      async (user, betAmount, amountWon, userChoice, finalNum, event) => {
        let data = {
          user: user,
          state: true,
          betAmount: ethers.utils.formatUnits(betAmount, 18),
          userChoice: userChoice.toString(),
          finalNumber: ethers.utils.formatUnits(finalNum, 0),
        };

        // Creating a new Event
        const userWon = new Event(data);
        // Saving it to DB
        await userWon.save();
        // Getting all the Events from DB
        const allEvents = await Event.find({});
        // Showing all the Events in console
        console.log(
          `All ${allEvents.length} Events are shown below:`,
          ...allEvents
        );
        console.log("Listening to the Events... ");
      }
    );

    // UserLost Event Listener
    contract.on(
      "UserLost",
      async (user, betAmount, amountLost, userChoice, finalNum, event) => {
        let data = {
          user: user,
          state: false,
          betAmount: ethers.utils.formatUnits(betAmount, 18),
          userChoice: userChoice,
          finalNumber: ethers.utils.formatUnits(finalNum, 0),
        };

        // Creating a new Event
        const userLost = new Event(data);
        // Saving it to DB
        await userLost.save();
        // Getting all the Events from DB
        const allEvents = await Event.find({});
        // Showing all the Events in console
        console.log(
          `All ${allEvents.length} Events are shown below:`,
          ...allEvents
        );
        console.log("Listening to the Events... ");
      }
    );
  } catch (err) {
    // Showing Error message if any Error caught in the try block
    console.log("Error Occoured", err.message);
  }
};

module.exports = eventListener;
