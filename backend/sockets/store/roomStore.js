const rooms = {};
const submissions = {};

export const getRooms = () => rooms;
export const getSubmissions = ()=> submissions ;

export const createRoom = (roomID, roomData) => {
  rooms[roomID] = roomData;
  //console.log(rooms);
};

export const createSubmission = (subId,subData) =>{
  submissions[subId] = subData ;
}

export const getRoom = (roomID) => rooms[roomID];
export const getSubmission = (subId) => submissions[subId];

export const deleteRoom = (roomID) => {
  delete rooms[roomID];
};

export const updateRoom = (roomID, updates) => {
  if (rooms[roomID]) {
    rooms[roomID] = { ...rooms[roomID], ...updates };
  }
};
