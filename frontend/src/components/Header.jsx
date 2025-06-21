
const Header = ({ room }) => {
  const roomId = localStorage.getItem("roomID");
  
  if (!room) {
    return (
      <div className="font-press w-full flex items-center justify-center h-full text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-press w-full flex items-center justify-center h-full text-white bg-black">
      <div className="w-full flex text-xs sm:text-sm justify-between items-center px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col items-center">
          <span className="text-green-400">Room ID</span>
          <span>{roomId}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <img 
            className="w-12 h-8 object-contain" 
            src="https://i.ibb.co/GQtKsF8T/image.png" 
            alt="Timer icon"
            onError={(e) => {e.target.style.display = 'none'}}
          />
          <div className="flex flex-col items-center">
            <span className="text-yellow-400">Time</span>
            <span>{room?.questions?.estimatedTime || 'N/A'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center">
            <img 
              className="w-8 h-8 mb-1" 
              src="https://img.icons8.com/color-pixels/2x/batman.png" 
              alt="Player 1 avatar"
              onError={(e) => {e.target.src = 'https://via.placeholder.com/32x32/333/fff?text=P1'}}
            />
            <span className="text-xs truncate max-w-24">{room?.creator?.name || 'Player 1'}</span>
          </div>
          
          <div className="text-red-400 text-lg">VS</div>
          
          <div className="flex flex-col items-center">
            <img 
              className="w-8 h-8 mb-1" 
              src="https://img.icons8.com/color-pixels/2x/joker-dc.png" 
              alt="Player 2 avatar"
              onError={(e) => {e.target.src = 'https://via.placeholder.com/32x32/333/fff?text=P2'}}
            />
            <span className="text-xs truncate max-w-24">{room?.joiner?.name || 'Waiting...'}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-purple-400">Level</span>
          <span className="capitalize">{room?.difficulty || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;