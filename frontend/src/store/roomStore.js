import {create} from 'zustand'

const useRoomStore = create((set)=>({
    roomData : null ,
    setRoomData : (data) => set({roomData : data}) ,
    updateRoomData : (partialData)=> set((state)=>({roomData : {...state.roomData,...partialData}})),
    resetRoomData : ()=>set({roomData : null })

}))

export default useRoomStore ;